// src/data/adminMockData.ts
import type { CourierHealthMetric, GlobalBlacklistEntry, PlatformTransaction, SystemBroadcast } from "../types/admin";
export { initialPlatformMerchants } from "./adminMerchantsData";

export const initialCourierHealth: CourierHealthMetric[] = [
  { name: "Steadfast", uptime: "99.94%", latencyMs: 142, errorRate: "0.06%", status: "Operational", lastIncident: "No incidents in 30 days", dailyRequests: 148500 },
  { name: "Pathao", uptime: "99.82%", latencyMs: 188, errorRate: "0.18%", status: "Operational", lastIncident: "Minor webhook delay (12 Aug)", dailyRequests: 98200 },
  { name: "RedX", uptime: "98.90%", latencyMs: 310, errorRate: "1.10%", status: "Degraded", lastIncident: "High latency on booking API (Today 14:00)", dailyRequests: 41200 },
  { name: "Paperfly", uptime: "99.65%", latencyMs: 220, errorRate: "0.35%", status: "Operational", lastIncident: "Resolved (22 Jul)", dailyRequests: 18400 },
  { name: "eCourier", uptime: "99.10%", latencyMs: 275, errorRate: "0.90%", status: "Operational", lastIncident: "Maintenance window (18 Aug)", dailyRequests: 9600 },
];

export const initialGlobalBlacklist: GlobalBlacklistEntry[] = [
  {
    id: "BLK-8901",
    phone: "01812345678",
    customerName: "Karim Hasan",
    riskScore: 94,
    reportedByCount: 14,
    totalReturns: 28,
    reason: "Consistent parcel refusal after reaching local hub across multiple apparel and gadget shops.",
    status: "Confirmed Fraud",
    addedDate: "15 Aug 2026",
    addedBy: "System (Auto-flagged)",
  },
  {
    id: "BLK-8902",
    phone: "01716789012",
    customerName: "Jahangir Alam",
    riskScore: 89,
    reportedByCount: 9,
    totalReturns: 19,
    reason: "Places fake high-value COD orders with non-existent addresses in Rajshahi.",
    status: "Confirmed Fraud",
    addedDate: "20 Aug 2026",
    addedBy: "Super Admin",
  },
  {
    id: "BLK-8903",
    phone: "01999887766",
    customerName: "Shakil Chowdhury",
    riskScore: 78,
    reportedByCount: 6,
    totalReturns: 11,
    reason: "Repeatedly cancels orders while delivery agent is in transit.",
    status: "Suspicious",
    addedDate: "22 Aug 2026",
    addedBy: "Merchant Report",
  },
  {
    id: "BLK-8904",
    phone: "01600112233",
    customerName: "Imran Khan",
    riskScore: 65,
    reportedByCount: 3,
    totalReturns: 7,
    reason: "Refuses payment at doorstep demanding free package opening without courier protocol.",
    status: "Under Review",
    addedDate: "24 Aug 2026",
    addedBy: "Merchant Report",
  },
];

export const initialTransactions: PlatformTransaction[] = [
  { id: "TRX-9981", merchantName: "Dhaka Gadget Hub", merchantId: "MRC-1002", amount: 5999, method: "bKash", type: "Subscription", status: "Completed", date: "24 Aug 2026, 14:32", trxId: "BK99X8102A" },
  { id: "TRX-9982", merchantName: "Rahman Fashion House", merchantId: "MRC-1001", amount: 2499, method: "Nagad", type: "Subscription", status: "Completed", date: "23 Aug 2026, 11:15", trxId: "NG44P9102L" },
  { id: "TRX-9983", merchantName: "Trendy Footwear BD", merchantId: "MRC-1003", amount: 799, method: "bKash", type: "Credit Top-up", status: "Completed", date: "23 Aug 2026, 09:40", trxId: "BK77T1099Q" },
  { id: "TRX-9984", merchantName: "Pure Organics Sylhet", merchantId: "MRC-1004", amount: 2499, method: "Card", type: "Subscription", status: "Completed", date: "22 Aug 2026, 16:20", trxId: "CR88M4401K" },
  { id: "TRX-9985", merchantName: "ElectroMart BD", merchantId: "MRC-1005", amount: 999, method: "bKash", type: "Subscription", status: "Completed", date: "21 Aug 2026, 18:05", trxId: "BK11Z0033N" },
];

export const initialBroadcasts: SystemBroadcast[] = [
  {
    id: "BC-101",
    title: "RedX API Latency Notice",
    message: "RedX booking API is currently experiencing slight dispatch latency. Our auto-routing will prioritize Steadfast/Pathao where applicable.",
    type: "warning",
    target: "All Merchants",
    sentAt: "24 Aug 2026, 13:00",
    deliveredCount: 5420,
  },
  {
    id: "BC-102",
    title: "New 4x6 Thermal Label Standard Released",
    message: "Merchants can now print high-resolution 4x6 thermal barcode labels directly from the new Bulk Labels menu.",
    type: "info",
    target: "All Merchants",
    sentAt: "22 Aug 2026, 10:30",
    deliveredCount: 5420,
  },
];
