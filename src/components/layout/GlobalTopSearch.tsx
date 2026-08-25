// src/components/layout/GlobalTopSearch.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Parcel, Customer } from "@/types";

interface Props {
  parcels: Parcel[];
  customers: Customer[];
}

export default function GlobalTopSearch({ parcels, customers }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const searchParcels = searchQuery.trim().length >= 2
    ? parcels.filter(
        p =>
          p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.phone.includes(searchQuery)
      ).slice(0, 4)
    : [];

  const searchCustomers = searchQuery.trim().length >= 2
    ? customers.filter(
        c =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.phone.includes(searchQuery)
      ).slice(0, 3)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative hidden md:block" ref={searchRef}>
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={e => {
          setSearchQuery(e.target.value);
          setSearchOpen(true);
        }}
        onFocus={() => setSearchOpen(true)}
        placeholder="Search parcels, phones, customers..."
        className="pl-8 pr-4 py-1.5 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-64 transition-all"
      />

      {searchOpen && searchQuery.trim().length >= 2 && (
        <div className="absolute right-0 top-full mt-1.5 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 space-y-2">
          {searchParcels.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase px-2 mb-1">Parcels</p>
              {searchParcels.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    router.push(`/tracking?id=${p.id}`);
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 flex items-center justify-between text-xs transition-colors cursor-pointer"
                >
                  <div>
                    <span className="font-mono font-bold text-indigo-600">{p.id}</span>
                    <span className="text-slate-700 ml-2 font-medium">{p.customer}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{p.courier}</span>
                </button>
              ))}
            </div>
          )}

          {searchCustomers.length > 0 && (
            <div className="border-t border-slate-100 pt-1.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase px-2 mb-1">Customers</p>
              {searchCustomers.map(c => (
                <button
                  key={c.phone}
                  onClick={() => {
                    router.push(`/customers`);
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 flex items-center justify-between text-xs transition-colors cursor-pointer"
                >
                  <span className="text-slate-800 font-medium">{c.name}</span>
                  <span className="font-mono text-[10px] text-slate-500">{c.phone}</span>
                </button>
              ))}
            </div>
          )}

          {searchParcels.length === 0 && searchCustomers.length === 0 && (
            <div className="p-4 text-center text-xs text-slate-400">
              No results for &ldquo;{searchQuery}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
