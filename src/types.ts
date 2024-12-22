
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
    heading: string;
    body: string;
    background: string;
    emojis: EmojiProps[];
}

export interface SliderProps {
    slides: SlideProps[];
}