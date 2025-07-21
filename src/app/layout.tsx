import PlausibleProvider from "next-plausible";
import "../assets/app.css";

import { Noto_Color_Emoji, Roboto_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { RemoveSourceQuery } from "../components/utility/QueryParams";
import { Suspense } from "react";

const mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  fallback: ["monospace"],
});

const noto = Noto_Color_Emoji({
  subsets: ["emoji"],
  display: "swap",
  weight: ["400"],
});

export const metadata = {
  title: "Dustin Rouillard",
  metadataBase: new URL("https://dstn.to"),
  authors: [{ name: "Dustin Rouillard", url: "https://dstn.to" }],
  description:
    "Software Engineer, Systems Administrator, and Amateur Photographer",
  keywords: [
    "software engineer",
    "systems administrator",
    "amateur photographer",
    "developer",
    "kubernetes",
    "photography",
    "long exposure",
  ],
  twitter: {
    creator: "@dustinrouillard",
    site: "@dustinrouillard",
  },
  icons: [
    {
      rel: "icon",
      href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👋🏻</text></svg>",
      url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👋🏻</text></svg>",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlausibleProvider domain="dstn.to" enabled selfHosted>
      <html lang="en">
        <body>
          <Suspense fallback={null}>
            <RemoveSourceQuery />
          </Suspense>

          <Toaster />

          {children}
        </body>
      </html>
    </PlausibleProvider>
  );
}
