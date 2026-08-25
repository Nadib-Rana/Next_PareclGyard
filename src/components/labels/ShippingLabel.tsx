// src/components/labels/ShippingLabel.tsx
"use client";

import React from "react";
import type { Parcel } from "@/types";

interface Props {
  parcel: Parcel;
  format: "4x6" | "a4";
  merchantName: string;
  merchantPhone: string;
}

export default function ShippingLabel({ parcel, format, merchantName, merchantPhone }: Props) {
  return (
    <div
      className={`bg-white border-2 border-black text-black p-4 flex flex-col justify-between font-sans ${
        format === "4x6" ? "w-[380px] h-[520px] rounded-lg shadow-sm" : "w-full max-w-[400px] h-[480px] rounded-md"
      }`}
    >
      {/* Header */}
      <div className="border-b-2 border-black pb-2 flex items-center justify-between">
        <div>
          <h2 className="font-black text-lg tracking-tight uppercase">{parcel.courier}</h2>
          <p className="text-[10px] font-bold text-slate-700">EXPRESS LOGISTICS STANDARD</p>
        </div>
        <div className="text-right">
          <div className="border-2 border-black px-2 py-0.5 font-black text-sm uppercase">COD</div>
          <p className="text-sm font-black mt-0.5">৳{parcel.cod.toLocaleString()}</p>
        </div>
      </div>

      {/* Barcode Mock Visual */}
      <div className="py-2 text-center border-b border-black">
        <div className="w-full h-12 bg-[repeating-linear-gradient(90deg,#000_0px,#000_2px,transparent_2px,transparent_4px,#000_4px,#000_7px,transparent_7px,transparent_9px)] mx-auto mb-1" />
        <p className="font-mono text-xs font-black tracking-widest">{parcel.id}</p>
      </div>

      {/* Destination / Customer */}
      <div className="py-2.5 border-b-2 border-black space-y-1">
        <span className="text-[9px] font-black uppercase tracking-wider bg-black text-white px-1.5 py-0.5">
          SHIP TO:
        </span>
        <h3 className="font-black text-base leading-tight mt-1">{parcel.customer}</h3>
        <p className="font-mono font-bold text-sm">📞 {parcel.phone}</p>
        <p className="text-xs font-semibold leading-snug">{parcel.address}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="font-black text-xs uppercase bg-slate-100 px-2 py-0.5 border border-black">
            DISTRICT: {parcel.district.toUpperCase()}
          </span>
          <span className="text-xs font-bold">WT: {parcel.weight || "500g"}</span>
        </div>
      </div>

      {/* Order & Return Info */}
      <div className="text-[10px] space-y-1 py-1">
        <div className="flex justify-between">
          <span className="text-slate-600">Product:</span>
          <span className="font-bold truncate max-w-[200px]">{parcel.product}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Date:</span>
          <span className="font-mono font-semibold">{parcel.date}</span>
        </div>
      </div>

      {/* Merchant / Return From */}
      <div className="border-t border-black pt-2 flex items-center justify-between text-[10px]">
        <div>
          <p className="font-bold uppercase text-[9px] text-slate-500">Return Sender:</p>
          <p className="font-bold">{merchantName}</p>
          <p className="font-mono">{merchantPhone}</p>
        </div>
        <div className="text-right font-mono text-[9px] text-slate-400 font-bold">
          PARCELGUARD BD
        </div>
      </div>
    </div>
  );
}
