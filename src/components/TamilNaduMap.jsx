import React, { useState } from 'react';
import { DISTRICTS } from '../data/districts';

export default function TamilNaduMap({
  variant = 'hero', // 'hero' or 'fullscreen'
  selectedDistrict,
  onSelectDistrict,
  lang = 'en'
}) {
  const [hoveredDistrict, setHoveredDistrict] = useState(null);

  // Geographic SVG path accurately representing the Tamil Nadu state boundary
  const tnPath = `
    M 385,55 
    C 395,65 410,75 408,95 
    C 405,115 390,130 380,150 
    C 370,170 365,190 358,215 
    C 350,240 362,260 375,280 
    C 388,300 390,320 378,345 
    C 365,365 340,375 325,385 
    C 310,395 330,410 345,420 
    C 355,426 335,435 310,432 
    C 285,430 265,450 252,475 
    C 240,500 215,520 185,535 
    C 170,542 165,535 162,515 
    C 158,490 152,465 152,440 
    C 152,415 165,395 168,375 
    C 170,350 150,330 135,310 
    C 120,290 105,270 98,245 
    C 92,220 110,210 130,205 
    C 150,200 170,195 190,185 
    C 210,175 220,150 225,130 
    C 230,110 235,95 250,88 
    C 270,80 295,95 315,90 
    C 335,85 355,75 375,60 
    Z
  `;

  return (
    <div className={`relative flex items-center justify-center select-none w-full ${variant === 'hero' ? 'max-w-[620px] h-[380px] sm:h-[480px] lg:h-[540px]' : 'max-w-[720px] h-[440px] sm:h-[560px]'}`}>
      {/* Soft radial backdrop glow */}
      <div className="absolute inset-0 bg-radial from-brand-marigold/10 via-transparent to-transparent pointer-events-none rounded-full blur-2xl transform scale-90" />

      <svg
        viewBox="80 40 350 510"
        className="w-full h-full drop-shadow-xl overflow-visible transition-all duration-300"
        style={{
          filter: 'drop-shadow(0 14px 35px rgba(28, 25, 23, 0.07))'
        }}
      >
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBF7EE" />
            <stop offset="100%" stopColor="#F3EDE3" />
          </linearGradient>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* State Outline */}
        <path
          d={tnPath}
          fill="url(#mapGradient)"
          stroke="#ECE4D8"
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="transition-all duration-500 hover:fill-[#FAF4E8]"
        />

        {/* Subtle River Thamirabarani & Cauvery veins */}
        <path
          d="M 175,230 Q 230,250 280,270 T 360,310"
          fill="none"
          stroke="#E2D7C5"
          strokeWidth="1.2"
          strokeDasharray="2 3"
          opacity="0.6"
        />
        <path
          d="M 160,470 Q 185,475 220,480"
          fill="none"
          stroke="#D7C9B3"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* District Dots */}
        {DISTRICTS.map((district) => {
          const isLive = district.status === 'live';
          const isSelected = selectedDistrict?.id === district.id;
          const isHovered = hoveredDistrict?.id === district.id;

          return (
            <g
              key={district.id}
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredDistrict(district)}
              onMouseLeave={() => setHoveredDistrict(null)}
              onClick={() => onSelectDistrict && onSelectDistrict(district)}
            >
              {/* Pulsing ring for Live District (Tirunelveli) */}
              {isLive && (
                <>
                  <circle
                    cx={district.x}
                    cy={district.y}
                    r="12"
                    fill="#2D5016"
                    opacity="0.25"
                    className="animate-ping origin-center"
                    style={{ transformOrigin: `${district.x}px ${district.y}px` }}
                  />
                  <circle
                    cx={district.x}
                    cy={district.y}
                    r="9"
                    fill="#2D5016"
                    opacity="0.3"
                  />
                </>
              )}

              {/* District Circle Dot */}
              <circle
                cx={district.x}
                cy={district.y}
                r={isLive ? (isHovered ? 6 : 5) : (isHovered ? 4.5 : 3.2)}
                fill={isLive ? '#2D5016' : '#E8A84C'}
                fillOpacity={isLive ? 1 : (isHovered ? 0.9 : 0.45)}
                stroke="#FFFFFF"
                strokeWidth={isLive ? 1.5 : (isHovered ? 1 : 0.6)}
                filter={isLive ? 'url(#softGlow)' : undefined}
                className="transition-transform duration-200"
                style={{
                  transformOrigin: `${district.x}px ${district.y}px`,
                  transform: isHovered || isSelected ? 'scale(1.3)' : 'scale(1)'
                }}
              />

              {/* Permanent elegant label for Live District */}
              {isLive && (
                <text
                  x={district.x + 10}
                  y={district.y + 4}
                  className="text-[10px] font-semibold tracking-wide fill-brand-forest pointer-events-none select-none drop-shadow-sm font-display"
                >
                  {lang === 'ta' ? district.nameTa : district.name} (Live)
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Dynamic Hover Tooltip / Floating Pill */}
      {hoveredDistrict && (
        <div
          className="absolute z-20 pointer-events-none transition-all duration-200 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-card border border-border-subtle"
          style={{
            left: `${((hoveredDistrict.x - 70) / 360) * 100}%`,
            top: `${((hoveredDistrict.y - 40) / 510) * 100}%`,
            transform: 'translate(-50%, -125%)'
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                hoveredDistrict.status === 'live'
                  ? 'bg-brand-forest animate-pulse'
                  : 'bg-brand-marigold opacity-60'
              }`}
            />
            <span className="font-heading font-semibold text-xs text-text-heading">
              {lang === 'ta' ? hoveredDistrict.nameTa : hoveredDistrict.name}
            </span>
            <span className="text-[10px] text-text-meta uppercase font-medium tracking-wider">
              {hoveredDistrict.status === 'live'
                ? (lang === 'ta' ? 'நேரலை' : 'Live')
                : (lang === 'ta' ? 'விரைவில்' : 'Coming Soon')}
            </span>
          </div>
          <div className="text-[11px] text-text-body mt-0.5 max-w-[190px] leading-tight">
            {hoveredDistrict.highlight}
          </div>
        </div>
      )}
    </div>
  );
}
