import { useEffect, useState } from "react";

function FormatTimeSince(date: Date): string {
  const now = Date.now();
  const diffInSeconds = Math.floor((now - date.getTime()) / 1000);

  const pluralize = (unit: string, value: number) =>
    `${value} ${unit}${value !== 1 ? "s" : ""}`;

  switch (true) {
    case diffInSeconds < 60:
      return "now";
    case diffInSeconds < 60 * 60:
      return pluralize("minute", Math.floor(diffInSeconds / 60));
    case diffInSeconds < 24 * 60 * 60:
      return pluralize("hour", Math.floor(diffInSeconds / 3600));
    case diffInSeconds < 7 * 24 * 60 * 60:
      return pluralize("day", Math.floor(diffInSeconds / (24 * 60 * 60)));
    case diffInSeconds < 4 * 7 * 24 * 60 * 60:
      return pluralize("week", Math.floor(diffInSeconds / (7 * 24 * 60 * 60)));
    case diffInSeconds < 12 * 30 * 24 * 60 * 60:
      return pluralize(
        "month",
        Math.floor(diffInSeconds / (30 * 24 * 60 * 60)),
      );
    default:
      return pluralize(
        "year",
        Math.floor(diffInSeconds / (365 * 24 * 60 * 60)),
      );
  }
}

export function useTimeSince(date: Date) {
  const [time, setTime] = useState<string>();

  useEffect(() => {
    const intervalId = setInterval(
      () => setTime(date ? FormatTimeSince(date) : null),
      1000,
    );
    return () => clearInterval(intervalId);
  }, [date]);

  return time;
}
