// src/components/customers/CustomerDrawer.tsx
"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Customer } from "@/types";
import { RiskBadge, Badge, Button } from "@/components/ui/pg-ui";

interface Props {
  customer: Customer;
  onClose: () => void;
  onToggleWatchlist: (phone: string) => void;
  onSaveNote: (phone: string, note: string) => void;
}

export default function CustomerDrawer({ customer, onClose, onToggleWatchlist, onSaveNote }: Props) {
  const router = useRouter();
  const [noteText, setNoteText] = useState(customer.notes || "");
  const [isWatchlist, setIsWatchlist] = useState(customer.isWatchlist);

  useEffect(() => {
    setNoteText(customer.notes || "");
    setIsWatchlist(customer.isWatchlist);
  }, [customer]);

  const handleSave = () => {
    onSaveNote(customer.phone, noteText);
  };

  const handleToggle = () => {
    onToggleWatchlist(customer.phone);
    setIsWatchlist(!isWatchlist);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-xs" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-white border-l border-slate-200 flex flex-col overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 sticky top-0 bg-white z-20">
          <h2 className="font-bold text-slate-900 text-base">Customer Intelligence Profile</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="text-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold mx-auto mb-2 shadow-xs">
              {customer.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <h3 className="font-bold text-slate-900 text-base">{customer.name}</h3>
            <p className="text-xs font-mono text-slate-500 mt-0.5">📞 {customer.phone}</p>
            <div className="mt-2.5 flex justify-center gap-2">
              <RiskBadge level={customer.risk} />
              {isWatchlist && <Badge variant="danger">Watchlisted</Badge>}
            </div>
          </div>

          {/* Delivery Stats Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: "Total Orders", value: customer.orders },
              { label: "Delivery Rate", value: customer.rate },
              { label: "Delivered", value: customer.delivered },
              { label: "Returned/Refused", value: customer.returned },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-3 text-center border border-slate-200">
                <p className="text-xl font-black text-slate-900">{s.value}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Merchant Internal Notes</label>
            <textarea
              rows={3}
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="Add notes (e.g. requires advance delivery fee, refuses calls)..."
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
            />
            <div className="flex justify-end mt-1.5">
              <Button size="sm" onClick={handleSave}>
                Save Notes
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-3 border-t border-slate-100">
            <Button
              variant={isWatchlist ? "danger" : "secondary"}
              size="sm"
              className="flex-1 justify-center"
              onClick={handleToggle}
            >
              {isWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
            <Button
              size="sm"
              className="flex-1 justify-center"
              onClick={() => {
                router.push(`/parcels`);
              }}
            >
              View Orders
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
