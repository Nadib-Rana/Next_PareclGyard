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

const ALL_COURIERS = [
  { name: "Steadfast", logo: "SC", color: "bg-emerald-600" },
  { name: "Pathao", logo: "PC", color: "bg-indigo-600" },
  { name: "RedX", logo: "RX", color: "bg-red-600" },
  { name: "Paperfly", logo: "PF", color: "bg-amber-600" },
  { name: "ParcelDex", logo: "PD", color: "bg-blue-600" },
  { name: "CarryBee", logo: "CB", color: "bg-purple-600" },
];

export default function RiskReportCard({ result, isWatchlisted, onToggleWatchlist }: Props) {
  const router = useRouter();

  const score = result.score;
  const scoreColor = score >= 70 ? "text-red-600" : score >= 40 ? "text-amber-600" : "text-emerald-600";
  const scoreBg = score >= 70 ? "bg-red-50/50 border-red-200" : score >= 40 ? "bg-amber-50/50 border-amber-200" : "bg-emerald-50/50 border-emerald-200";

  // Map courier stats
  const courierMap = new Map<string, { totalParcels: number; delivered: number; cancelled: number; deliveryRatio: number }>();
  if (result.courierBreakdown) {
    result.courierBreakdown.forEach((cb) => {
      courierMap.set(cb.provider.toLowerCase(), cb);
    });
  }

  const cleanPhoneDisplay = result.phone.startsWith("0") ? result.phone : `0${result.phone}`;

  return (
    <Card className={`border-2 ${scoreBg} transition-all overflow-hidden`}>
      {/* Header */}
      <div className="p-5 border-b border-slate-200/80 bg-white flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-slate-900 text-base">Customer Reputation Report</h2>
            <span className="flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
              <Zap size={11} /> 6-Courier Live Network
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-0.5 font-semibold">+88 {cleanPhoneDisplay}</p>
        </div>
        <div>
          {result.risk === "High Risk" ? (
            <Badge variant="danger">HIGH RISK</Badge>
          ) : result.risk === "Moderate" ? (
            <Badge variant="warning">MODERATE RISK</Badge>
          ) : (
            <Badge variant="success">ঝুঁকি মুক্ত (SAFE)</Badge>
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

      {/* Top 4 Summary Metric Cards */}
      <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/50">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shadow-xs">
          <p className="text-xs font-medium text-slate-500">মোট অর্ডার</p>
          <p className="text-xl font-black text-slate-900 mt-0.5">{result.totalOrders}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shadow-xs">
          <p className="text-xs font-medium text-slate-500">সফল ডেলিভারি</p>
          <p className="text-xl font-black text-emerald-600 mt-0.5">{result.delivered}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shadow-xs">
          <p className="text-xs font-medium text-slate-500">বাতিল / রিটার্ন</p>
          <p className="text-xl font-black text-rose-600 mt-0.5">{result.returned}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shadow-xs">
          <p className="text-xs font-medium text-slate-500">গড় ডেলিভারি হার</p>
          <p className={`text-xl font-black ${result.risk === "High Risk" ? "text-rose-600" : "text-emerald-600"} mt-0.5`}>
            {result.successRate}
          </p>
        </div>
      </div>

      {/* 6-Courier Live Network Table (EliteMart Style) */}
      <div className="p-5">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Truck size={14} className="text-indigo-600" /> ৬টি কুরিয়ার নেটওয়ার্ক ডেলিভারি পরিসংখ্যান (Courier Matrix)
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">রিয়েল-টাইম কুরিয়ার ডেটা</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">কুরিয়ার (Courier)</th>
                  <th className="py-2.5 px-4 text-center">অর্ডার</th>
                  <th className="py-2.5 px-4 text-center">ডেলিভারি</th>
                  <th className="py-2.5 px-4 text-center">বাতিল</th>
                  <th className="py-2.5 px-4 text-right">ডেলিভারি হার</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ALL_COURIERS.map((c) => {
                  const stat = courierMap.get(c.name.toLowerCase()) || { totalParcels: 0, delivered: 0, cancelled: 0, deliveryRatio: 0 };
                  const hasData = stat.totalParcels > 0;

                  return (
                    <tr key={c.name} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-md ${c.color} text-white flex items-center justify-center text-[10px] font-bold`}>
                          {c.logo}
                        </span>
                        {c.name}
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-slate-800">
                        {stat.totalParcels}
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-emerald-600">
                        {stat.delivered}
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-rose-600">
                        {stat.cancelled}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {hasData ? (
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden hidden sm:block">
                              <div
                                className={`h-full ${stat.deliveryRatio >= 80 ? "bg-emerald-500" : stat.deliveryRatio >= 50 ? "bg-amber-500" : "bg-rose-500"}`}
                                style={{ width: `${Math.max(5, stat.deliveryRatio)}%` }}
                              />
                            </div>
                            <span className={`font-bold ${stat.deliveryRatio >= 80 ? "text-emerald-600" : "text-rose-600"}`}>
                              {stat.deliveryRatio}%
                            </span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-medium">০% (নতুন গ্রাহক)</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Factors */}
      <div className="px-5 pb-4">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-slate-600" /> সিস্টেম মূল্যায়ন ও অ্যালার্ট ফ্যাক্টরস
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
            <p className="text-xs uppercase font-bold tracking-wider opacity-85">রেকমেন্ডেড ডিসপ্যাচ স্ট্র্যাটেজি</p>
            <p className="font-semibold text-sm mt-0.5">{result.recommendation}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push(`/book-parcel?phone=${cleanPhoneDisplay}`)}
            >
              Book Parcel <ArrowRight size={12} />
            </Button>
            <button
              onClick={() => onToggleWatchlist(cleanPhoneDisplay)}
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
