// src/app/(app)/bulk-labels/page.tsx
"use client";

import React, { useState } from "react";
import { Printer, Download, LayoutGrid } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Bulk Shipping Labels</h1>
          <p className="text-sm text-slate-500 mt-0.5">Generate and print high-resolution 4x6 thermal barcode labels for packing.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setFormat("4x6")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                format === "4x6" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-600"
              }`}
            >
              4x6 Thermal
            </button>
            <button
              onClick={() => setFormat("a4")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                format === "a4" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-600"
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
        <div className="space-y-4">
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
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <LayoutGrid size={15} className="text-indigo-600" />
              Print Preview ({selectedParcels.length} Labels Ready)
            </h2>
            <span className="text-xs text-slate-400">Ready for Thermal / Laser Printer</span>
          </div>

          {selectedParcels.length === 0 ? (
            <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white text-slate-400 text-xs">
              No orders selected. Check the boxes on the left to preview shipping labels.
            </div>
          ) : (
            <div className="bg-slate-200/60 p-6 rounded-2xl flex flex-wrap gap-6 justify-center max-h-[700px] overflow-y-auto border border-slate-300">
              {selectedParcels.map(p => (
                <ShippingLabel
                  key={p.id}
                  parcel={p}
                  format={format}
                  merchantName={settings.merchantName}
                  merchantPhone={settings.phone}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
