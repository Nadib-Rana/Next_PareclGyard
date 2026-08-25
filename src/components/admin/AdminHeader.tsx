// src/components/admin/AdminHeader.tsx
"use client";

import React from "react";
import { Menu, ShieldAlert, Power } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/hooks/useAdmin";
import { adminNavItems } from "./AdminSidebar";

interface Props {
  onOpenMobileMenu: () => void;
}

export default function AdminHeader({ onOpenMobileMenu }: Props) {
  const pathname = usePathname();
  const { maintenanceMode, toggleMaintenanceMode } = useAdmin();

  const currentTitle =
    adminNavItems.find(i => i.path === pathname)?.label ?? "Platform Overview";

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-4 lg:px-6 h-14 flex items-center justify-between flex-shrink-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden text-slate-400 hover:text-white p-1 cursor-pointer"
        >
          <Menu size={20} />
        </button>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:block">Super Admin</span>
        <span className="text-xs text-slate-700 hidden sm:block">/</span>
        <span className="text-xs font-bold text-white">{currentTitle}</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleMaintenanceMode}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
            maintenanceMode
              ? "bg-red-500/20 border-red-500 text-red-400"
              : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
          }`}
        >
          <Power size={12} />
          <span>{maintenanceMode ? "Maintenance Mode: ON" : "System Normal"}</span>
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center shadow-xs">
            SA
          </div>
          <span className="text-xs font-bold text-slate-200 hidden sm:block">Super Admin</span>
        </div>
      </div>
    </header>
  );
}
