import { useEffect, useState } from "react";

function getYearsAgo(date: Date): number {
  let timestamp = new Date().getTime() - date.getTime();
  timestamp /= 1000 * 60 * 60 * 24 * 365.25;
  return timestamp;
}

export function useYearsAgo(date: Date) {
  const [years, setYears] = useState(getYearsAgo(date));

  useEffect(() => {
    const yearTimer = setInterval(() => setYears(getYearsAgo(date)), 1000);
    () => clearInterval(yearTimer);
  }, [date]);

  return years;
}
