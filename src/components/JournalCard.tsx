"use client";

import { useState } from "react";
import Image from "next/image";
import type { Journal } from "@/lib/types";

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
  const author = entry.author_name || "Unknown";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-xl border border-navy-light/40 bg-navy-accent/85 p-4 text-left hover:border-gold-accent/50 transition"
      >
        <div className="flex items-start gap-3">
          {entry.author_photo_url ? (
            <Image
              src={entry.author_photo_url}
              alt={author}
              width={40}
              height={40}
              className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold-accent/20 text-xs font-medium text-gold-accent">
              {initials(author)}
            </div>
          )}
          <div>
            <p className="font-medium text-foreground">{entry.title}</p>
            <p className="text-xs text-text-tertiary">
              {author} {entry.date && `· ${entry.date}`}
            </p>
            {entry.excerpt && (
              <p className="mt-1 text-sm text-text-secondary line-clamp-2">
                {entry.excerpt}
              </p>
            )}
          </div>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl border border-navy-light/40 bg-navy-accent p-5 shadow-lg max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-start gap-3">
              {entry.author_photo_url ? (
                <Image
                  src={entry.author_photo_url}
                  alt={author}
                  width={48}
                  height={48}
                  className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold-accent/20 text-sm font-medium text-gold-accent">
                  {initials(author)}
                </div>
              )}
              <div className="flex-1">
                <p className="font-medium text-foreground">{entry.title}</p>
                <p className="text-xs text-text-tertiary">
                  {author} {entry.date && `· ${entry.date}`}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-text-tertiary hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <p className="mt-4 text-sm text-text-secondary whitespace-pre-wrap">
              {entry.content || entry.excerpt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
