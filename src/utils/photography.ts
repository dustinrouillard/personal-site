interface CreatePostOptions {
  name: string;
  slug: string;
  cover: string;
  description?: string;
  location?: string;
}

export async function createAlbum(options: CreatePostOptions) {}
