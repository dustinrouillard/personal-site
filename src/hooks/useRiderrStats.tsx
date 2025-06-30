import { useCallback, useEffect, useState } from "react";

import { RiderrUserStats } from "../types/core";
import { getRiderrUserStats } from "../utils/core";
import { gateway } from "../utils/gateway";

export function useRiderrStats() {
  const [riderrStats, setRiderrStats] = useState<RiderrUserStats>();

  const riderrChange = useCallback(
    (data: RiderrUserStats) => setRiderrStats(data),
    [],
  );

  useEffect(() => {
    if (gateway) gateway.on("riderr_update", riderrChange);

    return () => {
      if (gateway) gateway.removeListener("riderr_update", riderrChange);
    };
  }, [riderrChange]);

  useEffect(() => {
    (async () => {
      try {
        const riderrStats = await getRiderrUserStats();
        setRiderrStats(riderrStats);
      } catch (error) {}
    })();
  }, []);

  return riderrStats;
}
