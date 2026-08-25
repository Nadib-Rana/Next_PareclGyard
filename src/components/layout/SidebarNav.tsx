// src/components/layout/SidebarNav.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Shield, Package, PackagePlus, Upload,
  MapPin, Wallet, Truck, Users, BarChart3, CreditCard,
  Bell, Settings, HelpCircle, ChevronLeft, ChevronRight, Printer
} from "lucide-react";

export const mainNavItems = [
  { path: "/", icon: LayoutDashboard, label: "Overview" },
  { path: "/fraud-checker", icon: Shield, label: "Fraud Checker" },
  { path: "/parcels", icon: Package, label: "Parcels" },
  { path: "/book-parcel", icon: PackagePlus, label: "Book Parcel" },
  { path: "/bulk-labels", icon: Printer, label: "Bulk Labels" },
  { path: "/bulk-upload", icon: Upload, label: "Bulk Upload" },
  { path: "/tracking", icon: MapPin, label: "Tracking" },
  { path: "/payments", icon: Wallet, label: "Payments" },
  { path: "/courier-accounts", icon: Truck, label: "Courier Accounts" },
  { path: "/customers", icon: Users, label: "Customers" },
  { path: "/reports", icon: BarChart3, label: "Reports" },
];

export const bottomNavItems = [
  { path: "/subscription", icon: CreditCard, label: "Subscription & Credits" },
  { path: "/notifications", icon: Bell, label: "Notifications" },
  { path: "/settings", icon: Settings, label: "Settings" },
  { path: "/help", icon: HelpCircle, label: "Help Center" },
];

interface Props {
  collapsed: boolean;
  setCollapsed?: (v: boolean) => void;
  unreadNotifs: number;
  onItemClick?: () => void;
}

export default function SidebarNav({ collapsed, setCollapsed, unreadNotifs, onItemClick }: Props) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-4 border-b border-slate-100 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
          <Shield size={16} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <div className="font-bold text-slate-900 text-sm leading-tight">ParcelGuard</div>
            <div className="text-[10px] text-indigo-600 font-bold tracking-wide">Smart Courier Intelligence</div>
          </div>
        )}
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-2.5 py-3 space-y-1 overflow-y-auto">
        {mainNavItems.map(({ path, icon: Icon, label }) => {
          const isActive = path === "/" ? pathname === "/" : pathname.startsWith(path);
          return (
            <Link
              key={path}
              href={path}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                isActive ? "bg-indigo-50 text-indigo-700 shadow-xs font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              } ${collapsed ? "justify-center" : ""}`}
              onClick={onItemClick}
              title={collapsed ? label : undefined}
            >
              <Icon size={16} className={isActive ? "text-indigo-600" : "text-slate-400"} />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="px-2.5 py-3 border-t border-slate-100 space-y-1">
        {bottomNavItems.map(({ path, icon: Icon, label }) => {
          const isActive = pathname === path;
          return (
            <Link
              key={path}
              href={path}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                isActive ? "bg-indigo-50 text-indigo-700 shadow-xs font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              } ${collapsed ? "justify-center" : ""}`}
              onClick={onItemClick}
              title={collapsed ? label : undefined}
            >
              <div className="relative">
                <Icon size={16} className={isActive ? "text-indigo-600" : "text-slate-400"} />
                {path === "/notifications" && unreadNotifs > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                    {unreadNotifs}
                  </span>
                )}
              </div>
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Collapse Toggle */}
      {setCollapsed && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center w-full py-3 border-t border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      )}
    </div>
  );
}
