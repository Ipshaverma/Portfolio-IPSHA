"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import {
  Database,
  BarChart2,
  TrendingUp,
  PieChart,
  Server,
  Table,
  Code2,
  Globe,
  Layout,
  Smartphone,
  GitBranch,
  type LucideIcon,
} from "lucide-react";
import data from "@/lib/data/data.json";

const iconMap: Record<string, LucideIcon> = {
  Database,
  BarChart2,
  TrendingUp,
  PieChart,
  Server,
  Table,
  Code2,
  Globe,
  Layout,
  Smartphone,
  GitBranch,
};

const p = data.personal;

export function About() {
  return (
    <section id="about" className="container mx-auto px-4 py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-primary tracking-wider uppercase">
              {p.aboutLabel}
            </h2>
            <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {p.aboutHeading} <br />
              <span className="text-zinc-500">{p.aboutHeadingAccent}</span>
            </h3>
          </div>

          <p className="text-zinc-400 text-lg leading-relaxed">{p.aboutBio1}</p>
          <p className="text-zinc-400 text-lg leading-relaxed">{p.aboutBio2}</p>
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SpotlightCard className="p-8" spotlightColor="rgba(251, 191, 36, 0.1)">
            <h4 className="text-xl font-bold mb-6">Tech Stack</h4>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {data.techStack.map((tech) => {
                const Icon = iconMap[tech.icon] ?? Database;
                return (
                  <div
                    key={tech.name}
                    className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 transition-colors hover:bg-zinc-800 hover:border-primary/30 group"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-800 text-zinc-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
