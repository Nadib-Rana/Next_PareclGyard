// src/app/(app)/layout.tsx
"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import SidebarNav from "@/components/layout/SidebarNav";
import MerchantHeader from "@/components/layout/MerchantHeader";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { useData } from "@/hooks/useData";

export default function MerchantAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { notifications } = useData();

  const unreadNotifs = notifications.filter(n => !n.read).length;

  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden lg:flex flex-col border-r border-slate-200 bg-white transition-all duration-200 flex-shrink-0 ${
            collapsed ? "w-16" : "w-60"
          }`}
        >
          <SidebarNav
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            unreadNotifs={unreadNotifs}
          />
        </aside>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="relative z-50 w-64 bg-white border-r border-slate-200 flex flex-col shadow-2xl">
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X size={18} />
              </button>
              <SidebarNav
                collapsed={false}
                unreadNotifs={unreadNotifs}
                onItemClick={() => setMobileOpen(false)}
              />
            </aside>
          </div>
        )}

        {/* Main Content Pane */}
        <div className="flex-1 flex flex-col overflow-hidden pb-14 lg:pb-0">
          <MerchantHeader onOpenMobileMenu={() => setMobileOpen(true)} />

          <main className="flex-1 overflow-y-auto">
            {children}
          </main>

          <MobileBottomNav onOpenMobileMenu={() => setMobileOpen(true)} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
