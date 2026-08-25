// src/components/admin/MerchantManageModal.tsx
"use client";

import React from "react";
import { X, Check, Ban } from "lucide-react";
import type { PlatformMerchant } from "@/types/admin";

interface Props {
  selectedMerchant: PlatformMerchant;
  onClose: () => void;
  onUpdatePlan: (id: string, plan: PlatformMerchant["plan"]) => void;
  onUpdateStatus: (id: string, status: PlatformMerchant["status"]) => void;
  setSelectedMerchant: (m: PlatformMerchant) => void;
}

export default function MerchantManageModal({
  selectedMerchant, onClose, onUpdatePlan, onUpdateStatus, setSelectedMerchant,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xs" onClick={onClose} />
      <div className="relative z-10 bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase">{selectedMerchant.id}</span>
            <h2 className="font-bold text-white text-base">{selectedMerchant.name}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-500">Store Owner:</span>
              <p className="font-bold text-slate-200 mt-0.5">{selectedMerchant.ownerName}</p>
            </div>
            <div>
              <span className="text-slate-500">Phone Number:</span>
              <p className="font-mono font-bold text-slate-200 mt-0.5">{selectedMerchant.phone}</p>
            </div>
            <div>
              <span className="text-slate-500">Email:</span>
              <p className="font-mono text-slate-300 mt-0.5">{selectedMerchant.email}</p>
            </div>
            <div>
              <span className="text-slate-500">Lifetime Parcels:</span>
              <p className="font-bold text-emerald-400 mt-0.5">{selectedMerchant.totalParcels.toLocaleString()}</p>
            </div>
          </div>

          {/* Change Plan */}
          <div>
            <label className="block text-slate-400 font-bold mb-1.5">Change Subscription Tier</label>
            <div className="grid grid-cols-3 gap-2">
              {(["Starter", "Growth", "Enterprise"] as const).map(p => (
                <button
                  key={p}
                  onClick={() => {
                    onUpdatePlan(selectedMerchant.id, p);
                    setSelectedMerchant({ ...selectedMerchant, plan: p });
                  }}
                  className={`p-2.5 rounded-xl border font-bold text-center transition-all cursor-pointer ${
                    selectedMerchant.plan === p
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-xs"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Status Actions */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-slate-400 font-bold block">Account Status</span>
              <span className="text-slate-500 text-[11px]">Current: {selectedMerchant.status}</span>
            </div>
            <div className="flex gap-2">
              {selectedMerchant.status !== "Active" && (
                <button
                  onClick={() => {
                    onUpdateStatus(selectedMerchant.id, "Active");
                    setSelectedMerchant({ ...selectedMerchant, status: "Active" });
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
                >
                  <Check size={13} /> Activate Account
                </button>
              )}
              {selectedMerchant.status !== "Suspended" && (
                <button
                  onClick={() => {
                    onUpdateStatus(selectedMerchant.id, "Suspended");
                    setSelectedMerchant({ ...selectedMerchant, status: "Suspended" });
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
                >
                  <Ban size={13} /> Suspend Account
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
