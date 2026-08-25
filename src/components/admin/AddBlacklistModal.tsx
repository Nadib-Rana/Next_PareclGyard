// src/components/admin/AddBlacklistModal.tsx
"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import type { GlobalBlacklistEntry } from "@/types/admin";

interface Props {
  onClose: () => void;
  onAdd: (entry: Omit<GlobalBlacklistEntry, "id" | "addedDate" | "addedBy">) => void;
}

export default function AddBlacklistModal({ onClose, onAdd }: Props) {
  const [phone, setPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [riskScore, setRiskScore] = useState(90);
  const [reportedCount, setReportedCount] = useState(5);
  const [totalReturns, setTotalReturns] = useState(12);
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<GlobalBlacklistEntry["status"]>("Confirmed Fraud");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      phone,
      customerName: customerName || "Customer",
      riskScore: Number(riskScore) || 85,
      reportedByCount: Number(reportedCount) || 1,
      totalReturns: Number(totalReturns) || 5,
      reason,
      status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xs" onClick={onClose} />
      <div className="relative z-10 bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <h2 className="font-bold text-white text-base">Add Phone to Global Blacklist</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-400 font-bold mb-1">Phone Number (11 Digits)</label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-bold mb-1">Customer Name (Optional)</label>
            <input
              type="text"
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              placeholder="e.g. Rahim Uddin"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-bold mb-1">Risk Score (0-100)</label>
              <input
                type="number"
                value={riskScore}
                onChange={e => setRiskScore(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-bold mb-1">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as GlobalBlacklistEntry["status"])}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
              >
                <option value="Confirmed Fraud">Confirmed Fraud</option>
                <option value="Suspicious">Suspicious</option>
                <option value="Under Review">Under Review</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-bold mb-1">Reason / Fraud Signal</label>
            <textarea
              rows={3}
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Detailed explanation of fraudulent behavior..."
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg font-semibold cursor-pointer">
              Cancel
            </button>
            <button type="submit" className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg cursor-pointer">
              Confirm Blacklist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
