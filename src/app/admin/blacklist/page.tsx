// src/app/admin/blacklist/page.tsx
"use client";

import React, { useState } from "react";
import { Plus, Search, Trash2, ShieldAlert } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import AddBlacklistModal from "@/components/admin/AddBlacklistModal";

export default function AdminBlacklistPage() {
  const { blacklist, addBlacklistEntry, removeBlacklistEntry } = useAdmin();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [addModalOpen, setAddModalOpen] = useState(false);

  const filtered = blacklist.filter(b => {
    const matchSearch =
      b.phone.includes(search) ||
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.reason.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Central Fraud & Blacklist Database</h1>
          <p className="text-xs text-slate-400 mt-0.5">Nationwide repository of verified fraudulent phone numbers and serial returners.</p>
        </div>
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={14} /> Add Flagged Phone
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search flagged phone numbers, names, or reasons..."
            className="w-full pl-8 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-red-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-300 focus:outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="Confirmed Fraud">Confirmed Fraud</option>
          <option value="Suspicious">Suspicious</option>
          <option value="Under Review">Under Review</option>
        </select>
      </div>

      {/* Blacklist Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 text-left">
                <th className="px-4 py-3">Phone Number</th>
                <th className="px-4 py-3">Customer Name</th>
                <th className="px-4 py-3">Risk Score</th>
                <th className="px-4 py-3">Reported By</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Fraud Reason / Signals</th>
                <th className="px-4 py-3">Added Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-red-400">{b.phone}</td>
                  <td className="px-4 py-3 font-bold text-white">{b.customerName}</td>
                  <td className="px-4 py-3 font-black text-red-400">{b.riskScore}/100</td>
                  <td className="px-4 py-3 text-slate-400">{b.reportedByCount} merchants ({b.totalReturns} returns)</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        b.status === "Confirmed Fraud"
                          ? "bg-red-500/10 text-red-400 border border-red-500/30"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-300 max-w-sm">{b.reason}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] whitespace-nowrap">{b.addedDate}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => removeBlacklistEntry(b.id)}
                      className="p-1.5 hover:bg-red-950/60 text-slate-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                      title="Remove from Blacklist"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {addModalOpen && (
        <AddBlacklistModal
          onClose={() => setAddModalOpen(false)}
          onAdd={addBlacklistEntry}
        />
      )}
    </div>
  );
}
