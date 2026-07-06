"use client";

import { useCallback, useState } from "react";
import toast from "react-hot-toast";

import { Album } from "../../types/gallery";
import { updateAlbum } from "../../utils/photography";
import { Input } from "../Input";
import { Button } from "../Button";

export function AlbumDetailsForm({
  album,
  onSaved,
}: {
  album: Album;
  onSaved: (album: Album) => void;
}) {
  const [name, setName] = useState(album.name);
  const [location, setLocation] = useState(album.location ?? "");
  const [description, setDescription] = useState(album.description ?? "");
  const [saving, setSaving] = useState(false);

  const dirty =
    name !== album.name ||
    location !== (album.location ?? "") ||
    description !== (album.description ?? "");

  const save = useCallback(async () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    setSaving(true);
    try {
      const updated = await updateAlbum(album.slug, {
        name,
        // Empty string clears the optional field.
        location: location.trim() ? location : null,
        description: description.trim() ? description : null,
      });
      onSaved(updated);
      toast.success("Album details saved");
    } catch {
      toast.error("Failed to save album details");
    } finally {
      setSaving(false);
    }
  }, [album.slug, name, location, description, onSaved]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 md:flex-row">
        <Input
          name="Name"
          value={name}
          className="w-full"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          name="Location"
          value={location}
          className="w-full"
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <Input
        name="Description"
        value={description}
        className="w-full"
        onChange={(e) => setDescription(e.target.value)}
        full
      />
      <Button
        className="w-fit px-4"
        onClick={() => {
          if (!saving && dirty) save();
        }}
      >
        {saving ? "Saving…" : "Save details"}
      </Button>
    </div>
  );
}
