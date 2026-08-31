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
}

const defaultMonthlyVolume = [
  { month: "Mar", delivered: 340, returned: 42 },
  { month: "Apr", delivered: 420, returned: 38 },
  { month: "May", delivered: 510, returned: 55 },
  { month: "Jun", delivered: 680, returned: 48 },
  { month: "Jul", delivered: 840, returned: 62 },
  { month: "Aug", delivered: 980, returned: 54 },
];

const COURIER_COLORS: Record<string, string> = {
  Steadfast: "#4f46e5",
  Pathao: "#06b6d4",
  RedX: "#ef4444",
  Paperfly: "#f59e0b",
  CarryBee: "#10b981",
  ParcelDex: "#8b5cf6",
};

export default function ReportsChartsGrid({ parcels, fraudChecks, timeRange }: Props) {
  // 1. Dynamic Courier Distribution
  const courierData = useMemo(() => {
    if (!parcels || parcels.length === 0) {
      return [
        { name: "Steadfast", value: 58, color: "#4f46e5" },
        { name: "Pathao", value: 28, color: "#06b6d4" },
        { name: "RedX", value: 10, color: "#ef4444" },
        { name: "Paperfly", value: 4, color: "#f59e0b" },
      ];
    }

    const counts: Record<string, number> = {};
    parcels.forEach(p => {
      const c = p.courier || "Steadfast";
      counts[c] = (counts[c] || 0) + 1;
    });

    const total = parcels.length;
    return Object.entries(counts).map(([name, count]) => ({
      name,
      value: Math.round((count / total) * 100),
      count,
      color: COURIER_COLORS[name] || "#64748b",
    }));
  }, [parcels]);

  // 2. Dynamic District Volume
  const districtData = useMemo(() => {
    if (!parcels || parcels.length === 0) {
      return [
        { district: "Dhaka", count: 520 },
        { district: "Chattogram", count: 180 },
        { district: "Sylhet", count: 95 },
        { district: "Rajshahi", count: 82 },
        { district: "Bogura", count: 64 },
      ];
    }

    const counts: Record<string, number> = {};
    parcels.forEach(p => {
      const d = p.district || "Dhaka";
      counts[d] = (counts[d] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([district, count]) => ({ district, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 7);
  }, [parcels]);

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
          <AreaChart data={defaultMonthlyVolume} margin={{ left: -20, right: 8 }}>
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
                  {courierData.map(c => (
                    <Cell key={c.name} fill={c.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`${value}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 text-xs">
            {courierData.map(c => (
              <div key={c.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md" style={{ backgroundColor: c.color }} />
                <span className="font-semibold text-slate-700">{c.name}:</span>
                <span className="font-bold text-slate-900">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Top Delivery Districts */}
      <Card className="xl:col-span-2 p-5">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-bold text-slate-900 text-sm">Top Destination Districts by Volume</h2>
          <span className="text-[10px] font-bold text-slate-400">High-Density Delivery Hubs</span>
        </div>
        <p className="text-xs text-slate-500 mb-4">Parcels dispatched by destination division and district hubs</p>
        <ResponsiveContainer width="100%" height={210}>
          <BarChart data={districtData} layout="vertical" margin={{ left: 20, right: 20 }}>
            <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis dataKey="district" type="category" tick={{ fontSize: 11, fill: "#64748b" }} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Bar dataKey="count" fill="#4f46e5" radius={[0, 4, 4, 0]} name="Orders" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

