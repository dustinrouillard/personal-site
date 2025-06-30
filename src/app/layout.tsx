import "../assets/app.css";

import { Noto_Color_Emoji, Roboto_Mono } from "next/font/google";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
