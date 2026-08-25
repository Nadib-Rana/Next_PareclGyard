// src/app/admin/finance/page.tsx
"use client";

import React, { useState } from "react";
import { CircleDollarSign, ArrowUpRight, Search } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";

export default function AdminFinancePage() {
  const { transactions } = useAdmin();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const totalCollected = transactions.reduce((acc, t) => acc + t.amount, 0);

  const filtered = transactions.filter(t => {
    const matchSearch =
      t.merchantName.toLowerCase().includes(search.toLowerCase()) ||
      t.trxId.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || t.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Platform Finance & Billing Ledger</h1>
        <p className="text-xs text-slate-400 mt-0.5">Real-time ledger of merchant subscription renewals and fraud quota top-ups.</p>
      </div>

      {/* Summary KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Platform Revenue</span>
          <div className="text-3xl font-black text-emerald-400 mt-2">৳{totalCollected.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold mt-2">
            <ArrowUpRight size={14} /> +24% vs last billing cycle
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gateway Success Rate</span>
          <div className="text-3xl font-black text-white mt-2">99.4%</div>
          <div className="text-xs text-slate-400 mt-2">bKash / Nagad Direct Checkout</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Reconciliations</span>
          <div className="text-3xl font-black text-amber-400 mt-2">৳0</div>
          <div className="text-xs text-slate-400 mt-2">All settlements up to date</div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search transactions by merchant name or TrxID..."
            className="w-full pl-8 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-300 focus:outline-none"
        >
          <option value="all">All Types</option>
          <option value="Subscription">Subscription</option>
          <option value="Credit Top-up">Credit Top-up</option>
        </select>
      </div>

      {/* Transactions Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 text-left">
                <th className="px-4 py-3">Transaction ID</th>
                <th className="px-4 py-3">Merchant Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Payment Method</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Gateway TrxID</th>
                <th className="px-4 py-3">Date & Time</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-indigo-400">{t.id}</td>
                  <td className="px-4 py-3 font-bold text-white">{t.merchantName}</td>
                  <td className="px-4 py-3">{t.type}</td>
                  <td className="px-4 py-3 font-semibold text-slate-300">{t.method}</td>
                  <td className="px-4 py-3 font-black text-emerald-400">৳{t.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono text-slate-400">{t.trxId}</td>
                  <td className="px-4 py-3 text-slate-400 text-[11px]">{t.date}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
