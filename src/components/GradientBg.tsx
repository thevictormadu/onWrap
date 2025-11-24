import { motion } from 'framer-motion';
import { getSlideGradient, getRadialGradient, getMeshGradient } from '../utils/gradients';
import { getSlideColor } from '../utils/gradients';
import { COLOR_PALETTE } from '../constants/colors';

interface GradientBgProps {
  slideIndex?: number;
  gradient?: string;
  opacity?: number;
  animated?: boolean;
  type?: 'linear' | 'radial' | 'mesh';
}

export default function GradientBg({
  slideIndex = 0,
  gradient,
  opacity = 0.08,
  animated = false,
  type = 'radial',
}: GradientBgProps) {
  const getBackground = () => {
    if (gradient) return gradient;
    
    // Use only one subtle color per slide instead of full gradients
    const color = getSlideColor(slideIndex);
    
    switch (type) {
      case 'radial':
        // Use a single subtle radial gradient
        return getRadialGradient(color, '#000000', opacity);
      case 'mesh':
        return getMeshGradient(color, opacity * 0.5);
      default:
        // Use subtle single-color radial gradient instead of full gradient
        return getRadialGradient(color, '#000000', opacity);
    }
  };

  const backgroundStyle = {
    position: 'absolute' as const,
    inset: 0,
    background: getBackground(),
    zIndex: 0,
  };

  if (animated) {
    return (
      <motion.div
        style={backgroundStyle}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse' as const,
          ease: 'linear',
        }}
      />
    );
  }

  return <div style={backgroundStyle} />;
}

