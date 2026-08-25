// src/components/booking/BookingStepsHeader.tsx
"use client";

import React from "react";
import { User, Package, Truck, CheckCircle2 } from "lucide-react";

export const steps = [
  { id: 1, label: "Customer Details", icon: User },
  { id: 2, label: "Parcel & COD", icon: Package },
  { id: 3, label: "Courier Selection", icon: Truck },
  { id: 4, label: "Review & Dispatch", icon: CheckCircle2 },
];

interface Props {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export default function BookingStepsHeader({ currentStep, onStepClick }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {steps.map(s => {
        const Icon = s.icon;
        const isActive = currentStep === s.id;
        const isDone = currentStep > s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onStepClick?.(s.id)}
            disabled={!isDone && !isActive}
            className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
              isActive
                ? "bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm"
                : isDone
                ? "bg-white border-emerald-300 text-emerald-700 cursor-pointer"
                : "bg-white border-slate-200 text-slate-400 opacity-70"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : isDone
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {isDone ? "✓" : <Icon size={14} />}
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Step 0{s.id}</p>
              <p className="text-xs font-bold text-slate-900 leading-tight">{s.label}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
