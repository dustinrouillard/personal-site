import { Album, PhotoFrame } from "../types/gallery";
import { URL_BASE } from "./core";

interface CreateOptions {
  name: string;
  slug: string;
  cover?: string;
  description?: string;
  location?: string;
}

// The management token is stored in localStorage after logging in. Every
// mutating photography request needs it in the Authorization header.
function authHeaders(extra?: Record<string, string>): Record<string, string> {
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("dstn-management-token")
      : null;

  return {
    ...(extra ?? {}),
    ...(token ? { Authorization: token } : {}),
  };
}

// Tri-state field: `undefined` omits the key (leave unchanged), `null` clears
// it, any other value sets it. Used by the photo update endpoints.
type TriState<T> = T | null | undefined;

function triState<T extends object>(fields: T): Partial<T> {
  const body: Partial<T> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) (body as Record<string, unknown>)[key] = value;
  }
  return body;
}

const ALBUMS = `${URL_BASE}/v2/photography/albums`;

export async function createAlbum(options: CreateOptions): Promise<Album> {
  const req = await fetch(ALBUMS, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(options),
  });
  if (req.status != 201) throw { code: "failed_to_create_album" };

  const json: { album: Album } = await req.json();
  return json.album;
}

export async function updateAlbum(
  slug: string,
  options: {
    name?: TriState<string>;
    cover?: TriState<string>;
    location?: TriState<string>;
    description?: TriState<string>;
  },
): Promise<Album> {
  const req = await fetch(`${ALBUMS}/${slug}`, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(triState(options)),
  });
  if (req.status != 200) throw { code: "failed_to_update_album" };

  const json: { album: Album } = await req.json();
  return json.album;
}

export async function deleteAlbum(slug: string): Promise<void> {
  const req = await fetch(`${ALBUMS}/${slug}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (req.status != 204) throw { code: "failed_to_delete_album" };
}

export interface UploadSkip {
  name: string;
  reason: string;
}

export interface UploadResult {
  album: Album;
  uploaded: string[];
  skipped: UploadSkip[];
}

// Uploads the whole batch in a single multipart request (field `file` repeated
// once per photo). The backend enforces a 10 MiB total request limit, so large
// batches should be chunked by the caller.
export async function uploadPhotos(
  slug: string,
  files: File[],
): Promise<UploadResult> {
  const form = new FormData();
  for (const file of files) form.append("file", file, file.name);

  const req = await fetch(`${ALBUMS}/${slug}`, {
    method: "PUT",
    headers: authHeaders(),
    body: form,
  });
  if (req.status != 200) throw { code: "failed_to_upload_photos" };

  return (await req.json()) as UploadResult;
}

export async function updatePhoto(
  slug: string,
  name: string,
  fields: {
    caption?: TriState<string>;
    instagram?: TriState<string>;
    frame?: TriState<PhotoFrame>;
  },
): Promise<Album> {
  const req = await fetch(
    `${ALBUMS}/${slug}/photos/${encodeURIComponent(name)}`,
    {
      method: "PATCH",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(triState(fields)),
    },
  );
  if (req.status != 200) throw { code: "failed_to_update_photo" };

  const json: { album: Album } = await req.json();
  return json.album;
}

export async function deletePhoto(slug: string, name: string): Promise<void> {
  const req = await fetch(
    `${ALBUMS}/${slug}/photos/${encodeURIComponent(name)}`,
    {
      method: "DELETE",
      headers: authHeaders(),
    },
  );
  if (req.status != 204) throw { code: "failed_to_delete_photo" };
}

export interface BulkPhotoUpdate {
  name: string;
  caption?: TriState<string>;
  instagram?: TriState<string>;
  frame?: TriState<PhotoFrame>;
}

export interface BulkUpdateOptions {
  apply_to_all?: {
    caption?: TriState<string>;
    instagram?: TriState<string>;
    frame?: TriState<PhotoFrame>;
  };
  photos?: BulkPhotoUpdate[];
}

// apply_to_all runs first over every photo, then photos[] overrides on top.
export async function bulkUpdatePhotos(
  slug: string,
  options: BulkUpdateOptions,
): Promise<Album> {
  const body: BulkUpdateOptions = {};
  if (options.apply_to_all) body.apply_to_all = triState(options.apply_to_all);
  if (options.photos)
    body.photos = options.photos.map((photo) => {
      const { name, ...rest } = photo;
      return { name, ...triState(rest) };
    });

  const req = await fetch(`${ALBUMS}/${slug}/photos`, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(body),
  });
  if (req.status != 200) throw { code: "failed_to_bulk_update_photos" };

  const json: { album: Album } = await req.json();
  return json.album;
}

// `order` must be an exact permutation of the album's current photo names.
export async function reorderPhotos(
  slug: string,
  order: string[],
): Promise<Album> {
  const req = await fetch(`${ALBUMS}/${slug}/order`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ order }),
  });
  if (req.status != 200) throw { code: "failed_to_reorder_photos" };

  const json: { album: Album } = await req.json();
  return json.album;
}
