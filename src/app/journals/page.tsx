import JournalCard from "@/components/JournalCard";
import { journals } from "@/data/content";

export default function JournalsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="mb-1 text-lg font-medium">Journals</h1>
      <p className="mb-6 text-sm text-gray-500">
        Write-ups and reflections shared by batchmates. Tap an entry to read more.
      </p>
      <div className="space-y-3">
        {journals.map((j) => (
          <JournalCard key={j.id} entry={j} />
        ))}
      </div>
    </div>
  );
}
