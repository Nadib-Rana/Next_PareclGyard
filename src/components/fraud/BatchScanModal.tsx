// src/components/fraud/BatchScanModal.tsx
"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import type { FraudCheckResult } from "@/types";
import { Card, Button, Badge } from "@/components/ui/pg-ui";

interface Props {
  onClose: () => void;
  onScan: (phone: string) => FraudCheckResult;
}

export default function BatchScanModal({ onClose, onScan }: Props) {
  const [csvText, setCsvText] = useState("");
  const [batchResults, setBatchResults] = useState<FraudCheckResult[]>([]);

  const handleBatchScan = () => {
    if (!csvText.trim()) return;
    const lines = csvText.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    const results = lines.slice(0, 10).map(p => onScan(p));
    setBatchResults(results);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <Card className="relative z-10 w-full max-w-xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-900">Batch Phone Risk Scanner</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X size={18} />
          </button>
        </div>
        <p className="text-xs text-slate-500 mb-3">Paste a list of Bangladeshi phone numbers (separated by commas or newlines):</p>
        <textarea
          rows={4}
          value={csvText}
          onChange={e => setCsvText(e.target.value)}
          placeholder={"01711234567\n01812345678\n01913456789"}
          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
        />
        <div className="flex justify-end gap-2 mt-3">
          <Button variant="secondary" size="sm" onClick={onClose}>Close</Button>
          <Button size="sm" onClick={handleBatchScan}>Scan Numbers</Button>
        </div>

        {batchResults.length > 0 && (
          <div className="mt-4 border-t border-slate-100 pt-3">
            <h3 className="text-xs font-bold text-slate-700 mb-2">Scan Results:</h3>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {batchResults.map((b, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-xs">
                  <span className="font-mono">{b.phone}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{b.score}/100</span>
                    <Badge variant={b.risk === "High Risk" ? "danger" : b.risk === "Moderate" ? "warning" : "success"}>
                      {b.risk}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
