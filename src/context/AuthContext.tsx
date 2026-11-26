import React, { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '@/api/auth.api';
import { AuthUser, LoginPayload, RegisterPayload } from '@/types/rankly';
import { useQueryClient } from '@tanstack/react-query';

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const queryClient = useQueryClient();

  useEffect(() => {
    let active = true;
    authApi
      .getMe()
      .then((me) => {
        if (active) setUser(me);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const login = async (payload: LoginPayload) => {
    queryClient.clear();
    const authenticated = await authApi.login(payload);
    setUser(authenticated);
  };

  const register = async (payload: RegisterPayload) => {
    queryClient.clear();
    const created = await authApi.register(payload);
    setUser(created);
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
