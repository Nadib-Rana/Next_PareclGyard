// src/app/admin/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Activity, ShieldAlert, ArrowRight } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import { useData } from "@/hooks/useData";
import AdminDashboardKpis from "@/components/admin/AdminDashboardKpis";
import AdminMrrChart from "@/components/admin/AdminMrrChart";

export default function AdminDashboardPage() {
  const { merchants, couriers, blacklist } = useAdmin();
  const { parcels } = useData();

  const activeMerchants = merchants.filter(m => m.status === "Active").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Platform Command Center</h1>
          <p className="text-xs text-slate-400 mt-0.5">Real-time health, merchant growth, and fraud detection metrics across Bangladesh.</p>
        </div>
      </div>

      <AdminDashboardKpis
        activeMerchantsCount={activeMerchants}
        totalParcelsCount={parcels.length + 84200}
        blacklistCount={blacklist.length}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <AdminMrrChart />
        </div>

        {/* Courier Health Summary Widget */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-white text-sm flex items-center gap-2">
                <Activity size={15} className="text-indigo-400" /> Courier API Latencies
              </h2>
              <Link href="/admin/couriers" className="text-xs text-indigo-400 hover:underline font-semibold">
                Manage &rarr;
              </Link>
            </div>
            <div className="space-y-3 text-xs">
              {couriers.map(c => (
                <div key={c.name} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div>
                    <span className="font-bold text-slate-200">{c.name}</span>
                    <span className="text-[10px] text-slate-500 block">{c.latencyMs}ms avg latency</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      c.status === "Operational"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : c.status === "Degraded"
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Flagged Blacklist Entries */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div>
            <h2 className="font-bold text-white text-sm flex items-center gap-2">
              <ShieldAlert size={16} className="text-red-400" /> Recent High-Risk Blacklist Additions
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Nationwide flagged numbers reported across merchants</p>
          </div>
          <Link href="/admin/blacklist" className="text-xs text-red-400 hover:underline font-bold flex items-center gap-1">
            View All Blacklist <ArrowRight size={12} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 text-left">
                <th className="pb-2">Phone Number</th>
                <th className="pb-2">Customer Name</th>
                <th className="pb-2">Risk Score</th>
                <th className="pb-2">Reported By</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {blacklist.slice(0, 4).map(b => (
                <tr key={b.id} className="text-slate-300">
                  <td className="py-3 font-mono font-bold text-red-400">{b.phone}</td>
                  <td className="py-3 font-bold text-slate-200">{b.customerName}</td>
                  <td className="py-3 font-black text-red-400">{b.riskScore}/100</td>
                  <td className="py-3 text-slate-400">{b.reportedByCount} merchants</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400">
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 text-slate-400 max-w-xs truncate">{b.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
