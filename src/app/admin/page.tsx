"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const sections = [
  { href: "/admin/students", label: "Students", desc: "Edit CR, Co-CR, and the student roster" },
  { href: "/admin/alumni", label: "Alumni", desc: "Add, edit, or remove alumni" },
  { href: "/admin/achievements", label: "Achievements", desc: "Manage batch achievements" },
  { href: "/admin/journals", label: "Journals", desc: "Post and edit journal entries" },
];

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          {user && (
            <p className="text-sm text-text-secondary">Signed in as {user.email}</p>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-navy-light/40 px-3 py-1.5 text-sm text-text-secondary hover:text-foreground"
        >
          Sign out
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="rounded-2xl border border-navy-light/40 bg-navy-accent/60 p-5 hover:border-gold-accent/50 transition"
          >
            <p className="font-medium text-foreground">{s.label}</p>
            <p className="mt-1 text-sm text-text-secondary">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
