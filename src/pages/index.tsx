import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { RequestContext } from "next/dist/server/base-server";

import {
  BiLogoGithub,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoTwitter,
} from "react-icons/bi";

import Layout from "./_layout";

import { Repo } from "../components/repo";
import { Song } from "../components/song";
import { Spotify } from "../components/stats/spotify";

import { gateway } from "../utils/gateway";
import { getPinnedRepositories, getRecentListens } from "../utils/core";

import { RecentSong, Repository, BlogPost as TBlogPost } from "../types/core";
import { SpotifyPlayingData } from "../types/gateway";
import { LocalTimeConditions } from "../components/stats/local";
import { CommandsToday } from "../components/stats/commandsToday";
import { DiscordActivity } from "../components/stats/activity";
import { BoostedLastRide } from "../components/stats/boostedLastRide";
import { BoostedRideStats } from "../components/stats/boostedRideStats";
import { BoostedBoardStats } from "../components/stats/boostedBoardStats";

interface Props {
  posts: TBlogPost[];
}

export default function Index(props: Props) {
  const [repos, setRepos] = useState<Repository[]>();
  const [recentSongs, setRecentSongs] = useState<RecentSong[]>([]);

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
    (async () => setRepos(await getPinnedRepositories()))();
    (async () => setRecentSongs(await getRecentListens()))();
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
              <br />
              Well experienced with Kubernetes and just about any Linux based
              system.
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
            src="/avatar.png"
            alt="avatar"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        <h2 className="text-2xl font-bold">Stats & Activity</h2>

        <div className="flex flex-wrap flex-grow w-full">
          <CommandsToday className="p-1 w-full md:w-auto" />
          <LocalTimeConditions className="p-1 w-full md:w-auto" />
          <BoostedBoardStats className="p-1 w-full md:w-auto" />
          <BoostedLastRide className="p-1 w-full md:w-auto" />
          <BoostedRideStats className="p-1 w-full md:w-auto" />
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
        <h2 className="text-2xl font-bold">Highlighted Github Repositories</h2>

        <div className="grid xl:grid-cols-2 xl:grid-rows-3 xl:grid-flow-row overflow-scroll p-2 rounded-lg bg-neutral-300 dark:bg-neutral-800">
          {repos &&
            repos.map((repo, index) => <Repo key={index} repo={repo} />)}
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        <h2 className="text-2xl font-bold">Recent Spotify Listens</h2>

        <div className="grid grid-cols-1 grid-rows-10 grid-flow-col 2xl:grid-cols-2 xl:grid-rows-1 xl:grid-flow-row overflow-scroll p-2 rounded-lg bg-neutral-300 dark:bg-neutral-800">
          {recentSongs &&
            recentSongs.map((song, index) => <Song key={index} song={song} />)}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(props: RequestContext) {
  return {
    props: {},
  };
}
