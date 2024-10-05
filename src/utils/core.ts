import {
  Analytics,
  BlogPost,
  BoostedStats,
  RecentSong,
  Repository,
  WeatherConditions,
} from "../types/core";

const URL_BASE = "https://rest.dstn.to";
// const URL_BASE = "http://10.4.20.210:8081";

export async function getPinnedRepositories() {
  const req = await fetch(`${URL_BASE}/v2/github/pinned`);
  if (req.status != 200) return [];

  const json: {
    repositories: Repository[];
  } = await req.json();

  return json.repositories;
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

export async function getBoostedStats() {
  const req = await fetch(`${URL_BASE}/v2/boosted/stats`);
  if (req.status != 200) throw { code: "failed_to_pull_boosted_stats" };

  const json: {
    boosted: BoostedStats;
  } = await req.json();

  return json.boosted;
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
