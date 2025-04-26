import { useTimeFromTZ } from "../../hooks/useTimeFromTZ";
import { useWeather } from "../../hooks/useWeather";

interface Props {
  className: string;
  timezone?: string;
}

export function LocalTimeConditions({ className, timezone }: Props) {
  const time = useTimeFromTZ(timezone ?? "America/Denver");
  const weather = useWeather();

  return weather && time ? (
    <div className={className}>
      <div className="relative text-black bg-neutral-200/50 dark:text-white dark:bg-neutral-800 rounded-md w-auto h-40 p-4 px-6 flex flex-col justify-center text-center">
        <div className="flex flex-col text-center mb-8">
          <p className="text-xl font-bold text-nowrap">
            {weather.temperature}°F / {weather.humidity}%
          </p>
          <p className="text-lg font-bold text-nowrap">{time || "..."}</p>
        </div>
        <p className="text-nowrap text-center">Local Conditions</p>
      </div>
    </div>
  ) : (
    <></>
  );
}
