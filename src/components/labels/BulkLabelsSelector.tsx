// src/components/labels/BulkLabelsSelector.tsx
"use client";

import React from "react";
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
  parcels, selectedIds, onToggleSelect, onSelectAll, onClearAll,
}: Props) {
  const allSelected = parcels.length > 0 && selectedIds.length === parcels.length;

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={allSelected ? onClearAll : onSelectAll}
            className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
          />
          <span className="text-xs font-bold text-slate-800">
            Select All ({selectedIds.length} of {parcels.length} selected)
          </span>
        </div>
        <div className="flex gap-2">
          <button onClick={onSelectAll} className="text-xs text-indigo-600 hover:underline font-semibold cursor-pointer">
            Select All
          </button>
          <span className="text-slate-300">·</span>
          <button onClick={onClearAll} className="text-xs text-slate-400 hover:text-slate-600 font-semibold cursor-pointer">
            Clear
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
        {parcels.map(p => {
          const isSelected = selectedIds.includes(p.id);
          return (
            <div
              key={p.id}
              onClick={() => onToggleSelect(p.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                isSelected ? "border-indigo-600 bg-indigo-50/40 shadow-xs" : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}}
                  className="w-4 h-4 accent-indigo-600 rounded"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-indigo-600">{p.id}</span>
                    <span className="font-semibold text-slate-900">{p.customer}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{p.district} · {p.product}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="indigo">{p.courier}</Badge>
                <RiskBadge level={p.risk} />
                <span className="font-bold text-slate-900">৳{p.cod.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
