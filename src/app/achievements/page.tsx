import AchievementCard from "@/components/AchievementCard";
import { achievements } from "@/data/content";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

export default function AchievementsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:py-16">
      <FadeInUp>
        <h1 className="mb-2 text-3xl lg:text-4xl font-bold text-foreground">Achievements</h1>
        <p className="mb-8 text-text-secondary">Milestones and recognitions from the batch.</p>
      </FadeInUp>

      <StaggerContainer className="grid gap-6 sm:grid-cols-2">
        {achievements.map((a) => (
          <StaggerItem key={a.id}>
            <AchievementCard item={a} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
