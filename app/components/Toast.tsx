"use client";
import { useEffect } from "react";

export type ToastType = "success" | "error";

export interface Toast {
  id: string;
  message: string;
  description?: string;
  type: ToastType;
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

function ToastItem({ toast, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <div className="bg-white border border-black p-4 min-w-[300px] max-w-[400px]">
      <h3 className="text-base font-semibold mb-2 text-black">{toast.message}</h3>
      {toast.description && (
        <p className="text-sm text-black/60 font-mono leading-relaxed">{toast.description}</p>
      )}
    </div>
  );
}

export default function ToastContainer({ toasts, onClose }: { toasts: Toast[]; onClose: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}
