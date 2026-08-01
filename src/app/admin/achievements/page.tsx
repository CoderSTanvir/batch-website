"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Achievement } from "@/lib/types";

const empty: Omit<Achievement, "id"> = { title: "", description: "", student_name: "", date: "" };

function AchievementForm({ initial, onSave, onCancel }: {
  initial: Achievement | Omit<Achievement, "id">;
  onSave: (a: Achievement | Omit<Achievement, "id">) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  return (
    <div className="rounded-xl border border-gold-accent/30 bg-navy-accent p-4 space-y-3">
      <input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Title" className="input w-full" />
      <div className="grid gap-3 sm:grid-cols-2">
        <input value={form.student_name ?? ""} onChange={(e) => set("student_name", e.target.value)} placeholder="Student / team name" className="input" />
        <input value={form.date ?? ""} onChange={(e) => set("date", e.target.value)} placeholder="Date (e.g. March 2026)" className="input" />
      </div>
      <textarea value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} placeholder="Description" rows={2} className="input w-full" />
      <div className="flex gap-2">
        <button onClick={() => onSave(form)} className="btn-primary">Save</button>
        <button onClick={onCancel} className="btn-secondary">Cancel</button>
      </div>
    </div>
  );
}

export default function AdminAchievementsPage() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);

  async function load() {
    const supabase = createClient();
    const { data } = await supabase.from("achievements").select("*").order("created_at", { ascending: false });
    setItems((data as Achievement[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function handleSave(a: Achievement | Omit<Achievement, "id">) {
    const supabase = createClient();
    if ("id" in a) await supabase.from("achievements").update(a).eq("id", a.id);
    else await supabase.from("achievements").insert(a);
    setEditingId(null);
    load();
  }
  async function handleDelete(id: string) {
    if (!confirm("Delete this achievement?")) return;
    const supabase = createClient();
    await supabase.from("achievements").delete().eq("id", id);
    load();
  }

  if (loading) return <div className="px-6 py-12 text-text-secondary">Loading…</div>;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/admin" className="text-sm text-gold-accent hover:underline">← Back to dashboard</Link>
      <div className="mt-2 mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Manage Achievements</h1>
        <button onClick={() => setEditingId("new")} className="text-sm text-gold-accent hover:underline">+ Add achievement</button>
      </div>

      {editingId === "new" && (
        <div className="mb-3">
          <AchievementForm initial={empty} onSave={handleSave} onCancel={() => setEditingId(null)} />
        </div>
      )}

      <div className="space-y-2">
        {items.map((a) =>
          editingId === a.id ? (
            <AchievementForm key={a.id} initial={a} onSave={handleSave} onCancel={() => setEditingId(null)} />
          ) : (
            <div key={a.id} className="flex items-center justify-between rounded-xl border border-navy-light/40 bg-navy-accent/60 p-3">
              <div>
                <p className="text-sm font-medium text-foreground">{a.title}</p>
                <p className="text-xs text-text-tertiary">{a.student_name} {a.date && `· ${a.date}`}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingId(a.id)} className="btn-secondary">Edit</button>
                <button onClick={() => handleDelete(a.id)} className="text-xs text-red-400 hover:underline">Delete</button>
              </div>
            </div>
          )
        )}
        {items.length === 0 && <p className="text-sm text-text-tertiary">No achievements yet.</p>}
      </div>
    </div>
  );
}
