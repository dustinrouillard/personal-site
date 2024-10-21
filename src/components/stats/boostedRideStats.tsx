import { useBoostedStats } from "../../hooks/useBoostedStats";
import { shortMsFormat } from "../../utils/time";
import { Tippy } from "../tippy";

interface Props {
  className: string;
}

export function BoostedRideStats({ className }: Props) {
  const boosted = useBoostedStats();

  return boosted ? (
    <div className={className}>
      <div className="relative text-black bg-neutral-200/50 dark:text-white dark:bg-neutral-800 rounded-md w-auto h-40 p-4 px-6 flex flex-col justify-center text-center">
        <div className="flex flex-col text-center mb-8">
          {boosted.stats.rides.day ? (
            <Tippy placement="auto" content="Rides in the last 24h">
              <p className="text-md font-bold text-nowrap">
                {shortMsFormat(boosted.stats.duration.day * 1000)} -{" "}
                {boosted.stats.distance.day} mi - {boosted.stats.rides.day} ride
                {boosted.stats.rides.day > 1 ? "s" : ""}
                <span className="opacity-40">/24h</span>
              </p>
            </Tippy>
          ) : (
            <></>
          )}
          {boosted.stats.rides.week ? (
            <Tippy placement="auto" content="Rides in the last week">
              <p className="text-md font-bold text-nowrap">
                {shortMsFormat(boosted.stats.duration.week * 1000)} -{" "}
                {boosted.stats.distance.week} mi - {boosted.stats.rides.week}{" "}
                ride
                {boosted.stats.rides.week > 1 ? "s" : ""}
                <span className="opacity-40">/7d</span>
              </p>
            </Tippy>
          ) : (
            <></>
          )}
          {boosted.stats.rides.month ? (
            <Tippy placement="auto" content="Rides in the last month">
              <p className="text-md font-bold text-nowrap">
                {shortMsFormat(boosted.stats.duration.month * 1000)} -{" "}
                {boosted.stats.distance.month} mi - {boosted.stats.rides.month}{" "}
                ride
                {boosted.stats.rides.month > 1 ? "s" : ""}
                <span className="opacity-40">/30d</span>
              </p>
            </Tippy>
          ) : (
            <></>
          )}
        </div>
        <p className="text-nowrap text-center">Ride Stats</p>
      </div>
    </div>
  ) : (
    <></>
  );
}
