// src/app/(app)/tracking/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useData } from "@/hooks/useData";
import { Button, Card } from "@/components/ui/pg-ui";
import TrackingTimeline from "@/components/tracking/TrackingTimeline";
import TrackingDetailsSidebar from "@/components/tracking/TrackingDetailsSidebar";
import type { Parcel } from "@/types";

function TrackingView() {
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");

  const { parcels } = useData();
  const [searchId, setSearchId] = useState(idParam || "");
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);

  useEffect(() => {
    if (idParam) {
      const match = parcels.find(p => p.id.toLowerCase() === idParam.toLowerCase());
      if (match) setSelectedParcel(match);
    } else if (parcels.length > 0) {
      setSelectedParcel(parcels[0]);
    }
  }, [idParam, parcels]);

  const handleSearch = () => {
    if (!searchId.trim()) return;
    const match = parcels.find(
      p =>
        p.id.toLowerCase() === searchId.trim().toLowerCase() ||
        p.phone.includes(searchId.trim())
    );
    if (match) {
      setSelectedParcel(match);
    } else {
      alert(`No parcel found for "${searchId}". Try "PG-102845" or another tracking ID.`);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-screen-xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Live Parcel Tracking</h1>
        <p className="text-sm text-slate-500 mt-0.5">Real-time status updates and multi-courier timeline tracking.</p>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
              placeholder="Enter Tracking ID (e.g. PG-102845) or Customer Phone..."
              className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono"
              onKeyDown={e => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch} size="sm">Track Parcel</Button>
        </div>
      </Card>

      {selectedParcel ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TrackingTimeline parcel={selectedParcel} />
          </div>
          <div>
            <TrackingDetailsSidebar parcel={selectedParcel} />
          </div>
        </div>
      ) : (
        <div className="p-12 text-center text-slate-400 text-xs">
          No parcel selected. Enter a tracking ID above.
        </div>
      )}
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading tracking data...</div>}>
      <TrackingView />
    </Suspense>
  );
}
