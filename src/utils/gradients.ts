import { COLOR_PALETTE, GRADIENTS, getGradientByIndex } from '../constants/colors';

/**
 * Generate a dynamic gradient based on slide index
 */
export const getSlideGradient = (slideIndex: number): string => {
  return getGradientByIndex(slideIndex);
};

/**
 * Generate a radial gradient for backgrounds
 */
export const getRadialGradient = (color1: string, color2: string, opacity: number = 0.2): string => {
  const opacityHex = Math.round(opacity * 255).toString(16).padStart(2, '0');
  return `radial-gradient(circle at center, ${color1}${opacityHex}, ${color2}00)`;
};

/**
 * Generate animated gradient background
 */
export const getAnimatedGradient = (colors: string[]): string => {
  const colorStops = colors.map((color, index) => 
    `${color} ${(index / (colors.length - 1)) * 100}%`
  ).join(', ');
  return `linear-gradient(135deg, ${colorStops})`;
};

/**
 * Get color for specific slide type
 */
export const getSlideColor = (slideIndex: number): string => {
  return COLOR_PALETTE[slideIndex % COLOR_PALETTE.length];
};

/**
 * Generate mesh gradient background
 */
export const getMeshGradient = (baseColor: string, opacity: number = 0.1): string => {
  const opacityHex = Math.round(opacity * 255).toString(16).padStart(2, '0');
  return `
    radial-gradient(at 0% 0%, ${baseColor}${opacityHex} 0px, transparent 50%),
    radial-gradient(at 100% 0%, ${baseColor}${opacityHex} 0px, transparent 50%),
    radial-gradient(at 100% 100%, ${baseColor}${opacityHex} 0px, transparent 50%),
    radial-gradient(at 0% 100%, ${baseColor}${opacityHex} 0px, transparent 50%)
  `;
};

