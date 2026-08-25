// src/app/(app)/fraud-checker/page.tsx
"use client";

import React, { useState } from "react";
import { Shield, Search, Clock, FileText } from "lucide-react";
import { useData, type FraudCheckResult } from "@/context/DataContext";
import { Card, Button } from "@/components/ui/pg-ui";
import RiskReportCard from "@/components/fraud/RiskReportCard";
import BatchScanModal from "@/components/fraud/BatchScanModal";

export default function FraudCheckerPage() {
  const { checkPhoneRisk, fraudChecks, toggleWatchlist, customers } = useData();
  const [phone, setPhone] = useState("");
  const [currentResult, setCurrentResult] = useState<FraudCheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCsvModal, setShowCsvModal] = useState(false);

  const handleCheck = async () => {
    let clean = phone.trim().replace(/\D/g, "");
    if (clean.startsWith("880") && clean.length === 13) clean = "0" + clean.slice(3);
    else if (!clean.startsWith("0") && clean.length > 0) clean = "0" + clean;

    if (!clean || clean.length < 10) return;
    setLoading(true);
    try {
      const res = await checkPhoneRisk(clean);
      setCurrentResult(res);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRecent = (check: FraudCheckResult) => {
    setPhone(check.phone);
    setCurrentResult(check);
  };

  const isCustomerWatchlisted = currentResult
    ? customers.some(
        c =>
          c.phone.replace(/\D/g, "") === currentResult.phone.replace(/\D/g, "") &&
          c.isWatchlist,
      )
    : false;

  return (
    <div className="p-6 space-y-6 max-w-screen-xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Fraud Checker & Risk Engine</h1>
        <p className="text-sm text-slate-500 mt-0.5">Check customer delivery history and risk score across all major Bangladeshi couriers.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-5">
          {/* Search Card */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-xs">
                <Shield size={18} className="text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">Customer Risk Intelligence</h2>
                <p className="text-xs text-slate-500">Enter a Bangladeshi mobile number (013-019) to inspect delivery reputation.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-sm font-medium text-slate-700 flex-shrink-0">
                BD +880
              </div>
              <input
                type="tel"
                maxLength={11}
                value={phone}
                onChange={e => {
                  let v = e.target.value.replace(/\D/g, "");
                  if (v.startsWith("880") && v.length >= 13) v = "0" + v.slice(3);
                  if (v.length > 11) v = v.slice(0, 11);
                  setPhone(v);
                }}
                placeholder="Enter mobile number (e.g. 01567823568)"
                className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono"
                onKeyDown={e => e.key === "Enter" && void handleCheck()}
              />
              <Button onClick={() => void handleCheck()} disabled={loading || !phone.trim()}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Checking...
                  </span>
                ) : (
                  <>
                    <Search size={14} /> Check Risk
                  </>
                )}
              </Button>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <Button variant="secondary" size="sm" onClick={() => setShowCsvModal(true)}>
                <FileText size={13} /> Batch Scan from CSV / Text
              </Button>
              <span className="text-xs text-slate-400">Scan multiple numbers at once</span>
            </div>
          </Card>

          {/* Dynamic Result Card */}
          {currentResult && (
            <RiskReportCard
              result={currentResult}
              isWatchlisted={isCustomerWatchlisted}
              onToggleWatchlist={toggleWatchlist}
            />
          )}
        </div>

        {/* Right Sidebar: Recent Checks */}
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Clock size={14} className="text-slate-400" /> Recent Checks
            </h3>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {fraudChecks.map((c, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectRecent(c)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors text-left border border-slate-100 cursor-pointer"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900">{c.name || "Customer"}</p>
                    <p className="text-xs font-mono text-slate-500">{c.phone}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{c.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-base font-black ${c.score >= 70 ? "text-red-600" : c.score >= 40 ? "text-amber-600" : "text-emerald-600"}`}>
                      {c.score}
                    </span>
                    <p className="text-[10px] text-slate-400">score</p>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Batch Scan Modal */}
      {showCsvModal && (
        <BatchScanModal
          onClose={() => setShowCsvModal(false)}
          onScan={checkPhoneRisk}
        />
      )}
    </div>
  );
}

