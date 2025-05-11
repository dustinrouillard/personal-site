import { useCallback, useEffect, useState } from "react";

import { RecentSong } from "../../types/core";
import { SpotifyPlayingData } from "../../types/gateway";

import { gateway } from "../../utils/gateway";

import { Tippy } from "../tippy";
import { useTimeSince } from "../../hooks/useTimeSince";
import clsx from "clsx";

interface Props {
  recents: RecentSong[];
  className: string;
}

export function Spotify({ className, ...props }: Props) {
  const [song, setSong] = useState<SpotifyPlayingData>();

  const spotifyChange = useCallback(
    (data: SpotifyPlayingData) => setSong(data),
    [],
  );

  useEffect(() => {
    gateway.on("spotify", spotifyChange);

    return () => {
      gateway.removeListener("spotify", spotifyChange);
    };
  }, [spotifyChange]);

  // Used for recent song when not playing
  const timeSince = useTimeSince(new Date(props.recents[0]?.listened_at));

  if (song && song.playing)
    return (
      <div className={className}>
        <a
          href={`https://open.spotify.com/${song.type}/${song.id}`}
          target="_blank"
        >
          <Tippy
            disabled={!song.alt}
            content="This is being played from my alt account, which friend and I use for camping, probably isn't me"
          >
            <div
              className={clsx(
                "flex flex-row items-center h-40 max-w-lg text-black bg-neutral-200/50 dark:text-white dark:bg-neutral-800 rounded-md py-6 px-4 cursor-pointer transition-all relative overflow-hidden",
                song.alt ? "border-4 border-blue-500" : "",
              )}
            >
              <div
                id="progress"
                className="rounded-t-md w-full h-2 bg-gray-300 dark:bg-gray-600 brightness-75 absolute top-0 left-0 overflow-hidden"
              >
                <div
                  id="progress-bar"
                  className="h-2 overflow-hidden bg-gray-400 dark:bg-white rounded-tl-md text-gray-400 dark:text-white transition-all"
                  style={{ width: `${(song.progress / song.length) * 100}%` }}
                ></div>
                <div id="progress-text"></div>
              </div>
              <div className="flex flex-row items-center w-full justify-between relative overflow-hidden">
                <div className="flex flex-row items-center space-x-3">
                  <img className="rounded-lg w-20 h-20" src={song.image} />
                  <div className="flex flex-col overflow-hidden pr-2">
                    <h3 className="text-xl font-bold truncate">{song.name}</h3>
                    <Tippy
                      disabled={song.artists.length <= 1}
                      content={song.artists.map((a) => a.name).join(", ")}
                    >
                      <p className="text-wrap">
                        {song.artists.length > 1
                          ? `${song.artists[0].name}, and ${song.artists.length - 1} more`
                          : song.artists[0].name}
                      </p>
                    </Tippy>
                  </div>
                </div>
              </div>
            </div>
          </Tippy>
        </a>
      </div>
    );
  else if (props.recents.length) {
    const song = props.recents[0];

    return (
      <div className={className}>
        <a
          href={`https://open.spotify.com/${song.type}/${song.id}`}
          target="_blank"
        >
          <Tippy
            disabled={!song.alt}
            content="This was played from my alt account, which friend and I use for camping, probably wasn't me"
          >
            <div
              className={clsx(
                "flex flex-row items-center h-40 max-w-lg text-black bg-neutral-200/50 dark:text-white dark:bg-neutral-800 rounded-md py-6 px-4 cursor-pointer transition-all overflow-hidden",
                song.alt ? "border-4 border-blue-500" : "",
              )}
            >
              <div className="flex flex-row items-center w-full justify-between relative">
                <div className="flex flex-row items-center space-x-3">
                  <img className="rounded-lg w-20 h-20" src={song.image} />
                  <div className="flex flex-col overflow-hidden pr-2">
                    <h3 className="text-xl font-bold truncate">{song.name}</h3>
                    <Tippy
                      disabled={song.artists.length <= 1}
                      content={song.artists.map((a) => a.name).join(", ")}
                    >
                      <p className="text-wrap">
                        {song.artists.length > 1
                          ? `${song.artists[0].name}, and ${song.artists.length - 1} more`
                          : props.recents[0].artists[0].name}
                      </p>
                    </Tippy>
                    <p className="text-sm opacity-50">
                      Played{" "}
                      {timeSince != "now" ? `${timeSince} ago` : "recently"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Tippy>
        </a>
      </div>
    );
  } else return <></>;
}
