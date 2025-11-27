"use client";

import React, { useState, useEffect } from "react";
import { easeInOutQuad } from "@/lib/utils";

interface CountdownProps {
  target: number;
  duration: number;
}

const Countdown: React.FC<CountdownProps> = ({ target, duration }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const totalDuration = duration * 1000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      const easedProgress = easeInOutQuad(progress);
      const newValue = Math.floor(target * easedProgress);

      setCurrentValue(newValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => {};
  }, [target, duration]);

  return <span>{currentValue}</span>;
};

export default Countdown;

