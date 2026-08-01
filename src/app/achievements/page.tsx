import AchievementCard from "@/components/AchievementCard";
import { achievements } from "@/data/content";

export default function AchievementsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="mb-1 text-lg font-medium">Achievements</h1>
      <p className="mb-6 text-sm text-gray-500">
        Milestones and recognitions from the batch.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {achievements.map((a) => (
          <AchievementCard key={a.id} item={a} />
        ))}
      </div>
    </div>
  );
}
