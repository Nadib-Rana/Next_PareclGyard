// src/components/layout/MobileBottomNav.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Shield, Plus, Package, Menu } from "lucide-react";

interface Props {
  onOpenMobileMenu: () => void;
}

export default function MobileBottomNav({ onOpenMobileMenu }: Props) {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-slate-200 flex items-center justify-around z-40 px-2">
      <Link
        href="/"
        className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
          pathname === "/" ? "text-indigo-600 font-bold" : "text-slate-500"
        }`}
      >
        <LayoutDashboard size={18} />
        <span>Overview</span>
      </Link>

      <Link
        href="/fraud-checker"
        className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
          pathname.startsWith("/fraud-checker") ? "text-indigo-600 font-bold" : "text-slate-500"
        }`}
      >
        <Shield size={18} />
        <span>Fraud Check</span>
      </Link>

      <Link
        href="/book-parcel"
        className="flex flex-col items-center justify-center -mt-5 w-11 h-11 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-300"
      >
        <Plus size={20} />
      </Link>

      <Link
        href="/parcels"
        className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
          pathname.startsWith("/parcels") ? "text-indigo-600 font-bold" : "text-slate-500"
        }`}
      >
        <Package size={18} />
        <span>Parcels</span>
      </Link>

      <button
        onClick={onOpenMobileMenu}
        className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-slate-500 cursor-pointer"
      >
        <Menu size={18} />
        <span>Menu</span>
      </button>
    </div>
  );
}
