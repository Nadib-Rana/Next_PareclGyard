// src/components/help/SupportTicketModal.tsx
"use client";

import React, { useState } from "react";
import { X, Send, Check } from "lucide-react";
import { Card, Button } from "@/components/ui/pg-ui";

interface Props {
  onClose: () => void;
}

export default function SupportTicketModal({ onClose }: Props) {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Courier Integration");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <Card className="relative z-10 w-full max-w-lg p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <h2 className="font-bold text-slate-900 text-base">Open Merchant Support Ticket</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X size={16} />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check size={24} />
            </div>
            <p className="font-bold text-slate-900 text-sm">Ticket Submitted Successfully!</p>
            <p className="text-xs text-slate-500">Ticket ID: #PG-TK-{Math.floor(1000 + Math.random() * 9000)}. Our support engineer will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Issue Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
              >
                <option value="Courier Integration">Courier API Integration (Steadfast/Pathao/RedX)</option>
                <option value="Fraud Check Question">Fraud Check & Score Dispute</option>
                <option value="COD Settlement">COD Settlement & Discrepancy</option>
                <option value="Billing & Plans">Billing & Subscription</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Brief summary of your issue"
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Description / Error Details</label>
              <textarea
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Describe what happened, error codes, or affected parcel IDs..."
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
              <Button type="submit" size="sm"><Send size={13} /> Submit Ticket</Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
