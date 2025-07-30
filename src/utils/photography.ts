import { Album } from "../types/gallery";
import { URL_BASE } from "./core";

interface CreatePostOptions {
  name: string;
  slug: string;
  cover?: string;
  description?: string;
  location?: string;
}

export async function createAlbum(options: CreatePostOptions): Promise<Album> {
  const req = await fetch(`${URL_BASE}/v2/photography/albums`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(window.localStorage.getItem("dstn-management-token")
        ? {
            Authorization: window.localStorage
              .getItem("dstn-management-token")
              ?.toString(),
          }
        : {}),
    },
    body: JSON.stringify(options),
    next: { revalidate: 60 },
  });
  if (req.status != 201) throw { code: "failed_to_create_album" };

  const json: {
    album: Album;
  } = await req.json();

  return json.album;
}
