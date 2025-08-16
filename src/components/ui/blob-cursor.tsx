'use client';

import { useState, useEffect, useRef } from 'react';

interface BlobCursorProps {
  color?: string;
  size?: number;
  blur?: number;
  className?: string;
}

export default function BlobCursor({ 
  color = '#3b82f6', 
  size = 40, 
  blur = 20,
  className = '' 
}: BlobCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        left: -size / 2,
        top: -size / 2,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        filter: `blur(${blur}px)`,
        mixBlendMode: 'multiply',
      }}
    />
  );
}