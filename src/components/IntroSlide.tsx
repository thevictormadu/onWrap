import { motion } from "framer-motion";
import NameCard from "./NameCard.tsx";
import { useGitHub } from "../context/GithubContext.tsx";
import { useEffect, useState } from "react";
import { INTRO_PRETEXT_DURATION } from "../constants/ui.ts";
import GradientBg from "./GradientBg.tsx";
import { AbstractShapesBackground } from "./AbstractShapes.tsx";
import { getTextGradient } from "../constants/colors.ts";
import { COLORS } from "../constants/colors.ts";
import { year } from "../constants.ts";

export default function IntroSlide() {
  const { data } = useGitHub();
  const [showPretext, setShowPretext] = useState(true);
  useEffect(() => {
    setShowPretext(true);
    const timer = setTimeout(() => {
      setShowPretext(false);
    }, INTRO_PRETEXT_DURATION);
    return () => clearTimeout(timer);
  }, []);

  const textGradient = getTextGradient(COLORS.blue, COLORS.pink);
  // Use a darker gradient for the intro slide
  const darkGradient = `linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        background: darkGradient,
        width: "100%",
        height: "100svh",
        overflow: "hidden",
      }}
    >
      <GradientBg slideIndex={0} animated={false} opacity={0.04} />
      <AbstractShapesBackground
        count={2}
        types={["circle"]}
        minSize={250}
        maxSize={350}
      />
      {/* Foreground Content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: COLORS.white,
          zIndex: 20,
          width: "100%",
          height: "100%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          gap: "2rem",
        }}
      >
        <motion.div
          style={{ position: "absolute", top: "5rem" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <NameCard
            title={`@${data?.userId}`}
            value={`${year} GitHub Year in Code`}
          />
        </motion.div>

        {showPretext ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontSize: "2.5rem",
                fontWeight: 800,
                margin: 0,
                padding: "0 2rem",
                lineHeight: 1.1,
              }}
            >
              <span
                style={{
                  background: textGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "block",
                }}
              >
                👋 Hi {data?.firstName || ""} {data?.lastName || ""}
              </span>
              <span
                style={{
                  
               
                  display: "block",
                  marginTop: "0.5rem",
                }}
              >
                Welcome to Your {year} GitHub Year in Code
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                padding: "0 2rem",
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: 1.6,
                maxWidth: "90%",
              }}
            >
              Enough about 2024, let's talk about you. Ready to see your
              achievements, highlights, and the moments that made you shine?
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <motion.p
              style={{
                fontSize: "2rem",
                padding: "2rem",
                fontWeight: 600,
              }}
            >
              Shall we? 🤗
            </motion.p>
            <motion.p
              style={{
                fontSize: "1rem",
                padding: "2rem",
                fontWeight: 200,
              }}
            >
              Click anywhere ◂left or right▸ to navigate
            </motion.p>
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                fontSize: "3rem",
              }}
            >
              ↓
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
