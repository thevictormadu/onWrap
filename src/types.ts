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

export interface SlideProps {
    data: string;
    subText?: string;
    preText?: string;
    title: string;
    background?: string;
    emojis: EmojiProps[];
    keyProp: number;
}

export interface SliderProps {
    slides: SlideProps[];
}

export interface FrostedGlassProps {
    children: React.ReactNode;
    width?: string;
    maxWidth?: string;
    borderRadius?: string;
    blur?: string;
    padding?: string;
    margin?: string;
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
}