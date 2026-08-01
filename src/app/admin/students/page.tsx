"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import PhotoUploader from "@/components/admin/PhotoUploader";
import type { Student } from "@/lib/types";

const emptyStudent: Omit<Student, "id"> = {
  name: "",
  role: "Student",
  phone: "",
  email: "",
  achievements: "",
  photo_url: null,
  faculty: "",
  department: "",
  program: "",
  session: "",
  student_id: "",
  school: "",
  college: "",
  present_address: "",
  hometown: "",
  category: "student",
  display_order: 0,
};

function StudentForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Student | Omit<Student, "id">;
  onSave: (s: Student | Omit<Student, "id">) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  const isCrOrCoCr = form.category === "cr" || form.category === "co_cr";

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="rounded-xl border border-gold-accent/30 bg-navy-accent p-4 space-y-3">
      <PhotoUploader
        currentUrl={form.photo_url}
        onUploaded={(url) => set("photo_url", url)}
        folder="students"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Full name" className="input" />
        <select value={form.category} onChange={(e) => set("category", e.target.value as Student["category"])} className="input">
          <option value="student">Student</option>
          <option value="cr">CR</option>
          <option value="co_cr">Co-CR</option>
        </select>
        <input value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="Role / title" className="input" />
        <input value={form.phone ?? ""} onChange={(e) => set("phone", e.target.value)} placeholder="Phone" className="input" />
        <input value={form.email ?? ""} onChange={(e) => set("email", e.target.value)} placeholder="Email" className="input" />
        {isCrOrCoCr && (
          <>
            <input value={form.faculty ?? ""} onChange={(e) => set("faculty", e.target.value)} placeholder="Faculty" className="input" />
            <input value={form.department ?? ""} onChange={(e) => set("department", e.target.value)} placeholder="Department" className="input" />
            <input value={form.program ?? ""} onChange={(e) => set("program", e.target.value)} placeholder="Program" className="input" />
            <input value={form.session ?? ""} onChange={(e) => set("session", e.target.value)} placeholder="Session" className="input" />
            <input value={form.student_id ?? ""} onChange={(e) => set("student_id", e.target.value)} placeholder="Student ID" className="input" />
            <input value={form.school ?? ""} onChange={(e) => set("school", e.target.value)} placeholder="School" className="input" />
            <input value={form.college ?? ""} onChange={(e) => set("college", e.target.value)} placeholder="College" className="input" />
            <input value={form.present_address ?? ""} onChange={(e) => set("present_address", e.target.value)} placeholder="Present address" className="input" />
            <input value={form.hometown ?? ""} onChange={(e) => set("hometown", e.target.value)} placeholder="Hometown" className="input" />
          </>
        )}
      </div>
      <textarea
        value={form.achievements ?? ""}
        onChange={(e) => set("achievements", e.target.value)}
        placeholder="Achievements"
        rows={2}
        className="input w-full"
      />
      <div className="flex gap-2">
        <button onClick={() => onSave(form)} className="btn-primary">Save</button>
        <button onClick={onCancel} className="btn-secondary">Cancel</button>
      </div>
    </div>
  );
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);

  async function load() {
    const supabase = createClient();
    const { data } = await supabase.from("students").select("*").order("category").order("display_order");
    setStudents((data as Student[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave(s: Student | Omit<Student, "id">) {
    const supabase = createClient();
    if ("id" in s) {
      await supabase.from("students").update(s).eq("id", s.id);
    } else {
      await supabase.from("students").insert(s);
    }
    setEditingId(null);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this student?")) return;
    const supabase = createClient();
    await supabase.from("students").delete().eq("id", id);
    load();
  }

  if (loading) return <div className="px-6 py-12 text-text-secondary">Loading…</div>;

  const cr = students.find((s) => s.category === "cr");
  const coCr = students.find((s) => s.category === "co_cr");
  const roster = students.filter((s) => s.category === "student");

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/admin" className="text-sm text-gold-accent hover:underline">← Back to dashboard</Link>
      <h1 className="mt-2 mb-6 text-2xl font-bold text-foreground">Manage Students</h1>

      {["cr", "co_cr"].map((cat) => {
        const person = cat === "cr" ? cr : coCr;
        const label = cat === "cr" ? "Class Representative" : "Co-Class Representative";
        return (
          <div key={cat} className="mb-6">
            <h2 className="mb-2 text-sm font-medium text-text-secondary">{label}</h2>
            {editingId === person?.id ? (
              <StudentForm initial={person} onSave={handleSave} onCancel={() => setEditingId(null)} />
            ) : person ? (
              <div className="flex items-center justify-between rounded-xl border border-navy-light/40 bg-navy-accent/60 p-4">
                <div>
                  <p className="font-medium text-foreground">{person.name}</p>
                  <p className="text-sm text-text-secondary">{person.role}</p>
                </div>
                <button onClick={() => setEditingId(person.id)} className="btn-secondary">Edit</button>
              </div>
            ) : (
              <button
                onClick={() => setEditingId("new")}
                className="rounded-xl border border-dashed border-navy-light/40 p-4 text-sm text-text-tertiary w-full text-left"
              >
                + Add {label}
              </button>
            )}
            {editingId === "new" && !person && (
              <StudentForm
                initial={{ ...emptyStudent, category: cat as Student["category"] }}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
              />
            )}
          </div>
        );
      })}

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-medium text-text-secondary">Students ({roster.length})</h2>
          <button onClick={() => setEditingId("new-student")} className="text-sm text-gold-accent hover:underline">
            + Add student
          </button>
        </div>

        {editingId === "new-student" && (
          <div className="mb-3">
            <StudentForm
              initial={{ ...emptyStudent, display_order: roster.length }}
              onSave={handleSave}
              onCancel={() => setEditingId(null)}
            />
          </div>
        )}

        <div className="space-y-2">
          {roster.map((s) =>
            editingId === s.id ? (
              <StudentForm key={s.id} initial={s} onSave={handleSave} onCancel={() => setEditingId(null)} />
            ) : (
              <div key={s.id} className="flex items-center justify-between rounded-xl border border-navy-light/40 bg-navy-accent/60 p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{s.name}</p>
                  <p className="text-xs text-text-tertiary">{s.phone} {s.email && `· ${s.email}`}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingId(s.id)} className="btn-secondary">Edit</button>
                  <button onClick={() => handleDelete(s.id)} className="text-xs text-red-400 hover:underline">Delete</button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
