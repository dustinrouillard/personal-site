export interface LanyardPresence {
  kv: Record<string, string>;
  discord_status: string;
  activities: LanyardActivity[];
  active_on_discord_mobile: boolean;
  active_on_discord_desktop: boolean;
}

export interface LanyardActivity {
  type: number;
  state: string;
  name: string;
  id: string;
  emoji?: Emoji;
  created_at: number;
  application_id: null | string;
  timestamps?: Timestamps;
  flags?: number;
  details?: string;
  assets?: Assets;
}

interface Assets {
  large_text: string;
  large_image: string;
  small_text?: string;
  small_image?: string;
}

interface Emoji {
  name: string;
}

interface Timestamps {
  start: number;
  end?: number;
}
