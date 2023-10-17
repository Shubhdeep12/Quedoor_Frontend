import { create } from "zustand";

export type IUser = {
  id: string;
  name: string;
  email: string;
  profileImg?: string;
  city?: string;
  website?: string;
};

export type AuthState = {
  user: IUser | null;
  loading: boolean;
  reset: () => void;
  updateUser: (user: IUser) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  reset: () => set({ user: null, loading: false }),
  updateUser: (user) => set({ user }),
}));
