import AchievementCard from "@/components/AchievementCard";
import { FadeInUp } from "@/components/AnimatedSection";
import { createClient } from "@/lib/supabase/server";
import type { Achievement } from "@/lib/types";

export default async function AchievementsPage() {
  const supabase = await createClient();
  const { data: achievements } = await supabase
    .from("achievements")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <FadeInUp>
        <div>
          <h1 className="mb-1 text-lg font-medium text-foreground">Achievements</h1>
          <p className="mb-6 text-sm text-text-secondary">
            Milestones and recognitions from the batch.
          </p>
        </div>
      </FadeInUp>
      <FadeInUp delay={0.1}>
        <div className="grid gap-3 sm:grid-cols-2">
          {(achievements as Achievement[] | null)?.map((a) => (
            <AchievementCard key={a.id} item={a} />
          ))}
        </div>
      </FadeInUp>
    </div>
  );
}
