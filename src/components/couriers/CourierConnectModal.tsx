// src/components/couriers/CourierConnectModal.tsx
"use client";

import React, { useState } from "react";
import { X, KeyRound } from "lucide-react";
import { Card, Button } from "@/components/ui/pg-ui";
import type { CourierAccount } from "@/types";

interface Props {
  selectedCourier: CourierAccount;
  onClose: () => void;
  onSave: (name: string, apiKey: string, secretKey?: string) => void;
}

export default function CourierConnectModal({ selectedCourier, onClose, onSave }: Props) {
  const [apiKey, setApiKey] = useState(selectedCourier.apiKey || "");
  const [secretKey, setSecretKey] = useState(selectedCourier.secretKey || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(selectedCourier.name, apiKey, secretKey);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <Card className="relative z-10 w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <KeyRound size={18} className="text-indigo-600" />
            <h2 className="font-bold text-slate-900 text-base">Configure {selectedCourier.name} API</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">API Key / Client ID</label>
            <input
              type="text"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="Paste merchant API key"
              required
              className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Secret Key (Optional)</label>
            <input
              type="password"
              value={secretKey}
              onChange={e => setSecretKey(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
            <Button type="submit" size="sm">Save & Connect</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
