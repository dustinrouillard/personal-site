"use client";

import { toast } from "react-hot-toast";
import { MdShare } from "react-icons/md";

import { Album, Photo } from "../types/gallery";

export function ShareButton({ album, photo }: { album: Album; photo?: Photo }) {
  const handleShare = () => {
    navigator.clipboard.writeText(
      `https://dustin.pics/${album.slug}${photo ? `/${photo.name}` : ""}`,
    );
    toast.success("Link copied to clipboard");
  };

  return (
    <div
      className="flex flex-row items-center space-x-1 hover:opacity-70 cursor-pointer"
      onClick={handleShare}
    >
      <MdShare size={20} />
      <p className="opacity-60">Share</p>
    </div>
  );
}
