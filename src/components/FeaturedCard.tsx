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

export default function FeaturedCard({ student }: { student: Student }) {
  const hasAcademicInfo = student.department || student.program || student.student_id;

  return (
    <div className="flex-1 rounded-xl border border-navy-light/40 bg-navy-accent/85 p-5 text-center glow-card">
      {student.photo_url ? (
        <Image
          src={student.photo_url}
          alt={student.name}
          width={72}
          height={72}
          className="mx-auto mb-3 h-[72px] w-[72px] rounded-full object-cover object-[center_32%]"
        />
      ) : (
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gold-accent/20 text-base font-medium text-gold-accent">
          {initials(student.name)}
        </div>
      )}
      <p className="font-medium text-foreground">{student.name}</p>
      <p className="text-sm text-text-secondary">{student.role}</p>

      <div className="mt-3 space-y-1 text-xs text-text-tertiary">
        {student.phone && <p>📞 {student.phone}</p>}
        {student.email && <p>✉️ {student.email}</p>}
      </div>

      {hasAcademicInfo && (
        <div className="mt-3 space-y-0.5 border-t border-navy-light/40 pt-3 text-left text-xs text-text-tertiary">
          {student.department && <p>{student.department}</p>}
          {student.program && <p>{student.program}</p>}
          {student.session && <p>Session: {student.session}</p>}
          {student.student_id && <p>ID: {student.student_id}</p>}
        </div>
      )}
    </div>
  );
}
