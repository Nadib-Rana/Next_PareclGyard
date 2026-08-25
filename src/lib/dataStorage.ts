// src/lib/dataStorage.ts
import type { Parcel, Customer, FraudCheckResult, CourierAccount, Settlement, AppNotification, UserSettings } from "../types";
import { initialParcels, initialCustomers, initialFraudChecks, initialCouriers, initialSettlements, initialNotifications, initialSettings } from "../data/mockData";

const isClient = typeof window !== "undefined";

export const getSavedParcels = (): Parcel[] => {
  if (!isClient) return initialParcels;
  try {
    const saved = localStorage.getItem("pg_parcels_v1");
    return saved ? JSON.parse(saved) : initialParcels;
  } catch {
    return initialParcels;
  }
};

export const getSavedCustomers = (): Customer[] => {
  if (!isClient) return initialCustomers;
  try {
    const saved = localStorage.getItem("pg_customers_v1");
    return saved ? JSON.parse(saved) : initialCustomers;
  } catch {
    return initialCustomers;
  }
};

export const getSavedFraudChecks = (): FraudCheckResult[] => {
  if (!isClient) return initialFraudChecks;
  try {
    const saved = localStorage.getItem("pg_fraudchecks_v1");
    return saved ? JSON.parse(saved) : initialFraudChecks;
  } catch {
    return initialFraudChecks;
  }
};

export const getSavedCouriers = (): CourierAccount[] => {
  if (!isClient) return initialCouriers;
  try {
    const saved = localStorage.getItem("pg_couriers_v1");
    return saved ? JSON.parse(saved) : initialCouriers;
  } catch {
    return initialCouriers;
  }
};

export const getSavedSettlements = (): Settlement[] => {
  if (!isClient) return initialSettlements;
  try {
    const saved = localStorage.getItem("pg_settlements_v1");
    return saved ? JSON.parse(saved) : initialSettlements;
  } catch {
    return initialSettlements;
  }
};

export const getSavedNotifications = (): AppNotification[] => {
  if (!isClient) return initialNotifications;
  try {
    const saved = localStorage.getItem("pg_notifs_v1");
    return saved ? JSON.parse(saved) : initialNotifications;
  } catch {
    return initialNotifications;
  }
};

export const getSavedSettings = (): UserSettings => {
  if (!isClient) return initialSettings;
  try {
    const saved = localStorage.getItem("pg_settings_v1");
    return saved ? JSON.parse(saved) : initialSettings;
  } catch {
    return initialSettings;
  }
};
