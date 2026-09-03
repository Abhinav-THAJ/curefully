"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getToken, removeToken, isAuthenticated, getUserData, setUserData, loginApi, logoutApi, api } from "@/lib/api";
import { ApiRoutes } from "@/lib/apiRoutes";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isLoggedIn: boolean;
  user: Record<string, unknown> | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser]             = useState<any>(null);
  const [loading, setLoading]       = useState(true);
  const router = useRouter();

  // Fetch the latest profile from the real backend and store it
  const refreshUser = useCallback(async () => {
    try {
      const res = await api.get(ApiRoutes.profile);
      // Backend wraps data in res.data or returns it directly
      const profile = (res?.data || res) as Record<string, unknown>;
      if (profile && profile.id) {
        setUserData(profile);
        setUser(profile);
      }
    } catch {
      // Token may be expired — fall back to cached data
      const cached = getUserData();
      if (cached) setUser(cached);
    }
  }, []);

  useEffect(() => {
    const auth = isAuthenticated();
    setIsLoggedIn(auth);
    if (auth) {
      // Immediately show cached data, then refresh from API
      const cached = getUserData();
      if (cached) setUser(cached);
      refreshUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [refreshUser]);

  const login = useCallback(async (email: string, password: string) => {
    const data = await loginApi(email, password);
    // loginApi already stores the token; extract profile from response
    const profile = data?.data as Record<string, unknown> | undefined;
    if (profile) {
      setUserData(profile);
      setUser(profile);
    }
    setIsLoggedIn(true);
    // Refresh from API to get the latest profile data
    await refreshUser();
  }, [refreshUser]);

  const logout = useCallback(async () => {
    await logoutApi();
    setIsLoggedIn(false);
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, refreshUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
