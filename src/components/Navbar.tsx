import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-y-2 border-b border-gray-200 bg-white px-6 py-3">
      <Link
        href="/admin"
        className="flex items-center gap-1 text-sm text-blue-700 hover:underline"
      >
        <span aria-hidden="true">🔒</span> Admin
      </Link>
      <span className="flex items-center gap-2 font-medium text-gray-900">
        <Image
          src="/logo.jpeg"
          alt="Batch logo"
          width={28}
          height={28}
          className="rounded-full"
        />
        BMU Maritime Law, Batch 25
      </span>
      <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <Link href="/students" className="hover:text-gray-900">Students</Link>
        <Link href="/alumni" className="hover:text-gray-900">Alumni</Link>
        <Link href="/achievements" className="hover:text-gray-900">Achievements</Link>
        <Link href="/journals" className="hover:text-gray-900">Journals</Link>
      </div>
    </nav>
  );
}
