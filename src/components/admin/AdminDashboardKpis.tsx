// src/components/admin/AdminDashboardKpis.tsx
"use client";

import React from "react";
import { Building2, CircleDollarSign, Package, Ban, ArrowUpRight } from "lucide-react";

interface Props {
  activeMerchantsCount: number;
  totalParcelsCount: number;
  blacklistCount: number;
}

export default function AdminDashboardKpis({ activeMerchantsCount, totalParcelsCount, blacklistCount }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Merchants</span>
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <Building2 size={18} />
          </div>
        </div>
        <div className="text-3xl font-black text-white mt-2">5,420</div>
        <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold mt-2">
          <ArrowUpRight size={14} /> +12.4% vs last month ({activeMerchantsCount} active)
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Platform MRR</span>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <CircleDollarSign size={18} />
          </div>
        </div>
        <div className="text-3xl font-black text-emerald-400 mt-2">৳14,80,000</div>
        <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold mt-2">
          <ArrowUpRight size={14} /> +18.2% recurring growth
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Parcels</span>
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Package size={18} />
          </div>
        </div>
        <div className="text-3xl font-black text-white mt-2">{totalParcelsCount.toLocaleString()}</div>
        <div className="text-xs text-slate-400 font-medium mt-2">Across 64 Bangladesh districts</div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Central Fraud Database</span>
          <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
            <Ban size={18} />
          </div>
        </div>
        <div className="text-3xl font-black text-red-400 mt-2">42,100+</div>
        <div className="text-xs text-slate-400 font-medium mt-2">{blacklistCount} flagged in active review</div>
      </div>
    </div>
  );
}
