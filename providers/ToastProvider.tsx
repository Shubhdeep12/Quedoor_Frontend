"use client";

import CloseIcon from "@/assets/icons/CloseIcon";
import { Slide, ToastContainer, toast } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer
        closeButton={<CloseIcon />}
        position={toast.POSITION.TOP_RIGHT}
        autoClose={3000}
        transition={Slide}
        draggable
			/>
    </>
  );
}