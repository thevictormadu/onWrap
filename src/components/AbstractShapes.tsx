import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { COLOR_PALETTE } from '../constants/colors';

interface AbstractShapeProps {
  type?: 'circle' | 'diamond' | 'star' | 'blob';
  size?: number;
  color?: string;
  position?: { x: number; y: number };
  blur?: number;
  opacity?: number;
  delay?: number;
  duration?: number;
  shapeId?: number; // Add stable ID for consistent random values
}

export default function AbstractShape({
  type = 'circle',
  size = 200,
  color,
  position = { x: 50, y: 50 },
  blur = 60,
  opacity = 0.3,
  delay = 0,
  duration = 20,
  shapeId = 0,
}: AbstractShapeProps) {
  // Use stable random values based on shapeId to prevent recalculation on every render
  const stableValues = useMemo(() => {
    // Create a simple seeded random function based on shapeId
    const seed = shapeId * 1000;
    const random1 = ((seed * 9301 + 49297) % 233280) / 233280;
    const random2 = ((seed * 9301 + 49297 + 1) % 233280) / 233280;
    const random3 = ((seed * 9301 + 49297 + 2) % 233280) / 233280;
    
    return {
      colorIndex: Math.floor(random1 * COLOR_PALETTE.length),
      xOffset: (random2 - 0.5) * 100,
      yOffset: (random3 - 0.5) * 100,
    };
  }, [shapeId]);

  const randomColor = color || COLOR_PALETTE[stableValues.colorIndex];

  const shapeStyle = useMemo(() => {
    const baseStyle = {
      position: 'absolute' as const,
      width: `${size}px`,
      height: `${size}px`,
      filter: `blur(${blur}px)`,
      opacity: opacity * 0.5, // Reduce opacity for more subtle effect
      left: `${position.x}%`,
      top: `${position.y}%`,
      transform: 'translate(-50%, -50%)',
    };

    switch (type) {
      case 'circle':
        return {
          ...baseStyle,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${randomColor}, transparent)`,
        };
      case 'diamond':
        return {
          ...baseStyle,
          transform: 'translate(-50%, -50%) rotate(45deg)',
          background: randomColor,
        };
      case 'star':
        return {
          ...baseStyle,
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          background: randomColor,
        };
      case 'blob':
        return {
          ...baseStyle,
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          background: `radial-gradient(circle, ${randomColor}, transparent)`,
        };
      default:
        return baseStyle;
    }
  }, [type, size, blur, opacity, position.x, position.y, randomColor]);

  // Use stable animation values - reduced movement for subtlety
  const animationValues = useMemo(() => ({
    x: [0, stableValues.xOffset * 0.3, 0], // Reduce movement by 70%
    y: [0, stableValues.yOffset * 0.3, 0], // Reduce movement by 70%
    scale: [1, 1.05, 1], // Further reduced scale change
    rotate: type === 'diamond' ? [0, 180, 360] : [0, 0, 0],
  }), [stableValues.xOffset, stableValues.yOffset, type]);

  return (
    <motion.div
      style={shapeStyle}
      animate={animationValues}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}

interface AbstractShapesBackgroundProps {
  count?: number;
  types?: Array<'circle' | 'diamond' | 'star' | 'blob'>;
  minSize?: number;
  maxSize?: number;
}

export function AbstractShapesBackground({
  count = 5,
  types = ['circle', 'blob'],
  minSize = 150,
  maxSize = 300,
}: AbstractShapesBackgroundProps) {
  // Use useMemo to generate stable shape configurations that don't change on re-render
  const shapes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Use seeded random based on index for consistent values
      const seed = i * 1000;
      const random1 = ((seed * 9301 + 49297) % 233280) / 233280;
      const random2 = ((seed * 9301 + 49297 + 1) % 233280) / 233280;
      const random3 = ((seed * 9301 + 49297 + 2) % 233280) / 233280;
      const random4 = ((seed * 9301 + 49297 + 3) % 233280) / 233280;
      const random5 = ((seed * 9301 + 49297 + 4) % 233280) / 233280;
      
      return {
        id: i,
        type: types[Math.floor(random1 * types.length)],
        size: random2 * (maxSize - minSize) + minSize,
        position: {
          x: random3 * 100,
          y: random4 * 100,
        },
        delay: random5 * 5,
        duration: 15 + random1 * 10,
      };
    });
  }, [count, types, minSize, maxSize]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {shapes.map((shape) => (
        <AbstractShape
          key={shape.id}
          shapeId={shape.id}
          type={shape.type}
          size={shape.size}
          position={shape.position}
          delay={shape.delay}
          duration={shape.duration}
        />
      ))}
    </div>
  );
}

