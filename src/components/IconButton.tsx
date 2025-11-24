import { MouseEventHandler, ReactNode } from "react";

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
  return (
    <button
      aria-label={ariaLabel || text || "Button"}
      style={{
        border: "1px solid rgba(255, 255, 255, 0.08)",
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(8px)",
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
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
        e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
        e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
      }}
      onClick={handleClick}
    >
      <div>{icon}</div>
      {text && <div style={{ fontSize: "1rem" }}>{text}</div>}
    </button>
  );
}
