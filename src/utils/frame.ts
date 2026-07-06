import { CSSProperties } from "react";
import { PhotoFrame } from "../types/gallery";

// Converts a photo's frame (focal point as x/y percentages) into a CSS
// object-position value. Defaults to centered when no frame is set.
export function frameObjectPosition(frame?: PhotoFrame): string {
  const x = frame?.x ?? 50;
  const y = frame?.y ?? 50;
  return `${x}% ${y}%`;
}

export function frameStyle(frame?: PhotoFrame): CSSProperties {
  return { objectPosition: frameObjectPosition(frame) };
}
