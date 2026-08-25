// src/app/(app)/customers/page.tsx
"use client";

import React, { useState } from "react";
import { Search, Eye, Star } from "lucide-react";
import { useData } from "@/hooks/useData";
import { Card, RiskBadge, Badge } from "@/components/ui/pg-ui";
import CustomerDrawer from "@/components/customers/CustomerDrawer";
import type { Customer } from "@/types";

export default function CustomersPage() {
  const { customers, toggleWatchlist, addCustomerNote } = useData();
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [watchlistOnly, setWatchlistOnly] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filtered = customers.filter(c => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchRisk = riskFilter === "all" || c.risk === riskFilter;
    const matchWatchlist = !watchlistOnly || c.isWatchlist;
    return matchSearch && matchRisk && matchWatchlist;
  });

  return (
    <div className="p-6 space-y-6 max-w-screen-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Customer Directory & Reputation</h1>
          <p className="text-sm text-slate-500 mt-0.5">Track repeat buyers, return history, and high-risk customer watchlists.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search customer by name or phone number..."
            className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <select
          value={riskFilter}
          onChange={e => setRiskFilter(e.target.value)}
          className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none"
        >
          <option value="all">All Risk Levels</option>
          <option value="Safe">Safe</option>
          <option value="Moderate">Moderate</option>
          <option value="High Risk">High Risk</option>
        </select>

        <button
          onClick={() => setWatchlistOnly(!watchlistOnly)}
          className={`px-3 py-2 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
            watchlistOnly ? "bg-red-50 border-red-300 text-red-700" : "bg-white border-slate-200 text-slate-600"
          }`}
        >
          <Star size={13} className={watchlistOnly ? "fill-red-600 text-red-600" : ""} />
          Watchlisted Only
        </button>
      </div>

      {/* Customers Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 font-semibold">
                <th className="px-4 py-3 text-left">Customer Name</th>
                <th className="px-4 py-3 text-left">Phone Number</th>
                <th className="px-4 py-3 text-left">Total Orders</th>
                <th className="px-4 py-3 text-left">Delivered</th>
                <th className="px-4 py-3 text-left">Returned</th>
                <th className="px-4 py-3 text-left">Delivery Rate</th>
                <th className="px-4 py-3 text-left">Risk Level</th>
                <th className="px-4 py-3 text-left">Last Order</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900 flex items-center gap-2">
                    {c.name}
                    {c.isWatchlist && <Badge variant="danger">Watchlisted</Badge>}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-600 font-medium">{c.phone}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{c.orders}</td>
                  <td className="px-4 py-3 text-emerald-600 font-bold">{c.delivered}</td>
                  <td className="px-4 py-3 text-red-600 font-bold">{c.returned}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">{c.rate}</td>
                  <td className="px-4 py-3"><RiskBadge level={c.risk} /></td>
                  <td className="px-4 py-3 text-slate-400 text-[11px]">{c.last}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedCustomer(c)}
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-indigo-600 font-semibold cursor-pointer"
                    >
                      <Eye size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {selectedCustomer && (
        <CustomerDrawer
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onToggleWatchlist={toggleWatchlist}
          onSaveNote={addCustomerNote}
        />
      )}
    </div>
  );
}
