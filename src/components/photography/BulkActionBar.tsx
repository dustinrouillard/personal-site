"use client";

import { useState } from "react";
import { MdClose } from "react-icons/md";

export function BulkActionBar({
  count,
  onSetInstagram,
  onClearInstagram,
  onDelete,
  onClear,
}: {
  count: number;
  onSetInstagram: (value: string) => void;
  onClearInstagram: () => void;
  onDelete: () => void;
  onClear: () => void;
}) {
  const [instagram, setInstagram] = useState("");

  return (
    <div className="sticky bottom-2 z-30 flex flex-col gap-3 rounded-lg border border-blue-400/40 bg-neutral-100 p-3 shadow-lg dark:bg-neutral-900 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <button
          className="opacity-60 hover:opacity-100 cursor-pointer"
          onClick={onClear}
          title="Clear selection"
        >
          <MdClose size={20} />
        </button>
        <span className="font-medium">{count} selected</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input
          value={instagram}
          placeholder="Instagram URL for all selected"
          onChange={(e) => setInstagram(e.target.value)}
          className="min-w-56 flex-1 rounded-md border border-gray-300 bg-neutral-100 p-1.5 text-sm dark:border-gray-500 dark:bg-neutral-600"
        />
        <button
          className="rounded-md bg-blue-400 px-3 py-1.5 text-sm text-white hover:brightness-90 cursor-pointer disabled:opacity-40"
          disabled={!instagram.trim()}
          onClick={() => {
            onSetInstagram(instagram.trim());
            setInstagram("");
          }}
        >
          Set Instagram
        </button>
        <button
          className="rounded-md border border-gray-400/50 px-3 py-1.5 text-sm hover:brightness-90 cursor-pointer"
          onClick={onClearInstagram}
        >
          Clear Instagram
        </button>
        <button
          className="rounded-md bg-red-500 px-3 py-1.5 text-sm text-white hover:brightness-90 cursor-pointer"
          onClick={onDelete}
        >
          Delete selected
        </button>
      </div>
    </div>
  );
}
