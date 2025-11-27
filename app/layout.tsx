import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { GitHubProvider } from "@/context/GithubContext";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "onWrap",
  description:
    "Your GitHub Story onWrap - Relive the highlights of your coding adventure",
  icons: {
    icon: "/brand-github-copilot.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GitHubProvider>{children}</GitHubProvider>
      </body>
    </html>
  );
}
