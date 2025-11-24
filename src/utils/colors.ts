import { COLOR_PALETTE, COLORS, GRADIENTS } from '../constants/colors';

/**
 * Convert hex color to rgba
 */
export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Get rgba string for glow effects
 */
export const getGlowColor = (color: string, alpha: number = 0.5): string => {
  if (color.startsWith('#')) {
    return hexToRgba(color, alpha);
  }
  return color;
};

/**
 * Get color with opacity
 */
export const withOpacity = (color: string, opacity: number): string => {
  if (color.startsWith('#')) {
    return hexToRgba(color, opacity);
  }
  if (color.startsWith('rgba')) {
    return color.replace(/[\d.]+\)$/g, `${opacity})`);
  }
  return color;
};

/**
 * Get contrasting text color (black or white)
 */
export const getContrastColor = (backgroundColor: string): string => {
  // Simple check - for vibrant colors, use white text
  const vibrantColors = [COLORS.pink, COLORS.purple, COLORS.blue, COLORS.green, COLORS.orange];
  if (vibrantColors.some(c => backgroundColor.includes(c))) {
    return COLORS.white;
  }
  return COLORS.white; // Default to white for dark backgrounds
};

/**
 * Get card color by index
 */
export const getCardColor = (index: number): string => {
  return index % 2 === 0 ? GRADIENTS.purpleBlue : GRADIENTS.orangePink;
};

