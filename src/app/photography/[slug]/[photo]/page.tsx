"use server";

import { Metadata } from "next";
import { Suspense } from "react";

import { BsChevronLeft, BsChevronRight, BsInstagram } from "react-icons/bs";

import Layout from "../../../../pages/_layout";
import { getPhotoAlbum } from "../../../../utils/core";
import ImageExif from "../../../../components/ImageExif";
import { BackButton } from "../../../../components/BackButton";
import Link from "next/link";
import { ShareButton } from "../../../../components/ShareButton";
import { notFound } from "next/navigation";

interface Params {
  slug: string;
  photo: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, photo: photoName } = await params;

  const album = await getPhotoAlbum(slug as string);
  if (!album) throw "not found";

  const photo = album.items.find((item) => item.name == photoName);
  if (!photo) throw "not found";

  return {
    twitter: {
      card: "summary_large_image",
      images: [
        {
          url: `https://cdn.dstn.to/gallery/albums/${album.slug}/${photo.name}`,
        },
      ],
    },
    title: `${photo.name} (${album.name}) - Dustin Rouillard`,
    description: `${album.name} (${photo.name})`,
    openGraph: {
      images: [
        {
          url: `https://cdn.dstn.to/gallery/albums/${album.slug}/${photo.name}`,
        },
      ],
    },
  };
}

export default async function AlbumPhotoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, photo: photoName } = await params;

  const album = await getPhotoAlbum(slug as string);

  if (!album) {
    return notFound();
  }

  const index = album.items.findIndex((item) => item.name == photoName);
  const photo = album.items.find((item) => item.name == photoName);
  const previousPhoto = album.items[index - 1];
  const nextPhoto = album.items[index + 1];

  if (!photo)
    return (
      <Layout
        active_page="album_photo"
        page_class="space-y-10 py-0 md:py-0 px-2 md:px-12"
      >
        <div>Photo not found</div>
      </Layout>
    );

  return (
    <Layout active_page="album_photo" page_class="space-y-10 px-2 md:px-12">
      <div className="flex flex-col">
        <BackButton text="Back to album" to={`/photography/${album.slug}`} />

        <div className="flex flex-row justify-between">
          <div className="">
            <h1 className="text-2xl font-bold">{album.name}</h1>
            <h2 className="text-xl">{photo.name}</h2>
          </div>

          <ShareButton album={album} photo={photo} />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row h-screen justify-between rounded-lg bg-neutral-300 dark:bg-neutral-800 p-2 gap-2">
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <div className="flex absolute h-full items-center px-4 justify-between w-full z-20">
            {previousPhoto ? (
              <Link href={`/photography/${album.slug}/${previousPhoto.name}`}>
                <div className="bg-neutral-400 p-2 rounded-full text-black hover:brightness-50 transition-all cursor-pointer">
                  <BsChevronLeft size={20} />
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextPhoto ? (
              <Link href={`/photography/${album.slug}/${nextPhoto.name}`}>
                <div className="bg-neutral-400 p-2 rounded-full text-black hover:brightness-50 transition-all cursor-pointer">
                  <BsChevronRight size={20} />
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <img
            src={`https://cdn.dstn.to/gallery/albums/${album.slug}/${photo.name}`}
            className="absolute inset-0 h-full w-full object-cover object-center blur-lg opacity-40"
            alt={photo.name}
          />

          <div className="flex h-full w-full items-center justify-center relative z-10 p-2">
            <img
              src={`https://cdn.dstn.to/gallery/albums/${album.slug}/${photo.name}`}
              className="object-contain rounded-lg shadow-md max-h-full max-w-full"
              alt={photo.name}
            />
          </div>
        </div>

        <div className="bg-neutral-200 dark:bg-neutral-700 rounded-md p-3 text-nowrap">
          {photo.instagram ? (
            <a href={photo.instagram} target="_blank" rel="noopener noreferrer">
              <div className="flex space-x-2 items-center mb-2 hover:opacity-60 cursor-pointer">
                <BsInstagram size={20} />
                <p className="font-bold">View on Instagram</p>
              </div>
            </a>
          ) : (
            <></>
          )}

          <Suspense
            fallback={<p className="text-nowrap p-2">Loading exif data...</p>}
          >
            <ImageExif
              url={`https://cdn.dstn.to/gallery/albums/${album.slug}/${photo.name}`}
            />
          </Suspense>
        </div>
      </div>
    </Layout>
  );
}
