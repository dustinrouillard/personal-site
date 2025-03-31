import { useBoostedStats } from "../../hooks/useBoostedStats";
import { shortMsFormat } from "../../utils/time";
import { Tippy } from "../tippy";

interface Props {
  className: string;
}

const floatEquals = (
  a: number,
  b: number,
  tolerance: number = 0.0001,
): boolean => {
  return Math.abs(a - b) < tolerance;
};

interface Stats {
  duration: number;
  distance: number;
  rides: number;
  period: string;
  content: string;
}

export function BoostedRideStats({ className }: Props) {
  const boosted = useBoostedStats();

  if (
    !boosted ||
    !(
      boosted.stats.rides.day ||
      boosted.stats.rides.week ||
      boosted.stats.rides.month
    )
  ) {
    return <></>;
  }

  const dayStats: Stats | null = boosted.stats.rides.day
    ? {
        duration: boosted.stats.duration.day,
        distance: boosted.stats.distance.day,
        rides: boosted.stats.rides.day,
        period: "24h",
        content: "Rides in the last 24h",
      }
    : null;

  const weekStats: Stats | null = boosted.stats.rides.week
    ? {
        duration: boosted.stats.duration.week,
        distance: boosted.stats.distance.week,
        rides: boosted.stats.rides.week,
        period: "7d",
        content: "Rides in the last week",
      }
    : null;

  const monthStats: Stats | null = boosted.stats.rides.month
    ? {
        duration: boosted.stats.duration.month,
        distance: boosted.stats.distance.month,
        rides: boosted.stats.rides.month,
        period: "30d",
        content: "Rides in the last month",
      }
    : null;

  const allStats: (Stats | null)[] = [dayStats, weekStats, monthStats];
  const validStats: Stats[] = allStats.filter(
    (stat): stat is Stats => stat !== null,
  );

  const areStatsEqual = (a: Stats, b: Stats): boolean => {
    return (
      floatEquals(a.duration, b.duration) &&
      floatEquals(a.distance, b.distance) &&
      a.rides === b.rides
    );
  };

  const displayStats: Stats[] = validStats.reduce(
    (acc: Stats[], curr: Stats) => {
      if (acc.some((s) => areStatsEqual(s, curr))) return acc;
      return [...acc, curr];
    },
    [],
  );

  return (
    <div className={className}>
      <div className="relative text-black bg-neutral-200/50 dark:text-white dark:bg-neutral-800 rounded-md w-auto h-40 p-4 px-6 flex flex-col justify-center text-center">
        <div className="flex flex-col text-center mb-8">
          {displayStats.map((stat) => (
            <Tippy placement="auto" content={stat.content} key={stat.period}>
              <p className="text-md font-bold text-nowrap">
                {shortMsFormat(stat.duration * 1000)} - {stat.distance} mi -{" "}
                {stat.rides} ride{stat.rides > 1 ? "s" : ""}
                <span className="opacity-40">/{stat.period}</span>
              </p>
            </Tippy>
          ))}
        </div>
        <p className="text-nowrap text-center">Ride Stats</p>
      </div>
    </div>
  );
}
