"use client";

import Image from "next/image";
import type { Student } from "@/data/students";
import { motion } from "framer-motion";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function FeaturedCard({ student }: { student: Student }) {
  const hasAcademicInfo = student.department || student.program || student.studentId;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="flex-1 rounded-2xl border border-navy-light/40 bg-navy-accent/60 p-6 text-center backdrop-blur-sm hover:border-gold-accent/20 transition-all"
    >
      {student.photoUrl ? (
        <Image
          src={student.photoUrl}
          alt={student.name}
          width={96}
          height={96}
          className="mx-auto mb-4 h-24 w-24 rounded-full object-cover object-center border-2 border-gold-accent/30"
        />
      ) : (
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold-accent/20 to-navy-light text-lg font-semibold text-gold-accent border border-gold-accent/30">
          {initials(student.name)}
        </div>
      )}
      <p className="font-semibold text-foreground text-lg">{student.name}</p>
      <p className="text-sm text-text-secondary">{student.role}</p>

      <div className="mt-4 space-y-1 text-xs text-text-tertiary">
        <p>📞 {student.phone}</p>
        <p>✉️ {student.email}</p>
      </div>

      {hasAcademicInfo && (
        <div className="mt-4 space-y-0.5 border-t border-navy-light/40 pt-4 text-left text-xs text-text-tertiary">
          {student.department && <p>{student.department}</p>}
          {student.program && <p>{student.program}</p>}
          {student.session && <p>Session: {student.session}</p>}
          {student.studentId && <p>ID: {student.studentId}</p>}
        </div>
      )}
    </motion.div>
  );
}
