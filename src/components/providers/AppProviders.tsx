// src/components/providers/AppProviders.tsx
"use client";

import React, { type ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import { AdminProvider } from "@/context/AdminContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <DataProvider>
        <AdminProvider>
          {children}
        </AdminProvider>
      </DataProvider>
    </AuthProvider>
  );
}
