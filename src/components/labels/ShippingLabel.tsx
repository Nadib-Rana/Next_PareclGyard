// src/components/labels/ShippingLabel.tsx
"use client";

import React from "react";
import type { Parcel } from "@/types";

interface Props {
  parcel: Parcel;
  format: "4x6" | "a4";
  merchantName: string;
  merchantPhone: string;
  merchantAddress?: string;
}

export default function ShippingLabel({
  parcel,
  format,
  merchantName,
  merchantPhone,
  merchantAddress,
}: Props) {
  // Deterministic SVG Barcode generation based on tracking ID
  const generateBarcodeLines = (code: string) => {
    const bars: { width: number; isBlack: boolean }[] = [];
    const seed = code.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

    bars.push({ width: 3, isBlack: true });
    bars.push({ width: 2, isBlack: false });

    for (let i = 0; i < code.length; i++) {
      const charVal = code.charCodeAt(i);
      const w1 = ((charVal + i * 3) % 3) + 1;
      const w2 = (((charVal >> 1) + i) % 3) + 1;
      const w3 = (((charVal >> 2) + i * 2) % 3) + 1;
      bars.push({ width: w1, isBlack: true });
      bars.push({ width: w2, isBlack: false });
      bars.push({ width: w3, isBlack: true });
      bars.push({ width: 2, isBlack: false });
    }

    bars.push({ width: 3, isBlack: true });
    return bars;
  };

  const barcodeBars = generateBarcodeLines(parcel.id || "PG-100000");

  return (
    <div
      className={`bg-white border-2 border-black text-black p-4 flex flex-col justify-between font-sans select-none ${
        format === "4x6"
          ? "w-[380px] h-[520px] rounded-lg shadow-sm shipping-label-4x6"
          : "w-full max-w-[400px] h-[490px] rounded-md shadow-xs shipping-label-a4-item"
      }`}
    >
      {/* 1. Header: Courier Brand & COD Badge */}
      <div className="border-b-2 border-black pb-2.5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="bg-black text-white px-2 py-0.5 font-black text-sm uppercase tracking-wider rounded-xs">
              {parcel.courier || "EXPRESS"}
            </span>
            <span className="text-[10px] font-bold text-slate-800 tracking-tight uppercase">
              STANDARD COURIER
            </span>
          </div>
          <p className="text-[9px] font-bold text-slate-600 mt-0.5">HUB ROUTE: {parcel.district?.toUpperCase()} / {parcel.area?.toUpperCase() || "CENTRAL"}</p>
        </div>
        <div className="text-right">
          <div className="border-2 border-black bg-black text-white px-2 py-0.5 font-black text-xs uppercase tracking-widest text-center">
            {parcel.cod > 0 ? "COD" : "PAID"}
          </div>
          <p className="text-base font-black mt-0.5 leading-none">
            ৳{parcel.cod.toLocaleString()}
          </p>
        </div>
      </div>

      {/* 2. High Contrast Vector Barcode */}
      <div className="py-2.5 text-center border-b-2 border-black bg-slate-50/50">
        <div className="flex justify-center items-center h-12 w-full max-w-[300px] mx-auto px-2">
          <svg className="w-full h-full" viewBox="0 0 160 40" preserveAspectRatio="none">
            {(() => {
              let currentX = 0;
              return barcodeBars.map((bar, idx) => {
                const x = currentX;
                currentX += bar.width;
                if (!bar.isBlack) return null;
                return <rect key={idx} x={x} y="0" width={bar.width} height="40" fill="#000000" />;
              });
            })()}
          </svg>
        </div>
        <p className="font-mono text-xs font-black tracking-widest mt-1 text-black">
          *{parcel.id}*
        </p>
      </div>

      {/* 3. Deliver To / Consignee Details */}
      <div className="py-2.5 border-b-2 border-black space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-black uppercase tracking-wider bg-black text-white px-1.5 py-0.5">
            DELIVER TO:
          </span>
          <span className="text-[10px] font-bold text-slate-700">
            WT: {parcel.weight || "1.0 kg"}
          </span>
        </div>
        <h3 className="font-black text-base leading-tight mt-0.5 text-slate-900">{parcel.customer}</h3>
        <p className="font-mono font-black text-sm tracking-wide text-black">
          📞 {parcel.phone}
        </p>
        <p className="text-xs font-semibold leading-snug text-slate-800 line-clamp-2">
          {parcel.address}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="font-black text-[11px] uppercase bg-slate-100 px-2 py-0.5 border border-black">
            {parcel.district?.toUpperCase()} - {parcel.area || "HUB"}
          </span>
          <span className="text-[10px] font-bold font-mono">INV: {parcel.id.replace("PG-", "INV-")}</span>
        </div>
      </div>

      {/* 4. Product & Package Info */}
      <div className="text-[10px] space-y-0.5 py-1.5 border-b border-black">
        <div className="flex justify-between">
          <span className="text-slate-600 font-bold">Item:</span>
          <span className="font-bold text-slate-900 truncate max-w-[220px]">
            {parcel.product} {parcel.category ? `(${parcel.category})` : ""}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600 font-bold">Booking Date:</span>
          <span className="font-mono font-bold text-slate-800">{parcel.date || "Today"}</span>
        </div>
      </div>

      {/* 5. Sender / Return Address */}
      <div className="pt-1.5 flex items-center justify-between text-[10px]">
        <div>
          <p className="font-bold uppercase text-[9px] text-slate-500">Return Sender:</p>
          <p className="font-bold text-slate-900">{merchantName || "Fashion Hub BD"}</p>
          <p className="font-mono font-semibold">{merchantPhone || "01700-000000"}</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[9px] font-black text-slate-400">POWERED BY</p>
          <p className="font-bold text-[10px] text-slate-900 tracking-tight">PARCELGUARD BD</p>
        </div>
      </div>
    </div>
  );
}

