// src/components/settings/ApiWebhooksTab.tsx
"use client";

import React, { useState } from "react";
import { Copy, Check, KeyRound } from "lucide-react";
import { Card, Button } from "@/components/ui/pg-ui";
import type { UserSettings } from "@/types";

interface Props {
  form: UserSettings;
  setForm: (v: UserSettings) => void;
  onSave: (e: React.FormEvent) => void;
}

export default function ApiWebhooksTab({ form, setForm, onSave }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(form.apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-1">
        <KeyRound size={18} className="text-indigo-600" />
        <h2 className="font-bold text-slate-900 text-base">Developer API & Webhooks</h2>
      </div>
      <p className="text-xs text-slate-500 mb-5">Integrate ParcelGuard fraud checking directly into your custom Shopify, WooCommerce, or Laravel checkout.</p>

      <form onSubmit={onSave} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Secret Merchant API Key</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={form.apiKey}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-700"
            />
            <Button type="button" variant="secondary" size="sm" onClick={handleCopy}>
              {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Webhook Endpoint URL</label>
          <input
            type="url"
            value={form.webhookUrl}
            onChange={e => setForm({ ...form, webhookUrl: e.target.value })}
            placeholder="https://yourstore.com/api/parcelguard-webhook"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono focus:outline-none"
          />
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-100">
          <Button type="submit" size="sm">Update API Configuration</Button>
        </div>
      </form>
    </Card>
  );
}
