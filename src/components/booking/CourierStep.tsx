// src/components/booking/CourierStep.tsx
"use client";

import React from "react";
import { Check } from "lucide-react";
import { Card, Button, Badge } from "@/components/ui/pg-ui";
import type { Parcel } from "@/types";

export interface CourierOption {
  name: Parcel["courier"];
  deliveryFee: number;
  codFeePercent: string;
  speed: string;
  recommended?: boolean;
}

const courierOptions: CourierOption[] = [
  { name: "Steadfast", deliveryFee: 110, codFeePercent: "1%", speed: "24-48 hrs", recommended: true },
  { name: "Pathao", deliveryFee: 120, codFeePercent: "1%", speed: "Same-day / Next-day" },
  { name: "RedX", deliveryFee: 130, codFeePercent: "1.5%", speed: "48-72 hrs" },
  { name: "Paperfly", deliveryFee: 115, codFeePercent: "1%", speed: "48 hrs" },
];

interface Props {
  selectedCourier: Parcel["courier"];
  setSelectedCourier: (v: Parcel["courier"]) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function CourierStep({ selectedCourier, setSelectedCourier, onBack, onNext }: Props) {
  return (
    <Card className="p-6 space-y-5">
      <div>
        <h2 className="font-bold text-slate-900 text-base">Step 3: Courier Selection & Rate Comparison</h2>
        <p className="text-xs text-slate-500 mt-0.5">Select the best delivery partner based on speed, rate, and delivery coverage.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {courierOptions.map(c => {
          const isSelected = selectedCourier === c.name;
          return (
            <div
              key={c.name}
              onClick={() => setSelectedCourier(c.name)}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50/30 shadow-xs ring-2 ring-indigo-500/20"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 text-sm">{c.name} Courier</span>
                  {c.recommended && <Badge variant="success">Best Price</Badge>}
                </div>
                <p className="text-2xl font-black text-slate-900">৳{c.deliveryFee} <span className="text-xs font-normal text-slate-500">delivery fee</span></p>
                <div className="mt-2 space-y-1 text-xs text-slate-600">
                  <div className="flex justify-between"><span>COD Commission:</span><span className="font-semibold text-slate-800">{c.codFeePercent}</span></div>
                  <div className="flex justify-between"><span>Estimated Delivery:</span><span className="font-semibold text-slate-800">{c.speed}</span></div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className={`font-bold ${isSelected ? "text-indigo-600" : "text-slate-400"}`}>
                  {isSelected ? "Selected Partner" : "Click to select"}
                </span>
                {isSelected && <Check size={16} className="text-indigo-600" />}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between pt-3 border-t border-slate-100">
        <Button variant="secondary" onClick={onBack}>&larr; Back</Button>
        <Button onClick={onNext}>Review Booking Summary &rarr;</Button>
      </div>
    </Card>
  );
}
