"use client";

import { useState } from "react";
import Image from "next/image";
import type { Student } from "@/data/students";
import { motion, AnimatePresence } from "framer-motion";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function StudentCard({ student }: { student: Student }) {
  const [open, setOpen] = useState(false);
  const hasAcademicInfo =
    student.department || student.program || student.studentId || student.school;

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(true)}
        className="flex flex-col items-center gap-2 rounded-xl border border-navy-light/40 bg-navy-accent/40 backdrop-blur-sm p-3 text-center hover:border-gold-accent/30 hover:bg-navy-accent/60 transition-all"
      >
        {student.photoUrl ? (
          <Image
            src={student.photoUrl}
            alt={student.name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover border border-gold-accent/20"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-accent/20 to-navy-light text-xs font-semibold text-gold-accent border border-gold-accent/30">
            {initials(student.name)}
          </div>
        )}
        <p className="text-xs font-medium text-foreground leading-tight line-clamp-2">
          {student.name}
        </p>
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
                className="w-full max-w-sm rounded-2xl border border-navy-light/40 bg-navy-accent/80 backdrop-blur-md p-6 shadow-2xl max-h-[85vh] overflow-y-auto"
              >
                <div className="flex items-start gap-4">
                  {student.photoUrl ? (
                    <Image
                      src={student.photoUrl}
                      alt={student.name}
                      width={56}
                      height={56}
                      className="h-14 w-14 flex-shrink-0 rounded-full object-cover border-2 border-gold-accent/30"
                    />
                  ) : (
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-accent/20 to-navy-light text-sm font-semibold text-gold-accent border border-gold-accent/30">
                      {initials(student.name)}
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{student.name}</p>
                    <p className="text-sm text-text-secondary">{student.role}</p>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="text-text-tertiary hover:text-foreground transition"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-5 space-y-2 text-sm text-text-secondary">
                  <p>📞 {student.phone}</p>
                  <p>✉️ {student.email}</p>
                </div>

                {hasAcademicInfo && (
                  <div className="mt-5 space-y-2 border-t border-navy-light/40 pt-4 text-sm text-text-secondary">
                    {student.faculty && <p className="font-medium text-foreground">{student.faculty}</p>}
                    {student.department && <p>{student.department}</p>}
                    {student.program && <p>{student.program}</p>}
                    {student.session && <p>Session: {student.session}</p>}
                    {student.studentId && <p>ID: {student.studentId}</p>}
                    {student.school && <p>School: {student.school}</p>}
                    {student.college && <p>College: {student.college}</p>}
                    {student.presentAddress && <p>Present address: {student.presentAddress}</p>}
                    {student.hometown && <p>Hometown: {student.hometown}</p>}
                  </div>
                )}

                <div className="mt-5">
                  <p className="text-xs uppercase tracking-wider text-text-tertiary font-semibold">
                    Achievements
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">
                    {student.achievements}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
