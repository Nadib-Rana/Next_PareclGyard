// src/components/dashboard/PipelineStatusCard.tsx
"use client";

import React from "react";
import { Card } from "@/components/ui/pg-ui";
import type { Parcel } from "@/types";

interface Props {
  parcels: Parcel[];
}

export default function PipelineStatusCard({ parcels }: Props) {
  const statuses = [
    { label: "Pending Pickup", count: parcels.filter(p => p.status === "Pending Pickup").length, color: "bg-amber-400" },
    { label: "In Transit", count: parcels.filter(p => p.status === "In Transit").length, color: "bg-blue-500" },
    { label: "Delivered", count: parcels.filter(p => p.status === "Delivered").length, color: "bg-emerald-500" },
    { label: "Returned", count: parcels.filter(p => p.status === "Returned").length, color: "bg-red-500" },
  ];

  return (
    <Card className="p-5 flex flex-col justify-between">
      <div>
        <h2 className="font-bold text-slate-900 text-sm mb-1">Parcel Pipeline Status</h2>
        <p className="text-xs text-slate-500 mb-4">Current stage of all active dispatches</p>
        <div className="space-y-3">
          {statuses.map(s => (
            <div key={s.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">{s.label}</span>
                <span className="font-bold text-slate-900">{s.count}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${s.color} rounded-full`}
                  style={{ width: `${Math.min(100, (s.count / Math.max(1, parcels.length)) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-4 border-t border-slate-100 mt-4 flex justify-between text-xs">
        <span className="text-slate-500">Fast Auto-Routing:</span>
        <span className="font-bold text-emerald-600">Active</span>
      </div>
    </Card>
  );
}
