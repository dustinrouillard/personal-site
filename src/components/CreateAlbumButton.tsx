"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function CreateAlbumButton() {
  const router = useRouter();
  // Read the token after mount to avoid an SSR/client hydration mismatch.
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("dstn-management-token"));
  }, []);

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
