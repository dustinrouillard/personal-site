import { GiCampingTent } from "react-icons/gi";
import { useTimeSince } from "../hooks/useTimeSince";

import { RecentSong } from "../types/core";

import { Tippy } from "./tippy";

export function Song({ song }: { song: RecentSong }) {
  const timeSince = useTimeSince(new Date(song.listened_at));

  return (
    <a
      href={`https://open.spotify.com/${song.type}/${song.id}`}
      target="_blank"
    >
      <div className="flex flex-row items-start lg:items-center rounded-lg m-1 bg-neutral-200 dark:bg-black/60 py-6 px-4 min-w-[20rem] border-b-8 border-b-[#1ED760]/50 hover:border-b-[#1ED760] cursor-pointer hover:brightness-75 transition-all h-full">
        <div className="flex flex-col xl:flex-row items-start w-full justify-between overflow-hidden h-full">
          <div className="flex flex-row items-start lg:items-center space-x-3 overflow-hidden">
            <img className="rounded-lg w-16 h-16" src={song.image} />
            <div className="flex flex-col overflow-hidden pr-2">
              <h3 className="text-lg font-bold truncate">{song.name}</h3>
              <Tippy
                disabled={song.artists.length <= 1}
                content={song.artists.map((a) => a.name).join(", ")}
              >
                <p className="truncate">
                  {song.artists.length > 1
                    ? `${song.artists[0].name}, and ${song.artists.length - 1} more`
                    : song.artists[0].name}
                </p>
              </Tippy>
              <p className="text-sm opacity-65 text-nowrap visible block xl:hidden xl:invisible">
                {timeSince != "now" ? `${timeSince} ago` : timeSince}
              </p>
            </div>
          </div>
          <div className="flex-col invisible hidden xl:flex xl:visible items-end justify-between h-full">
            <p className="text-sm opacity-65 text-nowrap">
              {timeSince != "now" ? `${timeSince} ago` : timeSince}
            </p>
            {song.alt ? (
              <Tippy content="This was played from my alt spotify, that I use for camping trips.">
                <div className="flex flex-row space-x-2 opacity-40 px-1">
                  <p className="text-sm">Camping</p> <GiCampingTent size={20} />
                </div>
              </Tippy>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}
