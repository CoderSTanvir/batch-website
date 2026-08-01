import Link from "next/link";
import Image from "next/image";
import DevBanner from "@/components/DevBanner";
import FeaturedCard from "@/components/FeaturedCard";
import StudentCard from "@/components/StudentCard";
import { cr, coCr, students } from "@/data/students";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

export default function Home() {
  const preview = students.slice(0, 6);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:py-16">
      {/* Hero */}
      <FadeInUp className="relative mb-12 lg:mb-16">
        <div className="relative rounded-3xl border border-navy-light/40 bg-gradient-to-br from-navy-accent/60 via-background to-background overflow-hidden p-8 lg:p-12 text-center backdrop-blur-sm">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-accent/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gold-accent/5 blur-3xl" />
          </div>

          <div className="relative z-10">
            <Image
              src="/logo.jpeg"
              alt="Maritime Law Department logo"
              width={80}
              height={80}
              className="mx-auto mb-6 rounded-full border-2 border-gold-accent/30"
            />
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Maritime Law Department
            </h1>
            <p className="text-lg lg:text-xl text-gold-accent font-semibold mb-2">
              Session: 2025–2026
            </p>
            <p className="text-text-secondary mb-8">
              Bangladesh Maritime University — 8th Batch
            </p>
            <div className="mt-8 flex h-40 items-center justify-center rounded-2xl border border-navy-light/40 bg-navy-accent/30 text-sm text-text-tertiary">
              Group photo goes here
            </div>
          </div>
        </div>
      </FadeInUp>

      <DevBanner />

      {/* CR / Co-CR */}
      <FadeInUp delay={0.1} className="mt-12 lg:mt-16">
        <h2 className="mb-6 text-lg font-semibold text-foreground">
          Class Representatives
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FeaturedCard student={cr} />
          <FeaturedCard student={coCr} />
        </div>
      </FadeInUp>

      {/* Students preview */}
      <FadeInUp delay={0.2} className="mt-12 lg:mt-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Featured Students</h2>
          <Link href="/students" className="text-sm text-gold-accent hover:text-gold-accent/80 transition">
            See all {students.length} →
          </Link>
        </div>
        <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {preview.map((s) => (
            <StaggerItem key={s.id}>
              <StudentCard student={s} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </FadeInUp>

      {/* Alumni, Achievements, Journals links */}
      <FadeInUp delay={0.3} className="mt-12 lg:mt-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {/* Alumni */}
          <div className="rounded-2xl border border-navy-light/40 bg-navy-accent/60 backdrop-blur-sm p-6 hover:border-gold-accent/20 transition-all">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-foreground">Alumni</h2>
              <span className="text-2xl">🎓</span>
            </div>
            <p className="text-text-secondary text-sm mb-4">
              See where our seniors are now.
            </p>
            <Link
              href="/alumni"
              className="text-sm text-gold-accent hover:text-gold-accent/80 transition font-medium"
            >
              View alumni page →
            </Link>
          </div>

          {/* Achievements */}
          <div className="rounded-2xl border border-navy-light/40 bg-navy-accent/60 backdrop-blur-sm p-6 hover:border-gold-accent/20 transition-all">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-foreground">Achievements</h2>
              <span className="text-2xl">🏆</span>
            </div>
            <p className="text-text-secondary text-sm mb-4">
              Milestones and recognitions from the batch.
            </p>
            <Link
              href="/achievements"
              className="text-sm text-gold-accent hover:text-gold-accent/80 transition font-medium"
            >
              View achievements →
            </Link>
          </div>

          {/* Journals */}
          <div className="rounded-2xl border border-navy-light/40 bg-navy-accent/60 backdrop-blur-sm p-6 hover:border-gold-accent/20 transition-all">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-foreground">Journals</h2>
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-text-secondary text-sm mb-4">
              Write-ups and reflections from batchmates.
            </p>
            <Link
              href="/journals"
              className="text-sm text-gold-accent hover:text-gold-accent/80 transition font-medium"
            >
              View journals →
            </Link>
          </div>
        </div>
      </FadeInUp>
    </div>
  );
}
