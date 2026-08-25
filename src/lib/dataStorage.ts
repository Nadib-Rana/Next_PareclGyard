// src/lib/dataStorage.ts
import type {
  Parcel,
  Customer,
  FraudCheckResult,
  CourierAccount,
  Settlement,
  AppNotification,
  UserSettings,
} from "../types";

const isClient = typeof window !== "undefined";

export const defaultSettings: UserSettings = {
  merchantName: "",
  phone: "",
  email: "",
  businessType: "F-Commerce",
  businessAddress: "",
  apiKey: "",
  webhookUrl: "",
  notifications: {
    parcelUpdates: true,
    paymentUpdates: true,
    highRiskAlerts: true,
    smsNotifications: false,
    emailNotifications: true,
  },
};

export const getSavedParcels = (): Parcel[] => {
  if (!isClient) return [];
  try {
    const saved = localStorage.getItem("pg_parcels_v1");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const getSavedCustomers = (): Customer[] => {
  if (!isClient) return [];
  try {
    const saved = localStorage.getItem("pg_customers_v1");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const getSavedFraudChecks = (): FraudCheckResult[] => {
  if (!isClient) return [];
  try {
    const saved = localStorage.getItem("pg_fraudchecks_v1");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const getSavedCouriers = (): CourierAccount[] => {
  if (!isClient) return [];
  try {
    const saved = localStorage.getItem("pg_couriers_v1");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const getSavedSettlements = (): Settlement[] => {
  if (!isClient) return [];
  try {
    const saved = localStorage.getItem("pg_settlements_v1");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const getSavedNotifications = (): AppNotification[] => {
  if (!isClient) return [];
  try {
    const saved = localStorage.getItem("pg_notifs_v1");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const getSavedSettings = (): UserSettings => {
  if (!isClient) return defaultSettings;
  try {
    const saved = localStorage.getItem("pg_settings_v1");
    return saved ? JSON.parse(saved) : defaultSettings;
  } catch {
    return defaultSettings;
  }
};
