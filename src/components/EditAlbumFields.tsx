"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { Input } from "./Input";
import { Button } from "./Button";
import { Album } from "../types/gallery";
import { updateAlbum } from "../utils/photography";

export function EditAlbumFields({ album }: { album: Album }) {
  const router = useRouter();

  const [name, setName] = useState(album.name);
  const [location, setLocation] = useState(album.location);
  const [description, setDescription] = useState(album.description);

  const update = useCallback(async () => {
    try {
      const updatedAlbum = await updateAlbum(album.slug, {
        name,
        location,
        description,
      });
      console.log("Updated album:", updatedAlbum);
    } catch (error) {
      console.error(error);
    }
  }, [name, location, description]);

  return (
    <>
      <Input
        name="Name"
        value={name}
        className="w-96"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        name="Location"
        value={location}
        className="w-96"
        onChange={(e) => setLocation(e.target.value)}
      />
      <Input
        name="Description"
        value={description}
        className="w-96"
        onChange={(e) => setDescription(e.target.value)}
        full
      />

      <Button className="px-2 mt-2" onClick={update}>
        Update
      </Button>
    </>
  );
}
