import StudentCard from "@/components/StudentCard";
import { FadeInUp } from "@/components/AnimatedSection";
import { createClient } from "@/lib/supabase/server";
import type { Student } from "@/lib/types";

export default async function StudentsPage() {
  const supabase = await createClient();
  const { data: students } = await supabase
    .from("students")
    .select("*")
    .eq("category", "student")
    .order("display_order");

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <FadeInUp>
        <div>
          <h1 className="mb-1 text-lg font-medium text-foreground">All students</h1>
          <p className="mb-6 text-sm text-text-secondary">Tap a card to see full details.</p>
        </div>
      </FadeInUp>
      <FadeInUp delay={0.1}>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {(students as Student[] | null)?.map((s) => (
            <StudentCard key={s.id} student={s} />
          ))}
        </div>
      </FadeInUp>
    </div>
  );
}
