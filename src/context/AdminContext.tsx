// src/context/AdminContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react";
import type {
  PlatformMerchant,
  CourierHealthMetric,
  GlobalBlacklistEntry,
  PlatformTransaction,
  SystemBroadcast,
} from "../types/admin";
import { api } from "../lib/api";

const isClient = typeof window !== "undefined";

const getSavedAdminData = <T,>(key: string): T[] => {
  if (!isClient) return [];
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export interface AdminContextType {
  merchants: PlatformMerchant[];
  couriers: CourierHealthMetric[];
  blacklist: GlobalBlacklistEntry[];
  transactions: PlatformTransaction[];
  broadcasts: SystemBroadcast[];
  maintenanceMode: boolean;
  refreshCouriers: () => Promise<void>;
  updateMerchantStatus: (id: string, status: PlatformMerchant["status"]) => void;
  updateMerchantPlan: (id: string, plan: PlatformMerchant["plan"]) => void;
  addBlacklistEntry: (entry: Omit<GlobalBlacklistEntry, "id" | "addedDate" | "addedBy">) => void;
  removeBlacklistEntry: (id: string) => void;
  sendBroadcast: (
    title: string,
    message: string,
    type: SystemBroadcast["type"],
    target: SystemBroadcast["target"],
  ) => void;
  toggleCourierStatus: (name: string) => void;
  addCourierGateway: (data: {
    name: string;
    logo?: string;
    color?: string;
    apiUrl?: string;
    apiKey?: string;
    secretKey?: string;
    isActive?: boolean;
  }) => Promise<void>;
  deleteCourierGateway: (provider: string) => Promise<void>;
  updateMasterCredentials: (provider: string, apiKey: string, secretKey?: string, isActive?: boolean) => Promise<void>;
  testCourierConnection: (provider: string) => Promise<{ success: boolean; latencyMs: number; message: string }>;
  toggleMaintenanceMode: () => void;
}

export const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [merchants, setMerchants] = useState<PlatformMerchant[]>(() =>
    getSavedAdminData("pg_admin_merchants_v1"),
  );
  const [couriers, setCouriers] = useState<CourierHealthMetric[]>(() =>
    getSavedAdminData("pg_admin_couriers_v1"),
  );
  const [blacklist, setBlacklist] = useState<GlobalBlacklistEntry[]>(() =>
    getSavedAdminData("pg_admin_blacklist_v1"),
  );
  const [transactions, setTransactions] = useState<PlatformTransaction[]>(() =>
    getSavedAdminData("pg_admin_transactions_v1"),
  );
  const [broadcasts, setBroadcasts] = useState<SystemBroadcast[]>(() =>
    getSavedAdminData("pg_admin_broadcasts_v1"),
  );
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  const refreshCouriers = useCallback(async () => {
    try {
      const res = await api.get<CourierHealthMetric[]>("/admin/couriers/health");
      if (Array.isArray(res) && res.length > 0) {
        setCouriers(res);
      }
    } catch {}
  }, []);

  const syncAdminWithBackend = useCallback(async () => {
    try {
      const [mRes, cRes, bRes, tRes, bcRes] = await Promise.allSettled([
        api.get<PlatformMerchant[]>("/admin/merchants"),
        api.get<CourierHealthMetric[]>("/admin/couriers/health"),
        api.get<GlobalBlacklistEntry[]>("/admin/blacklist"),
        api.get<PlatformTransaction[]>("/admin/finance/transactions"),
        api.get<SystemBroadcast[]>("/admin/broadcasts"),
      ]);

      if (mRes.status === "fulfilled" && Array.isArray(mRes.value)) setMerchants(mRes.value);
      if (cRes.status === "fulfilled" && Array.isArray(cRes.value)) setCouriers(cRes.value);
      if (bRes.status === "fulfilled" && Array.isArray(bRes.value)) setBlacklist(bRes.value);
      if (tRes.status === "fulfilled" && Array.isArray(tRes.value)) setTransactions(tRes.value);
      if (bcRes.status === "fulfilled" && Array.isArray(bcRes.value)) setBroadcasts(bcRes.value);
    } catch (err) {
      console.warn("[AdminContext] Failed to sync admin data:", err);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    void syncAdminWithBackend();
  }, [syncAdminWithBackend]);

  useEffect(() => { if (mounted) localStorage.setItem("pg_admin_merchants_v1", JSON.stringify(merchants)); }, [merchants, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("pg_admin_couriers_v1", JSON.stringify(couriers)); }, [couriers, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("pg_admin_blacklist_v1", JSON.stringify(blacklist)); }, [blacklist, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("pg_admin_transactions_v1", JSON.stringify(transactions)); }, [transactions, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("pg_admin_broadcasts_v1", JSON.stringify(broadcasts)); }, [broadcasts, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("pg_admin_maint_v1", String(maintenanceMode)); }, [maintenanceMode, mounted]);

  const updateMerchantStatus = (id: string, status: PlatformMerchant["status"]) => {
    setMerchants((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
    api.patch(`/admin/merchants/${id}/status`, { status }).catch(() => {});
  };

  const updateMerchantPlan = (id: string, plan: PlatformMerchant["plan"]) => {
    setMerchants((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const limit = plan === "Enterprise" ? 10000 : plan === "Growth" ? 2000 : 500;
          return { ...m, plan, fraudChecksLimit: limit };
        }
        return m;
      }),
    );
    api.patch(`/admin/merchants/${id}/plan`, { plan }).catch(() => {});
  };

  const addBlacklistEntry = (entry: Omit<GlobalBlacklistEntry, "id" | "addedDate" | "addedBy">) => {
    const newEntry: GlobalBlacklistEntry = {
      ...entry,
      id: `BLK-${Math.floor(1000 + Math.random() * 9000)}`,
      addedDate: "Just now",
      addedBy: "Super Admin",
    };
    setBlacklist((prev) => [newEntry, ...prev]);

    api.post("/admin/blacklist", entry).catch(() => {});
  };

  const removeBlacklistEntry = (id: string) => {
    setBlacklist((prev) => prev.filter((b) => b.id !== id));
    api.delete(`/admin/blacklist/${id}`).catch(() => {});
  };

  const sendBroadcast = (
    title: string,
    message: string,
    type: SystemBroadcast["type"],
    target: SystemBroadcast["target"],
  ) => {
    const newBroadcast: SystemBroadcast = {
      id: `BC-${Date.now().toString().slice(-4)}`,
      title,
      message,
      type,
      target,
      sentAt: "Just now",
      deliveredCount: target === "All Merchants" ? 5420 : 1240,
    };
    setBroadcasts((prev) => [newBroadcast, ...prev]);

    api.post("/admin/broadcasts", { title, message, type, target }).catch(() => {});
  };

  const toggleCourierStatus = (name: string) => {
    setCouriers((prev) =>
      prev.map((c) => {
        if (c.name === name) {
          const nextStatus =
            c.status === "Operational"
              ? "Degraded"
              : c.status === "Degraded"
              ? "Outage"
              : "Operational";
          return { ...c, status: nextStatus };
        }
        return c;
      }),
    );
    api.post("/admin/couriers/toggle-health", { provider: name }).catch(() => {});
  };

  const addCourierGateway = async (data: {
    name: string;
    logo?: string;
    color?: string;
    apiUrl?: string;
    apiKey?: string;
    secretKey?: string;
    isActive?: boolean;
  }) => {
    await api.post("/admin/couriers", data);
    await refreshCouriers();
  };

  const deleteCourierGateway = async (provider: string) => {
    setCouriers((prev) => prev.filter((c) => c.name !== provider));
    await api.delete(`/admin/couriers/${provider}`);
    await refreshCouriers();
  };

  const updateMasterCredentials = async (provider: string, apiKey: string, secretKey?: string, isActive = true) => {
    setCouriers((prev) =>
      prev.map((c) => (c.name === provider ? { ...c, apiKey, secretKey, isActive, isConfigured: Boolean(apiKey) } : c)),
    );
    await api.post("/admin/couriers/credentials", { provider, apiKey, secretKey, isActive });
    await refreshCouriers();
  };

  const testCourierConnection = async (provider: string) => {
    const res = await api.post<{ success: boolean; latencyMs: number; message: string }>("/admin/couriers/test", { provider });
    if (res) {
      setCouriers((prev) =>
        prev.map((c) => (c.name === provider ? { ...c, latencyMs: res.latencyMs, status: "Operational" } : c)),
      );
      return res;
    }
    return { success: false, latencyMs: 0, message: "Connection test failed" };
  };

  const toggleMaintenanceMode = () => {
    setMaintenanceMode((prev) => !prev);
    api.post("/admin/maintenance/toggle").catch(() => {});
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
        refreshCouriers,
        updateMerchantStatus,
        updateMerchantPlan,
        addBlacklistEntry,
        removeBlacklistEntry,
        sendBroadcast,
        toggleCourierStatus,
        addCourierGateway,
        deleteCourierGateway,
        updateMasterCredentials,
        testCourierConnection,
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
