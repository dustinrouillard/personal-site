import { PinnedRepository } from "../types/github";

export async function getPinnedRepositories(): Promise<PinnedRepository[]> {
  const pinned: { data: PinnedRepository[] } = await fetch('https://ghapi.dstn.to/dustinrouillard/pinned').then(r => r.json());
  return pinned.data;
}