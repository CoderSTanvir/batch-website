"use client";

import { useState } from "react";
import Image from "next/image";
import type { Student } from "@/data/students";

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
      <button
        onClick={() => setOpen(true)}
        className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-3 text-center hover:border-blue-400 hover:shadow-sm transition"
      >
        {student.photoUrl ? (
          <Image
            src={student.photoUrl}
            alt={student.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
            {initials(student.name)}
          </div>
        )}
        <p className="text-xs font-medium text-gray-800 leading-tight">
          {student.name}
        </p>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-xl bg-white p-5 shadow-lg max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-start gap-3">
              {student.photoUrl ? (
                <Image
                  src={student.photoUrl}
                  alt={student.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700">
                  {initials(student.name)}
                </div>
              )}
              <div className="flex-1">
                <p className="font-medium text-gray-900">{student.name}</p>
                <p className="text-sm text-gray-500">{student.role}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-1 text-sm text-gray-700">
              <p>📞 {student.phone}</p>
              <p>✉️ {student.email}</p>
            </div>

            {hasAcademicInfo && (
              <div className="mt-4 space-y-1 border-t border-gray-100 pt-3 text-sm text-gray-700">
                {student.faculty && <p>{student.faculty}</p>}
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

            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Achievements
              </p>
              <p className="mt-1 text-sm text-gray-700">
                {student.achievements}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
