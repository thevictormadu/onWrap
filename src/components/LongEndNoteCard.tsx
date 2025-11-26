import React, { ReactNode } from "react";
import Card from "./Card.tsx";

interface LongEndNoteCardProps {
  icon: ReactNode;

  iconColor: string;
  value: string;
  title: string;
  delay?: number;
  flex?: number;
}

export default function LongEndNoteCard({
  icon,

  iconColor,
  value,
  title,
  delay = 0.4,
  flex = 1,
}: LongEndNoteCardProps) {
  return (
    <Card
      flex={flex}
      flexDirection="row"
      gap="1rem"
      alignItems="center"
      delay={delay}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "rgb(255, 255, 255)",
            lineHeight: 1,
          }}
        >
          {value}
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
      </div>
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
    </Card>
  );
}
