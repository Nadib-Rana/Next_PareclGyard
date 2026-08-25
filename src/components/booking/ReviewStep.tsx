// src/components/booking/ReviewStep.tsx
"use client";

import React from "react";
import { Check, ShieldCheck } from "lucide-react";
import { Card, Button, Badge } from "@/components/ui/pg-ui";
import type { Parcel, FraudCheckResult } from "@/types";

interface Props {
  customerName: string;
  phone: string;
  address: string;
  district: string;
  productName: string;
  weight: string;
  codAmount: string;
  advanceFee: string;
  selectedCourier: Parcel["courier"];
  fraudResult: FraudCheckResult | null;
  loading: boolean;
  onBack: () => void;
  onConfirm: () => void;
}

export default function ReviewStep({
  customerName, phone, address, district,
  productName, weight, codAmount, advanceFee,
  selectedCourier, fraudResult, loading,
  onBack, onConfirm,
}: Props) {
  const deliveryFee = selectedCourier === "Steadfast" ? 110 : selectedCourier === "Pathao" ? 120 : selectedCourier === "RedX" ? 130 : 115;

  return (
    <Card className="p-6 space-y-5">
      <div>
        <h2 className="font-bold text-slate-900 text-base">Step 4: Review & Finalize Booking</h2>
        <p className="text-xs text-slate-500 mt-0.5">Confirm order details. On booking, this parcel will be sent to the courier partner API.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {/* Customer Breakdown */}
        <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100">
          <p className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">Customer & Destination</p>
          <div className="flex justify-between"><span className="text-slate-500">Name:</span><span className="font-semibold text-slate-900">{customerName}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Phone:</span><span className="font-mono font-semibold text-slate-900">{phone}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Address:</span><span className="font-medium text-slate-800 text-right max-w-[180px] truncate">{address}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">District:</span><span className="font-bold text-slate-900">{district}</span></div>
          {fraudResult && (
            <div className="flex justify-between pt-1 border-t border-slate-200">
              <span className="text-slate-500">Risk Check:</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1"><ShieldCheck size={13} /> {fraudResult.risk}</span>
            </div>
          )}
        </div>

        {/* Parcel Breakdown */}
        <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100">
          <p className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">Shipment & Financials</p>
          <div className="flex justify-between"><span className="text-slate-500">Product:</span><span className="font-semibold text-slate-900">{productName}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Weight:</span><span className="font-medium text-slate-800">{weight}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Courier:</span><Badge variant="indigo">{selectedCourier}</Badge></div>
          <div className="flex justify-between"><span className="text-slate-500">Delivery Fee:</span><span className="font-medium text-slate-900">৳{deliveryFee}</span></div>
          <div className="flex justify-between pt-1 border-t border-slate-200">
            <span className="text-slate-700 font-bold">Total COD Collectible:</span>
            <span className="font-black text-slate-900 text-sm">৳{Number(codAmount).toLocaleString()}</span>
          </div>
          {Number(advanceFee) > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>Advance Paid:</span>
              <span className="font-bold">৳{advanceFee}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-3 border-t border-slate-100">
        <Button variant="secondary" onClick={onBack}>&larr; Edit Details</Button>
        <Button onClick={onConfirm} disabled={loading}>
          {loading ? "Dispatching to Courier..." : <><Check size={14} /> Confirm & Dispatch Order</>}
        </Button>
      </div>
    </Card>
  );
}
