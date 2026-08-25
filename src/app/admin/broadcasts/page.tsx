// src/app/admin/broadcasts/page.tsx
"use client";

import React, { useState } from "react";
import { Radio, Send, Bell } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import type { SystemBroadcast } from "@/types/admin";

export default function AdminBroadcastsPage() {
  const { broadcasts, sendBroadcast } = useAdmin();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<SystemBroadcast["type"]>("info");
  const [target, setTarget] = useState<SystemBroadcast["target"]>("All Merchants");
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;
    sendBroadcast(title, message, type, target);
    setSentSuccess(true);
    setTitle("");
    setMessage("");
    setTimeout(() => setSentSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">System Broadcasts & Merchant Announcements</h1>
        <p className="text-xs text-slate-400 mt-0.5">Send instant push notifications and maintenance banners to active merchant dashboards.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Broadcast Form */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-white text-base flex items-center gap-2">
            <Radio size={16} className="text-indigo-400" /> Send New Push Announcement
          </h2>

          {sentSuccess && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-xl">
              ✓ Broadcast dispatched successfully to {target}!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-bold mb-1">Broadcast Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Courier API maintenance on Sep 1st..."
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Notification Priority</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value as SystemBroadcast["type"])}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none"
                >
                  <option value="info">Info Announcement</option>
                  <option value="warning">Warning / Degradation</option>
                  <option value="urgent">Urgent Notice</option>
                  <option value="maintenance">Scheduled Maintenance</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Target Audience</label>
                <select
                  value={target}
                  onChange={e => setTarget(e.target.value as SystemBroadcast["target"])}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none"
                >
                  <option value="All Merchants">All Registered Merchants (5,420)</option>
                  <option value="Starter">Starter Tier Stores Only</option>
                  <option value="Growth">Growth Tier Stores Only</option>
                  <option value="Enterprise">Enterprise Merchants Only</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Message Body</label>
              <textarea
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Detailed description of the update, timeline, or affected services..."
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <Send size={13} /> Dispatch Broadcast
              </button>
            </div>
          </form>
        </div>

        {/* Broadcasts History */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Bell size={15} className="text-slate-400" /> Recent Broadcast Logs
          </h3>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {broadcasts.map(b => (
              <div key={b.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">{b.title}</span>
                  <span className="font-mono text-[10px] text-slate-500">{b.sentAt}</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">{b.message}</p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[10px] text-slate-500">
                  <span>Target: {b.target}</span>
                  <span className="font-bold text-emerald-400">{b.deliveredCount} delivered</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
