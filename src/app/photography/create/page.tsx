"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import Layout from "../../../pages/_layout";
import { Input } from "../../../components/Input";
import { createAlbum } from "../../../utils/photography";
import { useRouter } from "next/navigation";

export default function CreateAlbum() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setSlug(name.toLowerCase().replace(/\s+/g, "-"));
  }, [name]);

  useEffect(() => {
    setSlug(slug.toLowerCase().replace(/\s+/g, "-"));
  }, [slug]);

  const create = useCallback(async () => {
    try {
      const album = await createAlbum({ name, slug, location, description });
      router.push(`/photography/${album.slug}`);
    } catch (error) {
      console.error(error);
    }
  }, [name, slug, location, description]);

  return (
    <Layout page_class="space-y-10 h-screen">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Create new Album</h1>
        </div>
      </div>

      <div className="flex justify-center items-center h-full">
        <div className="bg-neutral-300 dark:bg-neutral-800 rounded-lg p-6 space-y-2 w-fit">
          <Input
            name="Name"
            value={name}
            className="w-96"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            name="Slug"
            value={slug}
            className="w-96"
            onChange={(e) => setSlug(e.target.value)}
            required
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

          <Button className="px-2 mt-2" onClick={create}>
            Create
          </Button>
        </div>
      </div>
    </Layout>
  );
}
