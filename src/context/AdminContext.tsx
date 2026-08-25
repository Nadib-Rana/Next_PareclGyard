// src/context/AdminContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { PlatformMerchant, CourierHealthMetric, GlobalBlacklistEntry, PlatformTransaction, SystemBroadcast } from "../types/admin";
import { initialPlatformMerchants, initialCourierHealth, initialGlobalBlacklist, initialTransactions, initialBroadcasts } from "../data/adminMockData";

export interface AdminContextType {
  merchants: PlatformMerchant[];
  couriers: CourierHealthMetric[];
  blacklist: GlobalBlacklistEntry[];
  transactions: PlatformTransaction[];
  broadcasts: SystemBroadcast[];
  maintenanceMode: boolean;
  updateMerchantStatus: (id: string, status: PlatformMerchant["status"]) => void;
  updateMerchantPlan: (id: string, plan: PlatformMerchant["plan"]) => void;
  addBlacklistEntry: (entry: Omit<GlobalBlacklistEntry, "id" | "addedDate" | "addedBy">) => void;
  removeBlacklistEntry: (id: string) => void;
  sendBroadcast: (title: string, message: string, type: SystemBroadcast["type"], target: SystemBroadcast["target"]) => void;
  toggleCourierStatus: (name: CourierHealthMetric["name"]) => void;
  toggleMaintenanceMode: () => void;
}

export const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [merchants, setMerchants] = useState<PlatformMerchant[]>(initialPlatformMerchants);
  const [couriers, setCouriers] = useState<CourierHealthMetric[]>(initialCourierHealth);
  const [blacklist, setBlacklist] = useState<GlobalBlacklistEntry[]>(initialGlobalBlacklist);
  const [transactions, setTransactions] = useState<PlatformTransaction[]>(initialTransactions);
  const [broadcasts, setBroadcasts] = useState<SystemBroadcast[]>(initialBroadcasts);
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMerchants = localStorage.getItem("pg_admin_merchants_v1");
    if (savedMerchants) setMerchants(JSON.parse(savedMerchants));

    const savedCouriers = localStorage.getItem("pg_admin_couriers_v1");
    if (savedCouriers) setCouriers(JSON.parse(savedCouriers));

    const savedBlacklist = localStorage.getItem("pg_admin_blacklist_v1");
    if (savedBlacklist) setBlacklist(JSON.parse(savedBlacklist));

    const savedTransactions = localStorage.getItem("pg_admin_transactions_v1");
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));

    const savedBroadcasts = localStorage.getItem("pg_admin_broadcasts_v1");
    if (savedBroadcasts) setBroadcasts(JSON.parse(savedBroadcasts));

    const savedMaint = localStorage.getItem("pg_admin_maint_v1");
    if (savedMaint) setMaintenanceMode(savedMaint === "true");
  }, []);

  useEffect(() => { if (mounted) localStorage.setItem("pg_admin_merchants_v1", JSON.stringify(merchants)); }, [merchants, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("pg_admin_couriers_v1", JSON.stringify(couriers)); }, [couriers, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("pg_admin_blacklist_v1", JSON.stringify(blacklist)); }, [blacklist, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("pg_admin_transactions_v1", JSON.stringify(transactions)); }, [transactions, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("pg_admin_broadcasts_v1", JSON.stringify(broadcasts)); }, [broadcasts, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("pg_admin_maint_v1", String(maintenanceMode)); }, [maintenanceMode, mounted]);

  const updateMerchantStatus = (id: string, status: PlatformMerchant["status"]) => {
    setMerchants(prev => prev.map(m => (m.id === id ? { ...m, status } : m)));
  };

  const updateMerchantPlan = (id: string, plan: PlatformMerchant["plan"]) => {
    setMerchants(prev =>
      prev.map(m => {
        if (m.id === id) {
          const limit = plan === "Enterprise" ? 10000 : plan === "Growth" ? 2000 : 500;
          return { ...m, plan, fraudChecksLimit: limit };
        }
        return m;
      })
    );
  };

  const addBlacklistEntry = (entry: Omit<GlobalBlacklistEntry, "id" | "addedDate" | "addedBy">) => {
    const newEntry: GlobalBlacklistEntry = {
      ...entry,
      id: `BLK-${Math.floor(1000 + Math.random() * 9000)}`,
      addedDate: "Just now",
      addedBy: "Super Admin",
    };
    setBlacklist(prev => [newEntry, ...prev]);
  };

  const removeBlacklistEntry = (id: string) => {
    setBlacklist(prev => prev.filter(b => b.id !== id));
  };

  const sendBroadcast = (title: string, message: string, type: SystemBroadcast["type"], target: SystemBroadcast["target"]) => {
    const newBroadcast: SystemBroadcast = {
      id: `BC-${Date.now().toString().slice(-4)}`,
      title,
      message,
      type,
      target,
      sentAt: "Just now",
      deliveredCount: target === "All Merchants" ? 5420 : 1240,
    };
    setBroadcasts(prev => [newBroadcast, ...prev]);
  };

  const toggleCourierStatus = (name: CourierHealthMetric["name"]) => {
    setCouriers(prev =>
      prev.map(c => {
        if (c.name === name) {
          const nextStatus = c.status === "Operational" ? "Degraded" : c.status === "Degraded" ? "Outage" : "Operational";
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const toggleMaintenanceMode = () => {
    setMaintenanceMode(prev => !prev);
  };

  return (
    <AdminContext.Provider
      value={{
        merchants,
        couriers,
        blacklist,
        transactions,
        broadcasts,
        maintenanceMode,
        updateMerchantStatus,
        updateMerchantPlan,
        addBlacklistEntry,
        removeBlacklistEntry,
        sendBroadcast,
        toggleCourierStatus,
        toggleMaintenanceMode,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
