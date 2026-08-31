// src/data/mockData.ts
import type { Parcel, Customer, FraudCheckResult, CourierAccount, Settlement, AppNotification, UserSettings } from "../types";

export const initialParcels: Parcel[] = [];
export const initialCustomers: Customer[] = [];
export const initialFraudChecks: FraudCheckResult[] = [];
export const initialCouriers: CourierAccount[] = [
  { name: "Steadfast Courier", logo: "SC", color: "bg-emerald-600", connected: true, balance: 0, sync: "Live Connected", apiKey: "SF_LIVE_ACTIVE", webhookEnabled: true },
  { name: "Pathao Courier", logo: "PC", color: "bg-indigo-600", connected: false, balance: 0, sync: "—" },
  { name: "RedX", logo: "RX", color: "bg-red-600", connected: true, balance: 0, sync: "Live Connected" },
  { name: "Paperfly", logo: "PF", color: "bg-amber-600", connected: false, balance: 0, sync: "—" },
];
export const initialSettlements: Settlement[] = [];
export const initialNotifications: AppNotification[] = [];

export const initialSettings: UserSettings = {
  merchantName: "Rahman Fashion House",
  phone: "+880 1711-234567",
  email: "rahman@store.bd",
  businessType: "F-Commerce (Facebook)",
  businessAddress: "House 12, Road 4, Sector 3, Uttara, Dhaka",
  apiKey: "pg_live_89f02bca481e39a03cd711e9a22f",
  webhookUrl: "https://rahmanstore.com/api/webhooks/parcelguard",
  notifications: {
    parcelUpdates: true,
    paymentUpdates: true,
    highRiskAlerts: true,
    smsNotifications: false,
    emailNotifications: true,
  },
};
