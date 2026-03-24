"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import data from "@/lib/data/data.json";

const p = data.personal;
const edu = data.education;

const codeString = `const Analyst = {
  name: "${p.name}",
  role: "${p.role}",
  status: "B.Tech IT @ MITS Gwalior",
  skills: ["SQL", "Python", "Power BI", "Pandas"],
  analyze: (data) => data.isMessy ? "Cleaned" : "Insights"
};`;

export function CodeWindow() {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const typeSpeed = 70;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    const animate = () => {
      if (isTyping) {
        if (text.length < codeString.length) {
          setText(codeString.slice(0, text.length + 1));
          timeout = setTimeout(animate, typeSpeed + Math.random() * 20);
        } else {
          setIsTyping(false);
          timeout = setTimeout(animate, pauseTime);
        }
      } else {
        if (text.length > 0) {
          setText(codeString.slice(0, text.length - 1));
          timeout = setTimeout(animate, deleteSpeed);
        } else {
          setIsTyping(true);
          timeout = setTimeout(animate, 500);
        }
      }
    };

    timeout = setTimeout(animate, typeSpeed);
    return () => clearTimeout(timeout);
  }, [text, isTyping]);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const highlightLine = (line: string) => {
    return line
      .replace(/name:/g, '<span class="text-zinc-400">name:</span>')
      .replace(new RegExp(`"${p.name}"`, 'g'), `<span class="text-green-400">"${p.name}"</span>`)
      .replace(/role:/g, '<span class="text-zinc-400">role:</span>')
      .replace(new RegExp(`"${p.role}"`, 'g'), `<span class="text-green-400">"${p.role}"</span>`)
      .replace(/status:/g, '<span class="text-zinc-400">status:</span>')
      .replace(/"B.Tech IT @ MITS Gwalior"/g, '<span class="text-green-400">"B.Tech IT @ MITS Gwalior"</span>')
      .replace(/skills:/g, '<span class="text-zinc-400">skills:</span>')
      .replace(/"SQL"/g, '<span class="text-green-400">"SQL"</span>')
      .replace(/"Python"/g, '<span class="text-green-400">"Python"</span>')
      .replace(/"Power BI"/g, '<span class="text-green-400">"Power BI"</span>')
      .replace(/"Pandas"/g, '<span class="text-green-400">"Pandas"</span>')
      .replace(/analyze:/g, '<span class="text-zinc-400">analyze:</span>')
      .replace(/\(data\)/g, '<span class="text-orange-400">(data)</span>')
      .replace(/=>/g, '<span class="text-purple-400">=></span>')
      .replace(/data\.isMessy/g, '<span class="text-blue-400">data.isMessy</span>')
      .replace(/\?/g, '<span class="text-purple-400">?</span>')
      .replace(/"Cleaned"/g, '<span class="text-green-400">"Cleaned"</span>')
      .replace(/: "Insights"/g, '<span class="text-purple-400">:</span> <span class="text-green-400">"Insights"</span>');
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg cursor-pointer"
    >
      {/* Glow Behind */}
      <div className="absolute -inset-5 rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-50 blur-2xl transition-opacity duration-500" />

      {/* Window Container */}
      <div className="relative h-[320px] overflow-hidden rounded-xl border border-zinc-800 bg-[#0a0a0a]/90 shadow-2xl backdrop-blur-sm flex flex-col">
        {/* Title Bar */}
        <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/50 px-4 py-3 shrink-0">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="ml-4 text-xs font-medium text-zinc-500">analyst.ts</div>
        </div>

        {/* Code Content */}
        <div className="p-6 font-mono text-sm leading-relaxed overflow-hidden">
          <pre className="whitespace-pre-wrap">
            <code className="text-zinc-300">
              <span className="text-purple-400">const</span> <span className="text-blue-400">Analyst</span> = {"{"}
              {"\n"}
              {text.split("\n").slice(1).map((line, i) => (
                <div key={i} dangerouslySetInnerHTML={{ __html: highlightLine(line) }} />
              ))}
              <span className="inline-block h-4 w-2 bg-primary align-middle animate-pulse" />
            </code>
          </pre>
        </div>
      </div>
    </motion.div>
  );
}
