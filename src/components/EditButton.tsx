"use client";

import { MdEdit } from "react-icons/md";

import { Album, Photo } from "../types/gallery";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function EditButton({ album, photo }: { album: Album; photo?: Photo }) {
  const router = useRouter();
  // Read the token after mount so this never touches localStorage during SSR.
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("dstn-management-token"));
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
