import Head from "next/head";
import { GiNightSleep, GiCommercialAirplane } from "react-icons/gi";
import { IoMdRocket } from "react-icons/io";

import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { Meta } from "../components/meta";
import {
  StatusDnd,
  StatusIcon,
  StatusIdle,
  StatusOffline,
  StatusOnline,
  StatusOnlineMobile,
} from "../components/status";
import Link from "next/link";
import { ChristmasLights } from "../components/ChristmasLights";
import { Age } from "../components/age";
import { gateway } from "../utils/gateway";
import { StatusResponse } from "../types/gateway";
import { Tippy } from "../components/tippy";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface Props extends PropsWithChildren {
  page_class?: string;
  active_page?: string;
}

export default function Layout(props: Props) {
  const [customStatus, setCustomStatus] = useState<string>();
  const [customStatusText, setCustomStatusText] = useState<string>();

  const [christmasTime, setChristmasTime] = useState(() => {
    const currentDate = new Date();
    return currentDate.getMonth() == 11;
  });

  useEffect(() => {
    const int = setInterval(() => {
      const currentDate = new Date();
      setChristmasTime(currentDate.getMonth() == 11);
    }, 1000);
    return () => clearInterval(int);
  }, []);

  const statusChange = useCallback((data: StatusResponse) => {
    setCustomStatus(data.type);
    setCustomStatusText(data.message);
  }, []);

  useEffect(() => {
    gateway.on("status", statusChange);

    return () => {
      gateway.removeListener("status", statusChange);
    };
  }, [statusChange]);

  return (
    <>
      <Head>
        <title>Dustin Rouillard</title>

        <Meta />
      </Head>

      {christmasTime ? (
        <div className="flex w-full">
          <ChristmasLights />
        </div>
      ) : (
        <></>
      )}

      <div className="flex flex-col items-center h-screen mx-2 xl:mx-32 2xl:mx-40 space-y-2">
        <div className="flex flex-col justify-center w-full">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:items-center md:justify-between w-full h-fit text-black dark:text-white bg-neutral-200 dark:bg-black rounded-b-lg py-4 px-3">
            <Link href="/">
              <div
                className={`flex flex-row space-x-3 items-center ${christmasTime ? "mt-8" : ""}`}
              >
                <p className="text-2xl font-bold">Dustin Rouillard</p>
                <StatusIcon />
                {customStatus == "sleeping" ? (
                  <div>
                    <Tippy placement="right" content={customStatusText}>
                      <span>
                        <GiNightSleep size={24} />
                      </span>
                    </Tippy>
                  </div>
                ) : customStatus == "camping" ? (
                  <div>
                    <Tippy placement="right" content={customStatusText}>
                      <span>
                        <IoMdRocket size={24} />
                      </span>
                    </Tippy>
                  </div>
                ) : customStatus == "flying" ? (
                  <div>
                    <Tippy placement="right" content={customStatusText}>
                      <span>
                        <GiCommercialAirplane size={24} />
                      </span>
                    </Tippy>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </Link>
            <Link
              className={clsx(
                props.active_page == "photography" ? "font-bold" : "",
              )}
              href="/photography"
            >
              <p className="bg-neutral-300 dark:bg-neutral-800 p-2 rounded-md text-sm hover:brightness-75 transition-all">
                Photography
              </p>
            </Link>
          </div>
        </div>

        <div
          className={twMerge(
            `w-full py-5 md:py-10 px-3 md:px-36`,
            props.page_class,
          )}
        >
          {props.children}
        </div>

        <div className="flex flex-row md:space-y-0 md:items-center justify-between px-5 w-full pb-8">
          <Link
            href="https://github.com/dustinrouillard/personal-site"
            target="_blank"
          >
            <p className="opacity-60 hover:opacity-100">View Source</p>
          </Link>
          <div className="cursor-default flex flex-row space-x-4 opacity-60">
            <Age />
            <p>•</p>
            <p>dstn.to</p>
          </div>
        </div>
      </div>

      <svg viewBox="0 0 1 1" className="absolute w-0 h-0" aria-hidden="true">
        <StatusIdle />
        <StatusOnline />
        <StatusDnd />
        <StatusOffline />
        <StatusOnlineMobile />
      </svg>
    </>
  );
}
