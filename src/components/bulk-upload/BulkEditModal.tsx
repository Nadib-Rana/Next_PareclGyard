// src/components/bulk-upload/BulkEditModal.tsx
"use client";

import React from "react";
import { X } from "lucide-react";
import { Card, Button } from "@/components/ui/pg-ui";
import type { BulkRow } from "./BulkValidationTable";

interface Props {
  editingRow: BulkRow;
  setEditingRow: (r: BulkRow | null) => void;
  onSaveEdit: (e: React.FormEvent) => void;
}

export default function BulkEditModal({ editingRow, setEditingRow, onSaveEdit }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={() => setEditingRow(null)} />
      <Card className="relative z-10 w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-900 text-base">Edit & Fix Order Details</h2>
          <button onClick={() => setEditingRow(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={onSaveEdit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Customer Name</label>
            <input
              type="text"
              value={editingRow.customer}
              onChange={e => setEditingRow({ ...editingRow, customer: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={editingRow.phone}
              onChange={e => setEditingRow({ ...editingRow, phone: e.target.value })}
              placeholder="01711234567"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Full Address</label>
            <input
              type="text"
              value={editingRow.address}
              onChange={e => setEditingRow({ ...editingRow, address: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">District</label>
              <input
                type="text"
                value={editingRow.district}
                onChange={e => setEditingRow({ ...editingRow, district: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">COD Amount (৳)</label>
              <input
                type="text"
                value={editingRow.cod}
                onChange={e => setEditingRow({ ...editingRow, cod: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Courier</label>
            <select
              value={editingRow.courier}
              onChange={e => setEditingRow({ ...editingRow, courier: e.target.value as "Steadfast" | "Pathao" | "RedX" })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
            >
              <option value="Steadfast">Steadfast</option>
              <option value="Pathao">Pathao</option>
              <option value="RedX">RedX</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button variant="secondary" size="sm" onClick={() => setEditingRow(null)}>Cancel</Button>
            <Button type="submit" size="sm">Save & Validate</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
