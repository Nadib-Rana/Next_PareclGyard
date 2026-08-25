// src/app/(app)/notifications/page.tsx
"use client";

import React, { useState } from "react";
import { Bell, CheckCheck, ShieldAlert, Wallet, Package, Info } from "lucide-react";
import { useData } from "@/hooks/useData";
import { Card, Button, Badge } from "@/components/ui/pg-ui";
import type { AppNotification } from "@/types";

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useData();
  const [filter, setFilter] = useState<string>("all");

  const filtered = notifications.filter(n => (filter === "all" ? true : n.category === filter));
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: AppNotification["type"]) => {
    switch (type) {
      case "risk":
        return <ShieldAlert size={16} className="text-red-500" />;
      case "payment":
        return <Wallet size={16} className="text-emerald-500" />;
      case "parcel":
        return <Package size={16} className="text-blue-500" />;
      default:
        return <Info size={16} className="text-indigo-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Notifications & Alerts</h1>
          <p className="text-sm text-slate-500 mt-0.5">Stay informed about high-risk customer orders, payouts, and courier updates.</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="secondary" size="sm" onClick={markAllNotificationsRead}>
            <CheckCheck size={13} /> Mark all as read
          </Button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 text-xs">
        {["all", "Risk Alerts", "Payments", "Parcels", "System"].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              filter === cat
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {cat === "all" ? "All Updates" : cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card className="p-12 text-center text-slate-400 text-xs">
            No notifications in this category.
          </Card>
        ) : (
          filtered.map(n => (
            <Card
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-4 transition-all cursor-pointer flex items-start gap-3.5 ${
                !n.read ? "bg-indigo-50/20 border-indigo-200" : "bg-white"
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                {getIcon(n.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-900 text-xs">{n.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">{n.body}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="gray">{n.category}</Badge>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
