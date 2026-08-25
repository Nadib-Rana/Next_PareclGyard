// src/components/parcels/ParcelsToolbar.tsx
"use client";

import React from "react";
import { Search } from "lucide-react";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  riskFilter: string;
  setRiskFilter: (v: string) => void;
  courierFilter: string;
  setCourierFilter: (v: string) => void;
}

export default function ParcelsToolbar({
  search, setSearch,
  statusFilter, setStatusFilter,
  riskFilter, setRiskFilter,
  courierFilter, setCourierFilter,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex-1 min-w-[200px] relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by ID, customer name, phone, district..."
          className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <select
        value={statusFilter}
        onChange={e => setStatusFilter(e.target.value)}
        className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none"
      >
        <option value="all">All Statuses</option>
        <option value="Pending Pickup">Pending Pickup</option>
        <option value="In Transit">In Transit</option>
        <option value="Out for Delivery">Out for Delivery</option>
        <option value="Delivered">Delivered</option>
        <option value="Returned">Returned</option>
        <option value="Cancelled">Cancelled</option>
      </select>

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

      <select
        value={courierFilter}
        onChange={e => setCourierFilter(e.target.value)}
        className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none"
      >
        <option value="all">All Couriers</option>
        <option value="Steadfast">Steadfast</option>
        <option value="Pathao">Pathao</option>
        <option value="RedX">RedX</option>
        <option value="Paperfly">Paperfly</option>
      </select>
    </div>
  );
}
