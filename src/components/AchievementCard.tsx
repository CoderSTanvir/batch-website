import type { Achievement } from "@/lib/types";

export default function AchievementCard({ item }: { item: Achievement }) {
  return (
    <div className="rounded-xl border border-navy-light/40 bg-navy-accent/85 p-4">
      {item.date && <p className="text-xs font-medium text-gold-accent">🏆 {item.date}</p>}
      <p className="mt-1 font-medium text-foreground">{item.title}</p>
      {item.description && (
        <p className="mt-1 text-sm text-text-secondary">{item.description}</p>
      )}
      {item.student_name && (
        <p className="mt-2 text-xs text-text-tertiary">— {item.student_name}</p>
      )}
    </div>
  );
}
