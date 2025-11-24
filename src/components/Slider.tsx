import React, {useState, useEffect, useRef, useCallback} from "react";
import IconButton from "./IconButton.tsx";
import {IoMdRefresh} from "react-icons/io";
import {RiLogoutBoxLine} from "react-icons/ri";
import {TiArrowLeftOutline, TiArrowRightOutline} from "react-icons/ti";
import {SLIDE_DURATION, MOBILE_BREAKPOINT, PROGRESS_BAR_COLOR, PROGRESS_BAR_HEIGHT, PROGRESS_UPDATE_INTERVAL} from "../constants/ui.ts";

interface SliderProps {
    slides: React.ComponentType[];
    slideDuration?: number;
    progressBarColor?: string;
    progressBarHeight?: number;
}

export default function Slider({
                                   slides,
                                   slideDuration = SLIDE_DURATION,
                                   progressBarColor = PROGRESS_BAR_COLOR,
                                   progressBarHeight = PROGRESS_BAR_HEIGHT,
                               }: SliderProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [progressValues, setProgressValues] = useState<number[]>(
        Array(slides.length).fill(0)
    );
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Check for mobile screen
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // Move to the next slide
    const goToNextSlide = useCallback(() => {
        clearInterval(intervalRef.current!);
        setCurrentSlide((prev) => {
            if (prev < slides.length - 1) {
                return prev + 1;
            }
            return prev;
        });
    }, [slides.length]);

    const goToPrevSlide = useCallback(() => {
        clearInterval(intervalRef.current!);
        setCurrentSlide((prev) => {
            if (prev > 0) {
                return prev - 1;
            }
            return slides.length - 1;
        });
    }, [slides.length]);

    // Reset progress for the next slide
    const resetProgressForNextSlide = useCallback(() => {
        setProgressValues((prev) => {
            const updatedProgress = [...prev];
            updatedProgress[currentSlide] = 0;
            if (currentSlide < slides.length - 1) {
                updatedProgress[currentSlide + 1] = 0;
            }
            return updatedProgress;
        });
        clearInterval(intervalRef.current!);
    }, [currentSlide, slides.length]);

    // Function to update progress for the current slide
    const updateProgress = useCallback(() => {
        setProgressValues((prev) => {
            const updatedProgress = [...prev];
            const increment = 100 / (slideDuration / PROGRESS_UPDATE_INTERVAL);
            if (updatedProgress[currentSlide] + increment >= 100) {
                updatedProgress[currentSlide] = 100;
                goToNextSlide();
            } else {
                updatedProgress[currentSlide] += increment;
            }
            return updatedProgress;
        });
    }, [currentSlide, slideDuration, goToNextSlide]);

    // Handle taps for navigation
    const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
        const screenWidth = window.innerWidth;
        if (e.clientX > screenWidth / 2) {
            goToNextSlide();
        } else {
            goToPrevSlide();
        }
    };

    const goHome = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        window.location.href = "/";
    }

    const goNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        goToNextSlide();
    }

    const goPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        goToPrevSlide();
    }

    const goToFirstSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        clearInterval(intervalRef.current!);
        setCurrentSlide(0);
        resetProgressForNextSlide();
    }

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === " ") {
                e.preventDefault();
                goToNextSlide();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                goToPrevSlide();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [goToNextSlide, goToPrevSlide]);

    // Start the timer for the current slide
    useEffect(() => {
        resetProgressForNextSlide();
        intervalRef.current = setInterval(updateProgress, PROGRESS_UPDATE_INTERVAL);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [currentSlide, updateProgress, resetProgressForNextSlide]);

    return (
        <div
            className="slider"
            onClick={handleTap}
            role="region"
            aria-label="GitHub wrap slideshow"
            tabIndex={0}
            style={{
                position: "relative",
                width: "100%",
                backgroundColor: "#000",
                height: "100svh",
                overflow: "hidden",
            }}
        >


            {/* Progress Bars */}
            <div
                className="progress-bars"
                style={{
                    position: "absolute",
                    top: "1rem",
                    left: "0",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "5px",
                    zIndex: "55",
                }}
            >
                {slides.map((_, index) => (
                    <div
                        key={index}
                        style={{
                            flexGrow: "1",
                            height: `${progressBarHeight}px`,
                            backgroundColor: "#555",
                            opacity: index === currentSlide ? "1" : "0.5",
                            overflow: "hidden",
                            borderRadius: "5px",
                        }}
                    >
                        <div
                            style={{
                                width: `${progressValues[index]}%`,
                                height: "100%",
                                backgroundColor: progressBarColor,
                                transition: index === currentSlide ? "width 0.1s linear" : undefined,
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Slides Rendering */}
            {slides.map((SlideComponent, index) => (
                <div
                    key={index}
                    style={{
                        display: currentSlide === index ? "block" : "none",
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {currentSlide === index && <SlideComponent key={currentSlide}/>}
                </div>
            ))}


            {/*buttons*/}
            <div style={{
                position: "absolute",
                bottom: 10,
                left: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // transform: "translateX(-50%)",
                gap: "0.5rem",
                zIndex: 20,
            }}><IconButton icon={<IoMdRefresh/>} handleClick={goToFirstSlide} aria-label="Restart slideshow"/>
                <IconButton icon={<RiLogoutBoxLine/>} handleClick={goHome} aria-label="Return to home"/>
            </div>


            {/*arrow buttons*/}
            {!isMobile && (<div style={{
                position: "fixed",
                inset: "3rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.5rem",
                zIndex: 20,
            }}><IconButton icon={<TiArrowLeftOutline/>} handleClick={goPrev} aria-label="Previous slide"/>
                <IconButton icon={<TiArrowRightOutline/>} handleClick={goNext} aria-label="Next slide"/>
            </div>)}
        </div>
    );
};
