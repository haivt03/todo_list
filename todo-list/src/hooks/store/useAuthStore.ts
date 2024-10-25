import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  userId: number | null;
  setUserId: (id: number | null) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      setUserId: (id) => set({ userId: id }),
    }),
    { name: "auth-store" },
  ),
);

