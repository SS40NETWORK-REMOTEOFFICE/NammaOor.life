import React, { useState } from 'react';
import { MapPin, X, ArrowRight, Compass } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function LocationBanner({
  bannerState = 1, // 1: Live, 2: Coming soon, 3: Traveler, 4: Unknown
  onChangeBannerState,
  onActionClick,
  lang = 'en'
}) {
  const [dismissed, setDismissed] = useState(false);
  const t = TRANSLATIONS[lang];

  if (dismissed) return null;

  const statesConfig = {
    1: {
      badge: 'DISPATCH #01 · LIVE',
      text: t.bannerLive,
      action: t.bannerActionExplore,
      hasClose: true
    },
    2: {
      badge: 'DISPATCH #02 · PREPARING',
      text: t.bannerComingSoon,
      action: t.bannerActionWaitlist,
      hasClose: true
    },
    3: {
      badge: 'TRAVELER REGIONAL GUIDE',
      text: t.bannerTraveler,
      action: t.bannerActionPick,
      hasClose: true
    },
    4: {
      badge: 'TERRITORY LOCATOR',
      text: t.bannerUnknown,
      action: t.bannerActionChoose,
      hasClose: false
    }
  };

  const current = statesConfig[bannerState] || statesConfig[1];

  return (
    <div className="w-full bg-bg-sand border-b border-[#ECE3D5] animate-slide-down">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 h-12 flex items-center justify-between text-xs">
        
        {/* Left message with badge */}
        <div className="flex items-center gap-2.5 overflow-hidden pr-2">
          <span className="hidden md:inline-block px-2 py-0.5 rounded bg-white text-[10px] font-bold uppercase tracking-wider text-brand-forest shadow-sm shrink-0">
            {current.badge}
          </span>
          <MapPin size={14} className="text-brand-terracotta shrink-0" />
          <span className="font-serifAccent text-[14px] sm:text-[15px] italic text-text-heading truncate">
            {current.text}
          </span>
        </div>

        {/* Right CTA and controls */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Quick interactive test switcher for all 4 states */}
          <div className="hidden lg:flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-full text-[10px] text-text-meta border border-border-subtle" title="State switch preview">
            <span className="font-mono">State:</span>
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => onChangeBannerState(num)}
                className={`px-1.5 py-0.5 rounded font-semibold transition-colors ${
                  bannerState === num ? 'bg-brand-terracotta text-white' : 'hover:text-text-heading'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            onClick={() => onActionClick(bannerState)}
            className="flex items-center gap-1 font-semibold text-brand-terracotta hover:text-brand-terracotta-dark hover:underline transition-all whitespace-nowrap text-xs"
          >
            <span>{current.action}</span>
          </button>

          {current.hasClose && (
            <button
              onClick={() => setDismissed(true)}
              className="p-1 rounded-full text-text-meta hover:text-text-heading hover:bg-[#EAE1D1] transition-colors ml-1"
              aria-label="Dismiss banner"
            >
              <X size={14} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
