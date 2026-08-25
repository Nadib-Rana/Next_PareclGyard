// src/components/auth/AuthBrandingPanel.tsx
"use client";

import React from "react";
import { Shield } from "lucide-react";

export default function AuthBrandingPanel({
  title = "Protect every parcel.\nDetect fraud before it ships.",
  subtitle = "Bangladesh's most trusted courier fraud detection platform for F-Commerce and e-commerce sellers.",
  quote = "\"ParcelGuard saved us from shipping ৳80,000+ worth of goods to fraudulent customers in just the first month.\"",
  author = "Rahim Hossain",
  role = "Owner, Dhaka Fashion House",
}: {
  title?: string;
  subtitle?: string;
  quote?: string;
  author?: string;
  role?: string;
}) {
  return (
    <div className="hidden lg:flex lg:w-[52%] bg-indigo-700 relative overflow-hidden flex-col justify-between p-12">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-600 rounded-full opacity-60" />
      <div className="absolute bottom-0 -left-24 w-80 h-80 bg-indigo-800 rounded-full opacity-50" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-indigo-500 rounded-full opacity-30" />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
          <Shield size={20} className="text-white" />
        </div>
        <div>
          <div className="font-bold text-white text-lg leading-tight">ParcelGuard</div>
          <div className="text-indigo-200 text-xs font-medium">Smart Courier Intelligence</div>
        </div>
      </div>

      {/* Hero text */}
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-white leading-tight mb-4 whitespace-pre-line">
          {title}
        </h1>
        <p className="text-indigo-200 text-base leading-relaxed max-w-md">
          {subtitle}
        </p>

        <div className="flex items-center gap-8 mt-10">
          {[
            { value: "50,000+", label: "Active Merchants" },
            { value: "2.4M+", label: "Parcels Tracked" },
            { value: "98.2%", label: "Fraud Detection Accuracy" },
          ].map(s => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-indigo-200 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="relative z-10 bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20">
        <p className="text-white text-sm leading-relaxed">{quote}</p>
        <div className="flex items-center gap-3 mt-3">
          <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center text-white font-bold text-xs">
            {author.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="text-white text-xs font-semibold">{author}</div>
            <div className="text-indigo-200 text-xs">{role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
