import Image from "next/image";

import { useBoostedStats } from "../../hooks/useBoostedStats";
import { useTimeSince } from "../../hooks/useTimeSince";
import { Tippy } from "../tippy";
import { useEffect, useMemo, useState } from "react";
import { msToHHMMSS } from "../../utils/time";

interface Props {
  className: string;
}

const batteryClasses = {
  100: "bg-green-400",
  50: "bg-yellow-400",
  25: "bg-red-400",
};

export function BoostedBoardStats({ className }: Props) {
  const boosted = useBoostedStats();
  const lastRide = useTimeSince(new Date(boosted?.latest_ride.ended_at));
  const [rideTime, setRideTime] = useState("00:00:00");

  const batteryStep = useMemo(() => {
    let step = 25;
    let batt = boosted?.stats.boards[0]?.battery;
    if (batt >= 50) step = 50;
    if (batt >= 100) step = 50;
    return step;
  }, [boosted]);

  useEffect(() => {
    let timer = setInterval(() => {
      if (!boosted?.current_ride) return;
      let startTime = new Date(boosted.current_ride.started_at);
      let ms = new Date().getTime() - startTime.getTime();
      setRideTime(msToHHMMSS(ms));
    }, 1000);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [boosted]);

  return boosted && lastRide ? (
    <div className={className}>
      <div className="group relative text-black bg-neutral-200/50 dark:text-white dark:bg-neutral-800 rounded-md w-auto h-40 p-4 flex flex-col justify-center text-center items-center">
        <div className="flex flex-row">
          <div className="flex flex-col text-right space-x-4 justify-between items-end">
            <span className="flex flex-col items-end text-right">
              <p className="text-sm font-bold text-nowrap">
                {boosted.stats.boards[0].odometer.toLocaleString()} mi
              </p>
              <p
                className={`text-sm font-bold text-nowrap ${boosted.riding ? "text-green-500" : "opacity-40"}`}
              >
                {boosted.riding ? "On a Ride" : "Idle"}
              </p>
              {boosted.riding && boosted.current_ride ? (
                <>
                  <p className={`text-xs font-bold text-nowrap`}>
                    {boosted.current_ride.distance} mi
                  </p>
                  <p className={`text-xs font-bold text-nowrap`}>{rideTime}</p>
                </>
              ) : (
                <></>
              )}
              <div className="flex flex-row space-x-1 items-center">
                <Tippy placement="auto" content="Battery">
                  <div className="w-auto opacity-35">
                    <div className="shadow w-8 rounded border border-gray-400 flex my-1 relative">
                      <div className="border-l-4 h-2 rounded-l absolute flex border-gray-400 -ml-1 mt-0.5 z-10"></div>
                      <div
                        className={`cursor-default rounded-sm text-xs font-bold leading-none flex items-center justify-center m-0.5 py-1 text-center text-white ${batteryClasses[batteryStep] ? batteryClasses[batteryStep] : "bg-gray-400"}`}
                        style={{ width: `${boosted.stats.boards[0].battery}%` }}
                      ></div>
                    </div>
                  </div>
                </Tippy>
                <p className="text-xs font-bold opacity-35">
                  {boosted.stats.boards[0].battery}%
                </p>
              </div>
              {!boosted.riding ? (
                <Tippy placement="auto" content="Last ride">
                  <p className="text-sm font-bold text-nowrap opacity-35">
                    {lastRide} ago
                  </p>
                </Tippy>
              ) : (
                <></>
              )}
            </span>
            <p className="text-sm text-nowrap">Board Stats</p>
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
