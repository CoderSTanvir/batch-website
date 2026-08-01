"use client";

import { useState } from "react";
import type { Journal } from "@/data/content";
import { motion, AnimatePresence } from "framer-motion";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function JournalCard({ entry }: { entry: Journal }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ y: -2 }}
        onClick={() => setOpen(true)}
        className="w-full rounded-2xl border border-navy-light/40 bg-navy-accent/60 backdrop-blur-sm p-5 text-left hover:border-gold-accent/20 transition-all"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-accent/20 to-navy-light text-xs font-semibold text-gold-accent border border-gold-accent/30">
            {initials(entry.authorName)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-base">{entry.title}</p>
            <p className="text-xs text-text-tertiary mt-1">
              {entry.authorName} · {entry.date}
            </p>
            <p className="mt-2 text-sm text-text-secondary line-clamp-2">
              {entry.excerpt}
            </p>
          </div>
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              onClick={() => setOpen(false)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl rounded-2xl border border-navy-light/40 bg-navy-accent/80 backdrop-blur-md p-6 shadow-2xl max-h-[85vh] overflow-y-auto"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-accent/20 to-navy-light text-sm font-semibold text-gold-accent border border-gold-accent/30">
                    {initials(entry.authorName)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-lg">{entry.title}</p>
                    <p className="text-xs text-text-tertiary mt-1">
                      {entry.authorName} · {entry.date}
                    </p>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="text-text-tertiary hover:text-foreground transition"
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-6 flex h-40 items-center justify-center rounded-xl border border-navy-light/40 bg-navy-accent/30 text-xs text-text-tertiary">
                  Journal image goes here
                </div>
                <p className="mt-6 text-base text-text-secondary leading-relaxed">{entry.excerpt}</p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
