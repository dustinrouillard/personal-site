// "use server";

import { RequestContext } from "next/dist/server/base-server";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { BiChevronLeft } from "react-icons/bi";
import { BsInstagram } from "react-icons/bs";

import Layout from "../../_layout";
import { Album, Photo } from "../../../types/gallery";
import { getPhotoAlbum } from "../../../utils/core";
import { ImageExif } from "../../../components/ImageExif";

interface Props {
  album: Album;
  photo: Photo;
}

export default function AlbumPhotoPage(props: Props) {
  const router = useRouter();

  return (
    <Layout
      active_page="album_photo"
      page_class="space-y-10 py-0 md:py-0 px-2 md:px-12"
    >
      <div className="flex flex-col">
        <div
          className="mb-4 flex space-x-1 items-center opacity-60 hover:opacity-100 cursor-pointer"
          onClick={() => router.push(`/photography/${props.album.slug}`)}
        >
          <BiChevronLeft size={28} />
          <p className="text-lg font-bold">Back to Album</p>
        </div>

        <h1 className="text-2xl font-bold">{props.album.name}</h1>
        <h2 className="text-xl">{props.photo.name}</h2>
      </div>

      <div className="flex flex-col xl:flex-row h-screen justify-between rounded-lg bg-neutral-300 dark:bg-neutral-800 p-2 gap-2">
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <img
            src={`https://cdn.dstn.to/gallery/albums/${props.album.slug}/${props.photo.name}`}
            className="absolute inset-0 h-full w-full object-cover object-center blur-lg opacity-40"
            alt={props.photo.name}
          />

          <div className="flex h-full w-full items-center justify-center relative z-10 p-2">
            <img
              src={`https://cdn.dstn.to/gallery/albums/${props.album.slug}/${props.photo.name}`}
              className="object-contain rounded-lg shadow-md max-h-full max-w-full"
              alt={props.photo.name}
            />
          </div>
        </div>

        <div className="bg-neutral-200 dark:bg-neutral-700 rounded-md p-3 text-nowrap">
          {props.photo.instagram ? (
            <a
              href={props.photo.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
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
              url={`https://cdn.dstn.to/gallery/albums/${props.album.slug}/${props.photo.name}`}
            />
          </Suspense>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(props: RequestContext) {
  const slug = props.query.slug;
  const photoName = props.query.photo as string;
  const album = await getPhotoAlbum(slug as string);
  const photo = album.items.find((item) => item.name == photoName);

  return {
    props: { album, photo },
  };
}
