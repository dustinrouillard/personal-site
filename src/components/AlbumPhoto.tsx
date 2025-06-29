import Link from "next/link";
import { Album, Photo } from "../types/gallery";
import { ImageThumbnail } from "./ImageThumbnail";

export function AlbumPhoto({ photo, album }: { photo: Photo; album: Album }) {
  return (
    <Link href={`/photography/${album.slug}/${photo.name}`}>
      <div className="flex flex-row items-start rounded-lg bg-neutral-200 dark:bg-black/60 py-6 px-4 border-b-8 border-b-instagram-pink/50 hover:border-b-instagram-pink cursor-pointer hover:brightness-75 transition-all h-full">
        <div className="flex flex-col gap-2 relative">
          <div className="relative aspect-square">
            <ImageThumbnail
              className="object-cover rounded-md"
              src={`https://cdn.dstn.to/gallery/albums/${album.slug}/${photo.name}`}
              alt={photo.name}
              height={1024}
              width={1024}
            />
          </div>

          {/* <div className="flex flex-col space-y-2">
            <p className="text-lg font-bold">{album.name}</p>


          </div> */}
        </div>
      </div>
    </Link>
  );
}
