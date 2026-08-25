// src/components/bulk-upload/BulkValidationTable.tsx
"use client";

import React from "react";
import { FileText, CheckCircle, AlertTriangle, X, Check, Edit3 } from "lucide-react";
import { Card, Button, Badge } from "@/components/ui/pg-ui";

export interface BulkRow {
  id: number;
  customer: string;
  phone: string;
  address: string;
  district: string;
  cod: string;
  product: string;
  courier: "Steadfast" | "Pathao" | "RedX";
  risk: "Safe" | "Moderate" | "High Risk";
  status: "valid" | "error";
  errorMsg?: string;
}

interface Props {
  rows: BulkRow[];
  bookingSuccess: boolean;
  onReupload: () => void;
  onContinueBooking: () => void;
  onEditRow: (r: BulkRow) => void;
}

export default function BulkValidationTable({
  rows, bookingSuccess, onReupload, onContinueBooking, onEditRow,
}: Props) {
  const validCount = rows.filter(r => r.status === "valid").length;
  const errorCount = rows.filter(r => r.status === "error").length;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <FileText size={18} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Total Orders Parsed</p>
            <p className="text-2xl font-black text-slate-900">{rows.length}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle size={18} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Valid for Booking</p>
            <p className="text-2xl font-black text-emerald-600">{validCount}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle size={18} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Need Attention</p>
            <p className="text-2xl font-black text-amber-600">{errorCount}</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-wrap items-center justify-between px-5 py-4 border-b border-slate-100 gap-3">
          <div>
            <h2 className="font-bold text-slate-900 text-sm">Bulk Order Validation Preview</h2>
            <p className="text-xs text-slate-500 mt-0.5">Click edit icon on any row to correct validation warnings.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={onReupload}>
              <X size={13} /> Re-Upload
            </Button>
            <Button size="sm" onClick={onContinueBooking} disabled={validCount === 0}>
              <Check size={13} /> {bookingSuccess ? "Booking..." : `Book ${validCount} Valid Orders`}
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {["#", "Customer", "Phone", "Address", "COD", "Courier", "Status", "Action"].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((p, idx) => (
                <tr key={p.id} className={`border-b border-slate-50 hover:bg-slate-50/80 ${p.status === "error" ? "bg-red-50/40" : ""}`}>
                  <td className="px-4 py-3 font-mono text-slate-400">{idx + 1}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">{p.customer}</td>
                  <td className="px-4 py-3">
                    <span className={`font-mono ${p.status === "error" && p.errorMsg?.includes("phone") ? "text-red-600 font-bold" : "text-slate-600"}`}>
                      {p.phone || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 max-w-xs truncate">
                    {p.address || <span className="text-red-500 font-semibold italic">Missing Address</span>}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-900">
                    {p.cod && p.cod !== "0" ? `৳${Number(p.cod).toLocaleString()}` : <span className="text-red-500 font-semibold">৳0</span>}
                  </td>
                  <td className="px-4 py-3"><Badge variant="indigo">{p.courier}</Badge></td>
                  <td className="px-4 py-3">
                    {p.status === "valid" ? (
                      <Badge variant="success">✓ Valid</Badge>
                    ) : (
                      <div className="flex items-center gap-1 text-[11px] text-red-600 font-medium">
                        <AlertTriangle size={12} className="flex-shrink-0" />
                        <span className="truncate max-w-[180px]">{p.errorMsg}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onEditRow(p)}
                      className="p-1.5 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg cursor-pointer"
                    >
                      <Edit3 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
