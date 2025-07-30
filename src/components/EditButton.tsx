"use client";

import { MdEdit, MdShare } from "react-icons/md";

import { Album, Photo } from "../types/gallery";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export function EditButton({ album, photo }: { album: Album; photo?: Photo }) {
  const router = useRouter();
  const loggedIn = useMemo(() => {
    const token = localStorage.getItem("dstn-management-token");
    return !!token;
  }, []);

  return loggedIn ? (
    <div
      className="flex flex-row items-center space-x-1 hover:opacity-70 cursor-pointer"
      onClick={() => router.push(`/photography/${album.slug}/edit`)}
    >
      <MdEdit size={20} />
      <p className="opacity-60">Edit</p>
    </div>
  ) : (
    <></>
  );
}
