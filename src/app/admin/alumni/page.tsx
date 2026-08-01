"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import PhotoUploader from "@/components/admin/PhotoUploader";
import type { Alumnus } from "@/lib/types";

const empty: Omit<Alumnus, "id"> = {
  name: "", role: "", phone: "", email: "", achievements: "", photo_url: null, display_order: 0,
};

function AlumniForm({ initial, onSave, onCancel }: {
  initial: Alumnus | Omit<Alumnus, "id">;
  onSave: (a: Alumnus | Omit<Alumnus, "id">) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  return (
    <div className="rounded-xl border border-gold-accent/30 bg-navy-accent p-4 space-y-3">
      <PhotoUploader currentUrl={form.photo_url} onUploaded={(url) => set("photo_url", url)} folder="alumni" />
      <div className="grid gap-3 sm:grid-cols-2">
        <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Full name" className="input" />
        <input value={form.role ?? ""} onChange={(e) => set("role", e.target.value)} placeholder="Now at… (role)" className="input" />
        <input value={form.phone ?? ""} onChange={(e) => set("phone", e.target.value)} placeholder="Phone" className="input" />
        <input value={form.email ?? ""} onChange={(e) => set("email", e.target.value)} placeholder="Email" className="input" />
      </div>
      <textarea value={form.achievements ?? ""} onChange={(e) => set("achievements", e.target.value)} placeholder="Notes / achievements" rows={2} className="input w-full" />
      <div className="flex gap-2">
        <button onClick={() => onSave(form)} className="btn-primary">Save</button>
        <button onClick={onCancel} className="btn-secondary">Cancel</button>
      </div>
    </div>
  );
}

export default function AdminAlumniPage() {
  const [alumni, setAlumni] = useState<Alumnus[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);

  async function load() {
    const supabase = createClient();
    const { data } = await supabase.from("alumni").select("*").order("display_order");
    setAlumni((data as Alumnus[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function handleSave(a: Alumnus | Omit<Alumnus, "id">) {
    const supabase = createClient();
    if ("id" in a) await supabase.from("alumni").update(a).eq("id", a.id);
    else await supabase.from("alumni").insert(a);
    setEditingId(null);
    load();
  }
  async function handleDelete(id: string) {
    if (!confirm("Delete this alumnus?")) return;
    const supabase = createClient();
    await supabase.from("alumni").delete().eq("id", id);
    load();
  }

  if (loading) return <div className="px-6 py-12 text-text-secondary">Loading…</div>;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/admin" className="text-sm text-gold-accent hover:underline">← Back to dashboard</Link>
      <div className="mt-2 mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Manage Alumni</h1>
        <button onClick={() => setEditingId("new")} className="text-sm text-gold-accent hover:underline">+ Add alumnus</button>
      </div>

      {editingId === "new" && (
        <div className="mb-3">
          <AlumniForm initial={{ ...empty, display_order: alumni.length }} onSave={handleSave} onCancel={() => setEditingId(null)} />
        </div>
      )}

      <div className="space-y-2">
        {alumni.map((a) =>
          editingId === a.id ? (
            <AlumniForm key={a.id} initial={a} onSave={handleSave} onCancel={() => setEditingId(null)} />
          ) : (
            <div key={a.id} className="flex items-center justify-between rounded-xl border border-navy-light/40 bg-navy-accent/60 p-3">
              <div>
                <p className="text-sm font-medium text-foreground">{a.name}</p>
                <p className="text-xs text-text-tertiary">{a.role}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingId(a.id)} className="btn-secondary">Edit</button>
                <button onClick={() => handleDelete(a.id)} className="text-xs text-red-400 hover:underline">Delete</button>
              </div>
            </div>
          )
        )}
        {alumni.length === 0 && <p className="text-sm text-text-tertiary">No alumni yet.</p>}
      </div>
    </div>
  );
}
