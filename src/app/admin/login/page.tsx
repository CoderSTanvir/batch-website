"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Incorrect email or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <div className="rounded-2xl border border-navy-light/40 bg-navy-accent/60 backdrop-blur-sm p-6">
        <h1 className="mb-2 text-2xl font-bold text-foreground">Admin Login</h1>
        <p className="mb-6 text-sm text-text-secondary">
          Sign in to manage students, alumni, and achievements.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-lg border border-navy-light/40 bg-navy-accent/40 px-3 py-2 text-sm text-foreground placeholder:text-text-tertiary/50 focus:outline-none focus:border-gold-accent/60"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-navy-light/40 bg-navy-accent/40 px-3 py-2 text-sm text-foreground placeholder:text-text-tertiary/50 focus:outline-none focus:border-gold-accent/60"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-gold-accent/80 to-gold-accent/60 px-3 py-2 text-sm font-medium text-navy-accent disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
