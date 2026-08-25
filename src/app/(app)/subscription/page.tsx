// src/app/(app)/subscription/page.tsx
"use client";

import React, { useState } from "react";
import { Zap, PlusCircle } from "lucide-react";
import { Card, Button } from "@/components/ui/pg-ui";
import PlanCard, { type PlanItem } from "@/components/subscription/PlanCard";
import CheckoutModal from "@/components/subscription/CheckoutModal";

const initialPlans: PlanItem[] = [
  { name: "Starter", price: "৳999", priceNum: 999, checks: 500, bookings: 200, current: false },
  { name: "Growth", price: "৳2,499", priceNum: 2499, checks: 2000, bookings: 1000, current: true },
  { name: "Enterprise", price: "৳5,999", priceNum: 5999, checks: 10000, bookings: 5000, current: false },
];

export default function SubscriptionPage() {
  const [plans, setPlans] = useState<PlanItem[]>(initialPlans);
  const [checkoutItem, setCheckoutItem] = useState<{ title: string; price: string; amount: number } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "card">("bkash");
  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState("");
  const [processing, setProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleOpenUpgrade = (planName: string, price: string, priceNum: number) => {
    setCheckoutItem({ title: `Upgrade Subscription to ${planName} Tier`, price, amount: priceNum });
  };

  const handleOpenTopup = (title: string, price: string, amount: number) => {
    setCheckoutItem({ title, price, amount });
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccessMsg(`Payment of ${checkoutItem?.price} successful via ${paymentMethod.toUpperCase()}! Your account quota has been updated.`);

      if (checkoutItem?.title.includes("Upgrade")) {
        const upgradedTier = checkoutItem.title.split("to ")[1]?.split(" Tier")[0];
        setPlans(prev => prev.map(p => ({ ...p, current: p.name === upgradedTier })));
      }

      setCheckoutItem(null);
      setAccountNumber("");
      setPin("");

      setTimeout(() => setSuccessMsg(""), 5000);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6 max-w-screen-xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Subscription & Quota Top-ups</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your monthly subscription tier, fraud check balance, and top-up credits.</p>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold">
          ✓ {successMsg}
        </div>
      )}

      {/* Quota Usage Meter */}
      <Card className="p-6 bg-gradient-to-r from-indigo-900 to-indigo-800 text-white border-0 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-indigo-500 text-white font-bold text-[11px] rounded-full uppercase">
                Active Plan: Growth
              </span>
            </div>
            <h2 className="text-2xl font-black mt-2">1,240 / 2,000 Fraud Checks Used</h2>
            <p className="text-xs text-indigo-200 mt-0.5">760 checks remaining in this billing cycle (Renews Sep 1, 2026)</p>
          </div>
          <Button
            variant="secondary"
            onClick={() => handleOpenTopup("1,000 Extra Fraud Checks", "৳799", 799)}
          >
            <Zap size={14} className="text-amber-500" /> Top-Up Checks
          </Button>
        </div>

        <div className="mt-5 h-2.5 bg-indigo-950 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-400 rounded-full" style={{ width: "62%" }} />
        </div>
      </Card>

      {/* Plan Tiers */}
      <div>
        <h2 className="font-bold text-slate-900 text-base mb-1">Select Monthly Subscription Tier</h2>
        <p className="text-xs text-slate-500 mb-4">Upgrade anytime with automated bKash / Nagad recurring payments.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map(p => (
            <PlanCard key={p.name} plan={p} onUpgrade={handleOpenUpgrade} />
          ))}
        </div>
      </div>

      {/* Add-on Top-ups */}
      <Card className="p-6">
        <h2 className="font-bold text-slate-900 text-base mb-1">One-Time Quota Add-ons</h2>
        <p className="text-xs text-slate-500 mb-5">Never run out of fraud checks during high-volume Eid or festive campaign weeks.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { checks: "500 Extra Checks", price: "৳450", num: 450 },
            { checks: "1,000 Extra Checks", price: "৳799", num: 799, popular: true },
            { checks: "5,000 Bulk Pack", price: "৳3,499", num: 3499 },
          ].map(top => (
            <div key={top.checks} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 text-center flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{top.checks}</h3>
                <p className="text-xl font-black text-slate-900 mt-1">{top.price}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Instant activation</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4 justify-center"
                onClick={() => handleOpenTopup(top.checks, top.price, top.num)}
              >
                <PlusCircle size={13} /> Buy Quota
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {checkoutItem && (
        <CheckoutModal
          selectedCheckoutItem={checkoutItem}
          onClose={() => setCheckoutItem(null)}
          onConfirmPayment={handleConfirmPayment}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
          pin={pin}
          setPin={setPin}
          processing={processing}
        />
      )}
    </div>
  );
}
