// src/components/fraud/RiskReportCard.tsx
"use client";

import React from "react";
import { AlertTriangle, Plus, Check, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FraudCheckResult } from "@/types";
import { Card, Badge, Button } from "@/components/ui/pg-ui";

interface Props {
  result: FraudCheckResult;
  isWatchlisted: boolean;
  onToggleWatchlist: (phone: string) => void;
}

export default function RiskReportCard({ result, isWatchlisted, onToggleWatchlist }: Props) {
  const router = useRouter();

  const score = result.score;
  const scoreColor = score >= 70 ? "text-red-600" : score >= 40 ? "text-amber-600" : "text-emerald-600";
  const scoreBg = score >= 70 ? "bg-red-50/50 border-red-200" : score >= 40 ? "bg-amber-50/50 border-amber-200" : "bg-emerald-50/50 border-emerald-200";

  return (
    <Card className={`border-2 ${scoreBg} transition-all`}>
      <div className="p-5 border-b border-slate-200/80 bg-white/70 flex items-start justify-between">
        <div>
          <h2 className="font-bold text-slate-900 text-base">Customer Reputation Report</h2>
          <p className="text-sm text-slate-600 font-mono mt-0.5 font-semibold">+880 {result.phone}</p>
        </div>
        <div>
          {result.risk === "High Risk" ? (
            <Badge variant="danger">🔴 HIGH RISK</Badge>
          ) : result.risk === "Moderate" ? (
            <Badge variant="warning">🟡 MODERATE RISK</Badge>
          ) : (
            <Badge variant="success">🟢 SAFE CUSTOMER</Badge>
          )}
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visual Score Meter */}
        <div className="flex items-center gap-5 bg-white p-4 rounded-xl border border-slate-200">
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-24 h-24 -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={score >= 70 ? "#ef4444" : score >= 40 ? "#f59e0b" : "#10b981"}
                strokeWidth="10"
                strokeDasharray={`${score * 2.51} 251`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-2xl font-black ${scoreColor}`}>{score}</span>
              <span className="text-[10px] text-slate-400 font-bold">/100</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Risk Assessment</p>
            <p className={`text-xl font-bold ${scoreColor} mt-0.5`}>{result.risk}</p>
            <p className="text-xs text-slate-600 mt-1">{result.recommendation}</p>
          </div>
        </div>

        {/* Stats Breakdown */}
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: "Total Orders", value: result.totalOrders, color: "text-slate-900" },
            { label: "Delivered", value: result.delivered, color: "text-emerald-600" },
            { label: "Returned / Refused", value: result.returned, color: "text-red-600" },
            { label: "Success Rate", value: result.successRate, color: result.risk === "Safe" ? "text-emerald-600" : "text-amber-600" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-lg p-3 border border-slate-200 text-center">
              <p className="text-xs text-slate-500">{s.label}</p>
              <p className={`text-lg font-bold ${s.color} mt-0.5`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Factors */}
      <div className="px-5 pb-4">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Detected Risk Factors & Signals</h3>
        <div className="space-y-1.5">
          {result.factors.map((factor, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2">
              <AlertTriangle size={13} className={score >= 70 ? "text-red-500" : "text-amber-500"} />
              <span>{factor}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Banner */}
      <div className={`mx-5 mb-5 rounded-xl p-4 text-white ${score >= 70 ? "bg-red-600" : score >= 40 ? "bg-amber-600" : "bg-emerald-600"}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase font-bold tracking-wider opacity-85">Recommended Strategy</p>
            <p className="font-semibold text-sm mt-0.5">{result.recommendation}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push(`/book-parcel?phone=${result.phone}`)}
            >
              Book Parcel <ArrowRight size={12} />
            </Button>
            <button
              onClick={() => onToggleWatchlist(result.phone)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1 cursor-pointer ${
                isWatchlisted
                  ? "bg-white text-red-600 border-white"
                  : "bg-white/20 hover:bg-white/30 text-white border-white/30"
              }`}
            >
              {isWatchlisted ? <Check size={12} /> : <Plus size={12} />}
              {isWatchlisted ? "In Watchlist" : "Add to Watchlist"}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
