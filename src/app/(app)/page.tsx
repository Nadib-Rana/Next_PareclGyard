// src/app/(app)/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Upload, Download } from "lucide-react";
import { useData } from "@/hooks/useData";
import { Button } from "@/components/ui/pg-ui";
import DashboardKpis from "@/components/dashboard/DashboardKpis";
import WeeklyPerformanceChart from "@/components/dashboard/WeeklyPerformanceChart";
import PipelineStatusCard from "@/components/dashboard/PipelineStatusCard";
import RecentParcelsTable from "@/components/dashboard/RecentParcelsTable";
import ParcelDrawer from "@/components/parcels/ParcelDrawer";
import type { Parcel } from "@/types";

export default function DashboardPage() {
  const { parcels, updateParcelStatus, exportParcelsCSV } = useData();
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);

  return (
    <div className="p-6 space-y-6 max-w-screen-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Dashboard & Operations</h1>
          <p className="text-sm text-slate-500 mt-0.5">Real-time overview of your parcel dispatches, deliveries, and COD returns.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => exportParcelsCSV()}>
            <Download size={13} /> Export CSV
          </Button>
          <Link href="/bulk-upload">
            <Button variant="secondary" size="sm"><Upload size={13} /> Bulk Upload</Button>
          </Link>
          <Link href="/book-parcel">
            <Button size="sm"><Plus size={13} /> Book Parcel</Button>
          </Link>
        </div>
      </div>

      <DashboardKpis parcels={parcels} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <WeeklyPerformanceChart />
        <PipelineStatusCard parcels={parcels} />
      </div>

      {/* Recent Parcels Table */}
      <RecentParcelsTable
        parcels={parcels}
        onSelectParcel={setSelectedParcel}
      />

      {selectedParcel && (
        <ParcelDrawer
          parcel={selectedParcel}
          onClose={() => setSelectedParcel(null)}
          onUpdateStatus={updateParcelStatus}
        />
      )}
    </div>
  );
}
