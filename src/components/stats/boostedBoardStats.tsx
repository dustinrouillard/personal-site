import Image from "next/image";

import { useBoostedStats } from "../../hooks/useBoostedStats";
import { useTimeSince } from "../../hooks/useTimeSince";
import { Tippy } from "../tippy";

interface Props {
  className: string;
}

export function BoostedBoardStats({ className }: Props) {
  const boosted = useBoostedStats();
  const lastRide = useTimeSince(new Date(boosted?.latest_ride.ended_at));

  return boosted && lastRide ? (
    <div className={className}>
      <div className="group relative text-black bg-neutral-200/50 dark:text-white dark:bg-neutral-800 rounded-md w-auto h-40 p-4 flex flex-col justify-center text-center items-center">
        <div className="flex flex-row">
          <div className="flex flex-col text-center space-x-4 justify-between items-center">
            <span className="text-right">
              <p className="text-md font-bold text-nowrap">
                {boosted.stats.boards[0].odometer.toLocaleString()} mi
              </p>
              {!boosted.riding ? (
                <Tippy placement="auto" content="Last ride">
                  <p className="text-sm font-bold text-nowrap opacity-35">
                    {lastRide} ago
                  </p>
                </Tippy>
              ) : (
                <></>
              )}
              <p
                className={`text-sm font-bold text-nowrap ${boosted.riding ? "text-green-500" : "opacity-40"}`}
              >
                {boosted.riding ? "On a Ride" : "Idle"}
              </p>
            </span>
            <p className="text-sm text-nowrap text-center">Board Stats</p>
          </div>
          <div>
            <Image
              className="rounded-lg p-1 opacity-60 group-hover:opacity-100 transition-opacity"
              width={128}
              height={128}
              src="/boosted-plus.png"
              alt="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
