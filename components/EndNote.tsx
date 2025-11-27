"use client";

import { SLIDE_CONFIG } from "@/constants/index";
import { useGitHub } from "@/context/GithubContext";
import { getLanguageIconAndColor, getSlang } from "@/lib/utils";
import React, { useRef } from "react";
import { MOBILE_ENDNOTE_BREAKPOINT } from "@/constants/ui";
import { useMediaQuery } from "@/hooks";
import { COLORS, primaryColor } from "@/constants/colors";
import { motion } from "framer-motion";
import BasicEndCard from "./BasicEndCard";
import BoldEndCard from "./BoldEndCard";
import LongEndNoteCard from "./LongEndNoteCard";
import ContributionsCard from "./ContributionsCard";
import { MdLightbulb } from "react-icons/md";
import NameCard from "./NameCard";
import GridBackground from "./GridBackground";

const EndNote: React.FC = () => {
  const { data } = useGitHub();
  const slang = getSlang(data?.totalContributions || 0);
  const isMobile = useMediaQuery(MOBILE_ENDNOTE_BREAKPOINT);
  const divRef = useRef<HTMLDivElement>(null);
  const languageIconData = getLanguageIconAndColor(data?.topLanguage || "");

  return (
    <GridBackground>
      <div
        style={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          padding: isMobile ? "1rem" : "0",
        }}
      >
        {/* Foreground Content */}
        <div
          ref={divRef}
          data-endnote-content="true"
          style={{
            width: isMobile ? "100%" : "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "stretch",
            padding: isMobile ? "0.5rem 0 5rem 0" : "1rem",
            gap: "0.75rem",
            position: "relative",
            marginTop: "20px",
            boxSizing: "border-box",
          }}
        >
          {/* Profile Card */}
          <NameCard />

          {/* Commits and Stars Received - Side by Side */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {/* Commits Card */}
            <ContributionsCard value={data?.totalCommits || 0} delay={0.1} />

            {/* Stars Received Card */}
            <BasicEndCard
              icon={React.createElement(SLIDE_CONFIG.starsReceived.icon, {
                color: SLIDE_CONFIG.starsReceived.color,
              })}
              iconColor={SLIDE_CONFIG.starsReceived.color}
              value={data?.totalStars || 0}
              title={SLIDE_CONFIG.starsReceived.title}
              delay={0.15}
            />
          </div>

          {/* PRs and Reviews - Side by Side */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {/* PRs Card */}
            <BasicEndCard
              icon={React.createElement(SLIDE_CONFIG.pullRequests.icon, {
                color: SLIDE_CONFIG.pullRequests.color,
              })}
              iconColor={SLIDE_CONFIG.pullRequests.color}
              value={data?.totalPRs || 0}
              title={SLIDE_CONFIG.pullRequests.title}
              delay={0.2}
            />

            {/* PR Reviews Card */}
            <BasicEndCard
              icon={React.createElement(SLIDE_CONFIG.forks.icon, {
                color: SLIDE_CONFIG.forks.color,
              })}
              iconColor={SLIDE_CONFIG.forks.color}
              value={(data?.totalForkedRepos ?? 0).toLocaleString()}
              title={SLIDE_CONFIG.forks.title}
              delay={0.25}
            />
          </div>

          {/* Top Language Card - Full Width */}
          <LongEndNoteCard
            icon={React.createElement(languageIconData.icon || MdLightbulb, {
              color: languageIconData.color || primaryColor,
            })}
            iconColor={languageIconData.color || primaryColor}
            value={data?.topLanguage || "N/A"}
            title={SLIDE_CONFIG.topLanguage.title}
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
              icon={React.createElement(SLIDE_CONFIG.peakPerformance.icon, {
                color: SLIDE_CONFIG.peakPerformance.color,
              })}
              iconColor={SLIDE_CONFIG.peakPerformance.color}
              value={data?.peakMonth || 0}
              title={SLIDE_CONFIG.peakPerformance.title}
              delay={0.35}
            />
          </div>

          {/* PR Reviews and Slang - Side by Side */}
          <div>
            {/* Slang Card */}
            <LongEndNoteCard
              icon={React.createElement(SLIDE_CONFIG.slang.icon, {
                color: SLIDE_CONFIG.slang.color,
              })}
              value={slang.slang}
              title={SLIDE_CONFIG.slang.title}
              delay={0.4}
              flex={0}
            />
          </div>

          {!isMobile && (
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
              with ♥︎ from{" "}
              <span style={{ fontWeight: 600, color: COLORS.white }}>
                Victor Madu
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </GridBackground>
  );
};

export default EndNote;
