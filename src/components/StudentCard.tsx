"use client";

import { useState } from "react";
import Image from "next/image";
import type { Student } from "@/lib/types";

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
    student.department || student.program || student.student_id || student.school;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex flex-col items-center gap-2 rounded-lg border border-navy-light/40 bg-navy-accent/85 p-3 text-center hover:border-gold-accent/50 transition glow-card"
      >
        {student.photo_url ? (
          <Image
            src={student.photo_url}
            alt={student.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-accent/20 text-xs font-medium text-gold-accent">
            {initials(student.name)}
          </div>
        )}
        <p className="text-xs font-medium text-foreground leading-tight">
          {student.name}
        </p>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-xl border border-navy-light/40 bg-navy-accent p-5 shadow-lg max-h-[85vh] overflow-y-auto glow-card"
          >
            <div className="flex items-start gap-3">
              {student.photo_url ? (
                <Image
                  src={student.photo_url}
                  alt={student.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold-accent/20 text-sm font-medium text-gold-accent">
                  {initials(student.name)}
                </div>
              )}
              <div className="flex-1">
                <p className="font-medium text-foreground">{student.name}</p>
                <p className="text-sm text-text-secondary">{student.role}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-text-tertiary hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-1 text-sm text-text-secondary">
              {student.phone && <p>📞 {student.phone}</p>}
              {student.email && <p>✉️ {student.email}</p>}
            </div>

            {hasAcademicInfo && (
              <div className="mt-4 space-y-1 border-t border-navy-light/40 pt-3 text-sm text-text-secondary">
                {student.faculty && <p>{student.faculty}</p>}
                {student.department && <p>{student.department}</p>}
                {student.program && <p>{student.program}</p>}
                {student.session && <p>Session: {student.session}</p>}
                {student.student_id && <p>ID: {student.student_id}</p>}
                {student.school && <p>School: {student.school}</p>}
                {student.college && <p>College: {student.college}</p>}
                {student.present_address && <p>Present address: {student.present_address}</p>}
                {student.hometown && <p>Hometown: {student.hometown}</p>}
              </div>
            )}

            {student.achievements && (
              <div className="mt-4">
                <p className="text-xs uppercase tracking-wide text-text-tertiary">
                  Achievements
                </p>
                <p className="mt-1 text-sm text-text-secondary">
                  {student.achievements}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
