// src/app/(app)/notifications/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  CheckCheck,
  ShieldAlert,
  Wallet,
  Package,
  Info,
  Trash2,
  Filter,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useData } from "@/hooks/useData";
import { Card, Button, Badge } from "@/components/ui/pg-ui";
import type { AppNotification } from "@/types";

export default function NotificationsPage() {
  const router = useRouter();
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    clearReadNotifications,
  } = useData();
  const [filter, setFilter] = useState<string>("all");

  const unreadCount = notifications.filter(n => !n.read).length;
  const readCount = notifications.filter(n => n.read).length;

  const filtered = notifications.filter(n => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.category === filter;
  });

  const getIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case "risk":
        return <ShieldAlert size={16} className="text-rose-600" />;
      case "payment":
        return <Wallet size={16} className="text-emerald-600" />;
      case "parcel":
        return <Package size={16} className="text-indigo-600" />;
      default:
        return <Info size={16} className="text-blue-600" />;
    }
  };

  const handleNotificationClick = (n: AppNotification) => {
    markNotificationRead(n.id);
    if (n.category === "Risk Alerts") {
      router.push("/fraud-checker");
    } else if (n.category === "Parcels") {
      router.push("/parcels");
    } else if (n.category === "Payments") {
      router.push("/settlements");
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Notifications & Alerts</h1>
            {unreadCount > 0 && (
              <span className="bg-rose-500 text-white text-[11px] font-black px-2 py-0.5 rounded-full shadow-xs">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time live updates on high-risk fraud checks, courier delivery milestones, and settlements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="secondary" size="sm" onClick={() => markAllNotificationsRead()}>
              <CheckCheck size={13} /> Mark all read
            </Button>
          )}
          {readCount > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => clearReadNotifications()}
              className="text-slate-500 hover:text-rose-600 border-slate-200"
            >
              <Trash2 size={13} /> Clear read ({readCount})
            </Button>
          )}
        </div>
      </div>

      {/* Category Tabs & Quick Filters */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-xs overflow-x-auto gap-2">
        <div className="flex items-center gap-1.5 flex-nowrap">
          {[
            { id: "all", label: `All Updates (${notifications.length})` },
            { id: "unread", label: `Unread (${unreadCount})` },
            { id: "Risk Alerts", label: "Risk Alerts" },
            { id: "Parcels", label: "Parcels" },
            { id: "Payments", label: "Payments" },
            { id: "System", label: "System" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                filter === tab.id
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <Card className="p-12 text-center border-2 border-dashed border-slate-200 bg-white rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-xs">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">No notifications found</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {filter === "unread"
                  ? "You're all caught up! No unread notifications at the moment."
                  : "There are no notifications in this category yet."}
              </p>
            </div>
          </Card>
        ) : (
          filtered.map(n => (
            <Card
              key={n.id}
              onClick={() => handleNotificationClick(n)}
              className={`p-4 transition-all cursor-pointer rounded-2xl border group flex items-start gap-3.5 relative overflow-hidden ${
                !n.read
                  ? "bg-indigo-50/25 border-indigo-200 hover:border-indigo-300 shadow-xs"
                  : "bg-white border-slate-200/80 hover:border-slate-300"
              }`}
            >
              {/* Type Icon Badge */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border ${
                  !n.read ? "bg-white border-indigo-200 shadow-xs" : "bg-slate-50 border-slate-200"
                }`}
              >
                {getIcon(n.type)}
              </div>

              {/* Body Details */}
              <div className="flex-1 min-w-0 pr-8">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-xs font-bold ${
                      !n.read ? "text-slate-900" : "text-slate-700"
                    }`}
                  >
                    {n.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                    {n.time}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.body}</p>

                <div className="mt-2.5 flex items-center gap-2">
                  <Badge variant="gray">{n.category}</Badge>
                  {!n.read && (
                    <span className="flex items-center gap-1 text-[10px] text-indigo-600 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" /> New
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400 group-hover:text-indigo-600 flex items-center gap-0.5 ml-auto font-medium transition-colors">
                    View Details <ArrowRight size={11} />
                  </span>
                </div>
              </div>

              {/* Individual Delete / Dismiss Button */}
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  deleteNotification(n.id);
                }}
                className="absolute top-3.5 right-3 p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer opacity-80 group-hover:opacity-100"
                title="Delete notification"
                aria-label="Delete notification"
              >
                <Trash2 size={13} />
              </button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

