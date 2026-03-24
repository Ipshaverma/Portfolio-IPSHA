"use client";

import { getProjects, type Project } from "@/lib/data/api";
import { Button } from "@/components/ui/Button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import Link from "next/link";
import Image from "next/image";
import { Github, ArrowUpRight, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import data from "@/lib/data/data.json";

const p = data.personal;

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  return (
    <section id="projects" className="container mx-auto px-4 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Featured Projects
          </h2>
          <p className="text-zinc-400">A selection of my analytics work.</p>
        </div>
        <Button variant="ghost" asChild className="group">
          <Link href={p.github} target="_blank">
            View Github <Github className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
          </Link>
        </Button>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => {
          const colors = [
            "rgba(59, 130, 246, 0.2)",
            "rgba(6, 182, 212, 0.2)",
            "rgba(168, 85, 247, 0.2)",
            "rgba(251, 191, 36, 0.2)",
            "rgba(16, 185, 129, 0.2)",
          ];
          const spotlightColor = colors[index % colors.length];

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <SpotlightCard className="group h-full" spotlightColor={spotlightColor} hoverEffect="lift">
                <div className="flex h-full flex-col p-6">
                  {/* Image / Placeholder */}
                  <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg bg-zinc-800/50 ring-1 ring-white/10 relative flex-shrink-0">
                    {project.image ? (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 z-10" />
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 transition-all duration-500 group-hover:from-zinc-800 group-hover:via-zinc-700 group-hover:to-zinc-800">
                        <BarChart2 className="h-14 w-14 text-zinc-600 group-hover:text-primary/50 transition-colors duration-300" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold leading-tight group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <Link
                      href={project.link}
                      target="_blank"
                      className="rounded-full bg-white/5 p-2 text-zinc-400 transition-all hover:bg-white/20 hover:text-white hover:scale-110 flex-shrink-0"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md bg-zinc-800/50 px-2 py-1 text-xs font-medium text-zinc-300 ring-1 ring-inset ring-white/10 transition-colors group-hover:ring-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
