"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000";

const TOKEN_KEY = "nakshatra_token";

export interface CurrentUser {
  id: number;
  email: string;
  preferred_language: string;
}

interface AuthContextValue {
  user: CurrentUser | null;
  token: string | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function fetchMe(token: string): Promise<CurrentUser | null> {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return res.json();
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      const stored = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
      if (!stored) {
        if (!cancelled) setLoading(false);
        return;
      }
      if (!cancelled) setToken(stored);
      const u = await fetchMe(stored);
      if (cancelled) return;
      if (u) setUser(u);
      else localStorage.removeItem(TOKEN_KEY);
      setLoading(false);
    }

    restoreSession();
    return () => {
      cancelled = true;
    };
  }, []);

  const applyToken = useCallback(async (newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
    const u = await fetchMe(newToken);
    setUser(u);
  }, []);

  async function signup(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({ detail: "Could not create an account." }));
      throw new Error(body.detail);
    }
    const { access_token } = await res.json();
    await applyToken(access_token);
  }

  async function login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({ detail: "Incorrect email or password." }));
      throw new Error(body.detail);
    }
    const { access_token } = await res.json();
    await applyToken(access_token);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
