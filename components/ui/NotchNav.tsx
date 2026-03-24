"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { RESUME_URL } from "@/lib/constants";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Certs", href: "#certifications" },
  { name: "Contact", href: "#contact" },
  { name: "Resume", href: RESUME_URL },
];

export function NotchNav() {
  const sectionIds = navItems
    .filter((item) => item.href.startsWith("#"))
    .map((item) => item.href.replace("#", ""));

  const activeId = useScrollSpy(sectionIds, -100);
  const activeName =
    navItems.find((item) => item.href.replace("#", "") === activeId)?.name || "Home";

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const offset = -80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition + offset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pointer-events-auto relative flex items-center gap-1 rounded-full border border-white/10 bg-black/50 p-2 shadow-lg shadow-black/20 backdrop-blur-md"
      >
        {/* Mobile View */}
        <div className="flex items-center justify-center px-6 py-2 md:hidden">
          <motion.span
            key={activeName}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm font-medium text-white"
          >
            {activeName}
          </motion.span>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isAnchor = item.href.startsWith("#");
            const isActive =
              activeId === item.href.replace("#", "") ||
              (item.href === "#home" && !activeId);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => isAnchor && handleScroll(e, item.href)}
                target={!isAnchor ? "_blank" : undefined}
                rel={!isAnchor ? "noopener noreferrer" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-white",
                  isActive ? "text-white" : "text-zinc-400"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 z-[-1] rounded-full bg-zinc-800"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {item.name}
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
