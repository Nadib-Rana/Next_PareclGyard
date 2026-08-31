// src/components/reports/ReportsChartsGrid.tsx
"use client";

import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { Card } from "@/components/ui/pg-ui";
import type { Parcel, FraudCheckResult } from "@/types";

interface Props {
  parcels: Parcel[];
  fraudChecks: FraudCheckResult[];
  timeRange: "7d" | "30d" | "90d" | "all";
  dbAnalytics?: any;
}

const COURIER_COLORS: Record<string, string> = {
  Steadfast: "#4f46e5",
  Pathao: "#06b6d4",
  RedX: "#ef4444",
  Paperfly: "#f59e0b",
  CarryBee: "#10b981",
  ParcelDex: "#8b5cf6",
};

export default function ReportsChartsGrid({ parcels, fraudChecks, timeRange, dbAnalytics }: Props) {
  // 1. Dynamic Courier Distribution (Strictly from DB or Real Parcels)
  const courierData = useMemo(() => {
    if (dbAnalytics?.courierDistribution && dbAnalytics.courierDistribution.length > 0) {
      return dbAnalytics.courierDistribution.map((c: any) => ({
        ...c,
        color: COURIER_COLORS[c.name] || "#64748b",
      }));
    }

    if (!parcels || parcels.length === 0) {
      return [];
    }

    const counts: Record<string, number> = {};
    parcels.forEach(p => {
      const c = p.courier || "Steadfast";
      counts[c] = (counts[c] || 0) + 1;
    });

    const total = parcels.length;
    return Object.entries(counts).map(([name, count]) => ({
      name,
      value: total > 0 ? Math.round((count / total) * 100) : 0,
      count,
      color: COURIER_COLORS[name] || "#64748b",
    }));
  }, [dbAnalytics, parcels]);

  // 2. Dynamic District Volume (Strictly from DB or Real Parcels)
  const districtData = useMemo(() => {
    if (dbAnalytics?.districtData && dbAnalytics.districtData.length > 0) {
      return dbAnalytics.districtData;
    }

    if (!parcels || parcels.length === 0) {
      return [];
    }

    const counts: Record<string, number> = {};
    parcels.forEach(p => {
      if (p.district) {
        const d = p.district;
        counts[d] = (counts[d] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .map(([district, count]) => ({ district, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [dbAnalytics, parcels]);

  // 3. Monthly Volume (Strictly from real DB timeline)
  const monthlyVolumeData = useMemo(() => {
    if (dbAnalytics?.monthlyVolume && dbAnalytics.monthlyVolume.length > 0) {
      return dbAnalytics.monthlyVolume;
    }

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    const result: { month: string; delivered: number; returned: number }[] = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const mKey = monthNames[d.getMonth()];
      const mParcels = parcels.filter(p => {
        if (!p.createdAt) return false;
        const pDate = new Date(p.createdAt);
        return pDate.getMonth() === d.getMonth() && pDate.getFullYear() === d.getFullYear();
      });

      result.push({
        month: mKey,
        delivered: mParcels.filter(p => p.status === "Delivered").length,
        returned: mParcels.filter(p => p.status === "Returned" || p.status === "Cancelled").length,
      });
    }

    return result;
  }, [dbAnalytics, parcels]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Monthly Delivery vs Return Growth */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-bold text-slate-900 text-sm">Monthly Volume & Return Trends</h2>
          <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">
            6-Month Trajectory
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Total dispatches compared with return percentages over past periods
        </p>
        <ResponsiveContainer width="100%" height={230}>
          <AreaChart data={monthlyVolumeData} margin={{ left: -20, right: 8 }}>
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
            <Area
              type="monotone"
              dataKey="delivered"
              stroke="#4f46e5"
              fill="#e0e7ff"
              name="Delivered"
            />
            <Area
              type="monotone"
              dataKey="returned"
              stroke="#ef4444"
              fill="#fee2e2"
              name="Returned"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Courier Share Pie Chart */}
      <Card className="p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold text-slate-900 text-sm">Courier Partner Distribution</h2>
            <span className="text-[10px] font-bold text-slate-400">Live Active Shares</span>
          </div>
          <p className="text-xs text-slate-500 mb-4">Share of total shipments dispatched by courier partner</p>
        </div>

        {courierData.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
            No parcel dispatches recorded yet.
          </div>
        ) : (
          <div className="flex items-center justify-around">
            <div className="w-44 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={courierData}
                    innerRadius={45}
                    outerRadius={68}
                    dataKey="value"
                    paddingAngle={4}
                  >
                    {courierData.map((c: any) => (
                      <Cell key={c.name} fill={c.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${value}%`, "Share"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 text-xs">
              {courierData.map((c: any) => (
                <div key={c.name} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md" style={{ backgroundColor: c.color }} />
                  <span className="font-semibold text-slate-700">{c.name}:</span>
                  <span className="font-bold text-slate-900">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Top Delivery Districts */}
      <Card className="xl:col-span-2 p-5">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-bold text-slate-900 text-sm">Top Destination Districts by Volume</h2>
          <span className="text-[10px] font-bold text-slate-400">High-Density Delivery Hubs</span>
        </div>
        <p className="text-xs text-slate-500 mb-4">Parcels dispatched by destination division and district hubs</p>

        {districtData.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
            No district delivery data recorded yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={districtData} layout="vertical" margin={{ left: 20, right: 20 }}>
              <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis dataKey="district" type="category" tick={{ fontSize: 11, fill: "#64748b" }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="count" fill="#4f46e5" radius={[0, 4, 4, 0]} name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>
    </div>
  );
}

