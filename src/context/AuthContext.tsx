// src/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { api } from "../lib/api";

export interface AuthUser {
  name: string;
  email: string;
  phone?: string;
  role: "merchant" | "admin";
  merchantId?: string;
  accessToken?: string;
}

export interface AuthContextValue {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<AuthUser>;
  signup: (name: string, email: string, password: string, phone: string) => Promise<AuthUser>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("pg_user_v1");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem("pg_user_v1");
      }
    }
  }, []);

  const isAuthenticated = !!user;

  useEffect(() => {
    if (!mounted) return;
    if (user) {
      localStorage.setItem("pg_auth", "true");
      localStorage.setItem("pg_user_v1", JSON.stringify(user));
      if (user.accessToken) {
        localStorage.setItem("pg_access_token", user.accessToken);
      }
    } else {
      localStorage.removeItem("pg_auth");
      localStorage.removeItem("pg_user_v1");
      localStorage.removeItem("pg_access_token");
    }
  }, [user, mounted]);

  const login = async (email: string, password: string): Promise<AuthUser> => {
    const res = await api.post<{
      user: { name: string; email: string; role: "merchant" | "admin"; merchantId?: string };
      accessToken: string;
    }>("/auth/login", {
      identifier: email,
      password,
    });

    const loggedUser: AuthUser = {
      name: res.user.name || email.split("@")[0],
      email: res.user.email,
      role: res.user.role,
      merchantId: res.user.merchantId,
      accessToken: res.accessToken,
    };

    setUser(loggedUser);
    return loggedUser;
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    phone: string,
  ): Promise<AuthUser> => {
    const res = await api.post<{
      user: { name: string; email: string; phone?: string; role: "merchant" | "admin" };
      accessToken: string;
    }>("/auth/register", {
      email,
      password,
      firstName: name,
      phoneNumber: phone,
    });

    const newUser: AuthUser = {
      name: res.user.name || name,
      email: res.user.email,
      phone: res.user.phone || phone,
      role: res.user.role || "merchant",
      accessToken: res.accessToken,
    };

    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    api.post("/auth/logout").catch(() => {});
    setUser(null);
    localStorage.removeItem("pg_auth");
    localStorage.removeItem("pg_user_v1");
    localStorage.removeItem("pg_access_token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
