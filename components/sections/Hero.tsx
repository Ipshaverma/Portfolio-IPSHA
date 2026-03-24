"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { CodeWindow } from "@/components/ui/CodeWindow";
import { RESUME_URL } from "@/lib/constants";
import data from "@/lib/data/data.json";

const p = data.personal;

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-24 sm:pt-0"
    >
      <div className="container grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-8"
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            {p.heroTagline} <br className="hidden sm:block" />
            <span className="text-zinc-500">{p.heroTaglineAccent}</span>
          </h1>

          <p className="max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {p.heroBio}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="#projects">
                View Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link href="#contact">Contact Me</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="group rounded-full px-8 text-zinc-400 hover:text-primary hover:bg-primary/10"
            >
              <Link
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:scale-110" />
                <span>Download Resume</span>
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Visual Content */}
        <div className="flex justify-center lg:justify-end perspective-1000">
          <CodeWindow />
        </div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -z-20 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
    </section>
  );
}
