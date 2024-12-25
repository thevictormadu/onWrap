import React, {useState, useEffect, useRef} from "react";
import IconButton from "./IconButton.tsx";
import {IoMdRefresh} from "react-icons/io";
import {RiLogoutBoxLine} from "react-icons/ri";
import {TiArrowLeftOutline, TiArrowRightOutline} from "react-icons/ti";

interface SliderProps {
    slides: React.ComponentType[];
    slideDuration?: number;
    progressBarColor?: string;
    progressBarHeight?: number;
}

export default function Slider({
                                   slides,
                                   slideDuration = 10000,
                                   progressBarColor = "#00d4ff",
                                   progressBarHeight = 5,
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
            setIsMobile(window.innerWidth <= 500);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // Function to update progress for the current slide
    const updateProgress = () => {
        setProgressValues((prev) => {
            const updatedProgress = [...prev];
            const increment = 100 / (slideDuration / 100);
            if (updatedProgress[currentSlide] + increment >= 100) {
                updatedProgress[currentSlide] = 100;
                goToNextSlide();
            } else {
                updatedProgress[currentSlide] += increment;
            }
            return updatedProgress;
        });
    };

    // Move to the next slide
    const goToNextSlide = () => {
        clearInterval(intervalRef.current!);
        if (currentSlide < slides.length - 1) {
            setCurrentSlide((prev) => prev + 1);
        }
        // else {
        //     setCurrentSlide(0); // Loop back to the first slide
        // }
        resetProgressForNextSlide();
    };


    const goToPrevSlide = () => {
        clearInterval(intervalRef.current!);
        if (currentSlide > 0) {
            setCurrentSlide((prev) => prev - 1);
        } else {
            setCurrentSlide(slides.length - 1); // Loop back to the last slide
        }
        resetProgressForNextSlide();
    };

    // Reset progress for the next slide
    const resetProgressForNextSlide = () => {
        setProgressValues((prev) => {
            const updatedProgress = [...prev];
            updatedProgress[currentSlide] = 0; // Reset the current slide's progress
            if (currentSlide < slides.length - 1) {
                updatedProgress[currentSlide + 1] = 0;
            }
            return updatedProgress;
        });
        clearInterval(intervalRef.current!);
        intervalRef.current = setInterval(updateProgress, 100);
    };

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

    // Start the timer for the current slide
    useEffect(() => {
        intervalRef.current = setInterval(updateProgress, 100);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current); // Cleanup on unmount
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSlide]);

    return (
        <div
            className="slider"
            onClick={handleTap}
            style={{
                position: "relative",
                width: "100%",
                height: "100svh",
                
                backgroundColor: "#000",
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
                    zIndex: "10",
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
            }}><IconButton icon={<IoMdRefresh/>} handleClick={goToFirstSlide}/>
                <IconButton icon={<RiLogoutBoxLine/>} handleClick={goHome}/>
            </div>


            {/*arrow buttons*/}
            {!isMobile && (<div style={{
                position: "absolute",
                inset: "3rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.5rem",
                zIndex: 20,
            }}><IconButton icon={<TiArrowLeftOutline/>} handleClick={goPrev}/>
                <IconButton icon={<TiArrowRightOutline/>} handleClick={goNext}/>
            </div>)}
        </div>
    );
};
