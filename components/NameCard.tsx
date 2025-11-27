"use client";

import { useGitHub } from "@/context/GithubContext";
import Card from "./Card";
import { COLORS } from "@/constants/colors";

export default function NameCard() {
  const { data } = useGitHub();
  return (
    <Card flexDirection="row" flex={0} gap="1rem">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "0.5rem",
          flexShrink: 0,
        }}
        src={data?.profilePicture}
        alt={`${data?.userId || "GitHub user"} profile picture`}
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
        }}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: "0.875rem",
          }}
        >
          @{data?.userId || "github"}
        </div>
        <div
          style={{
            color: COLORS.white,
            fontWeight: 600,
            fontSize: "1rem",
            marginBottom: "0.25rem",
          }}
        >
          2025 Github Year in Code
        </div>
      </div>
    </Card>
  );
}

