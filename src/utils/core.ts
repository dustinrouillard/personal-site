import {
  Analytics,
  BlogPost,
  RiderrUserStats,
  ContributionDate,
  RecentSong,
  Repository,
  WeatherConditions,
  InstagramOverview,
} from "../types/core";

const URL_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://rest.dstn.to";

export async function getSiteSettings() {
  const req = await fetch(`${URL_BASE}/v2/settings/site`);
  if (req.status != 200) throw { code: "failed_to_fetch_site_settings" };

  const json: { settings: Record<string, string> } = await req.json();
  return json.settings;
}

export async function getInstagramOverview() {
  const req = await fetch(`${URL_BASE}/v2/ig/overview`);
  if (req.status != 200) throw { code: "failed_to_fetch_instagram_overview" };

  const json: InstagramOverview = await req.json();
  return json;
}

export async function getPinnedRepositories() {
  const req = await fetch(`${URL_BASE}/v2/github/pinned`);
  if (req.status != 200) return [];

  const json: {
    repositories: Repository[];
  } = await req.json();

  return json.repositories;
}

export async function getContributionGraph() {
  const req = await fetch(`${URL_BASE}/v2/github/contributions`);
  if (req.status != 200) return { total_contributions: 0, graph: [] };

  const json: {
    total_contributions: number;
    graph: ContributionDate[][];
  } = await req.json();

  return json;
}

export async function getRecentListens() {
  const req = await fetch(`${URL_BASE}/v2/spotify/recents`);
  if (req.status != 200) return [];

  const json: {
    recents: RecentSong[];
  } = await req.json();

  return json.recents;
}

export async function getWeatherConditions() {
  const req = await fetch(`${URL_BASE}/v2/weather/current`);
  if (req.status != 200) throw { code: "failed_to_pull_weather" };

  const json: {
    weather: WeatherConditions;
  } = await req.json();

  return json.weather;
}

export async function getAnalytics() {
  const req = await fetch(`${URL_BASE}/v2/analytics`);
  if (req.status != 200) throw { code: "failed_to_pull_analytics" };

  const json: {
    analytics: Analytics;
  } = await req.json();

  return json.analytics;
}

export async function getRiderrUserStats() {
  const req = await fetch(`${URL_BASE}/v2/riderr/stats`);
  if (req.status != 200) throw { code: "failed_to_pull_riderr_stats" };

  const json: {
    riderr: RiderrUserStats;
  } = await req.json();

  return json.riderr;
}

export async function getPosts() {
  const req = await fetch(`${URL_BASE}/v2/blog/posts`);
  if (req.status != 200) throw { code: "failed_to_pull_posts" };

  const json: {
    posts: BlogPost[];
  } = await req.json();

  return json.posts;
}

export async function getPostBySlug(slug: string) {
  const req = await fetch(`${URL_BASE}/v2/blog/posts/${slug}`);
  if (req.status == 404) throw { code: "invalid_post" };
  if (req.status != 200) throw { code: "failed_to_pull_post" };

  const json: {
    post: BlogPost;
  } = await req.json();

  return json.post;
}
