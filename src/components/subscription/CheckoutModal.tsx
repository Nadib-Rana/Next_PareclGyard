// src/components/subscription/CheckoutModal.tsx
"use client";

import React from "react";
import { X } from "lucide-react";
import { Card, Button } from "@/components/ui/pg-ui";

interface Props {
  selectedCheckoutItem: { title: string; price: string; amount: number };
  onClose: () => void;
  onConfirmPayment: (e: React.FormEvent) => void;
  paymentMethod: "bkash" | "nagad" | "card";
  setPaymentMethod: (m: "bkash" | "nagad" | "card") => void;
  accountNumber: string;
  setAccountNumber: (v: string) => void;
  pin: string;
  setPin: (v: string) => void;
  processing: boolean;
}

export default function CheckoutModal({
  selectedCheckoutItem,
  onClose,
  onConfirmPayment,
  paymentMethod,
  setPaymentMethod,
  accountNumber,
  setAccountNumber,
  pin,
  setPin,
  processing,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <Card className="relative z-10 w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-slate-900 text-base">Checkout & Payment</h2>
            <p className="text-xs text-slate-500">{selectedCheckoutItem.title}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl mb-4 border border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-600">Total Payable:</span>
          <span className="text-2xl font-black text-slate-900">{selectedCheckoutItem.price}</span>
        </div>

        <form onSubmit={onConfirmPayment} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Select Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "bkash", name: "bKash", color: "bg-pink-600 text-white" },
                { id: "nagad", name: "Nagad", color: "bg-orange-600 text-white" },
                { id: "card", name: "Card / Bank", color: "bg-indigo-600 text-white" },
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id as "bkash" | "nagad" | "card")}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                    paymentMethod === m.id ? `${m.color} shadow-xs border-transparent` : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {paymentMethod === "card" ? "Card Number" : `${paymentMethod.toUpperCase()} Mobile Number`}
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={e => setAccountNumber(e.target.value)}
              placeholder={paymentMethod === "card" ? "4111 2222 3333 4444" : "017XXXXXXXX"}
              required
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg font-mono focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {paymentMethod === "card" ? "CVV / Expiry" : `${paymentMethod.toUpperCase()} PIN`}
            </label>
            <input
              type="password"
              value={pin}
              onChange={e => setPin(e.target.value)}
              placeholder="••••"
              required
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg font-mono focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
            <Button type="submit" size="sm" disabled={processing}>
              {processing ? "Processing..." : `Pay ${selectedCheckoutItem.price}`}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
