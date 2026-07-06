import Link from "next/link";
import { Album } from "../types/gallery";
import { MdLocationPin } from "react-icons/md";
import { ImageThumbnail } from "./ImageThumbnail";
import { frameStyle } from "../utils/frame";

export function GalleryAlbum({ album }: { album: Album }) {
  // Fall back to the first photo if no cover is set (e.g. the cover was
  // deleted), so the card never points at a missing image.
  const coverPhoto =
    album.items.find((item) => item.name === album.cover) ?? album.items[0];

  return (
    <Link href={`/photography/${album.slug}`}>
      <div className="flex flex-row items-start rounded-lg  bg-neutral-200 dark:bg-black/60 py-6 px-4 border-b-8 border-b-gray-500/50 hover:border-b-gray-500 cursor-pointer hover:brightness-75 transition-all h-full">
        <div className="flex flex-col gap-2 relative w-full">
          <div className="absolute right-0 bg-neutral-400 dark:bg-neutral-900 rounded-lg p-2 m-2 z-10">
            <p className="text-sm">{album.items.length} items</p>
          </div>

          <div className="relative aspect-square w-full h-auto">
            {coverPhoto?.name ? (
              <ImageThumbnail
                className="object-cover rounded-md"
                style={frameStyle(coverPhoto.frame)}
                src={`https://cdn.dstn.to/gallery/albums/${album.slug}/${coverPhoto.name}`}
                alt={album.name}
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 50vw, 100vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-md bg-neutral-400 text-sm opacity-70 dark:bg-neutral-900">
                No photos
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <p className="text-lg font-bold">{album.name}</p>

            {album.location && (
              <div className="flex flex-row items-center space-x-1">
                <MdLocationPin />
                <p className="text-sm opacity-60">{album.location}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
