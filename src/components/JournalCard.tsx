"use client";

import { useState } from "react";
import type { Journal } from "@/data/content";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function JournalCard({ entry }: { entry: Journal }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-xl border border-gray-200 bg-white p-4 text-left hover:border-blue-400 hover:shadow-sm transition"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
            {initials(entry.authorName)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{entry.title}</p>
            <p className="text-xs text-gray-400">
              {entry.authorName} · {entry.date}
            </p>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {entry.excerpt}
            </p>
          </div>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl bg-white p-5 shadow-lg max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700">
                {initials(entry.authorName)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{entry.title}</p>
                <p className="text-xs text-gray-400">
                  {entry.authorName} · {entry.date}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 flex h-32 items-center justify-center rounded-lg border border-dashed border-gray-300 text-xs text-gray-400">
              Journal image goes here
            </div>
            <p className="mt-4 text-sm text-gray-700">{entry.excerpt}</p>
          </div>
        </div>
      )}
    </>
  );
}
