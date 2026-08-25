// src/components/reports/ReportsChartsGrid.tsx
"use client";

import React from "react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";
import { Card } from "@/components/ui/pg-ui";

const monthlyVolume = [
  { month: "Mar", delivered: 340, returned: 42 },
  { month: "Apr", delivered: 420, returned: 38 },
  { month: "May", delivered: 510, returned: 55 },
  { month: "Jun", delivered: 680, returned: 48 },
  { month: "Jul", delivered: 840, returned: 62 },
  { month: "Aug", delivered: 980, returned: 54 },
];

const courierDistribution = [
  { name: "Steadfast", value: 58, color: "#4f46e5" },
  { name: "Pathao", value: 28, color: "#06b6d4" },
  { name: "RedX", value: 10, color: "#ef4444" },
  { name: "Paperfly", value: 4, color: "#f59e0b" },
];

const districtData = [
  { district: "Dhaka", count: 520 },
  { district: "Chattogram", count: 180 },
  { district: "Sylhet", count: 95 },
  { district: "Rajshahi", count: 82 },
  { district: "Bogura", count: 64 },
];

export default function ReportsChartsGrid() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Monthly Delivery vs Return Growth */}
      <Card className="p-5">
        <h2 className="font-bold text-slate-900 text-sm mb-1">Monthly Parcel Volume & Return Trends</h2>
        <p className="text-xs text-slate-500 mb-4">Total shipments compared with return percentages over 6 months</p>
        <ResponsiveContainer width="100%" height={230}>
          <AreaChart data={monthlyVolume} margin={{ left: -20, right: 8 }}>
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
            <Area type="monotone" dataKey="delivered" stroke="#4f46e5" fill="#e0e7ff" name="Delivered" />
            <Area type="monotone" dataKey="returned" stroke="#ef4444" fill="#fee2e2" name="Returned" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Courier Share Pie Chart */}
      <Card className="p-5 flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-slate-900 text-sm mb-1">Courier Partner Distribution</h2>
          <p className="text-xs text-slate-500 mb-4">Share of total monthly dispatches by carrier</p>
        </div>
        <div className="flex items-center justify-around">
          <div className="w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={courierDistribution} innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={4}>
                  {courierDistribution.map(c => (
                    <Cell key={c.name} fill={c.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 text-xs">
            {courierDistribution.map(c => (
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
        <h2 className="font-bold text-slate-900 text-sm mb-1">Top Delivery Districts by Volume</h2>
        <p className="text-xs text-slate-500 mb-4">Parcels dispatched by destination division and district hubs</p>
        <ResponsiveContainer width="100%" height={200}>
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
