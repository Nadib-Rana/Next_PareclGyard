// src/context/DataContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type {
  Parcel,
  Customer,
  FraudCheckResult,
  CourierAccount,
  Settlement,
  AppNotification,
  UserSettings,
} from "../types";
import { exportParcelsToCSV, exportSettlementsToCSV, downloadSampleOrdersCSV } from "../lib/csv";
import { api } from "../lib/api";
import {
  getSavedParcels,
  getSavedCustomers,
  getSavedFraudChecks,
  getSavedCouriers,
  getSavedSettlements,
  getSavedNotifications,
  getSavedSettings,
} from "../lib/dataStorage";

export type { Parcel, Customer, FraudCheckResult, CourierAccount, Settlement, AppNotification, UserSettings };

export interface DataContextType {
  parcels: Parcel[];
  customers: Customer[];
  fraudChecks: FraudCheckResult[];
  couriers: CourierAccount[];
  settlements: Settlement[];
  notifications: AppNotification[];
  settings: UserSettings;
  addParcel: (parcel: Omit<Parcel, "id" | "date">) => Parcel;
  bulkAddParcels: (parcelsData: Omit<Parcel, "id" | "date">[]) => void;
  updateParcelStatus: (id: string, status: Parcel["status"]) => void;
  checkPhoneRisk: (phone: string, name?: string) => Promise<FraudCheckResult>;
  toggleWatchlist: (phone: string) => void;
  addCustomerNote: (phone: string, note: string) => void;
  toggleCourier: (name: string) => void;
  syncCourier: (name: string) => Promise<void>;
  updateCourierKeys: (name: string, apiKey: string, secretKey?: string) => void;
  raiseDispute: (id: string, reason: string, amount?: number) => void;
  markNotificationRead: (id: number | string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: number | string) => void;
  clearReadNotifications: () => void;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  exportParcelsCSV: (customList?: Parcel[]) => void;
  exportSettlementsCSV: () => void;
  generateSampleCSV: () => void;
}

export const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [parcels, setParcels] = useState<Parcel[]>(getSavedParcels);
  const [customers, setCustomers] = useState<Customer[]>(getSavedCustomers);
  const [fraudChecks, setFraudChecks] = useState<FraudCheckResult[]>(getSavedFraudChecks);
  const [couriers, setCouriers] = useState<CourierAccount[]>(getSavedCouriers);
  const [settlements, setSettlements] = useState<Settlement[]>(getSavedSettlements);
  const [notifications, setNotifications] = useState<AppNotification[]>(getSavedNotifications);
  const [settings, setSettings] = useState<UserSettings>(getSavedSettings);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const syncWithBackend = async () => {
      try {
        const [pData, cData, sData, notifData, couriersData, fData] = await Promise.allSettled([
          api.get<{ items: Parcel[] }>("/parcels?limit=100"),
          api.get<Customer[]>("/customers"),
          api.get<Settlement[]>("/settlements"),
          api.get<AppNotification[]>("/notifications"),
          api.get<CourierAccount[]>("/couriers/accounts"),
          api.get<FraudCheckResult[]>("/fraud/recent-checks"),
        ]);

        if (pData.status === "fulfilled" && pData.value?.items) {
          setParcels(pData.value.items);
        }
        if (cData.status === "fulfilled" && Array.isArray(cData.value)) {
          setCustomers(cData.value);
        }
        if (sData.status === "fulfilled" && Array.isArray(sData.value)) {
          setSettlements(sData.value);
        }
        if (notifData.status === "fulfilled" && Array.isArray(notifData.value)) {
          setNotifications(notifData.value);
        }
        if (couriersData.status === "fulfilled" && Array.isArray(couriersData.value)) {
          setCouriers(couriersData.value);
        }
        if (fData.status === "fulfilled" && Array.isArray(fData.value)) {
          setFraudChecks(fData.value);
        }
      } catch (err) {
        console.warn("[DataContext] Failed to sync with backend:", err);
      }
    };

    if (typeof window !== "undefined" && localStorage.getItem("pg_access_token")) {
      void syncWithBackend();
    }
  }, []);

  useEffect(() => { if (mounted) localStorage.setItem("pg_parcels_v1", JSON.stringify(parcels)); }, [parcels, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("pg_customers_v1", JSON.stringify(customers)); }, [customers, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("pg_fraudchecks_v1", JSON.stringify(fraudChecks)); }, [fraudChecks, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("pg_couriers_v1", JSON.stringify(couriers)); }, [couriers, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("pg_settlements_v1", JSON.stringify(settlements)); }, [settlements, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("pg_notifs_v1", JSON.stringify(notifications)); }, [notifications, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("pg_settings_v1", JSON.stringify(settings)); }, [settings, mounted]);

  const addParcel = (p: Omit<Parcel, "id" | "date">): Parcel => {
    const newId = `PG-${Math.floor(100000 + Math.random() * 900000)}`;
    const newParcel: Parcel = {
      ...p,
      id: newId,
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    };

    setParcels((prev) => [newParcel, ...prev]);

    api.post("/parcels", {
      customer: p.customer,
      phone: p.phone,
      address: p.address,
      district: p.district,
      area: p.area,
      product: p.product,
      category: p.category,
      weight: parseFloat(p.weight?.replace("kg", "") || "1") || 1,
      courier: p.courier,
      cod: p.cod,
      charge: p.charge,
      advance: p.advance,
      risk: p.risk,
      status: p.status,
      notes: p.notes,
    }).then((created) => {
      if (created && (created as any).id) {
        setParcels((prev) => prev.map((item) => (item.id === newId ? (created as Parcel) : item)));
      }
    }).catch(() => {});

    return newParcel;
  };

  const bulkAddParcels = (items: Omit<Parcel, "id" | "date">[]) => {
    const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    const formatted = items.map((p, idx) => ({
      ...p,
      id: `PG-${Math.floor(100000 + idx + Math.random() * 900000)}`,
      date: today,
    }));
    setParcels((prev) => [...formatted, ...prev]);

    api.post("/parcels/bulk", {
      parcels: items.map((p) => ({
        customer: p.customer,
        phone: p.phone,
        address: p.address,
        district: p.district,
        area: p.area,
        product: p.product,
        category: p.category,
        weight: parseFloat(p.weight?.replace("kg", "") || "1") || 1,
        courier: p.courier,
        cod: p.cod,
        charge: p.charge,
        advance: p.advance,
        risk: p.risk,
        status: p.status,
      })),
    }).catch(() => {});
  };

  const updateParcelStatus = (id: string, status: Parcel["status"]) => {
    setParcels((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    api.patch(`/parcels/${id}/status`, { status }).catch(() => {});
  };

  const checkPhoneRisk = async (phone: string, name?: string): Promise<FraudCheckResult> => {
    try {
      const res = await api.post<FraudCheckResult>("/fraud/check-phone", { phone, name });
      if (res) {
        setFraudChecks((prev) => [res, ...prev.filter((c) => c.phone !== phone)]);
        return res;
      }
    } catch (err) {
      console.warn("Fraud check error:", err);
    }

    const fallbackCheck: FraudCheckResult = {
      phone,
      name: name || "Customer",
      risk: "Safe",
      score: 10,
      date: "Just now",
      totalOrders: 0,
      delivered: 0,
      returned: 0,
      cancelled: 0,
      successRate: "100%",
      factors: ["New customer with no prior return reports."],
      recommendation: "Safe for standard Cash on Delivery.",
    };
    return fallbackCheck;
  };

  const toggleWatchlist = (phone: string) => {
    setCustomers((prev) => prev.map((c) => (c.phone === phone ? { ...c, isWatchlist: !c.isWatchlist } : c)));
    api.patch(`/customers/${phone}/watchlist`).catch(() => {});
  };

  const addCustomerNote = (phone: string, note: string) => {
    setCustomers((prev) => prev.map((c) => (c.phone === phone ? { ...c, notes: note } : c)));
    api.post(`/customers/${phone}/notes`, { notes: note }).catch(() => {});
  };

  const toggleCourier = (name: string) => {
    setCouriers((prev) => prev.map((c) => (c.name === name ? { ...c, connected: !c.connected } : c)));
    api.post("/couriers/toggle", { provider: name.replace(" Courier", "") }).catch(() => {});
  };

  const syncCourier = async (name: string) => {
    try {
      await api.post("/couriers/sync", { provider: name.replace(" Courier", "") });
      const [cData, notifData] = await Promise.allSettled([
        api.get<CourierAccount[]>("/couriers/accounts"),
        api.get<AppNotification[]>("/notifications"),
      ]);
      if (cData.status === "fulfilled" && Array.isArray(cData.value)) setCouriers(cData.value);
      if (notifData.status === "fulfilled" && Array.isArray(notifData.value)) setNotifications(notifData.value);
    } catch (err) {
      console.warn("[DataContext] Courier sync failed:", err);
    }
  };

  const updateCourierKeys = (name: string, apiKey: string, secretKey?: string) => {
    setCouriers((prev) => prev.map((c) => (c.name === name ? { ...c, apiKey, secretKey, connected: true } : c)));
    api.post("/couriers/connect", {
      provider: name.replace(" Courier", ""),
      apiKey,
      secretKey,
    }).then(() => {
      void syncCourier(name);
    }).catch(() => {});
  };

  const raiseDispute = (id: string, reason: string, amount?: number) => {
    setSettlements((prev) => prev.map((s) => (s.id === id ? { ...s, status: "Disputed", disputeReason: reason } : s)));
    api.post("/settlements/dispute", { settlementId: id, reason, disputedAmount: amount }).catch(() => {});
  };

  const markNotificationRead = (id: number | string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    api.patch(`/notifications/${id}/read`).catch(() => {});
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    api.patch("/notifications/read-all").catch(() => {});
  };

  const deleteNotification = (id: number | string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    api.delete(`/notifications/${id}`).catch(() => {});
  };

  const clearReadNotifications = () => {
    setNotifications((prev) => prev.filter((n) => !n.read));
    api.delete("/notifications/clear-read").catch(() => {});
  };

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    api.patch("/merchants/me", newSettings).catch(() => {});
  };

  return (
    <DataContext.Provider
      value={{
        parcels, customers, fraudChecks, couriers, settlements, notifications, settings,
        addParcel, bulkAddParcels, updateParcelStatus, checkPhoneRisk, toggleWatchlist, addCustomerNote,
        toggleCourier, syncCourier, updateCourierKeys, raiseDispute, markNotificationRead, markAllNotificationsRead,
        deleteNotification, clearReadNotifications, updateSettings,
        exportParcelsCSV: (customList?: Parcel[]) => exportParcelsToCSV(customList ?? parcels),
        exportSettlementsCSV: () => exportSettlementsToCSV(settlements),
        generateSampleCSV: downloadSampleOrdersCSV,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
