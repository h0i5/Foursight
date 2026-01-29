"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import ToastContainer, { Toast, ToastType } from "./Toast";

interface ToastContextType {
  showToast: (message: string, type: ToastType, description?: string) => void;
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType, description?: string) => {
      const id = Math.random().toString(36).substring(7);
      const newToast: Toast = { id, message, type, description };
      setToasts((prev) => [...prev, newToast]);
    },
    []
  );

  const success = useCallback(
    (message: string, description?: string) => {
      showToast(message, "success", description);
    },
    [showToast]
  );

  const error = useCallback(
    (message: string, description?: string) => {
      showToast(message, "error", description);
    },
    [showToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, success, error }}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
