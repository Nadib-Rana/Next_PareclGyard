// src/app/(app)/courier-accounts/page.tsx
"use client";

import React, { useState } from "react";
import { RefreshCw, Settings } from "lucide-react";
import { useData } from "@/context/DataContext";
import { Card, Button, Badge } from "@/components/ui/pg-ui";
import CourierConnectModal from "@/components/couriers/CourierConnectModal";
import type { CourierAccount } from "@/types";

export default function CourierAccountsPage() {
  const { couriers, toggleCourier, updateCourierKeys, syncCourier } = useData();
  const [selectedCourier, setSelectedCourier] = useState<CourierAccount | null>(null);
  const [syncing, setSyncing] = useState<string | null>(null);

  const handleSync = async (name: string) => {
    setSyncing(name);
    try {
      await syncCourier(name);
    } finally {
      setSyncing(null);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-screen-xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Courier Partner Integrations</h1>
        <p className="text-sm text-slate-500 mt-0.5">Connect merchant accounts with Steadfast, Pathao, RedX, and Paperfly for unified dispatching.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {couriers.map(c => (
          <Card key={c.name} className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl ${c.color} text-white flex items-center justify-center font-black text-sm shadow-xs`}>
                    {c.logo}
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 text-base">{c.name}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {c.connected ? `Last Synced: ${c.sync}` : "Not Connected"}
                    </p>
                  </div>
                </div>
                {c.connected ? (
                  <Badge variant="success">Connected</Badge>
                ) : (
                  <Badge variant="gray">Disconnected</Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5 p-3.5 bg-slate-50 rounded-xl text-xs border border-slate-100">
                <div>
                  <span className="text-slate-500 block">Available Balance:</span>
                  <span className="text-base font-black text-slate-900">BDT {c.balance.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Webhook Tracking:</span>
                  <span className={`font-bold ${c.webhookEnabled ? "text-emerald-600" : "text-slate-400"}`}>
                    {c.webhookEnabled ? "Active (Real-time)" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                {c.connected && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => void handleSync(c.name)}
                    disabled={syncing === c.name}
                  >
                    <RefreshCw size={12} className={syncing === c.name ? "animate-spin text-indigo-600" : ""} />
                    {syncing === c.name ? "Syncing..." : "Sync Balance"}
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedCourier(c)}
                >
                  <Settings size={12} /> Configure API
                </Button>
                <Button
                  variant={c.connected ? "danger" : "primary"}
                  size="sm"
                  onClick={() => toggleCourier(c.name)}
                >
                  {c.connected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedCourier && (
        <CourierConnectModal
          selectedCourier={selectedCourier}
          onClose={() => setSelectedCourier(null)}
          onSave={updateCourierKeys}
        />
      )}
    </div>
  );
}
