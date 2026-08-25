// src/types/admin.ts

export interface PlatformMerchant {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  plan: "Starter" | "Growth" | "Enterprise";
  status: "Active" | "Suspended" | "Trial";
  joinedDate: string;
  monthlyOrders: number;
  totalParcels: number;
  fraudChecksUsed: number;
  fraudChecksLimit: number;
  balance: number;
  connectedCouriers: string[];
}

export interface CourierHealthMetric {
  id?: string;
  name: string;
  logo?: string;
  color?: string;
  uptime: string;
  latencyMs: number;
  errorRate: string;
  status: "Operational" | "Degraded" | "Outage";
  lastIncident: string;
  dailyRequests: number;
  isActive?: boolean;
  isCustom?: boolean;
  apiUrl?: string;
  apiKey?: string;
  secretKey?: string;
  isConfigured?: boolean;
}

export interface GlobalBlacklistEntry {
  id: string;
  phone: string;
  customerName: string;
  riskScore: number;
  reportedByCount: number;
  totalReturns: number;
  reason: string;
  status: "Confirmed Fraud" | "Suspicious" | "Under Review";
  addedDate: string;
  addedBy: string;
}

export interface PlatformTransaction {
  id: string;
  merchantName: string;
  merchantId: string;
  amount: number;
  method: "bKash" | "Nagad" | "Card" | "Bank Transfer";
  type: "Subscription" | "Credit Top-up";
  status: "Completed" | "Pending" | "Failed";
  date: string;
  trxId: string;
}

export interface SystemBroadcast {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "urgent" | "maintenance";
  target: "All Merchants" | "Starter" | "Growth" | "Enterprise";
  sentAt: string;
  deliveredCount: number;
}