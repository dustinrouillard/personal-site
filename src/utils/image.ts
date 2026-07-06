// Builds a resized/proxied image URL, mirroring the loader used by
// ImageThumbnail (next/image). Handy for plain <img> tags where we don't need
// the full next/image machinery.
export function proxiedImage(src: string, width = 800, quality = 75): string {
  return `https://proxy.t.pics/${width},q${quality}/${src}?-`;
}

export function albumImage(slug: string, name: string): string {
  return `https://cdn.dstn.to/gallery/albums/${slug}/${name}`;
}
