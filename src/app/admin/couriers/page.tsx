// src/app/admin/couriers/page.tsx
"use client";

import React from "react";
import { Activity, RefreshCw, Zap } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";

export default function AdminCouriersPage() {
  const { couriers, toggleCourierStatus } = useAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Courier API Health & Dispatch Gateway</h1>
        <p className="text-xs text-slate-400 mt-0.5">Real-time status monitoring, API uptime, and failover router controls.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {couriers.map(c => (
          <div key={c.name} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-white text-base">{c.name} API Gateway</h2>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    c.status === "Operational"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                      : c.status === "Degraded"
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      : "bg-red-500/10 text-red-400 border border-red-500/30"
                  }`}
                >
                  {c.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                  <span className="text-slate-500 block">API Uptime:</span>
                  <span className="font-mono font-bold text-slate-200">{c.uptime}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                  <span className="text-slate-500 block">Avg. Latency:</span>
                  <span className="font-mono font-bold text-slate-200">{c.latencyMs} ms</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                  <span className="text-slate-500 block">Error Rate:</span>
                  <span className="font-mono font-bold text-slate-200">{c.errorRate}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                  <span className="text-slate-500 block">Daily API Calls:</span>
                  <span className="font-mono font-bold text-slate-200">{c.dailyRequests.toLocaleString()}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-3">
                <span className="text-slate-500">Last Incident:</span> {c.lastIncident}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">Simulate Health State:</span>
              <button
                onClick={() => toggleCourierStatus(c.name)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw size={12} /> Cycle Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
