export interface Album {
  slug: string;
  name: string;
  location?: string;
  description?: string;
  cover: string;
  items: Photo[];
}

export interface Photo {
  id: string;
  name?: string;
  caption?: string;
  instagram?: string;
}
