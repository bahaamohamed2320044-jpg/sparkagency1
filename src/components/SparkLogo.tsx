import React from 'react';
import { motion } from 'framer-motion';

interface SparkLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  withGlow?: boolean;
  withFloat?: boolean;
}

export const SparkLogo: React.FC<SparkLogoProps> = ({
  className = '',
  size = 'hero',
  withGlow = true,
  withFloat = true,
}) => {
  // Dimensions based on size variant
  const sizeClasses = {
    sm: 'w-8 h-10',
    md: 'w-12 h-14',
    lg: 'w-20 h-24',
    hero: 'w-[200px] h-[240px] sm:w-[260px] sm:h-[310px] md:w-[320px] md:h-[380px] lg:w-[380px] lg:h-[450px]',
  };

  const content = (
    <div className={`relative flex items-center justify-center select-none ${sizeClasses[size]} ${className}`}>
      {/* Ambient background glow aura for hero size */}
      {withGlow && (
        <div
          className="absolute inset-0 -m-8 sm:-m-12 rounded-full pointer-events-none filter blur-2xl sm:blur-3xl opacity-60 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(255, 187, 0, 0.35) 0%, rgba(245, 158, 11, 0.15) 45%, rgba(12, 12, 12, 0) 70%)',
          }}
        />
      )}

      {/* SVG Lightning-Bolt "S" Symbol with 3D faceted geometry & metallic finishes */}
      <svg
        viewBox="0 0 300 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] filter"
      >
        <defs>
          {/* Main Gold Facet Gradient */}
          <linearGradient id="sparkGoldFace" x1="50" y1="20" x2="260" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF7B2" />
            <stop offset="25%" stopColor="#FFC72C" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Secondary Bevel Shadow Gradient */}
          <linearGradient id="sparkDarkBevel" x1="120" y1="40" x2="160" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="50%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          {/* Top Bright Titanium Ridge Highlight */}
          <linearGradient id="sparkRidgeHighlight" x1="180" y1="20" x2="80" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#FFFBEB" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#FDE68A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
          </linearGradient>

          {/* Electric Amber Shimmer */}
          <linearGradient id="sparkElectricAcc" x1="0" y1="0" x2="300" y2="360" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#FFE066" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Filter for subtle surface glow */}
          <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 3D Depth Extrusion / Bevel Base */}
        <path
          d="M 215 30 
             L 95 30 
             L 55 145 
             L 145 145 
             L 75 330 
             L 245 190 
             L 155 190 
             L 205 105 
             L 255 105 
             Z"
          fill="url(#sparkDarkBevel)"
          transform="translate(8, 12)"
          opacity="0.85"
        />

        {/* Left Side Shadow Flank (gives chiseled 3D body) */}
        <path
          d="M 95 30 
             L 55 145 
             L 145 145 
             L 125 195 
             L 60 152 
             L 100 36 
             Z"
          fill="#5A2803"
          opacity="0.9"
        />

        {/* Main Central Lightning-S Body */}
        {/*
          Constructing the iconic 'S' made of lightning facets:
          Top bar: starts from top right (235, 35) to top left (105, 35)
          Angles sharply down to (65, 145)
          Cuts right into center waist (165, 145)
          Flashes back diagonally left-center (120, 205)
          Strikes down diagonally to razor-sharp bottom lightning point (85, 335)
          Leaps diagonally up-right (235, 185)
          Pulls inward to middle-right shelf (155, 185)
          Snaps up to right upper junction (205, 105)
          Expands out to top-right cap (255, 105)
          And meets the upper roof.
        */}
        <path
          d="M 245 35 
             L 105 35 
             L 65 148 
             L 165 148 
             L 115 210 
             L 85 335 
             L 245 185 
             L 160 185 
             L 205 105 
             L 255 105 
             Z"
          fill="url(#sparkGoldFace)"
        />

        {/* Facet Plane 1: Top horizontal shelf (reflects top studio light) */}
        <polygon
          points="245,35 105,35 118,52 232,52"
          fill="#FFFBEB"
          opacity="0.85"
        />

        {/* Facet Plane 2: Upper diagonal down-cut */}
        <polygon
          points="105,35 65,148 85,148 118,52"
          fill="#B45309"
          opacity="0.65"
        />

        {/* Facet Plane 3: Central Waist Forward Shelf */}
        <polygon
          points="65,148 165,148 152,166 80,166"
          fill="#FDE68A"
          opacity="0.9"
        />

        {/* Facet Plane 4: Main dynamic central lightning blade strike */}
        <polygon
          points="165,148 115,210 85,335 130,225 152,166"
          fill="url(#sparkElectricAcc)"
        />

        {/* Facet Plane 5: Lower right strike apex */}
        <polygon
          points="85,335 245,185 160,185 130,225"
          fill="#78350F"
          opacity="0.75"
        />

        {/* Facet Plane 6: Mid-Right Horizontal Step */}
        <polygon
          points="160,185 245,185 235,172 172,172"
          fill="#FEF3C7"
          opacity="0.85"
        />

        {/* Facet Plane 7: Upward return connector */}
        <polygon
          points="160,185 205,105 192,105 148,172"
          fill="#D97706"
          opacity="0.5"
        />

        {/* Facet Plane 8: Upper Right Head Block */}
        <polygon
          points="205,105 255,105 245,35 232,52 238,92 205,92"
          fill="#F59E0B"
          opacity="0.8"
        />

        {/* Specular Ridge Inset Line (Sharp high-reflection razor edge) */}
        <path
          d="M 240 38 
             L 108 38 
             L 70 146 
             L 162 146 
             L 118 208 
             L 92 328"
          stroke="url(#sparkRidgeHighlight)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />

        {/* Secondary Lower Highlight Edge */}
        <path
          d="M 92 328 
             L 240 188 
             L 165 188 
             L 205 108 
             L 252 108"
          stroke="url(#sparkRidgeHighlight)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.75"
        />

        {/* Precision Lens Glint / Spark at the top apex */}
        <circle cx="242" cy="37" r="4" fill="#FFFFFF" filter="url(#subtleGlow)" />
        <polygon
          points="242,26 244,37 253,37 245,41 247,50 242,43 237,50 239,41 231,37 240,37"
          fill="#FFFFFF"
          opacity="0.9"
        />

        {/* Lens Glint at the bottom razor lightning tip */}
        <circle cx="86" cy="333" r="3" fill="#FFFFFF" filter="url(#subtleGlow)" />
        <polygon
          points="86,323 88,333 97,333 89,337 91,346 86,339 81,346 83,337 75,333 84,333"
          fill="#FFF7B2"
          opacity="0.8"
        />
      </svg>
    </div>
  );

  if (!withFloat) {
    return content;
  }

  return (
    <motion.div
      animate={{
        y: [-6, 6, -6],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {content}
    </motion.div>
  );
};
