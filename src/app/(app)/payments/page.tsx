// src/app/(app)/payments/page.tsx
"use client";

import React, { useState } from "react";
import { Download, AlertCircle, Eye, AlertTriangle } from "lucide-react";
import { useData } from "@/hooks/useData";
import { Card, Button, StatusBadge, Badge } from "@/components/ui/pg-ui";
import SettlementModal from "@/components/payments/SettlementModal";
import DisputeModal from "@/components/payments/DisputeModal";
import type { Settlement } from "@/types";

export default function PaymentsPage() {
  const { settlements, raiseDispute, exportSettlementsCSV } = useData();
  const [selectedSettlement, setSelectedSettlement] = useState<Settlement | null>(null);
  const [disputeSettlement, setDisputeSettlement] = useState<Settlement | null>(null);

  const totalReceived = settlements.reduce((acc, s) => acc + s.received, 0);
  const totalExpected = settlements.reduce((acc, s) => acc + s.expected, 0);
  const totalDiscrepancy = settlements.filter(s => s.diff < 0).reduce((acc, s) => acc + Math.abs(s.diff), 0);

  return (
    <div className="p-6 space-y-6 max-w-screen-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Payments & COD Reconciliation</h1>
          <p className="text-sm text-slate-500 mt-0.5">Automated settlement tracking, courier deduction audit, and dispute resolution.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => exportSettlementsCSV()}>
            <Download size={13} /> Export Statements
          </Button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Payouts Received</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">৳{totalReceived.toLocaleString()}</p>
          <p className="text-xs text-slate-400 mt-1">Credited to your bank/MFS</p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Expected COD Revenue</p>
          <p className="text-2xl font-black text-slate-900 mt-1">৳{totalExpected.toLocaleString()}</p>
          <p className="text-xs text-slate-400 mt-1">Across all active deliveries</p>
        </Card>

        <Card className="p-5 border-red-200 bg-red-50/30">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-red-600 uppercase tracking-wide">Detected Shortages</p>
            <AlertCircle size={16} className="text-red-500" />
          </div>
          <p className="text-2xl font-black text-red-600 mt-1">৳{totalDiscrepancy.toLocaleString()}</p>
          <p className="text-xs text-red-500 mt-1">Uncredited or disputed deductions</p>
        </Card>
      </div>

      {/* Discrepancy Alert Banner */}
      {totalDiscrepancy > 0 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-800">
          <div className="flex items-center gap-2.5">
            <AlertTriangle size={18} className="text-amber-600 flex-shrink-0" />
            <div>
              <p className="font-bold">Courier Deduction Discrepancy Found</p>
              <p className="text-[11px] opacity-90">
                You have ৳{totalDiscrepancy.toLocaleString()} in unexplained COD deductions. Click Raise Dispute on flagged statements.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Settlements Table */}
      <Card>
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-sm">Settlement Cycles</h2>
          <span className="text-xs text-slate-400">Showing bi-weekly cycles</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 font-semibold">
                <th className="px-4 py-3 text-left">Statement ID</th>
                <th className="px-4 py-3 text-left">Courier</th>
                <th className="px-4 py-3 text-left">Cycle Period</th>
                <th className="px-4 py-3 text-left">Expected COD</th>
                <th className="px-4 py-3 text-left">Received Payout</th>
                <th className="px-4 py-3 text-left">Discrepancy</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {settlements.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-indigo-600">{s.id}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">{s.courier}</td>
                  <td className="px-4 py-3 text-slate-600">{s.period}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">৳{s.expected.toLocaleString()}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600">৳{s.received.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    {s.diff < 0 ? (
                      <span className="font-black text-red-600">-৳{Math.abs(s.diff).toLocaleString()}</span>
                    ) : (
                      <span className="text-slate-400 font-semibold">৳0 (Reconciled)</span>
                    )}
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedSettlement(s)}
                      >
                        <Eye size={12} /> Details
                      </Button>
                      {s.diff < 0 && s.status !== "Disputed" && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => setDisputeSettlement(s)}
                        >
                          Dispute
                        </Button>
                      )}
                      {s.status === "Disputed" && (
                        <Badge variant="danger">Dispute Open</Badge>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {selectedSettlement && (
        <SettlementModal
          settlement={selectedSettlement}
          onClose={() => setSelectedSettlement(null)}
        />
      )}

      {disputeSettlement && (
        <DisputeModal
          settlement={disputeSettlement}
          onClose={() => setDisputeSettlement(null)}
          onRaiseDispute={raiseDispute}
        />
      )}
    </div>
  );
}
