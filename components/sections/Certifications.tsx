"use client";

import { getCertifications, getAwards, type Certification, type Award } from "@/lib/data/api";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Award as AwardIcon, ExternalLink, Trophy } from "lucide-react";
import Link from "next/link";

export function Certifications() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);

  useEffect(() => {
    getCertifications().then(setCerts);
    getAwards().then(setAwards);
  }, []);

  return (
    <section id="certifications" className="container mx-auto px-4 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 space-y-2"
      >
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Certifications & Awards
        </h2>
        <p className="text-zinc-400">Recognition and continuous learning.</p>
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-zinc-300 flex items-center gap-2">
            <AwardIcon className="h-5 w-5 text-primary" />
            Certifications
          </h3>
          <div className="space-y-3">
            {certs.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <SpotlightCard
                  className="p-4"
                  spotlightColor="rgba(251, 191, 36, 0.1)"
                  hoverEffect="glow"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-zinc-100 text-sm">{cert.name}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{cert.issuer}</p>
                    </div>
                    {cert.url && cert.url !== "#" && (
                      <Link
                        href={cert.url}
                        target="_blank"
                        className="text-zinc-500 hover:text-primary transition-colors flex-shrink-0"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-zinc-300 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Honors & Awards
          </h3>
          <div className="space-y-3">
            {awards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <SpotlightCard
                  className="p-4"
                  spotlightColor="rgba(249, 115, 22, 0.1)"
                  hoverEffect="glow"
                >
                  <div>
                    <p className="font-medium text-zinc-100 text-sm">{award.title}</p>
                    {award.organization && (
                      <p className="text-xs text-zinc-500 mt-0.5">{award.organization}</p>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
