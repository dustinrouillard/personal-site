"use server";
import { Metadata } from "next";
import { MdLocationPin, MdShare } from "react-icons/md";

import Layout from "../../../pages/_layout";
import { getPhotoAlbum } from "../../../utils/core";
import { AlbumPhoto } from "../../../components/AlbumPhoto";
import { BackButton } from "../../../components/BackButton";
import toast from "react-hot-toast";
import { ShareButton } from "../../../components/ShareButton";

interface Params {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;

  const album = await getPhotoAlbum(slug as string);
  if (!album) throw "not found";

  return {
    twitter: {
      card: "summary_large_image",
      images: [
        {
          url: `https://cdn.dstn.to/gallery/albums/${album.slug}/${album.cover}`,
        },
      ],
    },
    title: `${album.name} - Dustin Rouillard`,
    description: `Album has ${album.items.length.toLocaleString()} photos`,
    openGraph: {
      images: [
        {
          url: `https://cdn.dstn.to/gallery/albums/${album.slug}/${album.cover}`,
        },
      ],
    },
  };
}

export default async function PhotographyAlbum({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const album = await getPhotoAlbum(slug);

  return (
    <Layout active_page="gallery_album" page_class="space-y-10">
      <div className="flex flex-col">
        <BackButton text="Back to albums" to="/photography" />

        <div className="flex flex-row justify-between">
          <div className="">
            <h1 className="text-2xl font-bold">{album.name}</h1>
            {album.location ? (
              <div className="flex flex-row items-center space-x-1">
                <MdLocationPin />
                <p className="text-sm opacity-60">{album.location}</p>
              </div>
            ) : (
              <></>
            )}
          </div>

          <ShareButton album={album} />
        </div>

        {album.description ? (
          <p className="mt-4">{album.description}</p>
        ) : (
          <></>
        )}
      </div>

      <div>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 xl:grid-flow-row overflow-scroll p-2 rounded-lg bg-neutral-300 dark:bg-neutral-800 max-h-full gap-4">
          {album.items.map((item) => (
            <AlbumPhoto album={album} photo={item} key={item.name} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
