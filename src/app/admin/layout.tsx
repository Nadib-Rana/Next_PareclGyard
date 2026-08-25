// src/app/admin/layout.tsx
"use client";

import React, { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { maintenanceMode } = useAdmin();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100 dark">
      {/* Desktop Admin Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0">
        <AdminSidebar />
      </aside>

      {/* Mobile Admin Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X size={18} />
            </button>
            <AdminSidebar onItemClick={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        <AdminHeader onOpenMobileMenu={() => setMobileOpen(true)} />

        {/* Global Maintenance Alert if active */}
        {maintenanceMode && (
          <div className="bg-red-600/90 text-white px-4 py-2 text-xs font-bold flex items-center justify-center gap-2 border-b border-red-500">
            <AlertTriangle size={14} />
            PLATFORM MAINTENANCE ACTIVE: Public merchant bookings and fraud scans are temporarily paused.
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-6 max-w-screen-xl">
          {children}
        </main>
      </div>
    </div>
  );
}
