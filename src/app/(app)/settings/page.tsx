// src/app/(app)/settings/page.tsx
"use client";

import React, { useState } from "react";
import { Store, KeyRound, Bell } from "lucide-react";
import { useData } from "@/hooks/useData";
import { Card, Button } from "@/components/ui/pg-ui";
import StoreProfileTab from "@/components/settings/StoreProfileTab";
import ApiWebhooksTab from "@/components/settings/ApiWebhooksTab";
import type { UserSettings } from "@/types";

export default function SettingsPage() {
  const { settings, updateSettings } = useData();
  const [activeTab, setActiveTab] = useState<"profile" | "api" | "notifications">("profile");
  const [form, setForm] = useState<UserSettings>(settings);
  const [savedMsg, setSavedMsg] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSavedMsg("Settings successfully saved!");
    setTimeout(() => setSavedMsg(""), 3500);
  };

  const handleToggleNotif = (key: keyof UserSettings["notifications"]) => {
    setForm(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Merchant Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Configure store info, API credentials, webhooks, and alerts.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 text-xs">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
            activeTab === "profile" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Store size={14} /> Store Profile
        </button>
        <button
          onClick={() => setActiveTab("api")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
            activeTab === "api" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <KeyRound size={14} /> API & Webhooks
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
            activeTab === "notifications" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Bell size={14} /> Notifications
        </button>
      </div>

      {activeTab === "profile" && (
        <StoreProfileTab
          form={form}
          setForm={setForm}
          onSave={handleSave}
          savedMsg={savedMsg}
        />
      )}

      {activeTab === "api" && (
        <ApiWebhooksTab
          form={form}
          setForm={setForm}
          onSave={handleSave}
        />
      )}

      {activeTab === "notifications" && (
        <Card className="p-6">
          <h2 className="font-bold text-slate-900 text-base mb-1">Notification Preferences</h2>
          <p className="text-xs text-slate-500 mb-5">Choose which events trigger instant SMS or in-app alerts.</p>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="space-y-3">
              {[
                { key: "highRiskAlerts", label: "High Risk Customer Alerts", desc: "Instant alert when an order matches a flagged phone number" },
                { key: "parcelUpdates", label: "Delivery & Return Milestones", desc: "Real-time notifications when a package is delivered or refused" },
                { key: "paymentUpdates", label: "COD Payout & Settlement Discrepancy", desc: "Alerts when courier deposits are credited or discrepancies detected" },
                { key: "smsNotifications", label: "SMS Summary to Merchant Mobile", desc: "Daily digest sent to your registered phone number" },
                { key: "emailNotifications", label: "Email Reports & Summaries", desc: "Weekly analytics reports sent to your email" },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-900">{item.label}</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">{item.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.notifications[item.key as keyof UserSettings["notifications"]]}
                    onChange={() => handleToggleNotif(item.key as keyof UserSettings["notifications"])}
                    className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <Button type="submit" size="sm">Save Preferences</Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}
