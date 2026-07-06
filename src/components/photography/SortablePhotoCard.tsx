"use client";

import { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  MdDelete,
  MdDragIndicator,
  MdStar,
  MdStarOutline,
  MdCrop,
} from "react-icons/md";
import { BsInstagram } from "react-icons/bs";

import { Photo } from "../../types/gallery";
import { ImageThumbnail } from "../ImageThumbnail";
import { albumImage } from "../../utils/image";
import { frameStyle } from "../../utils/frame";

export interface PhotoCardCallbacks {
  onToggleSelect: (name: string) => void;
  onSaveField: (
    name: string,
    field: "caption" | "instagram",
    value: string,
  ) => void;
  onDelete: (name: string) => void;
  onSetCover: (name: string) => void;
  onOpenFrame: (photo: Photo) => void;
}

export function SortablePhotoCard({
  slug,
  photo,
  isCover,
  selected,
  callbacks,
}: {
  slug: string;
  photo: Photo;
  isCover: boolean;
  selected: boolean;
  callbacks: PhotoCardCallbacks;
}) {
  const name = photo.name ?? "";
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: name });

  const [caption, setCaption] = useState(photo.caption ?? "");
  const [instagram, setInstagram] = useState(photo.instagram ?? "");

  // Keep local drafts in sync when the album is refreshed from the server.
  useEffect(() => setCaption(photo.caption ?? ""), [photo.caption]);
  useEffect(() => setInstagram(photo.instagram ?? ""), [photo.instagram]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex flex-col gap-2 rounded-lg bg-neutral-200 dark:bg-black/60 p-3 ${
        selected ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-md">
        <ImageThumbnail
          className="object-cover"
          style={frameStyle(photo.frame)}
          src={albumImage(slug, name)}
          alt={name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
        />

        <input
          type="checkbox"
          checked={selected}
          onChange={() => callbacks.onToggleSelect(name)}
          className="absolute left-2 top-2 z-10 h-5 w-5 cursor-pointer accent-blue-500"
          aria-label="Select photo"
        />

        <button
          {...attributes}
          {...listeners}
          className="absolute right-2 top-2 z-10 cursor-grab active:cursor-grabbing rounded bg-black/50 p-1 text-white touch-none"
          aria-label="Drag to reorder"
        >
          <MdDragIndicator size={18} />
        </button>

        {isCover && (
          <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 rounded bg-blue-500 px-2 py-1 text-xs font-bold text-white">
            <MdStar size={14} /> Cover
          </div>
        )}
      </div>

      <input
        value={caption}
        placeholder="Caption"
        onChange={(e) => setCaption(e.target.value)}
        onBlur={() => {
          if (caption !== (photo.caption ?? ""))
            callbacks.onSaveField(name, "caption", caption);
        }}
        className="rounded-md border border-gray-300 bg-neutral-100 p-1.5 text-sm dark:border-gray-500 dark:bg-neutral-600"
      />

      <div className="flex items-center gap-1">
        <BsInstagram size={16} className="shrink-0 opacity-60" />
        <input
          value={instagram}
          placeholder="Instagram URL"
          onChange={(e) => setInstagram(e.target.value)}
          onBlur={() => {
            if (instagram !== (photo.instagram ?? ""))
              callbacks.onSaveField(name, "instagram", instagram);
          }}
          className="w-full rounded-md border border-gray-300 bg-neutral-100 p-1.5 text-sm dark:border-gray-500 dark:bg-neutral-600"
        />
      </div>

      <div className="flex items-center justify-between pt-1">
        <button
          className="flex items-center gap-1 text-sm opacity-70 hover:opacity-100 cursor-pointer"
          onClick={() => callbacks.onSetCover(name)}
          disabled={isCover}
          title="Set as album cover"
        >
          {isCover ? <MdStar size={18} /> : <MdStarOutline size={18} />}
          Cover
        </button>
        <button
          className="flex items-center gap-1 text-sm opacity-70 hover:opacity-100 cursor-pointer"
          onClick={() => callbacks.onOpenFrame(photo)}
          title="Reframe preview"
        >
          <MdCrop size={18} /> Frame
        </button>
        <button
          className="flex items-center gap-1 text-sm text-red-500 opacity-80 hover:opacity-100 cursor-pointer"
          onClick={() => callbacks.onDelete(name)}
          title="Delete photo"
        >
          <MdDelete size={18} /> Delete
        </button>
      </div>
    </div>
  );
}
