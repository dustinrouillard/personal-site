"use client";

import { useCallback, useRef, useState } from "react";
import { MdClose, MdRestartAlt } from "react-icons/md";

import { Photo, PhotoFrame } from "../../types/gallery";
import { albumImage, proxiedImage } from "../../utils/image";
import { frameObjectPosition } from "../../utils/frame";
import { Button } from "../Button";

const clamp = (v: number) => Math.max(0, Math.min(100, v));

export function FrameEditor({
  slug,
  photo,
  onSave,
  onClose,
}: {
  slug: string;
  photo: Photo;
  // Persist the new frame (null resets to centered). Should resolve when done.
  onSave: (frame: PhotoFrame | null) => Promise<void>;
  onClose: () => void;
}) {
  const [x, setX] = useState(photo.frame?.x ?? 50);
  const [y, setY] = useState(photo.frame?.y ?? 50);
  const [saving, setSaving] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  const src = proxiedImage(albumImage(slug, photo.name ?? ""), 1000);

  // Drag on the crop preview to pan: moving right reveals the right of the
  // image (higher object-position X), moving down reveals the bottom.
  const onPointerMove = useCallback((clientX: number, clientY: number) => {
    const box = boxRef.current;
    if (!box || !last.current) return;
    const rect = box.getBoundingClientRect();
    const dx = ((clientX - last.current.x) / rect.width) * 100;
    const dy = ((clientY - last.current.y) / rect.height) * 100;
    setX((prev) => clamp(prev + dx));
    setY((prev) => clamp(prev + dy));
    last.current = { x: clientX, y: clientY };
  }, []);

  const startDrag = (clientX: number, clientY: number) => {
    dragging.current = true;
    last.current = { x: clientX, y: clientY };
  };
  const endDrag = () => {
    dragging.current = false;
    last.current = null;
  };

  const isCentered = Math.round(x) === 50 && Math.round(y) === 50;

  const save = useCallback(async () => {
    setSaving(true);
    try {
      const rounded = { x: Math.round(x), y: Math.round(y) };
      await onSave(isCentered ? null : rounded);
      onClose();
    } finally {
      setSaving(false);
    }
  }, [x, y, isCentered, onSave, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-neutral-200 dark:bg-neutral-800 p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Reframe preview</h2>
          <button
            className="opacity-60 hover:opacity-100 cursor-pointer"
            onClick={onClose}
          >
            <MdClose size={22} />
          </button>
        </div>

        <p className="text-sm opacity-60">
          Drag the image to choose what stays visible in the square crop used
          for thumbnails and the album cover.
        </p>

        <div
          ref={boxRef}
          className="relative aspect-square w-full overflow-hidden rounded-md bg-black touch-none cursor-grab active:cursor-grabbing select-none"
          onPointerDown={(e) => {
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
            startDrag(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => {
            if (dragging.current) onPointerMove(e.clientX, e.clientY);
          }}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <img
            src={src}
            alt={photo.name ?? "Photo"}
            draggable={false}
            className="h-full w-full object-cover pointer-events-none"
            style={{ objectPosition: frameObjectPosition({ x, y }) }}
          />
        </div>

        <div className="space-y-3">
          <label className="block">
            <span className="text-sm opacity-70">Horizontal</span>
            <input
              type="range"
              min={0}
              max={100}
              value={x}
              onChange={(e) => setX(Number(e.target.value))}
              className="w-full"
            />
          </label>
          <label className="block">
            <span className="text-sm opacity-70">Vertical</span>
            <input
              type="range"
              min={0}
              max={100}
              value={y}
              onChange={(e) => setY(Number(e.target.value))}
              className="w-full"
            />
          </label>
        </div>

        <div className="flex items-center justify-between gap-2">
          <button
            className="flex items-center gap-1 text-sm opacity-60 hover:opacity-100 cursor-pointer disabled:opacity-30"
            onClick={() => {
              setX(50);
              setY(50);
            }}
            disabled={isCentered}
          >
            <MdRestartAlt size={18} /> Center
          </button>
          <Button className="w-fit px-4" onClick={save}>
            {saving ? "Saving…" : "Save frame"}
          </Button>
        </div>
      </div>
    </div>
  );
}
