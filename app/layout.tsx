import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Sansita } from "next/font/google";
import { GitHubProvider } from "@/context/GithubContext";
import { YEAR } from "@/constants/index";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://onwrap.vercel.app";
const siteName = "onWrap";
const siteDescription = `${YEAR}: Your GitHub Story onWrap - Relive the highlights of your coding adventure. Generate your personalized GitHub Year in Review with stats, contributions, and more!`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${YEAR}: Your GitHub Story onWrap`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "GitHub",
    "Year in Review",
    "GitHub Wrapped",
    "Developer Stats",
    "GitHub Analytics",
    "Coding Statistics",
    "GitHub Contributions",
    "Developer Wrap",
    "GitHub Year Summary",
    "Code Review",
    "GitHub Stats",
    "Developer Analytics",
    "Programming Statistics",
  ],
  authors: [{ name: "Victor Madu", url: "https://www.victormadu.com" }],
  creator: "Victor Madu",
  publisher: "Victor Madu",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/brand-github-copilot.svg",
    apple: "/brand-github-copilot.svg",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteName,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: siteName,
    title: `${YEAR}: Your GitHub Story onWrap`,
    description: siteDescription,
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${YEAR} GitHub Year in Review - onWrap`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${YEAR}: Your GitHub Story onWrap`,
    description: siteDescription,
    creator: "@victormadu",
    images: [`${baseUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: baseUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#6366f1" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteName,
    description: siteDescription,
    url: baseUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Person",
      name: "Victor Madu",
      url: "https://www.victormadu.com",
    },
    featureList: [
      "GitHub Year in Review",
      "Personalized Statistics",
      "Contribution Analytics",
      "Shareable Wrap",
      "Beautiful Visualizations",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={jetbrainsMono.variable}>
        <GitHubProvider>{children}</GitHubProvider>
      </body>
    </html>
  );
}
