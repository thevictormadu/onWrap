"use client";

import { MouseEventHandler, ReactNode, useState } from "react";

interface Props {
  icon: ReactNode;
  text?: string;
  handleClick: MouseEventHandler<HTMLButtonElement> | undefined;
  "aria-label"?: string;
}

export default function IconButton({
  icon,
  text,
  handleClick,
  "aria-label": ariaLabel,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      aria-label={ariaLabel || text || "Button"}
      style={{
        border: "none",
        backgroundColor: "transparent",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s ease",
        fontSize: "1.2rem",
        color: "rgba(255, 255, 255, 0.7)",
        gap: "0.5rem",
        outline: "none",
        minWidth: "auto",
      }}
      onFocus={(e) => {
        e.currentTarget.style.outline = "1px solid rgba(255, 255, 255, 0.3)";
        e.currentTarget.style.outlineOffset = "1px";
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = "none";
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        // Prevent clicks on icon buttons from triggering parent click handlers
        // (e.g. the slider tap area that changes slides).
        e.stopPropagation();
        if (handleClick) {
          handleClick(e);
        }
      }}
    >
      <div
        style={{
          opacity: isHovered ? 0.5 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        {icon}
      </div>
      {text && <div style={{ fontSize: "1rem" }}>{text}</div>}
    </button>
  );
}
