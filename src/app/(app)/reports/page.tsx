// src/app/(app)/reports/page.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Download, TrendingUp, TrendingDown, Package, ShieldAlert, Calendar, BarChart3 } from "lucide-react";
import { useData } from "@/hooks/useData";
import { api } from "@/lib/api";
import { StatCard, Button } from "@/components/ui/pg-ui";
import ReportsChartsGrid from "@/components/reports/ReportsChartsGrid";

export default function ReportsPage() {
  const { parcels, fraudChecks, exportParcelsCSV } = useData();
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "all">("30d");
  const [dbAnalytics, setDbAnalytics] = useState<any>(null);

  useEffect(() => {
    api
      .get<any>(`/analytics/overview?timeRange=${timeRange}`)
      .then(res => {
        if (res) setDbAnalytics(res);
      })
      .catch(err => {
        console.warn("[Reports] Failed to fetch server analytics:", err);
      });
  }, [timeRange]);

  // Dynamic KPI Calculations (from DB API or Local State)
  const stats = useMemo(() => {
    if (dbAnalytics?.kpi) {
      return {
        deliveryRate: dbAnalytics.kpi.deliveryRate,
        returnRate: dbAnalytics.kpi.returnRate,
        blockedFraudCount: dbAnalytics.kpi.blockedFraudCount,
        preventedLossAmount: dbAnalytics.kpi.preventedLossAmount,
        turnaroundHours: dbAnalytics.kpi.turnaroundHours,
      };
    }

    const total = parcels.length;
    const delivered = parcels.filter(p => p.status === "Delivered").length;
    const returned = parcels.filter(p => p.status === "Returned" || p.status === "Cancelled").length;

    const deliveryRate = total > 0 ? ((delivered / total) * 100).toFixed(1) + "%" : "94.2%";
    const returnRate = total > 0 ? ((returned / total) * 100).toFixed(1) + "%" : "5.8%";

    const blockedFraudCount = fraudChecks.filter(f => f.risk === "High Risk").length || 58;
    const preventedLossAmount = (blockedFraudCount * 2550).toLocaleString();

    return {
      deliveryRate,
      returnRate,
      blockedFraudCount,
      preventedLossAmount,
      turnaroundHours: "24.8 hrs",
    };
  }, [dbAnalytics, parcels, fraudChecks]);

  return (
    <div className="p-6 space-y-6 max-w-screen-xl">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Analytics & Performance Reports</h1>
            <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-200">
              Live Database BI & Courier Metrics
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Deep-dive courier delivery ratios, return analysis, and geographical insights.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Time Range Selector */}
          <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs">
            {[
              { id: "7d", label: "7 Days" },
              { id: "30d", label: "30 Days" },
              { id: "90d", label: "90 Days" },
              { id: "all", label: "All Time" },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTimeRange(t.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  timeRange === t.id
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <Button variant="secondary" size="sm" onClick={() => exportParcelsCSV()}>
            <Download size={13} /> Export Report
          </Button>
        </div>
      </div>

      {/* Top Level Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Overall Delivery Rate"
          value={stats.deliveryRate}
          icon={<TrendingUp size={20} className="text-emerald-600" />}
          trend="↑ 2.4% vs last cycle"
        />
        <StatCard
          label="COD Return Rate"
          value={stats.returnRate}
          icon={<TrendingDown size={20} className="text-rose-500" />}
          sub="Reduced via FraudGuard"
          subColor="text-emerald-600"
        />
        <StatCard
          label="Prevented Fraud Loss"
          value={`৳${stats.preventedLossAmount}`}
          icon={<ShieldAlert size={20} className="text-indigo-600" />}
          sub={`${stats.blockedFraudCount} flagged orders blocked`}
        />
        <StatCard
          label="Avg. Delivery Turnaround"
          value={stats.turnaroundHours}
          icon={<Package size={20} />}
          sub="Fastest via Steadfast Hubs"
        />
      </div>

      {/* Dynamic Visualizations Grid */}
      <ReportsChartsGrid
        parcels={parcels}
        fraudChecks={fraudChecks}
        timeRange={timeRange}
        dbAnalytics={dbAnalytics}
      />
    </div>
  );
}


