// src/app/admin/merchants/page.tsx
"use client";

import React, { useState } from "react";
import { Search, Settings, ShieldCheck } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import MerchantManageModal from "@/components/admin/MerchantManageModal";
import type { PlatformMerchant } from "@/types/admin";

export default function AdminMerchantsPage() {
  const { merchants, updateMerchantStatus, updateMerchantPlan } = useAdmin();
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMerchant, setSelectedMerchant] = useState<PlatformMerchant | null>(null);

  const filtered = merchants.filter(m => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search) ||
      m.ownerName.toLowerCase().includes(search.toLowerCase());
    const matchPlan = planFilter === "all" || m.plan === planFilter;
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchPlan && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Merchant Directory & Subscriptions</h1>
        <p className="text-xs text-slate-400 mt-0.5">Manage registered stores, change subscription tiers, or suspend accounts.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by store name, owner, or phone..."
            className="w-full pl-8 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <select
          value={planFilter}
          onChange={e => setPlanFilter(e.target.value)}
          className="px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-300 focus:outline-none"
        >
          <option value="all">All Plans</option>
          <option value="Starter">Starter</option>
          <option value="Growth">Growth</option>
          <option value="Enterprise">Enterprise</option>
        </select>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-300 focus:outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Trial">Trial</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>

      {/* Merchants Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 text-left">
                <th className="px-4 py-3">Merchant ID</th>
                <th className="px-4 py-3">Store Name & Owner</th>
                <th className="px-4 py-3">Phone & Email</th>
                <th className="px-4 py-3">Plan Tier</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Fraud Usage</th>
                <th className="px-4 py-3">Lifetime Parcels</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filtered.map(m => (
                <tr key={m.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-indigo-400">{m.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-bold text-white">{m.name}</div>
                    <div className="text-[11px] text-slate-400">{m.ownerName}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-mono text-slate-300">{m.phone}</div>
                    <div className="text-[10px] text-slate-500">{m.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        m.plan === "Enterprise"
                          ? "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                          : m.plan === "Growth"
                          ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {m.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        m.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : m.status === "Trial"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {m.fraudChecksUsed} / {m.fraudChecksLimit}
                  </td>
                  <td className="px-4 py-3 font-bold text-white">{m.totalParcels.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedMerchant(m)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Settings size={12} /> Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedMerchant && (
        <MerchantManageModal
          selectedMerchant={selectedMerchant}
          onClose={() => setSelectedMerchant(null)}
          onUpdatePlan={updateMerchantPlan}
          onUpdateStatus={updateMerchantStatus}
          setSelectedMerchant={setSelectedMerchant}
        />
      )}
    </div>
  );
}
