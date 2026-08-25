// src/app/(app)/parcels/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Download, Upload } from "lucide-react";
import { useData } from "@/hooks/useData";
import { Button } from "@/components/ui/pg-ui";
import ParcelsToolbar from "@/components/parcels/ParcelsToolbar";
import ParcelsTable from "@/components/parcels/ParcelsTable";
import ParcelDrawer from "@/components/parcels/ParcelDrawer";
import type { Parcel } from "@/types";

export default function ParcelsPage() {
  const { parcels, updateParcelStatus, exportParcelsCSV } = useData();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [courierFilter, setCourierFilter] = useState("all");
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);

  const filtered = parcels.filter(p => {
    const matchSearch =
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.customer.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search) ||
      p.district.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    const matchRisk = riskFilter === "all" || p.risk === riskFilter;
    const matchCourier = courierFilter === "all" || p.courier === courierFilter;
    return matchSearch && matchStatus && matchRisk && matchCourier;
  });

  return (
    <div className="p-6 space-y-6 max-w-screen-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Parcel Shipments</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage, track, and filter all your courier dispatches.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => exportParcelsCSV(filtered)}>
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

      <ParcelsToolbar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        riskFilter={riskFilter}
        setRiskFilter={setRiskFilter}
        courierFilter={courierFilter}
        setCourierFilter={setCourierFilter}
      />

      <ParcelsTable
        parcels={filtered}
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
