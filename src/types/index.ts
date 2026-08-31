// src/types/index.ts

export interface Parcel {
  id: string;
  customer: string;
  phone: string;
  address: string;
  district: string;
  area?: string;
  product: string;
  category?: string;
  weight?: string;
  courier: "Steadfast" | "Pathao" | "RedX" | "Paperfly";
  cod: number;
  charge: number;
  advance: number;
  risk: "Safe" | "Moderate" | "High Risk";
  status: "Pending Pickup" | "In Transit" | "Out for Delivery" | "Delivered" | "Returned" | "Cancelled";
  date: string;
  createdAt: string;
  notes?: string;
  agentName?: string;
  agentPhone?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  orders: number;
  delivered: number;
  returned: number;
  rate: string;
  risk: "Safe" | "Moderate" | "High Risk";
  last: string;
  isWatchlist: boolean;
  notes?: string;
}

export interface CourierBreakdown {
  provider: string;
  totalParcels: number;
  delivered: number;
  cancelled: number;
  deliveryRatio: number;
}

export interface VelocityStats {
  recentOrders24h: number;
  recentOrders48h: number;
  distinctMerchantsCount: number;
  isHighVelocity: boolean;
}

export interface FraudCheckResult {
  phone: string;
  name: string;
  risk: "Safe" | "Moderate" | "High Risk";
  score: number;
  date: string;
  totalOrders: number;
  delivered: number;
  returned: number;
  cancelled: number;
  successRate: string;
  factors: string[];
  recommendation: string;
  courierBreakdown?: CourierBreakdown[];
  velocityStats?: VelocityStats;
}

export interface CourierAccount {
  name: string;
  logo: string;
  color: string;
  connected: boolean;
  balance: number;
  sync: string;
  apiKey?: string;
  secretKey?: string;
  merchantId?: string;
  webhookEnabled?: boolean;
}

export interface Settlement {
  id: string;
  courier: string;
  period: string;
  expected: number;
  received: number;
  diff: number;
  status: "Paid" | "Pending" | "Partial" | "Disputed";
  parcelsCount: number;
  disputeReason?: string;
}

export interface AppNotification {
  id: number | string;
  dbId?: string;
  type: "risk" | "payment" | "parcel" | "system" | string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  category: "Parcels" | "Payments" | "Risk Alerts" | "System" | string;
  link?: string;
}

export interface UserSettings {
  merchantName: string;
  phone: string;
  email: string;
  businessType: string;
  businessAddress: string;
  apiKey: string;
  webhookUrl: string;
  notifications: {
    parcelUpdates: boolean;
    paymentUpdates: boolean;
    highRiskAlerts: boolean;
    smsNotifications: boolean;
    emailNotifications: boolean;
  };
}


