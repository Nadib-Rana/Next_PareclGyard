// src/components/dashboard/WeeklyPerformanceChart.tsx
"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Card } from "@/components/ui/pg-ui";

const weeklyDeliveryData = [
  { day: "Sat", delivered: 45, returned: 4 },
  { day: "Sun", delivered: 52, returned: 3 },
  { day: "Mon", delivered: 68, returned: 7 },
  { day: "Tue", delivered: 61, returned: 5 },
  { day: "Wed", delivered: 75, returned: 6 },
  { day: "Thu", delivered: 82, returned: 4 },
  { day: "Fri", delivered: 58, returned: 2 },
];

export default function WeeklyPerformanceChart() {
  return (
    <Card className="xl:col-span-2 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-slate-900 text-sm">Weekly Delivery Performance</h2>
          <p className="text-xs text-slate-500">Delivered vs Returned volume this week</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={weeklyDeliveryData} margin={{ left: -20, right: 8 }}>
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} />
          <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
          <Bar dataKey="delivered" fill="#10b981" radius={[4, 4, 0, 0]} name="Delivered" />
          <Bar dataKey="returned" fill="#ef4444" radius={[4, 4, 0, 0]} name="Returned" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
