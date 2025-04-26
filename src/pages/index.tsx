import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { RequestContext } from "next/dist/server/base-server";

import {
  BiStats,
  BiLogoGithub,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoSpotify,
  BiLogoTwitter,
} from "react-icons/bi";
import { MdWork } from "react-icons/md";
import { BsTools } from "react-icons/bs";
import { VscSourceControl } from "react-icons/vsc";

import Layout from "./_layout";

import { Repo } from "../components/repo";
import { Song } from "../components/song";
import { Spotify } from "../components/stats/spotify";

import { gateway } from "../utils/gateway";
import {
  getContributionGraph,
  getInstagramOverview,
  getPinnedRepositories,
  getRecentListens,
} from "../utils/core";

import {
  ContributionDate,
  InstagramOverview,
  RecentSong,
  Repository,
  BlogPost as TBlogPost,
} from "../types/core";
import { SpotifyPlayingData } from "../types/gateway";
import { LocalTimeConditions } from "../components/stats/local";
import { CommandsToday } from "../components/stats/commandsToday";
import { DiscordActivity } from "../components/stats/activity";
import { RiderrLastRide } from "../components/stats/riderrLastRide";
import { RiderrRideStats } from "../components/stats/riderrRideStats";
import { RiderrBoardStats } from "../components/stats/riderrBoardStats";

import { Work } from "../components/work";
import { Tool } from "../components/tool";
import { HighlightedTools, HighlightedWorks } from "../components/shared";
import { GitActivity } from "../components/GitActivity";
import { Tippy } from "../components/tippy";
import { InstagramPost } from "../components/InstagramPost";
import { ALL_POSTS_AFTER } from "../consts";

interface Props {
  posts: TBlogPost[];
}

export default function Index(props: Props) {
  const [repos, setRepos] = useState<Repository[]>();
  const [recentSongs, setRecentSongs] = useState<RecentSong[]>([]);
  const [gitActivity, setGitActivity] = useState<{
    total_contributions: number;
    graph: ContributionDate[][];
  }>();
  const [instagramOverview, setInstagramOverview] =
    useState<InstagramOverview>();

  const [christmasTime, setChristmasTime] = useState(() => {
    const currentDate = new Date();
    return currentDate.getMonth() == 11;
  });

  const spotifyChange = useCallback(
    (data: SpotifyPlayingData) => {
      if (
        !data.playing ||
        data.progress < 10000 ||
        (recentSongs && recentSongs[0].id == data.id)
      )
        return;

      const currentAsRecent: RecentSong = {
        id: data.id,
        name: data.name,
        artists: data.artists,
        device: data.device,
        image: data.image,
        length: data.length,
        type: data.type,
        listened_at: new Date().toISOString(),
      };

      setRecentSongs((recent) => {
        recent.pop();
        return [currentAsRecent, ...recent];
      });
    },
    [recentSongs],
  );

  useEffect(() => {
    try {
      (async () => setRepos(await getPinnedRepositories()))();
    } catch (err) {}
    try {
      (async () => setRecentSongs(await getRecentListens()))();
    } catch (err) {}
    try {
      (async () => setGitActivity(await getContributionGraph()))();
    } catch (err) {}
    try {
      (async () => setInstagramOverview(await getInstagramOverview()))();
    } catch (err) {}

    const int = setInterval(() => {
      const currentDate = new Date();
      setChristmasTime(currentDate.getMonth() == 11);
    }, 1000);
    return () => clearInterval(int);
  }, []);

  useEffect(() => {
    gateway.on("spotify", spotifyChange);

    return () => {
      gateway.removeListener("spotify", spotifyChange);
    };
  }, [spotifyChange]);

  return (
    <Layout active_page="home" page_class="space-y-20">
      <div className="flex flex-col xl:flex-row justify-between space-y-5 xl:space-y-0">
        <div className="visible block xl:hidden xl:invisible">
          <Image
            className="rounded-lg"
            width={500}
            height={500}
            src="/avatar.png"
            alt="avatar"
          />
        </div>

        <div className="flex flex-col space-y-5">
          <div className="flex flex-col justify-center h-full space-y-8 w-full xl:w-[80%]">
            <div className="flex flex-row space-x-5">
              <h1 className="text-xl font-bold">Hey there!</h1>
            </div>
            <p className="text-xl">
              I'm a self-taught Software Engineer turned Network Engineer and
              Systems Administrator.
              <br />
              <br />I live and breath Kubernetes, really love to break things so
              I can fix them, and if I'm writing code, it's probably Rust.
            </p>
          </div>

          <div className="flex flex-row bg-neutral-200/50 dark:bg-neutral-800 rounded-lg w-fit">
            <Link
              className="text-black dark:text-white m-1 cursor-pointer transition-all hover:opacity-40 dark:hover:brightness-75 font-bold rounded-lg text-lg py-3 px-2 text-center"
              target="_blank"
              href="https://dstn.to/twitter"
            >
              <BiLogoTwitter size={28} />
            </Link>
            <Link
              className="text-black dark:text-white m-1 cursor-pointer transition-all hover:opacity-40 dark:hover:brightness-75 font-bold rounded-lg text-lg py-3 px-2 text-center"
              target="_blank"
              href="https://dstn.to/github"
            >
              <BiLogoGithub size={28} />
            </Link>
            <Link
              className="text-black dark:text-white m-1 cursor-pointer transition-all hover:opacity-40 dark:hover:brightness-75 font-bold rounded-lg text-lg py-3 px-2 text-center"
              target="_blank"
              href="https://dstn.to/instagram"
            >
              <BiLogoInstagram size={28} />
            </Link>
            <Link
              className="text-black dark:text-white m-1 cursor-pointer transition-all hover:opacity-40 dark:hover:brightness-75 font-bold rounded-lg text-lg py-3 px-2 text-center"
              target="_blank"
              href="https://dstn.to/linkedin"
            >
              <BiLogoLinkedin size={28} />
            </Link>
          </div>
        </div>

        <div className="invisible hidden xl:block xl:visible">
          <Image
            className="rounded-lg"
            layout="fixed"
            width={400}
            height={400}
            src={christmasTime ? "/christmas-avatar.png" : "/avatar.png"}
            alt={christmasTime ? "Christmas Avatar" : "Avatar"}
          />
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        <div className="flex items-center gap-2">
          <BiStats size={38} className="p-1" />
          <h2 className="text-2xl font-bold">Stats & Activity</h2>
        </div>

        <div className="flex flex-wrap flex-grow w-full">
          <CommandsToday className="p-1 w-full md:w-auto" />
          <LocalTimeConditions className="p-1 w-full md:w-auto" />
          <RiderrBoardStats className="p-1 w-full md:w-auto" />
          <RiderrLastRide className="p-1 w-full md:w-auto" />
          <RiderrRideStats className="p-1 w-full md:w-auto" />
          <DiscordActivity className="p-1 w-full md:w-auto" />
          <Spotify recents={recentSongs} className="p-1 w-full md:w-auto" />
        </div>
      </div>

      {/* <div className="flex flex-col space-y-6">
        <h2 className="text-2xl font-bold">Recent Blog Posts</h2>

        {props.posts ? (
          <div className="grid xl:grid-cols-1 xl:grid-flow-row overflow-scroll p-2 rounded-lg bg-neutral-300 dark:bg-neutral-800 max-h-[30rem]">
            {props.posts.map((post) => (
              <BlogPost post={post} key={post.id} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div> */}

      <div className="flex flex-col space-y-6">
        <div className="flex items-center gap-2 justify-between">
          <h2 className="text-2xl font-bold">Tools & Things</h2>
          <BsTools size={38} className="p-1" />
        </div>

        <div className="grid xl:grid-cols-2 xl:grid-rows-1 xl:grid-flow-row overflow-scroll p-2 rounded-lg bg-neutral-300 dark:bg-neutral-800">
          {HighlightedTools.map((tool, index) => (
            <Tool key={index} tool={tool} />
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        <div className="flex items-center gap-2 justify-between">
          <h2 className="text-2xl font-bold">Work</h2>
          <MdWork size={38} className="p-1" />
        </div>

        <div className="grid xl:grid-cols-2 xl:grid-rows-1 xl:grid-flow-row overflow-scroll p-2 rounded-lg bg-neutral-300 dark:bg-neutral-800">
          {HighlightedWorks.map((work, index) => (
            <Work key={index} work={work} />
          ))}
        </div>
      </div>

      {gitActivity && (
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold">Git Activity</h2>
              <Tippy content="Total Contributions" placement="auto">
                <p className="flex rounded-full bg-neutral-300 dark:bg-neutral-800 py-2 px-3 font-bold">
                  {gitActivity?.total_contributions.toLocaleString() || "..."}
                </p>
              </Tippy>
            </div>
            <VscSourceControl size={38} className="p-1" />
          </div>

          <div className="flex overflow-scroll p-2 rounded-lg bg-neutral-300 dark:bg-neutral-800">
            <GitActivity graph={gitActivity?.graph} />
          </div>
        </div>
      )}

      {repos && (
        <div className="flex flex-col space-y-6">
          <div className="flex items-center gap-2 justify-between">
            <h2 className="text-2xl font-bold">Highlighted Repositories</h2>
            <BiLogoGithub size={38} className="p-1" />
          </div>

          <div className="grid xl:grid-cols-2 xl:grid-rows-3 xl:grid-flow-row overflow-scroll p-2 rounded-lg bg-neutral-300 dark:bg-neutral-800">
            {repos.map((repo, index) => (
              <Repo key={index} repo={repo} />
            ))}
          </div>
        </div>
      )}

      {instagramOverview && (
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold">Instagram Feed</h2>
              <p className="flex rounded-full bg-neutral-300 dark:bg-neutral-800 py-2 px-3 font-bold">
                {instagramOverview.followers.toLocaleString() || "..."}{" "}
                followers
              </p>
              <p className="flex rounded-full bg-neutral-300 dark:bg-neutral-800 py-2 px-3 font-bold">
                {instagramOverview.post_count.toLocaleString() || "..."} posts
              </p>
            </div>
            <BiLogoInstagram size={38} className="p-1" />
          </div>

          {instagramOverview.posts.filter(
            (post) =>
              new Date(post.timestamp).getTime() > ALL_POSTS_AFTER.getTime(),
          ).length ? (
            <div className="grid 2xl:grid-cols-3 xl:grid-flow-row overflow-scroll p-2 rounded-lg bg-neutral-300 dark:bg-neutral-800">
              {instagramOverview.posts
                .filter(
                  (post) =>
                    new Date(post.timestamp).getTime() >
                    ALL_POSTS_AFTER.getTime(),
                )
                .map((post, index) => (
                  <InstagramPost key={index} post={post} />
                ))}
            </div>
          ) : (
            <div className="grid overflow-scroll p-2 rounded-lg bg-neutral-300 dark:bg-neutral-800">
              <div className="flex flex-col p-2 h-full">
                <p className="text-xl font-bold">No posts to show yet.</p>
                <p className="text-xs font-bold opacity-40">
                  (Only posts from this year will show here)
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                  See my page{" "}
                  <a
                    className="text-blue-300 hover:underline"
                    target="_blank"
                    href="https://dstn.to/instagram"
                  >
                    on instagram
                  </a>{" "}
                  for my older posts
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {recentSongs && (
        <div className="flex flex-col space-y-6">
          <div className="flex items-center gap-2 justify-between">
            <h2 className="text-2xl font-bold">Spotify Recents</h2>
            <BiLogoSpotify size={38} className="p-1" />
          </div>

          <div className="grid grid-cols-1 grid-rows-10 grid-flow-col 2xl:grid-cols-2 xl:grid-rows-1 xl:grid-flow-row overflow-scroll p-2 rounded-lg bg-neutral-300 dark:bg-neutral-800">
            {recentSongs.map((song, index) => (
              <Song key={index} song={song} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps(props: RequestContext) {
  return {
    props: {},
  };
}
