"use client";

import React, { ReactNode } from "react";
import Card from "./Card";

interface DoubleBasicEndCardProps {
  delay?: number;
  align?: "center" | "left" | "right";
  content: {
    icon: ReactNode;
    iconColor: string;
    value: string | number;
    title: string;
  }[];
}

export default function DoubleBasicEndCard({
  delay = 0.15,
  align = "center",
  content,
}: DoubleBasicEndCardProps) {
  const DoubleBasicCardRow = (content: {
    icon: ReactNode;
    iconColor: string;
    value: string | number;
    title: string;
  }) => {
    return (
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <div
          style={{
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            background: content.iconColor + "30",
          }}
        >
          {React.isValidElement(content.icon)
            ? React.cloneElement(
                content.icon as React.ReactElement<{
                  color: string;
                  size: number;
                }>,
                {
                  color: content.iconColor,
                  size: 20,
                }
              )
            : content.icon}
        </div>

        <div>
          <div
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "rgb(255, 255, 255)",
              lineHeight: 1,
              width: "100%",
              overflowWrap: "break-word",
              wordBreak: "break-word",
              maxWidth: "100%",
              textAlign: align,
            }}
          >
            {typeof content.value === "number"
              ? content.value.toLocaleString()
              : content.value}
          </div>

          <div
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "0.75rem",
              fontWeight: 500,
              textAlign: align,
            }}
          >
            {content.title}
          </div>
        </div>
      </div>
    );
  };
  return (
    <Card
      flex={1}
      flexDirection="column"
      alignItems={
        align === "center"
          ? "center"
          : align === "left"
          ? "flex-start"
          : "flex-end"
      }
      justifyContent="center"
      gap="0.5rem"
      delay={delay}
    >
      {content.map((item, index) => (
        <DoubleBasicCardRow key={index} {...item} />
      ))}
    </Card>
  );
}
