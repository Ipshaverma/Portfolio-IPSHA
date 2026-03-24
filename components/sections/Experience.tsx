"use client";

import { getExperience, type Experience } from "@/lib/data/api";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Briefcase, Calendar } from "lucide-react";

export function Experience() {
  const [experience, setExperience] = useState<Experience[]>([]);

  useEffect(() => {
    getExperience().then(setExperience);
  }, []);

  return (
    <section id="experience" className="container mx-auto px-4 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 space-y-2"
      >
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Work Experience
        </h2>
        <p className="text-zinc-400">My professional journey.</p>
      </motion.div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent md:before:mx-auto md:before:translate-x-0">
        {experience.map((role, index) => {
          const colors = [
            "rgba(251, 191, 36, 0.15)",
            "rgba(249, 115, 22, 0.15)",
            "rgba(16, 185, 129, 0.15)",
          ];
          const spotlightColor = colors[index % colors.length];
          const accentColor = spotlightColor.replace("0.15", "1");

          return (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Dot */}
              <div className="absolute left-0 h-10 w-10 rounded-full border border-zinc-800 bg-black flex items-center justify-center md:left-1/2 md:-translate-x-1/2 shadow-lg z-10 ring-4 ring-black">
                <div
                  className="w-3 h-3 rounded-full bg-zinc-500 group-hover:bg-white group-hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300"
                  style={{ boxShadow: `0 0 0 0 ${accentColor}` }}
                />
              </div>

              {/* Content */}
              <div className="ml-16 w-full md:w-[calc(50%-2.5rem)] md:ml-0">
                <SpotlightCard className="p-6" spotlightColor={spotlightColor} hoverEffect="glow">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                      <div>
                        <h3 className="text-lg font-bold text-zinc-100 group-hover:text-white transition-colors">
                          {role.role}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1">
                          <Briefcase className="h-3 w-3" />
                          <span>{role.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-full bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-400 ring-1 ring-inset ring-white/5 transition-colors group-hover:ring-white/20">
                        <Calendar className="h-3 w-3" />
                        <span>{role.duration}</span>
                      </div>
                    </div>

                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {role.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {role.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-zinc-500 ring-1 ring-inset ring-zinc-800 transition-colors group-hover:text-zinc-300 group-hover:ring-zinc-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
