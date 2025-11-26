import {
  peakPerformanceTitle,
  prReviewsTitle,
  pullRequestsTitle,
  slangTitle,
  starsReceivedTitle,
  topLanguageTitle,
} from "../constants.ts";
import { useGitHub } from "../context/GithubContext.tsx";
import { getSlang } from "../utils.ts";
import React, { useEffect, useRef, useState } from "react";
import {
  MOBILE_ENDNOTE_BREAKPOINT,
  GRID_PATTERN,
  GRID_PATTERN_SIZE,
  GLASSMORPHISM_BG,
  GLASSMORPHISM_BLUR,
  GLASSMORPHISM_BORDER,
  GLASSMORPHISM_SHADOW,
} from "../constants/ui.ts";
import { COLORS } from "../constants/colors.ts";
import { motion } from "framer-motion";
import BasicEndCard from "./BasicEndCard.tsx";
import BoldEndCard from "./BoldEndCard.tsx";
import LongEndNoteCard from "./LongEndNoteCard.tsx";
import ContributionsCard from "./ContributionsCard.tsx";
import { MdMergeType, MdLightbulb } from "react-icons/md";
import { PiStarThin } from "react-icons/pi";
import { GoCodeReview } from "react-icons/go";
import { LiaAwardSolid } from "react-icons/lia";
import { RiFireLine } from "react-icons/ri";

const EndNote: React.FC = () => {
  const { data } = useGitHub();
  const slang = getSlang(data?.totalCommits || 0);
  const [isMobile, setIsMobile] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_ENDNOTE_BREAKPOINT);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Glassmorphism style
  const glassmorphismStyle = {
    backgroundColor: GLASSMORPHISM_BG,
    backdropFilter: `blur(${GLASSMORPHISM_BLUR})`,
    WebkitBackdropFilter: `blur(${GLASSMORPHISM_BLUR})`,
    border: GLASSMORPHISM_BORDER,
    boxShadow: GLASSMORPHISM_SHADOW,
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        backgroundColor: "#000000",
        height: "100%",
        width: "100%",
        overflowY: "hidden",
        overflowX: "hidden",
      }}
    >
      {/* Grid pattern layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: GRID_PATTERN,
          backgroundSize: GRID_PATTERN_SIZE,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
          overflowX: "hidden",

          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Foreground Content */}
        <div
          ref={divRef}
          data-endnote-content="true"
          style={{
            width: isMobile ? "100%" : "400px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "stretch",
            padding: "1rem",
            gap: "0.75rem",
            position: "relative",
            marginTop: "20px",
          }}
        >
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              ...glassmorphismStyle,
              borderRadius: "0.75rem",
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
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
            <div style={{ flex: 1 }}>
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
          </motion.div>

          {/* Commits and Stars Received - Side by Side */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {/* Commits Card */}
            <ContributionsCard value={data?.totalCommits || 0} delay={0.1} />

            {/* Stars Received Card */}
            <BasicEndCard
              icon={<PiStarThin />}
              iconColor={COLORS.yellow}
              value={data?.totalStars || 0}
              title={starsReceivedTitle}
              delay={0.15}
            />
          </div>

          {/* PRs and Reviews - Side by Side */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {/* PRs Card */}
            <BasicEndCard
              icon={<MdMergeType />}
              iconColor={COLORS.green}
              value={data?.totalPRs || 0}
              title={pullRequestsTitle}
              delay={0.2}
            />

            {/* PR Reviews Card */}
            <BasicEndCard
              icon={<GoCodeReview />}
              iconColor={COLORS.cyan}
              value={(data?.totalReviews ?? 0).toLocaleString()}
              title={prReviewsTitle}
              delay={0.25}
            />
          </div>

          {/* Top Language Card - Full Width */}
          <LongEndNoteCard
            icon={<MdLightbulb />}
            iconColor={COLORS.white}
            value={data?.topLanguage || "N/A"}
            title={topLanguageTitle}
            delay={0.4}
            flex={0}
          />

          {/* Longest Streak and Peak Performance - Side by Side */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {/* Longest Streak Card */}
            <BoldEndCard
              value={data?.longestStreak || 0}
              title={"Day Longest Streak"}
              gradientColors={[COLORS.orange, "#FF8A00"]}
              delay={0.3}
            />

            {/* Peak Performance Card */}
            <BasicEndCard
              icon={<RiFireLine />}
              iconColor={COLORS.orange}
              value={data?.peakMonth || 0}
              title={peakPerformanceTitle}
              delay={0.35}
            />
          </div>

          {/* PR Reviews and Slang - Side by Side */}
          <div>
            {/* Slang Card */}
            <LongEndNoteCard
              icon={<LiaAwardSolid />}
              iconColor={COLORS.pink}
              value={slang.slang}
              title={slangTitle}
              delay={0.4}
              flex={0}
            />
          </div>

          <motion.div
            data-signature="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              display: "none",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "0.5rem",
              zIndex: 20,
              fontSize: "0.75rem",
              color: "rgba(255, 255, 255, 0.7)",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            🤍 made by{" "}
            <span style={{ fontWeight: 600, color: COLORS.white }}>
              Victor Madu
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EndNote;
