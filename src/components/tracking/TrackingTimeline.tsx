// src/components/tracking/TrackingTimeline.tsx
"use client";

import React from "react";
import { Check, Clock, Truck, Package, MapPin } from "lucide-react";
import { Card, StatusBadge, Badge } from "@/components/ui/pg-ui";
import type { Parcel } from "@/types";

interface Milestone {
  status: string;
  time: string;
  location: string;
  desc: string;
  done: boolean;
  current: boolean;
}

interface Props {
  parcel: Parcel;
}

export default function TrackingTimeline({ parcel }: Props) {
  const milestones: Milestone[] = [
    { status: "Delivered", time: "24 Aug, 04:30 PM", location: `${parcel.district} Hub`, desc: `Delivered to recipient ${parcel.customer}. COD collected.`, done: parcel.status === "Delivered", current: parcel.status === "Delivered" },
    { status: "Out for Delivery", time: "24 Aug, 10:15 AM", location: `${parcel.district} Area Hub`, desc: `Rider ${parcel.agentName || "Courier Rider"} out for delivery.`, done: parcel.status === "Delivered" || parcel.status === "Out for Delivery", current: parcel.status === "Out for Delivery" },
    { status: "In Transit", time: "23 Aug, 08:45 PM", location: "Central Sort Facility, Dhaka", desc: "Transferred from dispatch hub to regional delivery center.", done: ["Delivered", "Out for Delivery", "In Transit"].includes(parcel.status), current: parcel.status === "In Transit" },
    { status: "Picked Up by Courier", time: "23 Aug, 02:30 PM", location: "Dhaka Central Hub", desc: `Package collected from merchant warehouse by ${parcel.courier}.`, done: true, current: parcel.status === "Pending Pickup" },
    { status: "Order Placed & Booked", time: "23 Aug, 11:00 AM", location: "Merchant Storefront", desc: "Shipping label generated and booking request registered.", done: true, current: false },
  ];

  return (
    <Card className="p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-mono font-bold text-indigo-600">LIVE TRACKING TIMELINE</span>
          <h2 className="font-bold text-slate-900 text-base">{parcel.id} · {parcel.product}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="indigo">{parcel.courier}</Badge>
          <StatusBadge status={parcel.status} />
        </div>
      </div>

      <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {milestones.map((m, i) => (
          <div key={i} className="relative flex items-start gap-4 text-xs">
            <div
              className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ring-4 ring-white ${
                m.current
                  ? "bg-indigo-600 text-white animate-pulse"
                  : m.done
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-200 text-slate-400"
              }`}
            >
              {m.done ? <Check size={11} /> : <Clock size={11} />}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <span className={`font-bold text-sm ${m.current ? "text-indigo-600" : m.done ? "text-slate-900" : "text-slate-400"}`}>
                  {m.status}
                </span>
                <span className="font-mono text-[11px] text-slate-400">{m.time}</span>
              </div>
              <p className="text-slate-600 mt-0.5">{m.desc}</p>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                <MapPin size={11} /> {m.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
