'use client';

import { useState, useRef, useEffect } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(59, 130, 246, 0.15)',
}: SpotlightCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 50, y: 50 });
  };

  useEffect(() => {
    setMousePosition({ x: 50, y: 50 });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-2xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: isHovered 
          ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${spotlightColor}, transparent 80%)`
          : 'transparent',
      }}
    >
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Subtle glow effect */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          background: isHovered 
            ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${spotlightColor}, transparent 60%)`
            : 'transparent',
          opacity: isHovered ? 1 : 0,
        }}
      />
    </div>
  );
}