// src/components/booking/CustomerStep.tsx
"use client";

import React from "react";
import { UserCheck, AlertTriangle } from "lucide-react";
import { Card, Button, RiskBadge } from "@/components/ui/pg-ui";
import type { FraudCheckResult } from "@/types";

interface Props {
  customerName: string;
  setCustomerName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
  district: string;
  setDistrict: (v: string) => void;
  districts: string[];
  fraudResult: FraudCheckResult | null;
  checkingRisk: boolean;
  onNext: () => void;
}

export default function CustomerStep({
  customerName, setCustomerName,
  phone, setPhone,
  address, setAddress,
  district, setDistrict,
  districts,
  fraudResult,
  checkingRisk,
  onNext,
}: Props) {
  return (
    <Card className="p-6 space-y-5">
      <div>
        <h2 className="font-bold text-slate-900 text-base">Step 1: Recipient & Customer Details</h2>
        <p className="text-xs text-slate-500 mt-0.5">Enter delivery information. Phone numbers are automatically risk-scored in real-time.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Customer Full Name *</label>
          <input
            type="text"
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
            placeholder="e.g. Rahim Uddin"
            required
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Recipient Phone Number (11 Digits) *</label>
          <div className="relative">
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="01711234567"
              required
              className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            {checkingRisk && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-indigo-600 font-bold">
                Checking Risk...
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Instant Risk Feedback if Scored */}
      {fraudResult && (
        <div className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
          fraudResult.risk === "High Risk" ? "bg-red-50 border-red-200 text-red-800" :
          fraudResult.risk === "Moderate" ? "bg-amber-50 border-amber-200 text-amber-800" :
          "bg-emerald-50 border-emerald-200 text-emerald-800"
        }`}>
          <div className="flex items-center gap-2.5">
            {fraudResult.risk === "High Risk" ? <AlertTriangle size={16} className="text-red-600" /> : <UserCheck size={16} className="text-emerald-600" />}
            <div>
              <p className="font-bold">Fraud Evaluation: {fraudResult.risk} (Score: {fraudResult.score}/100)</p>
              <p className="text-[11px] opacity-90">{fraudResult.recommendation}</p>
            </div>
          </div>
          <RiskBadge level={fraudResult.risk} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="sm:col-span-2">
          <label className="block font-semibold text-slate-700 mb-1">Full Delivery Address *</label>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="House #, Road #, Area / Thana"
            required
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">District *</label>
          <select
            value={district}
            onChange={e => setDistrict(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
          >
            {districts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-3 border-t border-slate-100">
        <Button onClick={onNext} disabled={!customerName || !phone || !address}>
          Continue to Parcel Details &rarr;
        </Button>
      </div>
    </Card>
  );
}
