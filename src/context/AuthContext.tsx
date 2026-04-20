'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type User = {
  name: string;
  email: string;
  joinedAt: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  isGuest: boolean;
  setGuest: (v: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('velli_user');
      if (stored) setUser(JSON.parse(stored));
    } catch {}
  }, []);

  const login = (email: string, name: string) => {
    const u: User = { name, email, joinedAt: new Date().toISOString() };
    setUser(u);
    setIsGuest(false);
    localStorage.setItem('velli_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem('velli_user');
  };

  const setGuest = (v: boolean) => setIsGuest(v);

  return (
    <AuthContext.Provider value={{ user, login, logout, isGuest, setGuest }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
