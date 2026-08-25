// src/app/(app)/help/page.tsx
"use client";

import React, { useState } from "react";
import { MessageSquare, Phone, Mail, ChevronDown, ChevronUp, FileQuestion, BookOpen } from "lucide-react";
import { Card, Button } from "@/components/ui/pg-ui";
import SupportTicketModal from "@/components/help/SupportTicketModal";

const faqs = [
  { q: "How is the Customer Fraud Risk Score calculated?", a: "ParcelGuard analyzes customer delivery history across 50,000+ merchants in Bangladesh. The AI algorithm checks return frequency, mobile number activity, address changes, and known refusal patterns to generate a score from 0 (Safest) to 100 (Highest Fraud Risk)." },
  { q: "How do I connect Steadfast, Pathao, or RedX API?", a: "Navigate to Courier Accounts in the sidebar, click 'Configure API' for your desired courier, and paste your API Key / Client Secret from your courier merchant portal." },
  { q: "How does COD payment discrepancy tracking work?", a: "When you receive a payment statement from your courier, ParcelGuard automatically reconciles the delivered parcels with the paid amounts. If any shortage or unjustified deduction is found, you can 1-click raise a dispute statement." },
  { q: "Can I print 4x6 thermal barcode labels?", a: "Yes! Go to the 'Bulk Labels' menu, select your booked parcels, choose 4x6 Thermal or A4 layout, and click 'Print Labels' for direct thermal printer compatibility." },
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Help Center & Knowledge Base</h1>
        <p className="text-sm text-slate-500 mt-0.5">Find answers, setup guides, and connect directly with our support team.</p>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 text-center flex flex-col items-center justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
              <MessageSquare size={18} />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Merchant Ticket</h3>
            <p className="text-xs text-slate-500 mt-1">Direct support with ticket tracking</p>
          </div>
          <Button size="sm" className="mt-4 w-full justify-center" onClick={() => setTicketModalOpen(true)}>
            Open Ticket
          </Button>
        </Card>

        <Card className="p-5 text-center flex flex-col items-center justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Phone size={18} />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Hotline Support</h3>
            <p className="text-xs text-slate-500 mt-1">10:00 AM – 08:00 PM (Sat–Thu)</p>
          </div>
          <a
            href="tel:+8809612345678"
            className="mt-4 inline-flex items-center justify-center w-full px-3 py-1.5 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg shadow-xs"
          >
            +880 9612-345678
          </a>
        </Card>

        <Card className="p-5 text-center flex flex-col items-center justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <BookOpen size={18} />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Developer Docs</h3>
            <p className="text-xs text-slate-500 mt-1">REST API & Webhooks guide</p>
          </div>
          <Button variant="secondary" size="sm" className="mt-4 w-full justify-center">
            View Docs
          </Button>
        </Card>
      </div>

      {/* FAQ Accordion */}
      <Card className="p-6">
        <h2 className="font-bold text-slate-900 text-base mb-1 flex items-center gap-2">
          <FileQuestion size={18} className="text-indigo-600" /> Frequently Asked Questions
        </h2>
        <p className="text-xs text-slate-500 mb-5">Common queries regarding courier integrations, fraud check, and billing.</p>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full px-4 py-3 bg-slate-50/70 hover:bg-slate-50 flex items-center justify-between font-bold text-slate-900 text-left transition-colors cursor-pointer"
                >
                  <span>{f.q}</span>
                  {isOpen ? <ChevronUp size={14} className="text-indigo-600 flex-shrink-0" /> : <ChevronDown size={14} className="text-slate-400 flex-shrink-0" />}
                </button>
                {isOpen && (
                  <div className="p-4 bg-white text-slate-600 leading-relaxed border-t border-slate-100">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {ticketModalOpen && (
        <SupportTicketModal onClose={() => setTicketModalOpen(false)} />
      )}
    </div>
  );
}
