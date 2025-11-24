import { motion } from "framer-motion";
import { getCardColor } from "../utils/colors.ts";
import { hexToRgba } from "../utils/colors.ts";
import { COLORS } from "../constants/colors.ts";
import { ReactNode } from "react";

interface Props {
  title: string;
  data: string;
  icon: ReactNode;
  cardIndex?: number;
  delay?: number;
}

export default function EndNoteCard({
  title,
  data,
  icon,
  cardIndex = 0,
  delay = 0.3,
}: Props) {
  const cardColor = getCardColor(cardIndex);
  const borderColor = hexToRgba(cardColor, 0.3);

  return (
    <motion.div
      style={{
        borderRadius: "0.5rem",
        width: "50%",

        background: COLORS.lightGray,
        //border: `1px solid ${borderColor}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
      initial={{ y: 50, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: delay,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 12px 40px ${hexToRgba(
          cardColor,
          0.4
        )}, 0 0 0 2px ${borderColor}`,
      }}
    >
      <div
        style={{
          color: "white",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          padding: "1.25rem",
          width: "100%",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              marginBottom: "0.5rem",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </div>
          </div>
          <p
            style={{
              fontSize: "0.875rem",
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: 500,
              margin: 0,
            }}
          >
            {title}
          </p>
        </div>
        <p
          className="metric-number"
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            margin: 0,
            color: cardColor,
            lineHeight: 1.2,
          }}
        >
          {data}
        </p>
      </div>
    </motion.div>
  );
}
