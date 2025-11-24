import EndNoteCard from "./EndNoteCard.tsx";
import {
  commitsTitle,
  peakPerformanceTitle,
  prReviewsTitle,
  pullRequestsTitle,
  slangTitle,
  starsReceivedTitle,
  streakTitle,
  topLanguageTitle,
  year,
} from "../constants.ts";
import {
  CommitsIcon,
  PeakPerformanceIcon,
  PrReviewsIcon,
  PullRequestsIcon,
  SlangIcon,
  StarsReceivedIcon,
  StreakIcon,
  TopLanguageIcon,
} from "../constants/endNoteIcons.tsx";
import { useGitHub } from "../context/GithubContext.tsx";
import { getSlang } from "../utils.ts";
import React, { useEffect, useRef, useState } from "react";
import { MOBILE_ENDNOTE_BREAKPOINT } from "../constants/ui.ts";
import GradientBg from "./GradientBg.tsx";
import { AbstractShapesBackground } from "./AbstractShapes.tsx";
import { COLORS, GRADIENTS } from "../constants/colors.ts";
import { motion } from "framer-motion";

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

  // Use the same dark gradient as IntroSlide
  const darkGradient = `linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        background: darkGradient,
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <GradientBg slideIndex={9} animated={false} opacity={0.04} />
      <AbstractShapesBackground
        count={2}
        types={["circle"]}
        minSize={200}
        maxSize={300}
      />
      {/* Foreground Content */}
      <div
        ref={divRef}
        className="endnote-content"
        style={{
          textAlign: "center",
          color: "#08C2F1",
          width: isMobile ? "100%" : "400px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          gap: "1rem",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            width: "100%",
            flexDirection: "column",
            gap: "0.5rem",
            padding: "0.5rem 0",
          }}
        >
          <motion.div
            className="top-margin"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              width: "100%",
              marginTop: "2rem",
              position: "sticky",
              top: 30,
              zIndex: 50,
            }}
          >
            <div
              style={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                gap: "0.5rem",
                background: GRADIENTS.purpleBlue,
                borderRadius: "0.5rem",
                color: COLORS.white,
              }}
            >
              <img
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: 50,
                }}
                src={data?.profilePicture}
                alt={`${data?.userId || "GitHub user"} profile picture`}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              <p>{`@${data?.userId}`}</p>
              <p
                style={{
                  fontSize: "clamp(1.2rem, 2vw, 1.3rem)",
                  fontWeight: "bold",
                }}
              >{`${year} GitHub Year in Code`}</p>
              <div
                style={{
                  color: "white",
                  textAlign: "left",
                }}
              ></div>
            </div>
          </motion.div>
          <div style={{ display: "flex", width: "100%", gap: "0.5rem" }}>
            <EndNoteCard
              icon={<StarsReceivedIcon />}
              title={starsReceivedTitle}
              data={data?.totalStars.toLocaleString() || "0"}
              cardIndex={0}
              delay={0.2}
            />
            <EndNoteCard
              icon={<TopLanguageIcon />}
              title={topLanguageTitle}
              data={data?.topLanguage || "N/A"}
              cardIndex={1}
              delay={0.3}
            />
          </div>
          <div style={{ display: "flex", width: "100%", gap: "0.5rem" }}>
            <EndNoteCard
              icon={<CommitsIcon />}
              title={commitsTitle}
              data={data?.totalCommits.toLocaleString() || "0"}
              cardIndex={2}
              delay={0.4}
            />
            <EndNoteCard
              icon={<PullRequestsIcon />}
              title={pullRequestsTitle}
              data={data?.totalPRs.toLocaleString() || "0"}
              cardIndex={3}
              delay={0.5}
            />
          </div>
          <div style={{ display: "flex", width: "100%", gap: "0.5rem" }}>
            <EndNoteCard
              icon={<PeakPerformanceIcon />}
              title={peakPerformanceTitle}
              data={data?.peakMonth || "N/A"}
              cardIndex={4}
              delay={0.6}
            />
            <EndNoteCard
              icon={<StreakIcon />}
              title={streakTitle}
              data={data?.longestStreak.toString() || "0"}
              cardIndex={5}
              delay={0.7}
            />
          </div>
          <div style={{ display: "flex", width: "100%", gap: "0.5rem" }}>
            <EndNoteCard
              icon={<PrReviewsIcon />}
              title={prReviewsTitle}
              data={data?.totalReviews.toLocaleString() || "0"}
              cardIndex={0}
              delay={0.8}
            />
            <EndNoteCard
              icon={<SlangIcon />}
              title={slangTitle}
              data={slang.slang}
              cardIndex={1}
              delay={0.9}
            />
          </div>
        </div>
        <motion.div
          className="signature"
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
        {/* Download button positioned in unified button area */}
      </div>
    </div>
  );
};

export default EndNote;
