// src/app/(app)/bulk-labels/page.tsx
"use client";

import React, { useState } from "react";
import { Printer, Download, LayoutGrid, Sparkles, CheckCheck } from "lucide-react";
import { useData } from "@/hooks/useData";
import { Button } from "@/components/ui/pg-ui";
import ShippingLabel from "@/components/labels/ShippingLabel";
import BulkLabelsSelector from "@/components/labels/BulkLabelsSelector";

export default function BulkLabelsPage() {
  const { parcels, settings } = useData();
  const [selectedIds, setSelectedIds] = useState<string[]>(parcels.slice(0, 4).map(p => p.id));
  const [format, setFormat] = useState<"4x6" | "a4">("4x6");

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const selectAll = () => setSelectedIds(parcels.map(p => p.id));
  const clearAll = () => setSelectedIds([]);

  const selectedParcels = parcels.filter(p => selectedIds.includes(p.id));

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-screen-xl">
      {/* Top Header & Format Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Bulk Shipping Labels</h1>
            <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-200">
              Thermal 4x6 & A4 Ready
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Generate and print barcode stickers for Steadfast, Pathao, RedX, and Paperfly parcels.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Format Switcher */}
          <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setFormat("4x6")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                format === "4x6"
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              4x6 Thermal Sticker
            </button>
            <button
              onClick={() => setFormat("a4")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                format === "a4"
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              A4 Sheet (4 per page)
            </button>
          </div>

          <Button onClick={handlePrint} disabled={selectedParcels.length === 0}>
            <Printer size={14} /> Print {selectedParcels.length} Labels
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Selector */}
        <div className="space-y-4 no-print">
          <BulkLabelsSelector
            parcels={parcels}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelect}
            onSelectAll={selectAll}
            onClearAll={clearAll}
          />
        </div>

        {/* Right Column: Live Printable Preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between no-print">
            <h2 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
              <LayoutGrid size={15} className="text-indigo-600" />
              Live Label Preview ({selectedParcels.length} Selected)
            </h2>
            <span className="text-xs text-slate-400 font-medium">
              Format: {format === "4x6" ? "4 x 6 Inches (Standard Thermal)" : "A4 Sheet Grid"}
            </span>
          </div>

          {selectedParcels.length === 0 ? (
            <div className="p-16 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white text-slate-400 text-xs space-y-2 no-print">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                <Printer size={18} />
              </div>
              <p className="font-bold text-slate-700">No orders selected</p>
              <p className="text-slate-400">
                Check the boxes on the left to select orders for batch shipping label printing.
              </p>
            </div>
          ) : (
            <div
              className={`bg-slate-200/60 p-6 rounded-2xl flex flex-wrap gap-6 justify-center max-h-[720px] overflow-y-auto border border-slate-300 print-only-container ${
                format === "a4" ? "shipping-label-a4-grid" : ""
              }`}
            >
              {selectedParcels.map(p => (
                <ShippingLabel
                  key={p.id}
                  parcel={p}
                  format={format}
                  merchantName={settings.merchantName}
                  merchantPhone={settings.phone}
                  merchantAddress={settings.businessAddress}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

