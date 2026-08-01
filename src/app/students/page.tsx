import StudentCard from "@/components/StudentCard";
import { students } from "@/data/students";

export default function StudentsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="mb-1 text-lg font-medium">All students</h1>
      <p className="mb-6 text-sm text-gray-500">Tap a card to see full details.</p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {students.map((s) => (
          <StudentCard key={s.id} student={s} />
        ))}
      </div>
    </div>
  );
}
