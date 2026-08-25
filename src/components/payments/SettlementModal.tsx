// src/components/payments/SettlementModal.tsx
"use client";

import React from "react";
import { X } from "lucide-react";
import type { Settlement } from "@/types";
import { Card, Button, Badge } from "@/components/ui/pg-ui";

interface Props {
  settlement: Settlement;
  onClose: () => void;
}

export default function SettlementModal({ settlement, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <Card className="relative z-10 w-full max-w-xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-600">{settlement.id}</span>
            <h2 className="font-bold text-slate-900 text-base">{settlement.courier} Settlement Breakdown</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-50 p-3 rounded-xl">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Expected COD</p>
              <p className="text-base font-black text-slate-900">৳{settlement.expected.toLocaleString()}</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-xl">
              <p className="text-[10px] text-emerald-700 font-bold uppercase">Paid Payout</p>
              <p className="text-base font-black text-emerald-700">৳{settlement.received.toLocaleString()}</p>
            </div>
            <div className="bg-red-50 p-3 rounded-xl">
              <p className="text-[10px] text-red-700 font-bold uppercase">Shortage</p>
              <p className="text-base font-black text-red-700">৳{Math.abs(settlement.diff).toLocaleString()}</p>
            </div>
          </div>

          {settlement.disputeReason && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs">
              <p className="font-bold text-red-800">Active Dispute Note:</p>
              <p className="text-red-700 mt-0.5">{settlement.disputeReason}</p>
            </div>
          )}

          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            Included Orders ({settlement.parcelsCount} Parcels)
          </h3>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {[
              { id: "PG-102845", cust: "Rahim Uddin", amount: "৳1,250", status: "Delivered & Reconciled" },
              { id: "PG-102846", cust: "Karim Hasan", amount: "৳2,500", status: "Deduction Disputed" },
              { id: "PG-102848", cust: "Farhan Hossain", amount: "৳3,200", status: "Delivered & Reconciled" },
              { id: "PG-102851", cust: "Tania Begum", amount: "৳960", status: "Delivered & Reconciled" },
            ].map(r => (
              <div key={r.id} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 text-xs border border-slate-100">
                <div>
                  <span className="font-mono font-bold text-indigo-600 mr-2">{r.id}</span>
                  <span className="text-slate-800 font-medium">{r.cust}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{r.amount}</span>
                  <Badge variant={r.status.includes("Disputed") ? "danger" : "success"}>{r.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-5 pt-3 border-t border-slate-100">
          <Button variant="secondary" size="sm" onClick={onClose}>Close</Button>
        </div>
      </Card>
    </div>
  );
}
