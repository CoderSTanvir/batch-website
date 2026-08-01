"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function PhotoUploader({
  currentUrl,
  onUploaded,
  folder,
}: {
  currentUrl: string | null;
  onUploaded: (url: string) => void;
  folder: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);
    const supabase = createClient();

    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("photos")
      .upload(path, file, { upsert: false });

    if (uploadError) {
      setError("Upload failed — try a smaller image.");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("photos").getPublicUrl(path);
    onUploaded(data.publicUrl);
    setUploading(false);
  }

  return (
    <div className="flex items-center gap-3">
      {currentUrl ? (
        <Image
          src={currentUrl}
          alt="Preview"
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-light/40 text-xs text-text-tertiary">
          No photo
        </div>
      )}
      <label className="cursor-pointer rounded-lg border border-navy-light/40 px-3 py-1.5 text-xs text-text-secondary hover:text-foreground">
        {uploading ? "Uploading…" : "Upload photo"}
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          disabled={uploading}
          className="hidden"
        />
      </label>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
