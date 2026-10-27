import React from 'react';
import { motion } from 'framer-motion';

export const GoldIngotGraphic: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div
      animate={{
        y: [-8, 8, -8],
        rotate: [-1, 1.5, -1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`relative select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 640 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_20px_50px_rgba(234,179,8,0.25)] dark:drop-shadow-[0_25px_60px_rgba(251,191,36,0.3)] filter"
      >
        <defs>
          {/* Radial Ambient Glow */}
          <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#D97706" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
          </radialGradient>

          {/* Top Ingot Face Gradient */}
          <linearGradient id="topFaceGrad" x1="120" y1="120" x2="480" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="25%" stopColor="#FDE047" />
            <stop offset="60%" stopColor="#EAB308" />
            <stop offset="85%" stopColor="#CA8A04" />
            <stop offset="100%" stopColor="#A16207" />
          </linearGradient>

          {/* Front Beveled Face Gradient */}
          <linearGradient id="frontFaceGrad" x1="100" y1="210" x2="440" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="30%" stopColor="#EAB308" />
            <stop offset="70%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* Right Beveled Side Gradient */}
          <linearGradient id="rightSideGrad" x1="430" y1="160" x2="540" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#CA8A04" />
            <stop offset="50%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          {/* Left Beveled Side Gradient */}
          <linearGradient id="leftSideGrad" x1="100" y1="150" x2="160" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="40%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          {/* Rim Specular Highlight */}
          <linearGradient id="specularRim" x1="110" y1="120" x2="490" y2="230" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="20%" stopColor="#FEF9C3" stopOpacity="0.7" />
            <stop offset="55%" stopColor="#FDE047" stopOpacity="0.3" />
            <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FEF08A" stopOpacity="0.2" />
          </linearGradient>

          {/* Cast Shadow under the Bar */}
          <radialGradient id="barShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#000000" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Atmosphere Backlight */}
        <circle cx="320" cy="220" r="210" fill="url(#goldGlow)" />

        {/* Realistic Floor Shadow */}
        <ellipse cx="320" cy="355" rx="230" ry="42" fill="url(#barShadow)" />

        {/* Ingot Base Bottom Chamfer */}
        <path
          d="M 125 315 L 435 348 L 525 258 L 475 220 L 405 305 L 145 285 Z"
          fill="#451A03"
          opacity="0.8"
        />

        {/* Front Beveled Face (Tapered Ingot) */}
        <path
          d="M 105 235 L 435 272 L 415 338 L 132 302 Z"
          fill="url(#frontFaceGrad)"
        />

        {/* Front Face Polish Luster Overlay */}
        <path
          d="M 105 235 L 240 250 L 220 312 L 132 302 Z"
          fill="white"
          opacity="0.12"
        />

        {/* Right Beveled Side Face */}
        <path
          d="M 435 272 L 532 195 L 498 255 L 415 338 Z"
          fill="url(#rightSideGrad)"
        />

        {/* Left Side Face */}
        <path
          d="M 172 165 L 105 235 L 132 302 L 195 210 Z"
          fill="url(#leftSideGrad)"
          opacity="0.4"
        />

        {/* Top Ingot Surface (Classic Tapered Trapezoid) */}
        <path
          d="M 172 165 L 468 198 L 435 272 L 105 235 Z"
          fill="url(#topFaceGrad)"
        />

        {/* Crisp Top Rim Specular Chamfer Highlight */}
        <path
          d="M 172 165 L 468 198 L 435 272 L 105 235 Z"
          stroke="url(#specularRim)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Front Top Edge Sheen */}
        <line
          x1="105"
          y1="235"
          x2="435"
          y2="272"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeOpacity="0.85"
          strokeLinecap="round"
        />

        {/* Front Right Corner Ridge */}
        <line
          x1="435"
          y1="272"
          x2="415"
          y2="338"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />

        {/* Recessed Bullion Markings & Stamps */}
        <g transform="translate(175, 192) rotate(4.8) skewX(-14)" className="opacity-80">
          {/* AuX Monogram Hallmark */}
          <g transform="translate(70, -8)">
            <polygon points="5,2 21,2 24,7 2,7" fill="#78350F" opacity="0.9" />
            <polygon points="2,7 24,7 21,16 5,16" fill="#92400E" opacity="0.9" />
            <polygon points="2,7 5,2 5,16" fill="#451A03" opacity="0.6" />
          </g>

          <text
            x="110"
            y="6"
            fontFamily="Inter, sans-serif"
            fontSize="18"
            fontWeight="900"
            letterSpacing="2.5"
            fill="#78350F"
          >
            AuX TERMINAL
          </text>

          <text
            x="100"
            y="26"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="22"
            fontWeight="800"
            letterSpacing="3"
            fill="#451A03"
          >
            999.9
          </text>

          <text
            x="96"
            y="42"
            fontFamily="Inter, sans-serif"
            fontSize="12"
            fontWeight="800"
            letterSpacing="4"
            fill="#78350F"
          >
            FINE GOLD
          </text>

          <text
            x="108"
            y="57"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="14"
            fontWeight="700"
            letterSpacing="2"
            fill="#78350F"
          >
            NET WT 1000g
          </text>

          <text
            x="78"
            y="70"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="9"
            fontWeight="600"
            letterSpacing="2"
            fill="#92400E"
          >
            MCX ASSAYED • REF 2026-IN
          </text>
        </g>
      </svg>
    </motion.div>
  );
};

export default GoldIngotGraphic;
