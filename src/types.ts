
export interface IconProps {
    content: string;
    size: number;
    blur: number;
    opacity: number;
    zIndex: number;
    color?: string;
    initialX?: number; // Precomputed X position
    initialY?: number; // Precomputed Y position
    duration?: number;
}

export interface SlideProps {
    background: string;
    text: string;
    subtext: string;
    icons: IconProps[];
}

export interface SliderProps {
    slides: SlideProps[];
}