"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Github, Linkedin, Mail, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { sendEmail } from "@/app/actions/contact";
import { Toast } from "@/components/ui/Toast";
import data from "@/lib/data/data.json";

const p = data.personal;

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: p.github,
    color: "hover:text-white",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: p.linkedin,
    color: "hover:text-blue-400",
  },
];

export function Contact() {
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await sendEmail(formData);

      if (result.success) {
        setToast({ message: "Message sent successfully!", type: "success", isVisible: true });
        (e.target as HTMLFormElement).reset();
      } else {
        setToast({
          message: result.error || "Something went wrong.",
          type: "error",
          isVisible: true,
        });
      }
    });
  };

  return (
    <section id="contact" className="container mx-auto px-4 py-24 sm:py-32">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Contact Info & Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-primary tracking-wider uppercase">
              {p.contactLabel}
            </h2>
            <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {p.contactHeading} <br />
              <span className="text-zinc-500">{p.contactHeadingAccent}</span>
            </h3>
          </div>

          <p className="text-zinc-400 text-lg max-w-md">{p.contactBio}</p>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-zinc-300">Find me on</h4>
            <div className="flex flex-col gap-4 sm:flex-row">
              {socialLinks.map((social) => (
                <Link key={social.name} href={social.href} target="_blank" className="flex-1">
                  <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-primary/50 hover:bg-zinc-800 group">
                    <social.icon
                      className={`h-5 w-5 text-zinc-400 transition-colors ${social.color}`}
                    />
                    <span className="font-medium text-zinc-300 group-hover:text-white">
                      {social.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SpotlightCard className="p-8" spotlightColor="rgba(251, 191, 36, 0.1)">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-zinc-300">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-zinc-300">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-zinc-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="flex min-h-[120px] w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  placeholder="Tell me about your data challenge..."
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold cursor-pointer"
                size="lg"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    Sending... <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Send Message <Mail className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
