// src/components/dashboard/RecentParcelsTable.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, MapPin } from "lucide-react";
import { Card, StatusBadge, RiskBadge } from "@/components/ui/pg-ui";
import type { Parcel } from "@/types";

interface Props {
  parcels: Parcel[];
  onSelectParcel: (parcel: Parcel) => void;
}

export default function RecentParcelsTable({ parcels, onSelectParcel }: Props) {
  const router = useRouter();

  return (
    <Card>
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h2 className="font-bold text-slate-900 text-sm">Recent Parcels</h2>
        <Link href="/parcels" className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold">
          View All &rarr;
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 font-semibold">
              <th className="px-5 py-3 text-left">Tracking ID</th>
              <th className="px-5 py-3 text-left">Customer</th>
              <th className="px-5 py-3 text-left">Courier</th>
              <th className="px-5 py-3 text-left">COD Amount</th>
              <th className="px-5 py-3 text-left">Fraud Risk</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {parcels.slice(0, 5).map(p => (
              <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-5 py-3.5 font-mono font-bold text-indigo-600">{p.id}</td>
                <td className="px-5 py-3.5">
                  <div className="font-bold text-slate-900">{p.customer}</div>
                  <div className="text-slate-400 text-[11px] font-mono">{p.phone}</div>
                </td>
                <td className="px-5 py-3.5 text-slate-700 font-medium">{p.courier}</td>
                <td className="px-5 py-3.5 font-bold text-slate-900">৳{p.cod.toLocaleString()}</td>
                <td className="px-5 py-3.5"><RiskBadge level={p.risk} /></td>
                <td className="px-5 py-3.5"><StatusBadge status={p.status} /></td>
                <td className="px-5 py-3.5 flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectParcel(p)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
                    title="View Details"
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    onClick={() => router.push(`/tracking?id=${p.id}`)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-indigo-600 cursor-pointer"
                    title="Live Tracking"
                  >
                    <MapPin size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
