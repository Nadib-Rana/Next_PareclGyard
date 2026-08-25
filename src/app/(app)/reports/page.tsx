// src/app/(app)/reports/page.tsx
"use client";

import React from "react";
import { Download, TrendingUp, TrendingDown, Package, ShieldAlert } from "lucide-react";
import { useData } from "@/hooks/useData";
import { StatCard, Button } from "@/components/ui/pg-ui";
import ReportsChartsGrid from "@/components/reports/ReportsChartsGrid";

export default function ReportsPage() {
  const { exportParcelsCSV } = useData();

  return (
    <div className="p-6 space-y-6 max-w-screen-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Analytics & Performance Reports</h1>
          <p className="text-sm text-slate-500 mt-0.5">Deep-dive courier delivery ratios, return analysis, and geographical insights.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => exportParcelsCSV()}>
            <Download size={13} /> Export Report Summary
          </Button>
        </div>
      </div>

      {/* Top Level Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Overall Delivery Rate"
          value="94.2%"
          icon={<TrendingUp size={20} className="text-emerald-600" />}
          trend="↑ 2.4% vs last quarter"
        />
        <StatCard
          label="COD Return Rate"
          value="5.8%"
          icon={<TrendingDown size={20} className="text-red-500" />}
          sub="Reduced from 14.2%"
          subColor="text-emerald-600"
        />
        <StatCard
          label="Prevented Fraud Loss"
          value="৳1,48,000"
          icon={<ShieldAlert size={20} className="text-indigo-600" />}
          sub="58 flagged orders blocked"
        />
        <StatCard
          label="Avg. Delivery Turnaround"
          value="26.4 hrs"
          icon={<Package size={20} />}
          sub="Faster via Steadfast"
        />
      </div>

      <ReportsChartsGrid />
    </div>
  );
}
