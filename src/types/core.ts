export interface Repository {
  owner: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: Language | null;
  pushed_at: Date;
  url: string;
}

export interface Language {
  name: string;
  color: string;
}

export interface RecentSong {
  id: string;
  type: string;
  name: string;
  artists: Artist[];
  length: number;
  image: string;
  device: Device;
  listened_at: string;
}

export interface Artist {
  name: string;
}

export interface Device {
  name: string;
  type: string;
}

export interface WeatherConditions {
  temperature: number;
  humidity: number;
}

export interface Analytics {
  commands: Commands;
}

export interface Commands {
  day: number;
  week: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  visibility: string;
  tags: string[];
  body: string;
  published_at: Date;
}

export interface BoostedStats {
  riding: boolean;
  latest_ride: LatestRide;
  stats: Stats;
}

export interface LatestRide {
  started_at: string;
  ended_at: string;
  duration: number;
  distance: number;
}

export interface Stats {
  boards: Boards;
  rides: Distance;
  duration: Distance;
  distance: Distance;
}

export interface Boards {
  distance: number;
}

export interface Distance {
  day: number;
  week: number;
  month: number;
}
