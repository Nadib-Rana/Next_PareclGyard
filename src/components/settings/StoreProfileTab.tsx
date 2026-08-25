// src/components/settings/StoreProfileTab.tsx
"use client";

import React from "react";
import { Card, Button } from "@/components/ui/pg-ui";
import type { UserSettings } from "@/types";

interface Props {
  form: UserSettings;
  setForm: (v: UserSettings) => void;
  onSave: (e: React.FormEvent) => void;
  savedMsg: string;
}

export default function StoreProfileTab({ form, setForm, onSave, savedMsg }: Props) {
  return (
    <Card className="p-6">
      <h2 className="font-bold text-slate-900 text-base mb-1">Business & Merchant Profile</h2>
      <p className="text-xs text-slate-500 mb-5">These details will appear on printed shipping labels and customer receipts.</p>

      {savedMsg && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl">
          ✓ {savedMsg}
        </div>
      )}

      <form onSubmit={onSave} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Merchant / Store Name</label>
            <input
              type="text"
              value={form.merchantName}
              onChange={e => setForm({ ...form, merchantName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Business Type</label>
            <input
              type="text"
              value={form.businessType}
              onChange={e => setForm({ ...form, businessType: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Store Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Pickup / Return Warehouse Address</label>
          <input
            type="text"
            value={form.businessAddress}
            onChange={e => setForm({ ...form, businessAddress: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
          />
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-100">
          <Button type="submit" size="sm">Save Merchant Profile</Button>
        </div>
      </form>
    </Card>
  );
}
