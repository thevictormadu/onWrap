import React, { useState, useEffect } from "react";
import { easeInOutQuad } from "../utils.ts"; // Import easing function

interface CountdownProps {
    target: number; // Target number for the countdown
    duration: number; // Duration of the countdown in seconds
}

const Countdown: React.FC<CountdownProps> = ({ target, duration }) => {
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        const totalDuration = duration * 1000; // Convert duration to milliseconds
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / totalDuration, 1); // Normalize progress [0, 1]
            const easedProgress = easeInOutQuad(progress); // Apply easing
            const newValue = Math.floor(target * easedProgress);

            setCurrentValue(newValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);

        return () => {}; // No cleanup needed for `requestAnimationFrame`
    }, [target, duration]);

    return <span>{currentValue}</span>;
};

export default Countdown;