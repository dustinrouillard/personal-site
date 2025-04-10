import { useEffect, useState } from "react";

import { WeatherConditions } from "../types/core";
import { getWeatherConditions } from "../utils/core";

export function useWeather() {
  const [weather, setWeather] = useState<WeatherConditions>();

  useEffect(() => {
    (async () => {
      try {
        const cond = await getWeatherConditions();
        setWeather(cond);
      } catch (error) {
        setWeather({
          temperature: 0,
          humidity: 0,
        });
      }
    })();
  }, []);

  return weather;
}
