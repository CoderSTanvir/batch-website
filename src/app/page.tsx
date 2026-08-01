import Link from "next/link";
import Image from "next/image";
import DevBanner from "@/components/DevBanner";
import FeaturedCard from "@/components/FeaturedCard";
import StudentCard from "@/components/StudentCard";
import { cr, coCr, students } from "@/data/students";

export default function Home() {
  const preview = students.slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      {/* Hero */}
      <section className="rounded-xl border border-gray-200 bg-white p-8 text-center">
        <Image
          src="/logo.jpeg"
          alt="Batch logo"
          width={72}
          height={72}
          className="mx-auto mb-4 rounded-full"
        />
        <h1 className="text-xl font-medium">Welcome, Maritime Law 8th Batch</h1>
        <p className="mt-1 text-sm text-gray-500">
          Bangladesh Maritime University — Batch 25
        </p>
        <div className="mt-5 flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 text-sm text-gray-400">
          Group photo goes here
        </div>
      </section>

      <DevBanner />

      {/* CR / Co-CR */}
      <section className="mt-8">
        <h2 className="mb-3 text-sm font-medium text-gray-500">
          Class representatives
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row">
          <FeaturedCard student={cr} />
          <FeaturedCard student={coCr} />
        </div>
      </section>

      {/* Students preview */}
      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-500">Students</h2>
          <Link href="/students" className="text-sm text-blue-700 hover:underline">
            See all {students.length} →
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {preview.map((s) => (
            <StudentCard key={s.id} student={s} />
          ))}
        </div>
      </section>

      {/* Alumni link */}
      <section className="mt-8 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="font-medium">Alumni</h2>
        <p className="mt-1 text-sm text-gray-500">
          See where our seniors are now.
        </p>
        <Link
          href="/alumni"
          className="mt-3 inline-block text-sm text-blue-700 hover:underline"
        >
          View alumni page →
        </Link>
      </section>

      {/* Achievements + Journals links */}
      <section className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="font-medium">🏆 Achievements</h2>
          <p className="mt-1 text-sm text-gray-500">
            Milestones and recognitions from the batch.
          </p>
          <Link
            href="/achievements"
            className="mt-3 inline-block text-sm text-blue-700 hover:underline"
          >
            View achievements →
          </Link>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="font-medium">📝 Journals</h2>
          <p className="mt-1 text-sm text-gray-500">
            Write-ups and reflections from batchmates.
          </p>
          <Link
            href="/journals"
            className="mt-3 inline-block text-sm text-blue-700 hover:underline"
          >
            View journals →
          </Link>
        </div>
      </section>
    </div>
  );
}
