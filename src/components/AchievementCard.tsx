import type { Achievement } from "@/data/content";

export default function AchievementCard({ item }: { item: Achievement }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-xs font-medium text-amber-600">🏆 {item.date}</p>
      <p className="mt-1 font-medium text-gray-900">{item.title}</p>
      <p className="mt-1 text-sm text-gray-600">{item.description}</p>
      <p className="mt-2 text-xs text-gray-400">— {item.studentName}</p>
    </div>
  );
}
