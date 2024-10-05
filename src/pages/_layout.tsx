import Head from "next/head";

import { PropsWithChildren } from "react";
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

export interface Props extends PropsWithChildren {
  page_class?: string;
  active_page?: string;
}

export default function Layout(props: Props) {
  return (
    <>
      <Head>
        <title>Dustin Rouillard</title>

        <Meta />

        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👋🏻</text></svg>"
        />
      </Head>

      <div className="flex flex-col items-center h-screen mx-2 xl:mx-32 2xl:mx-40 space-y-2">
        <div className="flex justify-center w-full">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:items-center md:justify-between w-full h-fit text-black dark:text-white bg-neutral-200 dark:bg-black rounded-b-lg py-4 px-3">
            <Link href="/">
              <div className="flex flex-row space-x-3 items-center">
                <p className="text-2xl font-bold">Dustin Rouillard</p>
                <StatusIcon />
              </div>
            </Link>
          </div>
        </div>

        <div
          className={`w-full py-5 md:py-10 px-3 md:px-36 ${props.page_class ?? ""}`}
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
          <p className="opacity-60 cursor-default">dstn.to</p>
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
