import React, { useState, useEffect, useRef } from "react";

interface SliderProps {
    slides: React.ReactNode[]; // Each slide is a React component
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const SLIDE_DURATION = 5000; // Slide duration in ms

    useEffect(() => {
        startProgress();
        return () => clearTimer(); // Cleanup timer on unmount or index change
    }, [currentIndex]);

    const startProgress = () => {
        clearTimer();
        setProgress(0);

        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + 1;
                if (next >= 100) {
                    clearInterval(interval);
                    goToNextSlide();
                }
                return next;
            });
        }, SLIDE_DURATION / 100);

        timerRef.current = interval;
    };

    const clearTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const goToNextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const goToPrevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX } = e;
        const { innerWidth } = window;

        if (clientX < innerWidth / 2) goToPrevSlide();
        else goToNextSlide();
    };

    return (
        <div
            className="slider-container"
            onClick={handleTap}
            style={{
                display: "flex",
                position: "relative",
                width: "400px",
                height: "100%",
                overflow: "hidden",
            }}
        >
            {/* Progress Bars */}
            <div
                style={{
                    position: "absolute",
                    top: "10px",
                    left: "0",
                    right: "0",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 10px",
                    zIndex: 10,
                }}
            >
                {slides.map((_, index) => (
                    <div
                        key={index}
                        style={{
                            flex: 1,
                            height: "4px",
                            background: "rgba(255, 255, 255, 0.3)",
                            margin: "0 2px",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                width:
                                    index === currentIndex
                                        ? `${progress}%`
                                        : index < currentIndex
                                            ? "100%"
                                            : "0%",
                                height: "100%",
                                background: "#fff",
                                transition: index === currentIndex ? "none" : "width 0.3s ease",
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Slides */}
            <div
                style={{
                    display: "flex",
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: "transform 0.5s ease",
                    width: `${slides.length * 100}%`,
                }}
            >
                {slides.map((SlideComponent, index) => (
                    <div
                        key={index}
                        style={{
                            flex: "1 0 100%",
                            height: "100vh",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        {SlideComponent}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slider;