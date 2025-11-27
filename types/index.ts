import React from "react";

export interface EmojiProps {
  content: string;
  size: number;
  blur: number;
  opacity: number;
  zIndex?: number;
  color?: string;
  initialX: number;
  initialY: number;
  duration?: number;
}

export interface FrostedGlassProps {
  children: React.ReactNode;
  borderRadius?: string;
  blur?: string;
}

export interface EmojiParticle {
  id: number;
  emoji: string;
  style: {
    size: number;
    velocity: number;
    xStart: number;
    xEnd: number;
    curve: number;
    blur: boolean;
  };
}

export interface FloatingEmojisProps {
  emojiList: string[];
  zIndex?: number;
}

export interface WrapItemsType {
  introduction: string;
  value: string;
  subtext: string;
  suffix?: string;
  title: string;
}

export interface WrapCollection {
  stars: WrapItemsType;
  topLanguage: WrapItemsType;
  commits: WrapItemsType;
  pullRequests: WrapItemsType;
  prsMerged: WrapItemsType;
  peakPerformance: WrapItemsType;
  streak: WrapItemsType;
  slang: WrapItemsType;
}

export interface Slangs {
  slang: string;
  emoji: string;
}

