"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { DeveloperCard } from "@/components/ui/DeveloperCard";
import data from "@/lib/data/data.json";

const p = data.personal;

export function BrandLogo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-4 left-4 z-50 pointer-events-none"
      >
        <div className="pointer-events-auto relative flex items-center gap-1 rounded-full border border-white/10 bg-black/50 p-2 shadow-lg shadow-black/20 backdrop-blur-md">
          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 rounded-full px-4 py-2 transition-transform cursor-pointer"
          >
            <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Terminal size={14} strokeWidth={2.5} />
            </div>
            <span className="font-bold tracking-wide text-sm text-zinc-100 hidden sm:inline">
              {p.name}
            </span>
            <span className="font-bold tracking-wide text-sm text-zinc-100 sm:hidden">
              {p.initials}
            </span>
          </motion.button>
        </div>
      </motion.div>

      <DeveloperCard isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
