"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Check, Info } from "lucide-react";
import { sound } from "@/utils/sound";

interface ToastContextType {
  showToast: (message: string, type?: "success" | "info") => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "info";
  } | null>(null);

  const showToast = useCallback((message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    if (type === "success") {
      sound.playSuccess();
    } else {
      sound.playClick();
    }
    setTimeout(() => {
      setToast(null);
    }, 2800);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-mono shadow-2xl border border-neutral-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toast.type === "success" ? (
            <Check className="w-4 h-4 text-white shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-zinc-300 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
};
