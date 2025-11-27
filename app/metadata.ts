import { Metadata } from "next";
import { YEAR } from "@/constants/index";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://onwrap.vercel.app";

export function generateHomeMetadata(): Metadata {
  return {
    title: `${YEAR}: Your GitHub Story onWrap`,
    description: `Generate your personalized ${YEAR} GitHub Year in Review. View your coding stats, contributions, top language, longest streak, and more. Share your developer journey!`,
    openGraph: {
      title: `${YEAR}: Your GitHub Story onWrap`,
      description: `Generate your personalized ${YEAR} GitHub Year in Review. View your coding stats, contributions, and share your developer journey!`,
      url: baseUrl,
      siteName: "onWrap",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${YEAR} GitHub Year in Review - onWrap`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${YEAR}: Your GitHub Story onWrap`,
      description: `Generate your personalized ${YEAR} GitHub Year in Review. Share your developer journey!`,
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

export function generateWrapMetadata(username?: string): Metadata {
  const title = username
    ? `${username}'s ${YEAR} GitHub Wrap | onWrap`
    : `${YEAR} GitHub Wrap | onWrap`;
  const description = username
    ? `View ${username}'s ${YEAR} GitHub Year in Review. See their coding stats, contributions, top language, and more!`
    : `View your ${YEAR} GitHub Year in Review. See your coding stats, contributions, top language, and more!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/wrap`,
      siteName: "onWrap",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${YEAR} GitHub Year in Review - onWrap`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og-image.png`],
    },
    robots: {
      index: false, // Don't index individual wrap pages
      follow: true,
    },
  };
}

