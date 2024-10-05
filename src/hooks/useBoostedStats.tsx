import { useEffect, useState } from "react";

import { BoostedStats } from "../types/core";
import { getBoostedStats } from "../utils/core";

export function useBoostedStats() {
  const [boostedStats, setBoostedStats] = useState<BoostedStats>();

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
