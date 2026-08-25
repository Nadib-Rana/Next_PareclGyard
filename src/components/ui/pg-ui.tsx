// src/components/ui/pg-ui.tsx
"use client";

import React, { type ReactNode } from "react";

export function Badge({ variant = "default", children }: { variant?: "default" | "success" | "warning" | "danger" | "indigo" | "gray"; children: ReactNode }) {
  const styles = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-red-50 text-red-700",
    indigo: "bg-indigo-50 text-indigo-700",
    gray: "bg-slate-100 text-slate-500",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
}

export function RiskBadge({ level }: { level: "Safe" | "Moderate" | "High Risk" }) {
  const config = {
    Safe: { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
    Moderate: { dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50" },
    "High Risk": { dot: "bg-red-500", text: "text-red-700", bg: "bg-red-50" },
  };
  const c = config[level] || config.Safe;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {level}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const config: Record<string, string> = {
    Delivered: "bg-emerald-50 text-emerald-700",
    "In Transit": "bg-blue-50 text-blue-700",
    "Out for Delivery": "bg-indigo-50 text-indigo-700",
    "Pending Pickup": "bg-amber-50 text-amber-700",
    Returned: "bg-red-50 text-red-700",
    Cancelled: "bg-slate-100 text-slate-500",
    Paid: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Partial: "bg-orange-50 text-orange-700",
    Disputed: "bg-red-50 text-red-700",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config[status] ?? "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

export function Card({ children, className = "", onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} className={`bg-white border border-slate-200 rounded-xl ${className}`}>
      {children}
    </div>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  disabled = false,
  type = "button",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const base = "inline-flex items-center gap-1.5 font-medium rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm" };
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm",
    secondary: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Input({ label, placeholder, type = "text", value, onChange, className = "" }: {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      {label && <label className="block text-xs font-semibold text-slate-700 mb-1.5">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 placeholder:text-slate-400"
      />
    </div>
  );
}

export function Select({ label, children, className = "" }: { label?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {label && <label className="block text-xs font-semibold text-slate-700 mb-1.5">{label}</label>}
      <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400">
        {children}
      </select>
    </div>
  );
}

export function StatCard({ icon, label, value, sub, subColor = "text-slate-500", trend }: {
  icon: ReactNode;
  label: string;
  value: string;
  sub?: string;
  subColor?: string;
  trend?: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {trend && <p className="text-xs text-emerald-600 font-medium mt-1">{trend}</p>}
          {sub && <p className={`text-xs mt-1 ${subColor}`}>{sub}</p>}
        </div>
        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
          {icon}
        </div>
      </div>
    </Card>
  );
}
