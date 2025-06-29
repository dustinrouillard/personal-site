import Link from "next/link";
import { Album } from "../types/gallery";
import { MdLocationPin } from "react-icons/md";
import { ImageThumbnail } from "./ImageThumbnail";

export function GalleryAlbum({ album }: { album: Album }) {
  return (
    <Link href={`/photography/${album.slug}`}>
      <div className="flex flex-row items-start rounded-lg  bg-neutral-200 dark:bg-black/60 py-6 px-4 border-b-8 border-b-instagram-pink/50 hover:border-b-instagram-pink cursor-pointer hover:brightness-75 transition-all h-full">
        <div className="flex flex-col gap-2 relative">
          <div className="absolute right-0 bg-neutral-400 dark:bg-neutral-900 rounded-lg p-2 m-2 z-10">
            <p className="text-sm">{album.items.length} items</p>
          </div>

          <div className="relative aspect-square">
            <ImageThumbnail
              className="object-cover rounded-md"
              src={`https://cdn.dstn.to/gallery/albums/${album.slug}/${album.cover}`}
              alt={album.name}
              width={1024}
              height={1024}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <p className="text-lg font-bold">{album.name}</p>

            <div className="flex flex-row items-center space-x-1">
              <MdLocationPin />
              <p className="text-sm opacity-60">{album.location}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
