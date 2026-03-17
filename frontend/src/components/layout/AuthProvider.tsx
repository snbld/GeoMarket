"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import { AuthContext, User } from "@/lib/auth";
import { api } from "@/lib/api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = api.getToken();
    if (token) {
      api.getMe().then(setUser).catch(() => api.setToken(null)).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.login(email, password);
    api.setToken(res.access_token);
    const me = await api.getMe();
    setUser(me);
  }, []);

  const register = useCallback(async (data: { email: string; password: string; full_name: string; company?: string }) => {
    const res = await api.register(data);
    api.setToken(res.access_token);
    const me = await api.getMe();
    setUser(me);
  }, []);

  const logout = useCallback(() => {
    api.setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
