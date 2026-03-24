"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Github, Linkedin, Download, BarChart2, Database, Terminal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { RESUME_URL, GITHUB_URL, LINKEDIN_URL } from "@/lib/constants";
import data from "@/lib/data/data.json";

const p = data.personal;

interface DeveloperCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeveloperCard({ isOpen, onClose }: DeveloperCardProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Card Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 z-[70] w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-xl">
              {/* Holographic Gradient Overlay */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10 opacity-50" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-1 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Header / Identity */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-zinc-800 to-black border-2 border-primary/30 shadow-lg shadow-primary/20">
                  <Terminal size={40} className="text-primary" />
                </div>

                <div className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  Identity Verified
                </div>

                <h2 className="mt-2 text-2xl font-bold text-white">{p.name}</h2>
                <p className="text-zinc-400">{p.role}</p>
              </div>

              {/* Stats Grid */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/5 bg-white/5 p-3 text-center transition-colors hover:bg-white/10">
                  <div className="mb-1 flex justify-center text-blue-400">
                    <Database size={20} />
                  </div>
                  <div className="text-lg font-bold text-white">{p.devCardStat1Value}</div>
                  <div className="text-xs text-zinc-500">{p.devCardStat1Label}</div>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 p-3 text-center transition-colors hover:bg-white/10">
                  <div className="mb-1 flex justify-center text-amber-400">
                    <BarChart2 size={20} />
                  </div>
                  <div className="text-lg font-bold text-white">{p.devCardStat2Value}</div>
                  <div className="text-xs text-zinc-500">{p.devCardStat2Label}</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex justify-center gap-4">
                <Link href={GITHUB_URL} target="_blank" className="rounded-full bg-zinc-800 p-3 text-zinc-400 transition-all hover:bg-white hover:text-black hover:scale-110">
                  <Github size={20} />
                </Link>
                <Link href={LINKEDIN_URL} target="_blank" className="rounded-full bg-zinc-800 p-3 text-zinc-400 transition-all hover:bg-[#0077b5] hover:text-white hover:scale-110">
                  <Linkedin size={20} />
                </Link>
              </div>

              {/* Resume Button */}
              <div className="mt-8">
                <Button asChild className="w-full gap-2 rounded-xl bg-primary text-black hover:bg-primary/90 group">
                  <Link href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                    <Download size={18} className="transition-transform group-hover:-translate-y-1" />
                    Download Resume
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
