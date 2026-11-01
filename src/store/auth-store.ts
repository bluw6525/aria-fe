"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UserProfile {
  id: number;
  username: string;
  role: "admin" | "user" | string;
  is_active: boolean;
  created_at?: string;
}

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isHydrated: boolean;
  isValidating: boolean;
  setAuth: (token: string, user: UserProfile) => void;
  updateUser: (user: UserProfile) => void;
  logout: () => void;
  setHydrated: (state: boolean) => void;
  setValidating: (isValidating: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isHydrated: false,
      isValidating: false,
      setAuth: (token, user) => set({ token, user, isValidating: false }),
      updateUser: (user) => set({ user }),
      logout: () => set({ token: null, user: null, isValidating: false }),
      setHydrated: (isHydrated) => set({ isHydrated }),
      setValidating: (isValidating) => set({ isValidating }),
    }),
    {
      name: "aria_auth_session",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
      partialize: (state) => ({ token: state.token, user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
