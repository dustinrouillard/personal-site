"use client";

import React, { useCallback, useEffect, useState } from "react";

import { LanyardPresence } from "../types/lanyard";

import { Tippy } from "./tippy";
import { lanyard } from "../utils/lanyard";

export function StatusIdle() {
  return (
    <mask
      id="svg-mask-status-idle"
      maskContentUnits="objectBoundingBox"
      viewBox="0 0 1 1"
    >
      <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
      <circle fill="black" cx="0.25" cy="0.25" r="0.375"></circle>
    </mask>
  );
}

export function StatusDnd() {
  return (
    <mask
      id="svg-mask-status-dnd"
      maskContentUnits="objectBoundingBox"
      viewBox="0 0 1 1"
    >
      <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
      <rect
        fill="black"
        x="0.125"
        y="0.375"
        width="0.75"
        height="0.25"
        rx="0.125"
        ry="0.125"
      ></rect>
    </mask>
  );
}

export function StatusOffline() {
  return (
    <mask
      id="svg-mask-status-offline"
      maskContentUnits="objectBoundingBox"
      viewBox="0 0 1 1"
    >
      <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
      <circle fill="black" cx="0.5" cy="0.5" r="0.25"></circle>
    </mask>
  );
}

export function StatusOnline() {
  return (
    <mask
      id="svg-mask-status-online"
      maskContentUnits="objectBoundingBox"
      viewBox="0 0 1 1"
    >
      <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
    </mask>
  );
}

export function StatusOnlineMobile() {
  return (
    <mask
      id="svg-mask-status-online-mobile"
      maskContentUnits="objectBoundingBox"
      viewBox="0 0 1 1"
    >
      <rect
        fill="white"
        x="0"
        y="0"
        width="1"
        height="1"
        rx="0.1875"
        ry="0.125"
      ></rect>
      <rect
        fill="black"
        x="0.125"
        y="0.16666666666666666"
        width="0.75"
        height="0.5"
      ></rect>
      <ellipse
        fill="black"
        cx="0.5"
        cy="0.8333333333333334"
        rx="0.125"
        ry="0.08333333333333333"
      ></ellipse>
    </mask>
  );
}

const StatusMap = {
  dnd: "hsl(359, calc(var(--saturation-factor, 1) * 82.6%), 59.4%)",
  online: "hsl(139, calc(var(--saturation-factor, 1) * 47.3%), 43.9%)",
  idle: "hsl(38, calc(var(--saturation-factor, 1) * 95.7%), 54.1%)",
  offline: "hsl(214, calc(var(--saturation-factor, 1) * 9.9%), 50.4%)",
};

export function StatusIcon() {
  const [status, setStatus] = useState<string>("offline");
  const [activeOnMobile, setActiveOnMobile] = useState(false);

  const presenceChange = useCallback((data: LanyardPresence) => {
    setStatus(data.discord_status || "offline");
    setActiveOnMobile(data.active_on_discord_mobile);
  }, []);

  useEffect(() => {
    lanyard.on("presence", presenceChange);

    // We don't have an event listener when we first get the presence data so request it again from local cache
    lanyard.requestPresenceUpdate();

    return () => {
      lanyard.removeListener("presence", presenceChange);
    };
  }, [presenceChange]);

  return (
    <Tippy
      placement="right"
      content={
        status == "dnd"
          ? "Do not disturb"
          : status == "online" && activeOnMobile
            ? "Online on Mobile"
            : status.replace(
                /\w\S*/g,
                (txt) =>
                  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
              )
      }
    >
      <span className="w-fit">
        <svg height="40" width="24">
          {!activeOnMobile && (
            <rect
              width="24"
              height="24"
              x="0"
              y="7"
              fill={StatusMap[status]}
              mask={`url(#svg-mask-status-${status})`}
            />
          )}
          {activeOnMobile && status == "online" && (
            <rect
              width="24"
              height="36"
              x="0"
              y="0"
              fill={StatusMap[status]}
              mask="url(#svg-mask-status-online-mobile)"
            />
          )}
        </svg>
      </span>
    </Tippy>
  );
}
