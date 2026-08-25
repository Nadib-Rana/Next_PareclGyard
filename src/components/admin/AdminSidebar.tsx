// src/components/admin/AdminSidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Building2, Activity, Ban,
  CircleDollarSign, Radio, Shield, LogOut, ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const adminNavItems = [
  { path: "/admin", icon: LayoutDashboard, label: "Overview" },
  { path: "/admin/merchants", icon: Building2, label: "Merchants" },
  { path: "/admin/couriers", icon: Activity, label: "Courier Health" },
  { path: "/admin/blacklist", icon: Ban, label: "Global Blacklist" },
  { path: "/admin/finance", icon: CircleDollarSign, label: "Platform Finance" },
  { path: "/admin/broadcasts", icon: Radio, label: "Broadcasts" },
];

export default function AdminSidebar({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-300">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800">
        <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-xs">
          <Shield size={18} />
        </div>
        <div>
          <div className="font-bold text-white text-sm leading-tight">ParcelGuard</div>
          <div className="text-[10px] font-bold text-amber-400 tracking-wider uppercase">Super Admin Console</div>
        </div>
      </div>

      {/* Admin Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {adminNavItems.map(({ path, icon: Icon, label }) => {
          const isActive = path === "/admin" ? pathname === "/admin" : pathname.startsWith(path);
          return (
            <Link
              key={path}
              href={path}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-white"
              }`}
              onClick={onItemClick}
            >
              <Icon size={16} className={isActive ? "text-white" : "text-slate-400"} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Switch Portal & Sign Out */}
      <div className="p-3 border-t border-slate-800 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Back to Merchant Portal
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors cursor-pointer"
        >
          <LogOut size={14} /> Sign Out Admin
        </button>
      </div>
    </div>
  );
}
