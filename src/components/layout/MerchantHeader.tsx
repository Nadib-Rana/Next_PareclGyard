// src/components/layout/MerchantHeader.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Plus, Menu, ChevronDown, LogOut, Settings, HelpCircle, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import GlobalTopSearch from "./GlobalTopSearch";
import { mainNavItems, bottomNavItems } from "./SidebarNav";

interface Props {
  onOpenMobileMenu: () => void;
}

export default function MerchantHeader({ onOpenMobileMenu }: Props) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const { parcels, customers, settings } = useData();

  const pageTitle =
    [...mainNavItems, ...bottomNavItems].find(i => i.path === pathname)?.label ?? "Overview";

  return (
    <header className="bg-white border-b border-slate-200 px-4 lg:px-6 h-14 flex items-center gap-4 flex-shrink-0 z-30">
      <button
        className="lg:hidden text-slate-500 hover:text-slate-700 p-1 cursor-pointer"
        onClick={onOpenMobileMenu}
      >
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-400 hidden sm:block">ParcelGuard</span>
        <span className="text-xs text-slate-300 hidden sm:block">/</span>
        <span className="text-xs font-bold text-slate-900">{pageTitle}</span>
      </div>

      <div className="flex-1" />

      <GlobalTopSearch parcels={parcels} customers={customers} />

      <Link
        href="/book-parcel"
        className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl shadow-xs transition-colors"
      >
        <Plus size={14} />
        <span className="hidden sm:block">Book Parcel</span>
      </Link>

      <div className="relative">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="flex items-center gap-2 pl-2 hover:bg-slate-50 rounded-xl py-1 pr-1 transition-colors cursor-pointer"
        >
          <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white text-xs font-black flex items-center justify-center shadow-xs">
            {settings.merchantName.slice(0, 2).toUpperCase()}
          </div>
          <span className="text-xs font-bold text-slate-800 hidden sm:block">{settings.merchantName}</span>
          <ChevronDown size={12} className="text-slate-400 hidden sm:block" />
        </button>

        {userMenuOpen && (
          <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50">
            <div className="px-3 py-2 border-b border-slate-100">
              <div className="text-xs font-bold text-slate-900 truncate">{settings.merchantName}</div>
              <div className="text-[11px] text-slate-500 truncate font-mono">{settings.phone}</div>
            </div>
            <Link
              href="/settings"
              className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setUserMenuOpen(false)}
            >
              <Settings size={14} /> Settings & Profile
            </Link>
            <Link
              href="/help"
              className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setUserMenuOpen(false)}
            >
              <HelpCircle size={14} /> Help Center
            </Link>
            <Link
              href="/admin"
              className="flex items-center gap-2 w-full px-3 py-2 text-xs font-bold text-amber-600 hover:bg-amber-50"
              onClick={() => setUserMenuOpen(false)}
            >
              <Shield size={14} className="text-amber-500" /> Super Admin Console
            </Link>
            <button
              className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 cursor-pointer"
              onClick={() => {
                logout();
                router.push("/login");
              }}
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
