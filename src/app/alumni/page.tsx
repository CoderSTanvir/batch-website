import StudentCard from "@/components/StudentCard";
import { alumni } from "@/data/students";

export default function AlumniPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="mb-1 text-lg font-medium">Alumni</h1>
      <p className="mb-6 text-sm text-gray-500">
        Our seniors — where they are now. Tap a card for details.
      </p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {alumni.map((a) => (
          <StudentCard key={a.id} student={a} />
        ))}
      </div>
    </div>
  );
}
