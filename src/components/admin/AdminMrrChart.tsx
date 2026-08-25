// src/components/admin/AdminMrrChart.tsx
"use client";

import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const mrrGrowthData = [
  { month: "Mar", mrr: 820000, merchants: 3200 },
  { month: "Apr", mrr: 960000, merchants: 3850 },
  { month: "May", mrr: 1120000, merchants: 4300 },
  { month: "Jun", mrr: 1250000, merchants: 4780 },
  { month: "Jul", mrr: 1380000, merchants: 5120 },
  { month: "Aug", mrr: 1480000, merchants: 5420 },
];

export default function AdminMrrChart() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-white text-sm">Platform MRR & Subscription Growth</h2>
          <p className="text-xs text-slate-400 mt-0.5">Monthly recurring revenue from merchant subscriptions (BDT)</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={mrrGrowthData} margin={{ left: -10, right: 10 }}>
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />
          <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={v => `৳${v / 1000}k`} />
          <Tooltip
            contentStyle={{ backgroundColor: "#020617", borderColor: "#1e293b", color: "#f8fafc", borderRadius: 8, fontSize: 12 }}
            formatter={v => [`৳${Number(v).toLocaleString()}`, "MRR"]}
          />
          <Area type="monotone" dataKey="mrr" stroke="#10b981" fill="#064e3b" fillOpacity={0.4} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
