"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  authApi,
  getStoredRefreshToken,
  getStoredToken,
  getStoredUser,
  setStoredRefreshToken,
  setStoredToken,
  setStoredUser,
} from "@/lib/api";
import type { User } from "@/types/api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isStudent: boolean;
  isMentor: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [isLoading, setIsLoading] = useState(true);

  // Verify session with the server on mount / reload
  useEffect(() => {
    async function initAuth() {
      try {
        const response = await authApi.getMe();
        if (response.success && response.data) {
          setUser(response.data);
          setStoredUser(response.data);
          const currentToken = getStoredToken();
          if (currentToken) setToken(currentToken);
        }
      } catch {
        // Only if we cannot get / me (and auto-refresh also failed), clear user
        const currentToken = getStoredToken();
        if (!currentToken) {
          setUser(null);
          setStoredUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    }

    initAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<User> => {
      setIsLoading(true);
      try {
        const res = await authApi.signIn({ email, password });
        const { accessToken, refreshToken } = res.data;

        setStoredToken(accessToken);
        setStoredRefreshToken(refreshToken);
        setToken(accessToken);

        // Fetch user profile
        const meRes = await authApi.getMe();
        const userData = meRes.data;

        setUser(userData);
        setStoredUser(userData);

        return userData;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const register = useCallback(
    async (
      email: string,
      password: string,
      fullName: string
    ): Promise<User> => {
      setIsLoading(true);
      try {
        const signUpRes = await authApi.signUp({ email, password, fullName });
        // Automatically sign in after signup
        const signInRes = await authApi.signIn({ email, password });
        const { accessToken, refreshToken } = signInRes.data;

        setStoredToken(accessToken);
        setStoredRefreshToken(refreshToken);
        setToken(accessToken);

        setUser(signUpRes.data);
        setStoredUser(signUpRes.data);

        return signUpRes.data;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      const refreshToken = getStoredRefreshToken();
      await authApi.signOut(refreshToken || undefined);
    } catch {
      // Ignore network errors on logout
    } finally {
      setStoredToken(null);
      setStoredRefreshToken(null);
      setStoredUser(null);
      setUser(null);
      setToken(null);
      router.push("/sign-in");
    }
  }, [router]);

  const refreshUser = useCallback(async (): Promise<User | null> => {
    try {
      const res = await authApi.getMe();
      if (res.success && res.data) {
        setUser(res.data);
        setStoredUser(res.data);
        return res.data;
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  const isAuthenticated = Boolean(user);
  const isStudent = user?.role === "STUDENT";
  const isMentor = user?.role === "MENTOR";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        isStudent,
        isMentor,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
