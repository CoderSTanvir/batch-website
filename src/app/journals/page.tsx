import JournalCard from "@/components/JournalCard";
import { createClient } from "@/lib/supabase/server";
import type { Journal } from "@/lib/types";

export default async function JournalsPage() {
  const supabase = await createClient();
  const { data: journals } = await supabase
    .from("journals")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="mb-1 text-lg font-medium text-foreground">Journals</h1>
      <p className="mb-6 text-sm text-text-secondary">
        Write-ups and reflections shared by batchmates. Tap an entry to read more.
      </p>
      <div className="space-y-3">
        {(journals as Journal[] | null)?.map((j) => (
          <JournalCard key={j.id} entry={j} />
        ))}
      </div>
    </div>
  );
}
