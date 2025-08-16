'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'characters';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  onAnimationComplete?: () => void;
}

export default function BlurText({
  text,
  delay = 150,
  animateBy = 'words',
  direction = 'top',
  className = '',
  onAnimationComplete,
}: BlurTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  const getDirection = () => {
    switch (direction) {
      case 'top':
        return { x: 0, y: -40 };
      case 'bottom':
        return { x: 0, y: 40 };
      case 'left':
        return { x: -40, y: 0 };
      case 'right':
        return { x: 40, y: 0 };
      default:
        return { x: 0, y: -40 };
    }
  };

  const getCharacters = () => {
    if (animateBy === 'characters') {
      return text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: 'blur(10px)', ...getDirection() }}
          animate={{ opacity: 1, filter: 'blur(0px)', x: 0, y: 0 }}
          transition={{ delay: index * (delay / 1000), duration: 0.5 }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ));
    }

    return text.split(' ').map((word, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, filter: 'blur(10px)', ...getDirection() }}
        animate={{ opacity: 1, filter: 'blur(0px)', x: 0, y: 0 }}
        transition={{ delay: index * (delay / 1000), duration: 0.5 }}
        className="inline-block mr-[0.25em]"
      >
        {word}
      </motion.span>
    ));
  };

  useEffect(() => {
    const words = animateBy === 'words' ? text.split(' ') : text.split('');
    const totalDuration = words.length * delay + 500;
    
    const timer = setTimeout(() => {
      onAnimationComplete?.();
    }, totalDuration);

    return () => clearTimeout(timer);
  }, [text, delay, animateBy, onAnimationComplete]);

  return (
    <div ref={ref} className={`${className} overflow-hidden`}>
      {getCharacters()}
    </div>
  );
}