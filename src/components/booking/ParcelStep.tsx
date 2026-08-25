// src/components/booking/ParcelStep.tsx
"use client";

import React from "react";
import { Card, Button } from "@/components/ui/pg-ui";

interface Props {
  productName: string;
  setProductName: (v: string) => void;
  weight: string;
  setWeight: (v: string) => void;
  codAmount: string;
  setCodAmount: (v: string) => void;
  advanceFee: string;
  setAdvanceFee: (v: string) => void;
  specialNotes: string;
  setSpecialNotes: (v: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function ParcelStep({
  productName, setProductName,
  weight, setWeight,
  codAmount, setCodAmount,
  advanceFee, setAdvanceFee,
  specialNotes, setSpecialNotes,
  onBack, onNext,
}: Props) {
  return (
    <Card className="p-6 space-y-5">
      <div>
        <h2 className="font-bold text-slate-900 text-base">Step 2: Parcel Dimensions & COD Amount</h2>
        <p className="text-xs text-slate-500 mt-0.5">Specify package payload and collection amount for courier cash collection.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Product Name / Item Description *</label>
          <input
            type="text"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            placeholder="e.g. Cotton Panjabi / Wireless Headphone"
            required
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Weight</label>
          <select
            value={weight}
            onChange={e => setWeight(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
          >
            <option value="500g">Up to 500g (Standard)</option>
            <option value="1kg">1.0 kg</option>
            <option value="2kg">2.0 kg</option>
            <option value="3kg">3.0 kg</option>
            <option value="5kg">5.0 kg+</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Cash on Delivery (COD) Amount (৳) *</label>
          <input
            type="number"
            value={codAmount}
            onChange={e => setCodAmount(e.target.value)}
            placeholder="1500"
            required
            className="w-full px-3 py-2 border border-slate-200 rounded-lg font-bold text-slate-900 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Advance Delivery Paid by Customer (৳)</label>
          <input
            type="number"
            value={advanceFee}
            onChange={e => setAdvanceFee(e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium focus:outline-none"
          />
        </div>
      </div>

      <div className="text-xs">
        <label className="block font-semibold text-slate-700 mb-1">Special Rider Instructions (Optional)</label>
        <textarea
          rows={2}
          value={specialNotes}
          onChange={e => setSpecialNotes(e.target.value)}
          placeholder="e.g. Call before delivery, handle with care, deliver after 3 PM..."
          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none resize-none"
        />
      </div>

      <div className="flex justify-between pt-3 border-t border-slate-100">
        <Button variant="secondary" onClick={onBack}>&larr; Back</Button>
        <Button onClick={onNext} disabled={!productName || !codAmount}>
          Choose Courier Partner &rarr;
        </Button>
      </div>
    </Card>
  );
}
