// src/components/labels/BulkLabelsSelector.tsx
"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, CheckSquare, Square } from "lucide-react";
import { Card, Badge, RiskBadge } from "@/components/ui/pg-ui";
import type { Parcel } from "@/types";

interface Props {
  parcels: Parcel[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

export default function BulkLabelsSelector({
  parcels,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onClearAll,
}: Props) {
  const [search, setSearch] = useState("");
  const [courierFilter, setCourierFilter] = useState("all");

  const filteredParcels = useMemo(() => {
    return parcels.filter(p => {
      const matchSearch =
        search.trim() === "" ||
        p.customer?.toLowerCase().includes(search.toLowerCase()) ||
        p.phone?.includes(search) ||
        p.id?.toLowerCase().includes(search.toLowerCase()) ||
        p.district?.toLowerCase().includes(search.toLowerCase());

      const matchCourier =
        courierFilter === "all" || p.courier?.toLowerCase() === courierFilter.toLowerCase();

      return matchSearch && matchCourier;
    });
  }, [parcels, search, courierFilter]);

  const allFilteredSelected =
    filteredParcels.length > 0 &&
    filteredParcels.every(p => selectedIds.includes(p.id));

  const handleSelectFiltered = () => {
    if (allFilteredSelected) {
      // Unselect filtered
      const filteredIds = new Set(filteredParcels.map(p => p.id));
      const remaining = selectedIds.filter(id => !filteredIds.has(id));
      filteredParcels.forEach(p => {
        if (selectedIds.includes(p.id)) onToggleSelect(p.id);
      });
    } else {
      // Select all filtered
      filteredParcels.forEach(p => {
        if (!selectedIds.includes(p.id)) onToggleSelect(p.id);
      });
    }
  };

  return (
    <Card className="p-4 space-y-3.5 no-print">
      {/* Search Input */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, phone, or ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
        />
      </div>

      {/* Courier Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
        {["all", "Steadfast", "Pathao", "RedX", "Paperfly"].map(c => (
          <button
            key={c}
            onClick={() => setCourierFilter(c)}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
              courierFilter === c
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {c === "all" ? "All Couriers" : c}
          </button>
        ))}
      </div>

      {/* Select All / Action Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={allFilteredSelected}
            onChange={handleSelectFiltered}
            className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
          />
          <span className="text-xs font-bold text-slate-800">
            Selected {selectedIds.length} of {parcels.length}
          </span>
        </div>
        <div className="flex gap-2 text-xs">
          <button
            onClick={onSelectAll}
            className="text-indigo-600 hover:underline font-bold cursor-pointer"
          >
            Select All
          </button>
          <span className="text-slate-300">·</span>
          <button
            onClick={onClearAll}
            className="text-slate-400 hover:text-slate-600 font-semibold cursor-pointer"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Parcels List */}
      <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
        {filteredParcels.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            No parcels match your search filter.
          </div>
        ) : (
          filteredParcels.map(p => {
            const isSelected = selectedIds.includes(p.id);
            return (
              <div
                key={p.id}
                onClick={() => onToggleSelect(p.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/40 shadow-xs"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    className="w-4 h-4 accent-indigo-600 rounded flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="font-mono font-bold text-indigo-600">{p.id}</span>
                      <span className="font-semibold text-slate-900 truncate">{p.customer}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                      {p.district} · {p.product}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <Badge variant="indigo">{p.courier}</Badge>
                  <span className="font-bold text-slate-900">৳{p.cod.toLocaleString()}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}

