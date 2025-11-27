"use client";

import Card from "./Card";

interface BoldEndCardProps {
  value: string | number;
  title: string;
  gradientColors: [string, string];
  delay?: number;
}

export default function BoldEndCard({
  value,
  title,
  gradientColors,
  delay = 0.1,
}: BoldEndCardProps) {
  return (
    <Card
      flex={1}
      flexDirection="row"
      gap="1rem"
      alignItems="center"
      justifyContent="space-between"
      delay={delay}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            lineHeight: 1,
            marginBottom: "0.5rem",
            background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          }}
          data-longest-streak-title="true"
        >
          {typeof value === "number" ? value.toLocaleString() : value} {title}
        </div>
      </div>
    </Card>
  );
}
