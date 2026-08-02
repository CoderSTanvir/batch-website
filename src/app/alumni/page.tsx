import StudentCard from "@/components/StudentCard";
import { FadeInUp } from "@/components/AnimatedSection";
import { createClient } from "@/lib/supabase/server";
import type { Student } from "@/lib/types";

export default async function AlumniPage() {
  const supabase = await createClient();
  const { data: alumni } = await supabase
    .from("alumni")
    .select("*")
    .order("display_order");

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <FadeInUp>
        <div>
          <h1 className="mb-1 text-lg font-medium text-foreground">Alumni</h1>
          <p className="mb-6 text-sm text-text-secondary">
            Our seniors — where they are now. Tap a card for details.
          </p>
        </div>
      </FadeInUp>
      <FadeInUp delay={0.1}>
        <div>
          {alumni && alumni.length > 0 ? (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {alumni.map((a) => (
                <StudentCard key={a.id} student={a as unknown as Student} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-tertiary">
              No alumni added yet — check back soon.
            </p>
          )}
        </div>
      </FadeInUp>
    </div>
  );
}
