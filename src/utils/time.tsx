import { useEffect, useState } from "react";

export function FormatTimeSince(date: Date): string {
  const days = Math.floor((Date.now() - date.getTime()) / 1000 / 60 / 60 / 24);

  // prettier-ignore
  switch (true) {
    case days == 0: return "today";
    case days == 1: return "yesterday";
    case days <= 7: return "this week";
    case days <= 14: return "last week";
    case days <= 21: return `${Math.floor(days / 7)} weeks ago`;
    case days >= 28*2: return `${Math.floor(days / 28)} months ago`;
    case days >= 28: return "last month";
    case days >= 365*2: return `${Math.floor(days / 28 / 12)} years ago`;
    case days >= 365: return "last year";
    default: return `${days} days ago`;
  }
}

export function useTimeSince(date: Date) {
  const [time, setTime] = useState(FormatTimeSince(date));

  useEffect(() => {
    const intervalId = setInterval(() => setTime(FormatTimeSince(date)), 1000);
    return () => clearInterval(intervalId);
  }, []);

  return time;
}

export function millisToMinutesAndSeconds(millis: number) {
  let minutes = Math.floor(millis / 60000);
  let seconds = Number(((millis % 60000) / 1000).toFixed(0));
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export function msToTime(ms: number) {
  let seconds = (ms / 1000).toFixed(1);
  let minutes = (ms / (1000 * 60)).toFixed(1);
  let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  if (~~seconds < 60) return seconds + " Sec";
  else if (~~minutes < 60) return minutes + " Min";
  else if (~~hours < 24) return hours + " Hrs";
  else return days + " Days";
}
