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

export default function FeaturedCard({ student }: { student: Student }) {
  const hasAcademicInfo = student.department || student.program || student.studentId;

  return (
    <div className="flex-1 rounded-xl border border-gray-200 bg-white p-5 text-center">
      {student.photoUrl ? (
        <Image
          src={student.photoUrl}
          alt={student.name}
          width={72}
          height={72}
          className="mx-auto mb-3 h-[72px] w-[72px] rounded-full object-cover"
        />
      ) : (
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-base font-medium text-blue-700">
          {initials(student.name)}
        </div>
      )}
      <p className="font-medium text-gray-900">{student.name}</p>
      <p className="text-sm text-gray-500">{student.role}</p>

      <div className="mt-3 space-y-1 text-xs text-gray-600">
        <p>📞 {student.phone}</p>
        <p>✉️ {student.email}</p>
      </div>

      {hasAcademicInfo && (
        <div className="mt-3 space-y-0.5 border-t border-gray-100 pt-3 text-left text-xs text-gray-500">
          {student.department && <p>{student.department}</p>}
          {student.program && <p>{student.program}</p>}
          {student.session && <p>Session: {student.session}</p>}
          {student.studentId && <p>ID: {student.studentId}</p>}
        </div>
      )}
    </div>
  );
}
