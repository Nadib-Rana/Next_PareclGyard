// src/components/payments/DisputeModal.tsx
"use client";

import React, { useState } from "react";
import { X, Check } from "lucide-react";
import type { Settlement } from "@/types";
import { Card, Button } from "@/components/ui/pg-ui";

interface Props {
  settlement: Settlement;
  onClose: () => void;
  onRaiseDispute: (settlementId: string, reason: string, amount?: number) => void;
}

export default function DisputeModal({ settlement, onClose, onRaiseDispute }: Props) {
  const [disputeAmount, setDisputeAmount] = useState(String(Math.abs(settlement.diff) || "2500"));
  const [disputeReason, setDisputeReason] = useState("");
  const [disputeSent, setDisputeSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRaiseDispute(settlement.id, disputeReason, disputeAmount ? Number(disputeAmount) : undefined);
    setDisputeSent(true);
    setTimeout(() => {
      setDisputeSent(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <Card className="relative z-10 w-full max-w-md p-6 shadow-2xl">
        {disputeSent ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check size={24} className="text-emerald-500" />
            </div>
            <h3 className="font-bold text-slate-900">Dispute Ticket Submitted!</h3>
            <p className="text-xs text-slate-500 mt-1">
              Dispute ticket #DSP-{Math.floor(Math.random() * 9000 + 1000)} sent to {settlement.courier} finance desk.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-slate-900">Raise Courier Payment Dispute</h2>
                <p className="text-xs text-slate-500 mt-0.5">{settlement.courier} · {settlement.id}</p>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Disputed Shortage Amount (৳)</label>
                <input
                  type="number"
                  value={disputeAmount}
                  onChange={e => setDisputeAmount(e.target.value)}
                  placeholder="2500"
                  required
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg font-bold text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Reason for Dispute</label>
                <textarea
                  rows={3}
                  value={disputeReason}
                  onChange={e => setDisputeReason(e.target.value)}
                  placeholder="e.g. COD deduction for parcels PG-102846 was uncredited despite verified delivery..."
                  required
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none resize-none"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-lg text-xs text-amber-800">
                ParcelGuard will automatically email this dispute statement to {settlement.courier} merchant support with order IDs.
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="danger" size="sm">
                  Submit Dispute
                </Button>
              </div>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}
