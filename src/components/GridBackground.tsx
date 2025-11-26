import { ReactNode } from "react";
import { GRID_PATTERN, GRID_PATTERN_SIZE } from "../constants/ui.ts";

interface GridBackgroundProps {
  children: ReactNode;
  background?: string;
}

export default function GridBackground({
  children,
  background = GRID_PATTERN,
}: GridBackgroundProps) {
  return (
    <div
      style={{
        height: "100svh",
        position: "relative",
        background: background,
        backgroundSize: GRID_PATTERN_SIZE,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}
