"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { MdDelete } from "react-icons/md";

import { Album, Photo, PhotoFrame } from "../../types/gallery";
import { getPhotoAlbum } from "../../utils/core";
import {
  bulkUpdatePhotos,
  deleteAlbum,
  deletePhoto,
  reorderPhotos,
  updateAlbum,
  updatePhoto,
  uploadPhotos,
} from "../../utils/photography";
import { AlbumDetailsForm } from "./AlbumDetailsForm";
import { PhotoUploader } from "./PhotoUploader";
import { SortablePhotoCard } from "./SortablePhotoCard";
import { BulkActionBar } from "./BulkActionBar";
import { FrameEditor } from "./FrameEditor";

// Keep each multipart request under the backend's 10 MiB limit, with headroom
// for multipart framing overhead.
const CHUNK_BYTES = 9 * 1024 * 1024;

function chunkFiles(files: File[]): File[][] {
  const chunks: File[][] = [];
  let current: File[] = [];
  let size = 0;
  for (const file of files) {
    if (current.length && size + file.size > CHUNK_BYTES) {
      chunks.push(current);
      current = [];
      size = 0;
    }
    current.push(file);
    size += file.size;
  }
  if (current.length) chunks.push(current);
  return chunks;
}

export function AlbumManager({ initialAlbum }: { initialAlbum: Album }) {
  const [album, setAlbum] = useState<Album>(initialAlbum);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [frameEditing, setFrameEditing] = useState<Photo | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>();

  // Read the token after mount so server and first client render agree (no
  // hydration mismatch). `ready` gates rendering until we know the auth state.
  const [ready, setReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(!!window.localStorage.getItem("dstn-management-token"));
    setReady(true);
  }, []);

  const slug = album.slug;
  const names = useMemo(
    () => album.items.map((item) => item.name ?? ""),
    [album.items],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const refresh = useCallback(async () => {
    const fresh = await getPhotoAlbum(slug);
    if (fresh) setAlbum(fresh);
    return fresh;
  }, [slug]);

  // ---- Uploads ---------------------------------------------------------
  const onFiles = useCallback(
    async (files: File[]) => {
      setUploading(true);
      const chunks = chunkFiles(files);
      let done = 0;
      const uploaded: string[] = [];
      const skipped: { name: string; reason: string }[] = [];
      try {
        for (const chunk of chunks) {
          setUploadProgress(`Uploading ${done}/${files.length}…`);
          const result = await uploadPhotos(slug, chunk);
          uploaded.push(...result.uploaded);
          skipped.push(...result.skipped);
          done += chunk.length;
          setAlbum(result.album);
        }
        if (uploaded.length)
          toast.success(
            `Uploaded ${uploaded.length} photo${uploaded.length === 1 ? "" : "s"}`,
          );
        if (skipped.length)
          toast.error(
            `Skipped ${skipped.length}: ${skipped
              .map((s) => `${s.name} (${s.reason})`)
              .join(", ")}`,
          );
        if (!uploaded.length && !skipped.length)
          toast("No photos were uploaded");
      } catch {
        toast.error("Upload failed");
      } finally {
        setUploading(false);
        setUploadProgress(undefined);
      }
    },
    [slug],
  );

  // ---- Reorder ---------------------------------------------------------
  const onDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = names.indexOf(String(active.id));
      const newIndex = names.indexOf(String(over.id));
      if (oldIndex < 0 || newIndex < 0) return;

      const previous = album;
      const reordered = arrayMove(album.items, oldIndex, newIndex);
      setAlbum({ ...album, items: reordered });

      try {
        const updated = await reorderPhotos(
          slug,
          reordered.map((item) => item.name ?? ""),
        );
        setAlbum(updated);
      } catch {
        toast.error("Failed to save order");
        setAlbum(previous);
      }
    },
    [album, names, slug],
  );

  // ---- Per-photo edits -------------------------------------------------
  const onSaveField = useCallback(
    async (name: string, field: "caption" | "instagram", value: string) => {
      try {
        const updated = await updatePhoto(slug, name, {
          [field]: value.trim() ? value : null,
        });
        setAlbum(updated);
      } catch {
        toast.error(`Failed to update ${field}`);
      }
    },
    [slug],
  );

  const onSetCover = useCallback(
    async (name: string) => {
      try {
        const updated = await updateAlbum(slug, { cover: name });
        setAlbum(updated);
        toast.success("Cover updated");
      } catch {
        toast.error("Failed to set cover");
      }
    },
    [slug],
  );

  const onSaveFrame = useCallback(
    async (name: string, frame: PhotoFrame | null) => {
      const updated = await updatePhoto(slug, name, { frame });
      setAlbum(updated);
      toast.success("Frame saved");
    },
    [slug],
  );

  const onDelete = useCallback(
    async (name: string) => {
      if (!confirm(`Delete ${name}? This can't be undone.`)) return;
      try {
        await deletePhoto(slug, name);
        setSelected((prev) => {
          const next = new Set(prev);
          next.delete(name);
          return next;
        });
        // Refetch so a reassigned cover is reflected correctly.
        const fresh = await refresh();
        if (!fresh)
          setAlbum((prev) => ({
            ...prev,
            items: prev.items.filter((item) => item.name !== name),
          }));
        toast.success("Photo deleted");
      } catch {
        toast.error("Failed to delete photo");
      }
    },
    [slug, refresh],
  );

  // ---- Selection / bulk ------------------------------------------------
  const toggleSelect = useCallback((name: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }, []);

  const bulkInstagram = useCallback(
    async (value: string | null) => {
      const targets = [...selected];
      if (!targets.length) return;
      try {
        const updated = await bulkUpdatePhotos(slug, {
          photos: targets.map((name) => ({ name, instagram: value })),
        });
        setAlbum(updated);
        toast.success(
          value ? "Instagram set on selection" : "Instagram cleared",
        );
      } catch {
        toast.error("Bulk update failed");
      }
    },
    [selected, slug],
  );

  const bulkDelete = useCallback(async () => {
    const targets = [...selected];
    if (!targets.length) return;
    if (!confirm(`Delete ${targets.length} photos? This can't be undone.`))
      return;
    try {
      await Promise.all(targets.map((name) => deletePhoto(slug, name)));
      setSelected(new Set());
      const fresh = await refresh();
      if (!fresh)
        setAlbum((prev) => ({
          ...prev,
          items: prev.items.filter((item) => !targets.includes(item.name ?? "")),
        }));
      toast.success(`Deleted ${targets.length} photos`);
    } catch {
      toast.error("Bulk delete failed");
    }
  }, [selected, slug, refresh]);

  const onDeleteAlbum = useCallback(async () => {
    if (
      !confirm(
        `Delete the entire "${album.name}" album and all its photos? This can't be undone.`,
      )
    )
      return;
    try {
      await deleteAlbum(slug);
      toast.success("Album deleted");
      window.location.href = "/photography";
    } catch {
      toast.error("Failed to delete album");
    }
  }, [slug, album.name]);

  if (!ready) {
    return <div className="py-20 text-center opacity-50">Loading…</div>;
  }

  if (!loggedIn) {
    return (
      <div className="rounded-lg bg-neutral-300 p-8 text-center dark:bg-neutral-800">
        <p className="text-lg">You need to be logged in to manage albums.</p>
        <Link href="/login" className="text-blue-400 hover:underline">
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-lg bg-neutral-300 p-5 dark:bg-neutral-800">
        <h2 className="mb-3 text-lg font-bold">Album details</h2>
        <AlbumDetailsForm album={album} onSaved={setAlbum} />
      </section>

      <section className="space-y-4">
        <PhotoUploader
          uploading={uploading}
          progress={uploadProgress}
          onFiles={onFiles}
        />

        {album.items.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
          >
            <SortableContext items={names} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {album.items.map((photo) => (
                  <SortablePhotoCard
                    key={photo.name}
                    slug={slug}
                    photo={photo}
                    isCover={photo.name === album.cover}
                    selected={selected.has(photo.name ?? "")}
                    callbacks={{
                      onToggleSelect: toggleSelect,
                      onSaveField,
                      onDelete,
                      onSetCover,
                      onOpenFrame: setFrameEditing,
                    }}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <p className="py-10 text-center text-lg opacity-70">
            No photos yet — upload some above.
          </p>
        )}
      </section>

      <section className="rounded-lg border border-red-500/30 p-5">
        <h2 className="mb-1 text-lg font-bold text-red-500">Danger zone</h2>
        <p className="mb-3 text-sm opacity-70">
          Deletes the album and every photo in it from storage.
        </p>
        <button
          className="flex items-center gap-1 rounded-md bg-red-500 px-4 py-2 text-white hover:brightness-90 cursor-pointer"
          onClick={onDeleteAlbum}
        >
          <MdDelete size={18} /> Delete album
        </button>
      </section>

      {selected.size > 0 && (
        <BulkActionBar
          count={selected.size}
          onSetInstagram={(v) => bulkInstagram(v)}
          onClearInstagram={() => bulkInstagram(null)}
          onDelete={bulkDelete}
          onClear={() => setSelected(new Set())}
        />
      )}

      {frameEditing && (
        <FrameEditor
          slug={slug}
          photo={frameEditing}
          onSave={(frame) => onSaveFrame(frameEditing.name ?? "", frame)}
          onClose={() => setFrameEditing(null)}
        />
      )}
    </div>
  );
}
