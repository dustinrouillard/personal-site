"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateAlbumButton() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("dstn-management-token");
      return !!token;
    }
    return false;
  });

  return loggedIn ? (
    <button
      className="bg-neutral-300 dark:bg-neutral-800 p-2 rounded-md text-sm hover:brightness-75 transition-all h-fit cursor-pointer"
      onClick={() => router.push("/photography/create")}
    >
      Create Album
    </button>
  ) : (
    <></>
  );
}
