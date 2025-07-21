"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function RemoveSourceQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams?.has("utm_source")) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("utm_source");
      router.push(`${pathname}?${newSearchParams.toString()}`);
    }
  }, [searchParams]);

  return <></>;
}
