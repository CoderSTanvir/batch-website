"use client";

import type { Achievement } from "@/data/content";
import { motion } from "framer-motion";

export default function AchievementCard({ item }: { item: Achievement }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-navy-light/40 bg-navy-accent/60 backdrop-blur-sm p-6 hover:border-gold-accent/20 transition-all"
    >
      <p className="text-xs font-semibold text-gold-accent tracking-wider">🏆 {item.date}</p>
      <p className="mt-3 font-semibold text-foreground text-lg">{item.title}</p>
      <p className="mt-2 text-sm text-text-secondary">{item.description}</p>
      <p className="mt-4 text-xs text-text-tertiary font-medium">— {item.studentName}</p>
    </motion.div>
  );
}
