import { useEffect, useState } from "react";

export function useTimeFromTZ(timeZone: string) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat([], {
      timeZone,
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
      second: '2-digit',
      hour12: true
    });

    const intervalId = setInterval(() => setTime(formatter.format(new Date().getTime())), 1000);
    return () => clearInterval(intervalId);
  }, [timeZone]);

  return time;
}
