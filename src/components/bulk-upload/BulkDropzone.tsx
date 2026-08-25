// src/components/bulk-upload/BulkDropzone.tsx
"use client";

import React from "react";
import { Upload, Download, Sparkles } from "lucide-react";
import { Card, Button } from "@/components/ui/pg-ui";

interface Props {
  dragging: boolean;
  setDragging: (v: boolean) => void;
  onDropFile: (file: File) => void;
  onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSampleDownload: () => void;
  onLoadDemo: () => void;
}

export default function BulkDropzone({
  dragging, setDragging, onDropFile, onFileInput, onSampleDownload, onLoadDemo,
}: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2">
        <div
          className={`p-12 text-center border-2 border-dashed rounded-2xl bg-white transition-all ${
            dragging ? "border-indigo-500 bg-indigo-50" : "border-slate-300 hover:border-slate-400"
          }`}
          onDragOver={e => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) onDropFile(file);
          }}
        >
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Upload size={28} className="text-indigo-600" />
          </div>
          <h3 className="font-bold text-slate-900 mb-1">Drag & Drop your CSV / Excel order file</h3>
          <p className="text-xs text-slate-500 mb-5">Supports .csv and standard exported order sheets from Shopify/WooCommerce</p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <label className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-sm">
              <Upload size={13} /> Choose CSV File
              <input type="file" accept=".csv,.xlsx" onChange={onFileInput} className="hidden" />
            </label>
            <Button variant="secondary" size="sm" onClick={onSampleDownload}>
              <Download size={13} /> Download CSV Template
            </Button>
            <Button variant="ghost" size="sm" onClick={onLoadDemo}>
              <Sparkles size={13} /> Load Demo Orders
            </Button>
          </div>
        </div>
      </div>

      <Card className="p-5 h-fit">
        <h3 className="font-bold text-slate-900 text-sm mb-3">Required Columns Guide</h3>
        <div className="space-y-2 text-xs text-slate-600">
          <p className="font-semibold text-slate-700">Mandatory columns:</p>
          {["Customer Name", "Phone (11 Digits)", "Full Address", "District", "COD Amount", "Product Name"].map(c => (
            <div key={c} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{c}</span>
            </div>
          ))}
          <p className="font-semibold text-slate-700 mt-4">Optional columns:</p>
          {["Weight", "Courier Preference", "Special Notes"].map(c => (
            <div key={c} className="flex items-center gap-2 text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span>{c}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
