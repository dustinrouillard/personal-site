"use server";

import { notFound } from "next/navigation";

import { getPhotoAlbum } from "../../../../utils/core";
import { BackButton } from "../../../../components/BackButton";
import Layout from "../../../../pages/_layout";
import { AlbumManager } from "../../../../components/photography/AlbumManager";

interface Params {
  slug: string;
}

export default async function EditAlbumPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const album = await getPhotoAlbum(slug as string);
  if (!album) return notFound();

  return (
    <Layout active_page="album" page_class="space-y-10 px-2 md:px-12">
      <div className="flex flex-col">
        <BackButton text="Back to album" to={`/photography/${album.slug}`} />

        <div className="flex flex-row">
          <div className="">
            <h1 className="text-2xl font-bold">Editing "{album.name}"</h1>
            <h2 className="text-xl opacity-50">/{album.slug}</h2>
          </div>
        </div>
      </div>

      <AlbumManager initialAlbum={album} />
    </Layout>
  );
}
