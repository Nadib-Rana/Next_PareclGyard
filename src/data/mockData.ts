// src/data/mockData.ts
import type { Parcel, Customer, FraudCheckResult, CourierAccount, Settlement, AppNotification, UserSettings } from "../types";

export const initialParcels: Parcel[] = [
  { id: "PG-102847", customer: "Nasrin Akter", phone: "01913-456789", address: "House 12, Road 4, Zindabazar", district: "Sylhet", area: "Sylhet Sadar", product: "Silk Saree", category: "Fashion", courier: "RedX", cod: 850, charge: 130, advance: 0, risk: "Safe", status: "In Transit", date: "Today", createdAt: new Date().toISOString() },
  { id: "PG-102848", customer: "Farhan Hossain", phone: "01614-567890", address: "Station Road, Bogura Sadar", district: "Bogura", area: "Bogura Sadar", product: "Leather Wallet", category: "Accessories", courier: "Steadfast", cod: 3200, charge: 110, advance: 0, risk: "Safe", status: "Pending Pickup", date: "Today", createdAt: new Date().toISOString() },
];

export const initialCustomers: Customer[] = [
  { id: "CUST-1", name: "Rahim Uddin", phone: "01711-234567", orders: 24, delivered: 22, returned: 2, rate: "91.7%", risk: "Safe", last: "24 Aug 2026", isWatchlist: false, notes: "Reliable customer, prompt recipient." },
  { id: "CUST-2", name: "Karim Hasan", phone: "01812-345678", orders: 24, delivered: 9, returned: 12, rate: "37.5%", risk: "High Risk", last: "24 Aug 2026", isWatchlist: true, notes: "Frequently cancels after parcel arrives at hub. Always ask for advance delivery fee." },
  { id: "CUST-3", name: "Nasrin Akter", phone: "01913-456789", orders: 11, delivered: 10, returned: 1, rate: "90.9%", risk: "Safe", last: "23 Aug 2026", isWatchlist: false },
  { id: "CUST-4", name: "Farhan Hossain", phone: "01614-567890", orders: 8, delivered: 5, returned: 2, rate: "62.5%", risk: "Moderate", last: "23 Aug 2026", isWatchlist: false, notes: "Slow to answer calls, delivery takes 2 attempts." },
  { id: "CUST-5", name: "Sadia Islam", phone: "01515-678901", orders: 15, delivered: 14, returned: 1, rate: "93.3%", risk: "Safe", last: "22 Aug 2026", isWatchlist: false },
  { id: "CUST-6", name: "Jahangir Alam", phone: "01716-789012", orders: 18, delivered: 6, returned: 10, rate: "33.3%", risk: "High Risk", last: "22 Aug 2026", isWatchlist: true, notes: "Multiple fake order reports across multiple FB pages." },
];

export const initialFraudChecks: FraudCheckResult[] = [
  { phone: "01711-234567", name: "Rahim Uddin", risk: "Safe", score: 12, date: "2 hours ago", totalOrders: 24, delivered: 22, returned: 2, cancelled: 0, successRate: "91.7%", factors: ["Consistent delivery address", "Verified mobile subscriber"], recommendation: "Safe to ship with standard Cash on Delivery." },
  { phone: "01812-345678", name: "Karim Hasan", risk: "High Risk", score: 82, date: "5 hours ago", totalOrders: 24, delivered: 9, returned: 12, cancelled: 3, successRate: "37.5%", factors: ["Frequent parcel refusal", "Multiple orders across multiple shops", "High return ratio (50%+)"], recommendation: "Request full advance delivery charge (৳150) before dispatch." },
  { phone: "01913-456789", name: "Nasrin Akter", risk: "Moderate", score: 48, date: "Yesterday", totalOrders: 11, delivered: 7, returned: 3, cancelled: 1, successRate: "63.6%", factors: ["Occasional delivery delays", "Different delivery districts reported"], recommendation: "Call customer to re-confirm order before booking." },
  { phone: "01614-567890", name: "Farhan Hossain", risk: "Safe", score: 8, date: "Yesterday", totalOrders: 8, delivered: 7, returned: 1, cancelled: 0, successRate: "87.5%", factors: ["Low cancellation history"], recommendation: "Safe to proceed with normal shipping." },
];

export const initialCouriers: CourierAccount[] = [
  { name: "Steadfast Courier", logo: "SC", color: "bg-emerald-600", connected: true, balance: 12500, sync: "2 minutes ago", apiKey: "sf_live_a89bc34e09f8", webhookEnabled: true },
  { name: "Pathao Courier", logo: "PC", color: "bg-indigo-600", connected: true, balance: 8320, sync: "5 minutes ago", apiKey: "pt_live_99d12fae43", webhookEnabled: true },
  { name: "RedX", logo: "RX", color: "bg-red-600", connected: false, balance: 0, sync: "—" },
  { name: "Paperfly", logo: "PF", color: "bg-amber-600", connected: false, balance: 0, sync: "—" },
];

export const initialSettlements: Settlement[] = [
  { id: "STL-2408-001", courier: "Steadfast", period: "Aug 1–15", expected: 78500, received: 78500, diff: 0, status: "Paid", parcelsCount: 62 },
  { id: "STL-2408-002", courier: "Pathao", period: "Aug 1–15", expected: 45200, received: 42700, diff: -2500, status: "Disputed", parcelsCount: 34, disputeReason: "COD deduction of ৳2,500 on 2 delivered parcels marked incorrectly as returned." },
  { id: "STL-2408-003", courier: "RedX", period: "Aug 1–15", expected: 32000, received: 28400, diff: -3600, status: "Partial", parcelsCount: 22 },
  { id: "STL-2408-004", courier: "Steadfast", period: "Aug 16–24", expected: 64000, received: 0, diff: 0, status: "Pending", parcelsCount: 48 },
  { id: "STL-2408-005", courier: "Pathao", period: "Aug 16–24", expected: 38500, received: 0, diff: 0, status: "Pending", parcelsCount: 29 },
];

export const initialNotifications: AppNotification[] = [
  { id: 1, type: "risk", category: "Risk Alerts", title: "High-risk customer detected", body: "Order PG-102846 customer Karim Hasan has a 37.5% delivery success rate.", time: "2 hours ago", read: false },
  { id: 2, type: "payment", category: "Payments", title: "COD payment received", body: "৳12,500 has been added to your settlement from Steadfast.", time: "4 hours ago", read: false },
  { id: 3, type: "parcel", category: "Parcels", title: "Parcel delayed", body: "Tracking ID PG-102847 has been in transit for over 36 hours.", time: "6 hours ago", read: false },
  { id: 4, type: "risk", category: "Risk Alerts", title: "Watchlist customer ordered", body: "Customer Karim Hasan placed a new order via Facebook Messenger.", time: "8 hours ago", read: true },
  { id: 5, type: "payment", category: "Payments", title: "Settlement processed", body: "Steadfast settlement STL-2408-001 of ৳78,500 has been confirmed.", time: "Yesterday", read: true },
  { id: 6, type: "system", category: "System", title: "System maintenance scheduled", body: "ParcelGuard will undergo routine maintenance on Sep 1, 02:00–04:00 AM BDT.", time: "2 days ago", read: true },
];

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
