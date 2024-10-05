import { useEffect, useState } from "react";

import { Analytics } from "../types/core";
import { getAnalytics } from "../utils/core";

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics>();

  useEffect(() => {
    (async () => {
      try {
        const analytics = await getAnalytics();
        setAnalytics(analytics);
      } catch (error) {}
    })();
  }, []);

  return analytics;
}
