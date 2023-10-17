'use client'

import { useAuthStore } from "@/store/zustand";

const useAuth = () => {
  const auth = useAuthStore();
  return auth;
};

export default useAuth;