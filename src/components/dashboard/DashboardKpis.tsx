// src/components/dashboard/DashboardKpis.tsx
"use client";

import React from "react";
import { Package, Truck, AlertTriangle, Wallet } from "lucide-react";
import { StatCard } from "@/components/ui/pg-ui";
import type { Parcel } from "@/types";

interface Props {
  parcels: Parcel[];
}

export default function DashboardKpis({ parcels }: Props) {
  const totalParcels = parcels.length;
  const deliveredParcels = parcels.filter(p => p.status === "Delivered").length;
  const atRiskParcels = parcels.filter(p => p.risk === "High Risk" && p.status !== "Delivered").length;
  const pendingCod = parcels
    .filter(p => p.status !== "Returned" && p.status !== "Cancelled")
    .reduce((acc, p) => acc + p.cod, 0);

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        label="Total Parcels"
        value={totalParcels.toString()}
        icon={<Package size={20} />}
        trend="↑ 12% vs last week"
      />
      <StatCard
        label="Delivered Successfully"
        value={deliveredParcels.toString()}
        icon={<Truck size={20} />}
        trend={`${((deliveredParcels / Math.max(1, totalParcels)) * 100).toFixed(0)}% delivery rate`}
      />
      <StatCard
        label="High Fraud Risk"
        value={atRiskParcels.toString()}
        icon={<AlertTriangle size={20} className="text-red-500" />}
        sub="Requires OTP confirmation"
        subColor="text-red-500"
      />
      <StatCard
        label="Pending COD Value"
        value={`৳${(pendingCod / 1000).toFixed(0)}k`}
        icon={<Wallet size={20} />}
        sub="Across all couriers"
      />
    </div>
  );
}
