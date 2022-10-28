export interface SpotifyPlayingData {
  playing: boolean;
  id: string;
  type: string;
  name: string;
  artists: Artist[];
  length: number;
  progress: number;
  image: string;
  device: Device;
}

export interface Artist {
  name: string;
}

export interface Device {
  name: string;
  type: string;
}

interface Stats {
  builds: number;
  commands: number;
  dev_hours: number;
}

export interface StatsResponse {
  daily: Stats;
  weekly: Stats;
  monthly: Stats;
}

export interface StatusResponse {
  message: string;
  type: string;
}
