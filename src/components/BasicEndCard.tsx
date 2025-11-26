import React, { ReactNode } from "react";
import Card from "./Card.tsx";

interface BasicEndCardProps {
  icon: ReactNode;
  iconColor: string;
  value: string | number;
  title: string;
  delay?: number;
}

export default function BasicEndCard({
  icon,
  iconColor,
  value,
  title,
  delay = 0.15,
}: BasicEndCardProps) {
  return (
    <Card flex={1} flexDirection="column" gap="0.5rem" delay={delay}>
      <div
        style={{
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          background: iconColor + "30",
        }}
      >
        {React.isValidElement(icon)
          ? React.cloneElement(
              icon as React.ReactElement<{ color: string; size: number }>,
              {
                color: iconColor,
                size: 20,
              }
            )
          : icon}
      </div>
      <div
        style={{
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "rgb(255, 255, 255)",
          lineHeight: 1,
          width: "100%",
          overflowWrap: "break-word",
          wordBreak: "break-word",
          maxWidth: "100%",
        }}
      >
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      <div
        style={{
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "0.875rem",
          fontWeight: 500,
        }}
      >
        {title}
      </div>
    </Card>
  );
}
