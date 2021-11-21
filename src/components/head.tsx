import Head from "next/head";
import { ReactElement } from "react";

interface IHeadProps {
  name: string;
}

export function PageHead(props: IHeadProps): ReactElement {
  return (
    <Head>
      <title>{props.name} • Dustin Rouillard</title>

      {/* <meta name="viewport" content="width=device-width, initial-scale=0.5" /> */}
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="author" content="Dustin Rouillard" />
      <meta name="copyright" content="Dustin Rouillard" />
      <meta name="rating" content="General" />
      <meta name="url" content="https://dustin.sh" />
      <meta
        name="description"
        content="Dustin Rouillard - Software Engineer, Networking/Systems Administrator"
      />
      <meta name="twitter:creator" content="@dustinrouillard" />
      <meta name="twitter:site" content="@dustinrouillard" />
      <meta
        name="keywords"
        content="Software Engineer, Networking/Systems Administrator, Developer"
      />

      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👋🏻</text></svg>"
      />
    </Head>
  );
}
