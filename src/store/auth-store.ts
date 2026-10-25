"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UserProfile {
  id: number;
  username: string;
  email?: string | null;
  role: "admin" | "user" | string;
  is_active: boolean;
  created_at?: string;
}

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isHydrated: boolean;
  setAuth: (token: string, user: UserProfile) => void;
  logout: () => void;
  setHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isHydrated: false,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
      setHydrated: (isHydrated) => set({ isHydrated }),
    }),
    {
      name: "aria_auth_session",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
