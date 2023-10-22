import { UserProps } from "@/utils/constants";
import { create } from "zustand";

export type AuthState = {
  user: UserProps | null;
  loading: boolean;
  reset: () => void;
  updateUser: (user: UserProps) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  reset: () => set({ user: null, loading: false }),
  updateUser: (user) => set({ user }),
}));
