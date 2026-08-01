"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import PhotoUploader from "@/components/admin/PhotoUploader";
import type { Journal } from "@/lib/types";

const empty: Omit<Journal, "id"> = {
  title: "", author_name: "", author_photo_url: null, date: "", excerpt: "", content: "",
};

function JournalForm({ initial, onSave, onCancel }: {
  initial: Journal | Omit<Journal, "id">;
  onSave: (j: Journal | Omit<Journal, "id">) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  return (
    <div className="rounded-xl border border-gold-accent/30 bg-navy-accent p-4 space-y-3">
      <PhotoUploader currentUrl={form.author_photo_url} onUploaded={(url) => set("author_photo_url", url)} folder="journals" />
      <input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Title" className="input w-full" />
      <div className="grid gap-3 sm:grid-cols-2">
        <input value={form.author_name ?? ""} onChange={(e) => set("author_name", e.target.value)} placeholder="Author name" className="input" />
        <input value={form.date ?? ""} onChange={(e) => set("date", e.target.value)} placeholder="Date (e.g. April 2026)" className="input" />
      </div>
      <textarea value={form.excerpt ?? ""} onChange={(e) => set("excerpt", e.target.value)} placeholder="Short excerpt (shown in the list)" rows={2} className="input w-full" />
      <textarea value={form.content ?? ""} onChange={(e) => set("content", e.target.value)} placeholder="Full content (shown when opened)" rows={5} className="input w-full" />
      <div className="flex gap-2">
        <button onClick={() => onSave(form)} className="btn-primary">Save</button>
        <button onClick={onCancel} className="btn-secondary">Cancel</button>
      </div>
    </div>
  );
}

export default function AdminJournalsPage() {
  const [items, setItems] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);

  async function load() {
    const supabase = createClient();
    const { data } = await supabase.from("journals").select("*").order("created_at", { ascending: false });
    setItems((data as Journal[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function handleSave(j: Journal | Omit<Journal, "id">) {
    const supabase = createClient();
    if ("id" in j) await supabase.from("journals").update(j).eq("id", j.id);
    else await supabase.from("journals").insert(j);
    setEditingId(null);
    load();
  }
  async function handleDelete(id: string) {
    if (!confirm("Delete this journal entry?")) return;
    const supabase = createClient();
    await supabase.from("journals").delete().eq("id", id);
    load();
  }

  if (loading) return <div className="px-6 py-12 text-text-secondary">Loading…</div>;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/admin" className="text-sm text-gold-accent hover:underline">← Back to dashboard</Link>
      <div className="mt-2 mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Manage Journals</h1>
        <button onClick={() => setEditingId("new")} className="text-sm text-gold-accent hover:underline">+ Add journal</button>
      </div>

      {editingId === "new" && (
        <div className="mb-3">
          <JournalForm initial={empty} onSave={handleSave} onCancel={() => setEditingId(null)} />
        </div>
      )}

      <div className="space-y-2">
        {items.map((j) =>
          editingId === j.id ? (
            <JournalForm key={j.id} initial={j} onSave={handleSave} onCancel={() => setEditingId(null)} />
          ) : (
            <div key={j.id} className="flex items-center justify-between rounded-xl border border-navy-light/40 bg-navy-accent/60 p-3">
              <div>
                <p className="text-sm font-medium text-foreground">{j.title}</p>
                <p className="text-xs text-text-tertiary">{j.author_name} {j.date && `· ${j.date}`}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingId(j.id)} className="btn-secondary">Edit</button>
                <button onClick={() => handleDelete(j.id)} className="text-xs text-red-400 hover:underline">Delete</button>
              </div>
            </div>
          )
        )}
        {items.length === 0 && <p className="text-sm text-text-tertiary">No journal entries yet.</p>}
      </div>
    </div>
  );
}
