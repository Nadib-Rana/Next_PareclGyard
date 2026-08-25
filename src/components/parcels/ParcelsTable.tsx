// src/components/parcels/ParcelsTable.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Eye, MapPin, Printer } from "lucide-react";
import type { Parcel } from "@/types";
import { Card, StatusBadge, RiskBadge, Badge } from "@/components/ui/pg-ui";

interface Props {
  parcels: Parcel[];
  onSelectParcel: (parcel: Parcel) => void;
}

export default function ParcelsTable({ parcels, onSelectParcel }: Props) {
  const router = useRouter();

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 font-semibold">
              <th className="px-4 py-3 text-left">Tracking ID</th>
              <th className="px-4 py-3 text-left">Customer & Phone</th>
              <th className="px-4 py-3 text-left">Address & District</th>
              <th className="px-4 py-3 text-left">Courier</th>
              <th className="px-4 py-3 text-left">COD Amount</th>
              <th className="px-4 py-3 text-left">Fraud Risk</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {parcels.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-slate-400">
                  No parcels found matching your filter.
                </td>
              </tr>
            ) : (
              parcels.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-indigo-600">{p.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-bold text-slate-900">{p.customer}</div>
                    <div className="text-slate-400 font-mono text-[11px]">{p.phone}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-700 max-w-xs truncate">{p.address}</div>
                    <div className="text-slate-400 text-[11px]">{p.district}</div>
                  </td>
                  <td className="px-4 py-3"><Badge variant="indigo">{p.courier}</Badge></td>
                  <td className="px-4 py-3 font-bold text-slate-900">৳{p.cod.toLocaleString()}</td>
                  <td className="px-4 py-3"><RiskBadge level={p.risk} /></td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3 text-slate-400 text-[11px]">{p.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onSelectParcel(p)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
                        title="View Details"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        onClick={() => router.push(`/tracking?id=${p.id}`)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-indigo-600 cursor-pointer"
                        title="Live Tracking"
                      >
                        <MapPin size={13} />
                      </button>
                      <button
                        onClick={() => router.push(`/bulk-labels`)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
                        title="Print Label"
                      >
                        <Printer size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
