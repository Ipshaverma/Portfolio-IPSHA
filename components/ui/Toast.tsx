"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-4 right-4 z-[100] flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-900/90 p-4 shadow-2xl backdrop-blur-md md:bottom-8 md:right-8"
        >
          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${type === "success" ? "bg-emerald-500/20 text-emerald-500" : "bg-red-500/20 text-red-500"}`}>
            {type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          </div>

          <div className="flex flex-col">
            <h4 className={`text-sm font-semibold ${type === "success" ? "text-emerald-400" : "text-red-400"}`}>
              {type === "success" ? "Success" : "Error"}
            </h4>
            <p className="text-xs text-zinc-400">{message}</p>
          </div>

          <button
            onClick={onClose}
            className="ml-2 rounded-full p-1 text-zinc-500 hover:bg-white/10 hover:text-zinc-300 transition-colors"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
