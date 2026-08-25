// src/components/parcels/ParcelDrawer.tsx
"use client";

import React from "react";
import { X, MapPin, Printer, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Parcel } from "@/types";
import { StatusBadge, RiskBadge, Badge, Button } from "@/components/ui/pg-ui";

interface Props {
  parcel: Parcel;
  onClose: () => void;
  onUpdateStatus: (id: string, status: Parcel["status"]) => void;
}

export default function ParcelDrawer({ parcel, onClose, onUpdateStatus }: Props) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-xs" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-white border-l border-slate-200 flex flex-col overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 sticky top-0 bg-white z-20">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-600">{parcel.id}</span>
            <h2 className="font-bold text-slate-900 text-base">Parcel Order Breakdown</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Status Control */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Current Status</span>
              <StatusBadge status={parcel.status} />
            </div>
            <div className="mt-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Update Status Manually:</label>
              <select
                value={parcel.status}
                onChange={e => onUpdateStatus(parcel.id, e.target.value as Parcel["status"])}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none"
              >
                <option value="Pending Pickup">Pending Pickup</option>
                <option value="In Transit">In Transit</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Returned">Returned</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Customer Info */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Customer Details</h3>
            <div className="bg-white rounded-xl p-3.5 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">Name:</span><span className="font-semibold text-slate-900">{parcel.customer}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Phone:</span><span className="font-mono font-semibold text-slate-900">📞 {parcel.phone}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Address:</span><span className="font-medium text-slate-800 text-right max-w-[200px]">{parcel.address}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">District:</span><span className="font-bold text-slate-900">{parcel.district}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Risk Assessment:</span><RiskBadge level={parcel.risk} /></div>
            </div>
          </div>

          {/* Courier Info */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Courier & Shipment</h3>
            <div className="bg-white rounded-xl p-3.5 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">Courier Partner:</span><Badge variant="indigo">{parcel.courier}</Badge></div>
              <div className="flex justify-between"><span className="text-slate-500">Item Product:</span><span className="font-semibold text-slate-900">{parcel.product}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Weight:</span><span className="font-medium text-slate-800">{parcel.weight || "500g"}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">COD Total:</span><span className="font-bold text-slate-900">৳{parcel.cod.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Delivery Fee:</span><span className="font-medium text-slate-700">৳{parcel.charge}</span></div>
            </div>
          </div>

          {/* Rider / Agent */}
          {parcel.agentName && (
            <div className="bg-indigo-50/60 rounded-xl p-3.5 border border-indigo-100 text-xs">
              <p className="font-bold text-indigo-900 mb-1 flex items-center gap-1.5"><Truck size={14} /> Assigned Courier Rider</p>
              <p className="text-slate-700">{parcel.agentName} ({parcel.agentPhone})</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              className="flex-1 justify-center"
              onClick={() => {
                router.push(`/tracking?id=${parcel.id}`);
              }}
            >
              <MapPin size={13} /> Live Tracking
            </Button>
            <Button
              variant="secondary"
              className="flex-1 justify-center"
              onClick={() => {
                router.push(`/bulk-labels`);
              }}
            >
              <Printer size={13} /> Print Label
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
