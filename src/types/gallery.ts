export interface Album {
  slug: string;
  name: string;
  location?: string;
  description?: string;
  // Can be null/absent — e.g. after the cover photo is deleted.
  cover?: string;
  items: Photo[];
}

export interface PhotoFrame {
  // object-position as percentages, 0-100. 50/50 = centered (the default).
  x: number;
  y: number;
}

export interface Photo {
  id?: string;
  name?: string;
  caption?: string;
  instagram?: string;
  frame?: PhotoFrame;
}
