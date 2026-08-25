// src/components/tracking/TrackingDetailsSidebar.tsx
"use client";

import React from "react";
import { User, Truck, ShieldCheck, MapPin } from "lucide-react";
import { Card, RiskBadge, Badge } from "@/components/ui/pg-ui";
import type { Parcel } from "@/types";

interface Props {
  parcel: Parcel;
}

export default function TrackingDetailsSidebar({ parcel }: Props) {
  return (
    <div className="space-y-4">
      {/* Customer / Recipient Card */}
      <Card className="p-4 space-y-3">
        <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 uppercase tracking-wide">
          <User size={14} className="text-indigo-600" /> Recipient Intelligence
        </h3>
        <div className="space-y-2 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">Customer Name:</span>
            <span className="font-bold text-slate-900">{parcel.customer}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Phone:</span>
            <span className="font-mono font-bold text-slate-900">📞 {parcel.phone}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Delivery Address:</span>
            <span className="font-medium text-slate-700">{parcel.address}, {parcel.district}</span>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-slate-500">Fraud Risk:</span>
            <RiskBadge level={parcel.risk} />
          </div>
        </div>
      </Card>

      {/* Courier Rider Card */}
      <Card className="p-4 space-y-3">
        <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 uppercase tracking-wide">
          <Truck size={14} className="text-indigo-600" /> Delivery Agent / Rider
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Assigned Rider:</span>
            <span className="font-bold text-slate-900">{parcel.agentName || "Tanvir Rahman"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Rider Contact:</span>
            <span className="font-mono text-indigo-600 font-semibold">{parcel.agentPhone || "01800-111222"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Carrier Partner:</span>
            <Badge variant="indigo">{parcel.courier}</Badge>
          </div>
        </div>
      </Card>

      {/* COD Summary */}
      <Card className="p-4 space-y-2 text-xs">
        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide">COD Financials</h3>
        <div className="flex justify-between">
          <span className="text-slate-500">COD Total:</span>
          <span className="font-black text-slate-900 text-sm">৳{parcel.cod.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Courier Delivery Fee:</span>
          <span>৳{parcel.charge}</span>
        </div>
        <div className="flex justify-between text-emerald-700 font-bold pt-2 border-t border-slate-100">
          <span>Net Receivable:</span>
          <span>৳{(parcel.cod - parcel.charge).toLocaleString()}</span>
        </div>
      </Card>
    </div>
  );
}
