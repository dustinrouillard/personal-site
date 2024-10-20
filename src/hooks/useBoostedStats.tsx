import { useCallback, useEffect, useState } from "react";

import { BoostedStats } from "../types/core";
import { getBoostedStats } from "../utils/core";
import { gateway } from "../utils/gateway";

export function useBoostedStats() {
  const [boostedStats, setBoostedStats] = useState<BoostedStats>();

  const boostedChange = useCallback(
    (data: BoostedStats) => setBoostedStats(data),
    [],
  );

  useEffect(() => {
    gateway.on("boosted_update", boostedChange);

    return () => {
      gateway.removeListener("boosted_update", boostedChange);
    };
  }, [boostedChange]);

  useEffect(() => {
    (async () => {
      try {
        const boostedStats = await getBoostedStats();
        setBoostedStats(boostedStats);
      } catch (error) {}
    })();
  }, []);

  return boostedStats;
}
