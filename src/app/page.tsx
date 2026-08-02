import Link from "next/link";
import Image from "next/image";
import DevBanner from "@/components/DevBanner";
import FeaturedCard from "@/components/FeaturedCard";
import StudentCard from "@/components/StudentCard";
import { FadeInUp } from "@/components/AnimatedSection";
import { createClient } from "@/lib/supabase/server";
import type { Student } from "@/lib/types";

export default async function Home() {
  const supabase = await createClient();

  const [{ data: cr }, { data: coCr }, { data: preview }, { data: allStudents }] =
    await Promise.all([
      supabase.from("students").select("*").eq("category", "cr").maybeSingle(),
      supabase.from("students").select("*").eq("category", "co_cr").maybeSingle(),
      supabase
        .from("students")
        .select("*")
        .eq("category", "student")
        .order("display_order")
        .limit(3),
      supabase.from("students").select("id", { count: "exact", head: false }).eq("category", "student"),
    ]);

  const totalStudents = allStudents?.length ?? 0;

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      {/* Hero */}
      <FadeInUp>
        <section className="rounded-xl border border-navy-light/40 bg-navy-accent/85 p-8 text-center">
          <Image
            src="/logo.jpeg"
            alt="Batch logo"
            width={72}
            height={72}
            className="mx-auto mb-4 rounded-full"
          />
          <h1 className="text-xl font-medium text-foreground">Welcome, Maritime Law 8th Batch</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Bangladesh Maritime University — Session: 2025-2026
          </p>
          <div className="mt-5 overflow-hidden rounded-lg border border-navy-light/40">
            <Image
              src="/group-photo.jpg"
              alt="Batch group photo"
              width={1200}
              height={800}
              className="w-full object-cover"
            />
          </div>
        </section>
      </FadeInUp>

      <DevBanner />

      {/* CR / Co-CR */}
      <FadeInUp delay={0.1}>
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-medium text-text-secondary">
            Class representatives
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            {cr && <FeaturedCard student={cr as Student} />}
            {coCr && <FeaturedCard student={coCr as Student} />}
          </div>
        </section>
      </FadeInUp>

      {/* Students preview */}
      <FadeInUp delay={0.2}>
        <section className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium text-text-secondary">Students</h2>
            <Link href="/students" className="text-sm text-gold-accent hover:underline">
              See all {totalStudents} →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {(preview as Student[] | null)?.map((s) => (
              <StudentCard key={s.id} student={s} />
            ))}
          </div>
        </section>
      </FadeInUp>

      {/* Alumni link */}
      <FadeInUp delay={0.3}>
        <section className="mt-8 rounded-xl border border-navy-light/40 bg-navy-accent/85 p-5">
          <h2 className="font-medium text-foreground">Alumni</h2>
          <p className="mt-1 text-sm text-text-secondary">
            See where our seniors are now.
          </p>
          <Link
            href="/alumni"
            className="mt-3 inline-block text-sm text-gold-accent hover:underline"
          >
            View alumni page →
          </Link>
        </section>
      </FadeInUp>

      {/* Achievements + Journals links */}
      <FadeInUp delay={0.4}>
        <section className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-navy-light/40 bg-navy-accent/85 p-5">
            <h2 className="font-medium text-foreground">🏆 Achievements</h2>
            <p className="mt-1 text-sm text-text-secondary">
              Milestones and recognitions from the batch.
            </p>
            <Link
              href="/achievements"
              className="mt-3 inline-block text-sm text-gold-accent hover:underline"
            >
              View achievements →
            </Link>
          </div>
          <div className="rounded-xl border border-navy-light/40 bg-navy-accent/85 p-5">
            <h2 className="font-medium text-foreground">📝 Journals</h2>
            <p className="mt-1 text-sm text-text-secondary">
              Write-ups and reflections from batchmates.
            </p>
            <Link
              href="/journals"
              className="mt-3 inline-block text-sm text-gold-accent hover:underline"
            >
              View journals →
            </Link>
          </div>
        </section>
      </FadeInUp>
    </div>
  );
}
