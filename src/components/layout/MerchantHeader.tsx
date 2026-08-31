// src/components/layout/MerchantHeader.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Plus, Menu, ChevronDown, LogOut, Settings, HelpCircle, Shield, Bell, CheckCheck, ShieldAlert, Wallet, Package, Info, ExternalLink } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import GlobalTopSearch from "./GlobalTopSearch";
import { mainNavItems, bottomNavItems } from "./SidebarNav";

interface Props {
  onOpenMobileMenu: () => void;
}

export default function MerchantHeader({ onOpenMobileMenu }: Props) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const { parcels, customers, settings, notifications, markNotificationRead, markAllNotificationsRead } = useData();

  const unreadCount = notifications.filter(n => !n.read).length;
  const recentNotifications = notifications.slice(0, 5);

  const getNotifIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case "risk":
        return <ShieldAlert size={14} className="text-red-500" />;
      case "payment":
        return <Wallet size={14} className="text-emerald-500" />;
      case "parcel":
        return <Package size={14} className="text-blue-500" />;
      default:
        return <Info size={14} className="text-indigo-500" />;
    }
  };

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

      {/* Notification Bell Popover */}
      <div className="relative">
        <button
          onClick={() => {
            setNotifMenuOpen(!notifMenuOpen);
            setUserMenuOpen(false);
          }}
          className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell size={17} />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white shadow-xs">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {notifMenuOpen && (
          <div className="absolute right-0 top-full mt-1.5 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">Notifications & Alerts</span>
                {unreadCount > 0 && (
                  <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={() => markAllNotificationsRead()}
                  className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                >
                  <CheckCheck size={12} /> Mark read
                </button>
              )}
            </div>

            <div className="max-h-[340px] overflow-y-auto divide-y divide-slate-100">
              {recentNotifications.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  No notifications yet.
                </div>
              ) : (
                recentNotifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => {
                      markNotificationRead(n.id);
                      if (n.category === "Risk Alerts") router.push("/fraud-checker");
                      else if (n.category === "Parcels") router.push("/parcels");
                      else if (n.category === "Payments") router.push("/settlements");
                      setNotifMenuOpen(false);
                    }}
                    className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-3 ${
                      !n.read ? "bg-indigo-50/30" : ""
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {getNotifIcon(n.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className={`text-xs truncate ${!n.read ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>
                          {n.title}
                        </p>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap font-mono">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{n.body}</p>
                    </div>
                    {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 flex-shrink-0 mt-1.5" />}
                  </div>
                ))
              )}
            </div>

            <div className="p-2 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
              <Link
                href="/notifications"
                onClick={() => setNotifMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                View all notifications <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        )}
      </div>

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
