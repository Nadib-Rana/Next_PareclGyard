// src/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface AuthUser {
  name: string;
  email: string;
  phone?: string;
  role: "merchant" | "admin";
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
        return;
      } catch {
        // invalid json
      }
    }
    if (localStorage.getItem("pg_auth") === "true") {
      setUser({ name: "Demo Merchant", email: "demo@parcelguard.com", role: "merchant" });
    }
  }, []);

  const isAuthenticated = !!user;

  useEffect(() => {
    if (!mounted) return;
    if (user) {
      localStorage.setItem("pg_auth", "true");
      localStorage.setItem("pg_user_v1", JSON.stringify(user));
    } else {
      localStorage.removeItem("pg_auth");
      localStorage.removeItem("pg_user_v1");
    }
  }, [user, mounted]);

  const login = async (email: string, _password: string): Promise<AuthUser> => {
    await new Promise(r => setTimeout(r, 600));

    const isAdmin = email.toLowerCase().includes("admin");
    const loggedUser: AuthUser = {
      name: isAdmin ? "Super Admin" : email.split("@")[0].replace(".", " ").toUpperCase(),
      email,
      role: isAdmin ? "admin" : "merchant",
    };

    setUser(loggedUser);
    return loggedUser;
  };

  const signup = async (name: string, email: string, _password: string, phone: string): Promise<AuthUser> => {
    await new Promise(r => setTimeout(r, 800));

    const newUser: AuthUser = {
      name,
      email,
      phone,
      role: "merchant",
    };

    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
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
