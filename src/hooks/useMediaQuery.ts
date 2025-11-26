import { useState, useEffect } from "react";
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
  MOBILE_ENDNOTE_BREAKPOINT,
} from "../constants/ui";

/**
 * Custom hook for responsive design - single source of truth for breakpoints
 * Uses matchMedia API for better performance than resize listeners
 */
export function useMediaQuery(breakpoint: number): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= breakpoint;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Handler for media query changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [breakpoint]);

  return matches;
}

/**
 * Pre-configured hooks for common breakpoints
 */
export function useIsMobile(customBreakpoint?: number): boolean {
  return useMediaQuery(customBreakpoint ?? MOBILE_BREAKPOINT);
}

export function useIsTablet(): boolean {
  return useMediaQuery(TABLET_BREAKPOINT);
}

export function useIsMobileEndnote(): boolean {
  return useMediaQuery(MOBILE_ENDNOTE_BREAKPOINT);
}
