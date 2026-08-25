// src/components/fraud/RiskReportCard.tsx
"use client";

import React from "react";
import { AlertTriangle, Plus, Check, ArrowRight, Truck, ShieldCheck, Zap, Flame } from "lucide-react";
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
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-slate-900 text-base">Customer Reputation Report</h2>
            <span className="flex items-center gap-1 text-[11px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded-full border border-indigo-100">
              <Zap size={11} /> Multi-Courier Live Sync
            </span>
          </div>
          <p className="text-sm text-slate-600 font-mono mt-0.5 font-semibold">+880 {result.phone}</p>
        </div>
        <div>
          {result.risk === "High Risk" ? (
            <Badge variant="danger">HIGH RISK</Badge>
          ) : result.risk === "Moderate" ? (
            <Badge variant="warning">MODERATE RISK</Badge>
          ) : (
            <Badge variant="success">SAFE CUSTOMER</Badge>
          )}
        </div>
      </div>

      {/* Velocity Multi-Order Anomaly Banner */}
      {result.velocityStats?.isHighVelocity && (
        <div className="mx-5 mt-4 p-3.5 bg-rose-600 text-white rounded-xl shadow-xs flex items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <Flame size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide">High Velocity Anomaly: Multi-Order Trap Detected!</p>
              <p className="text-xs text-rose-100">
                Customer placed <b>{result.velocityStats.recentOrders48h} COD orders</b> across <b>{result.velocityStats.distinctMerchantsCount} different stores</b> in the last 48 hours.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold bg-white text-rose-700 px-2.5 py-1 rounded-md whitespace-nowrap">
            High Return Risk
          </span>
        </div>
      )}

      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visual Score Meter */}
        <div className="flex items-center gap-5 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
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
            <div key={s.label} className="bg-white rounded-lg p-3 border border-slate-200 text-center shadow-xs">
              <p className="text-xs text-slate-500">{s.label}</p>
              <p className={`text-lg font-bold ${s.color} mt-0.5`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Courier Live Breakdown if available */}
      {result.courierBreakdown && result.courierBreakdown.length > 0 && (
        <div className="px-5 pb-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Truck size={14} className="text-indigo-600" /> Live Multi-Courier Network Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.courierBreakdown.map((cb, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-slate-100 bg-slate-50/70">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">{cb.provider}</span>
                    <span className="text-xs font-bold text-emerald-600 font-mono">{cb.deliveryRatio}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full ${cb.deliveryRatio >= 75 ? "bg-emerald-500" : cb.deliveryRatio >= 45 ? "bg-amber-500" : "bg-red-500"}`}
                      style={{ width: `${Math.min(100, Math.max(5, cb.deliveryRatio))}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Parcels: <b className="text-slate-800">{cb.totalParcels}</b></span>
                    <span>Delivered: <b className="text-emerald-700">{cb.delivered}</b></span>
                    <span>Returned: <b className="text-red-700">{cb.cancelled}</b></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Factors */}
      <div className="px-5 pb-4">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-slate-600" /> Detected Risk Factors & Signals
        </h3>
        <div className="space-y-1.5">
          {result.factors.map((factor, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-xs">
              <AlertTriangle size={13} className={score >= 70 ? "text-red-500" : "text-amber-500"} />
              <span>{factor}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Banner */}
      <div className={`mx-5 mb-5 rounded-xl p-4 text-white shadow-sm ${score >= 70 ? "bg-red-600" : score >= 40 ? "bg-amber-600" : "bg-emerald-600"}`}>
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
