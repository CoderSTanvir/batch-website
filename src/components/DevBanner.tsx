"use client";

import { motion } from "framer-motion";

export default function DevBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mx-auto my-6 max-w-5xl rounded-xl border border-gold-accent/20 bg-gradient-to-r from-gold-accent/10 via-navy-accent/20 to-gold-accent/10 px-4 py-3 text-sm text-gold-accent backdrop-blur-sm"
    >
      🛠️ This site is still in development — some features and content are placeholders.
    </motion.div>
  );
}
