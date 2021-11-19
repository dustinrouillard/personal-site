export interface PinnedRepository {
  name: string;
  description: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: PrimaryLanguage | null;
  pushedAt: string;
  url: string;
}

export interface PrimaryLanguage {
  name: string;
  color: string;
}
