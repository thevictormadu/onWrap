// Spotify Wrapped-Inspired Color Palette

export const COLORS = {
  // Primary vibrant colors
  pink: "#FF006E",
  purple: "#8338EC",
  yellow: "#FFBE0B",
  green: "#06FFA5",
  orange: "#FB5607",
  blue: "#3A86FF",
  cyan: "#08C2F1",

  // Neutral colors
  black: "#000000",
  white: "#FFFFFF",
  darkGray: "#0D0D0D",
  mediumGray: "#1A1A1A",
  lightGray: "#333333",
} as const;

// Color palette array for dynamic assignment
export const COLOR_PALETTE = [
  COLORS.pink,
  COLORS.purple,
  COLORS.yellow,
  COLORS.green,
  COLORS.orange,
  COLORS.blue,
  COLORS.cyan,
] as const;

// Gradient combinations
export const GRADIENTS = {
  pinkPurple: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.purple})`,
  yellowOrange: `linear-gradient(135deg, ${COLORS.yellow}, ${COLORS.orange})`,
  greenBlue: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.blue})`,
  purpleBlue: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.blue})`,
  orangePink: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.pink})`,
  blueGreen: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.green})`,
  rainbow: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.purple}, ${COLORS.blue}, ${COLORS.green}, ${COLORS.yellow}, ${COLORS.orange})`,
} as const;

export const primaryGradient = GRADIENTS.purpleBlue;
export const primaryColor = COLORS.blue;

// Text gradient utilities
export const getTextGradient = (color1: string, color2: string): string => {
  return `linear-gradient(135deg, ${color1}, ${color2})`;
};

// Background gradients with opacity
export const getBackgroundGradient = (
  color1: string,
  color2: string,
  opacity: number = 0.15
): string => {
  return `linear-gradient(135deg, ${color1}${Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0")}, ${color2}${Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0")})`;
};

