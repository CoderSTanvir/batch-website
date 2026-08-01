"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/students", label: "Students" },
    { href: "/alumni", label: "Alumni" },
    { href: "/achievements", label: "Achievements" },
    { href: "/journals", label: "Journals" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-b from-navy-accent/80 to-background/70 border-b border-navy-light/30 px-6 py-4"
    >
      <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-y-3">
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground hover:opacity-80 transition">
          <Image
            src="/logo.jpeg"
            alt="Batch logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="hidden sm:inline text-sm">Maritime Law, 2025–2026</span>
        </Link>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <div key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={`transition-colors ${
                    active ? "text-gold-accent font-medium" : "text-text-secondary hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
                {active && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-accent"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <Link
          href="/admin"
          className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-navy-light/50 hover:border-gold-accent/50 transition text-text-tertiary hover:text-gold-accent"
        >
          Admin
        </Link>
      </div>
    </motion.nav>
  );
}
