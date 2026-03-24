import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NotchNav } from "@/components/ui/NotchNav";
import { Footer } from "@/components/ui/Footer";
import { BrandLogo } from "@/components/ui/BrandLogo";
import data from "@/lib/data/data.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: data.personal.name,
  description: `${data.personal.name} – ${data.personal.role} Portfolio`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground selection:bg-primary/20`}
        suppressHydrationWarning
      >
        <div className="glow-bg" />
        <NotchNav />
        <BrandLogo />
        {children}
        <Footer />
      </body>
    </html>
  );
}
