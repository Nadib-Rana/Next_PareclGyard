// src/components/subscription/PlanCard.tsx
"use client";

import React from "react";
import { Check } from "lucide-react";
import { Button, Badge } from "@/components/ui/pg-ui";

export interface PlanItem {
  name: string;
  price: string;
  priceNum: number;
  checks: number;
  bookings: number;
  current: boolean;
}

interface Props {
  plan: PlanItem;
  onUpgrade: (planName: string, price: string, priceNum: number) => void;
}

export default function PlanCard({ plan, onUpgrade }: Props) {
  return (
    <div
      className={`rounded-2xl border-2 p-6 transition-all flex flex-col justify-between ${
        plan.current ? "border-indigo-600 bg-indigo-50/20 shadow-md ring-2 ring-indigo-500/20" : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <div>
        {plan.current ? <Badge variant="indigo">Current Active Plan</Badge> : <Badge variant="gray">Available Tier</Badge>}
        <h3 className="font-bold text-slate-900 text-lg mt-2">{plan.name}</h3>
        <p className="text-2xl font-black text-slate-900 mt-1">
          {plan.price} <span className="text-xs font-normal text-slate-500">/ month</span>
        </p>
        <div className="mt-5 space-y-2.5">
          {[
            `${plan.checks.toLocaleString()} Fraud Checks`,
            `${plan.bookings.toLocaleString()} Parcel Bookings`,
            "All Courier Integrations",
            "Real-time Tracking",
            plan.bookings >= 1000 ? "Priority Support" : null,
            plan.bookings >= 5000 ? "Dedicated Account Manager" : null,
          ].filter(Boolean).map(f => (
            <div key={f!} className="flex items-center gap-2 text-xs text-slate-700">
              <Check size={13} className="text-emerald-500 flex-shrink-0" /> {f}
            </div>
          ))}
        </div>
      </div>

      <Button
        variant={plan.current ? "secondary" : "primary"}
        className="w-full justify-center mt-6"
        disabled={plan.current}
        onClick={() => onUpgrade(plan.name, plan.price, plan.priceNum)}
      >
        {plan.current ? "Active Plan" : `Upgrade to ${plan.name}`}
      </Button>
    </div>
  );
}
