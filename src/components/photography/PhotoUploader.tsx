"use client";

import { useRef, useState } from "react";
import { MdCloudUpload } from "react-icons/md";

export function PhotoUploader({
  uploading,
  progress,
  onFiles,
}: {
  uploading: boolean;
  // e.g. "Uploading 12/40…" while a batch is in flight.
  progress?: string;
  onFiles: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handle = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    onFiles(Array.from(list));
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
        dragOver
          ? "border-blue-400 bg-blue-400/10"
          : "border-gray-400/50 dark:border-gray-600"
      } ${uploading ? "opacity-60" : "cursor-pointer"}`}
      onClick={() => !uploading && inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (!uploading) handle(e.dataTransfer.files);
      }}
    >
      <MdCloudUpload size={36} className="opacity-60" />
      {uploading ? (
        <p className="font-medium">{progress ?? "Uploading…"}</p>
      ) : (
        <>
          <p className="font-medium">
            Drop photos here or click to select
          </p>
          <p className="text-sm opacity-60">
            Upload one or many at once — large batches are sent in chunks.
          </p>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {
          handle(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
