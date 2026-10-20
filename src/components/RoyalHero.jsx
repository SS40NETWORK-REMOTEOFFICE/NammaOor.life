import React from 'react';
import { ArrowRight, MapPin, Sparkles, Compass } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function RoyalHero({
  lang = 'en',
  onSelectDistrict,
  onOpenSearchModal,
  onOpenPlaceDetail
}) {
  const t = TRANSLATIONS[lang];

  const destinationCards = [
    {
      id: 'tirunelveli',
      title: 'Tirunelveli',
      subtitle: 'ROYAL HERITAGE & HALWA',
      image: '/images/tirunelveli_halwa.jpg',
      isLive: true,
      tag: 'LIVE HUB'
    },
    {
      id: 'madurai',
      title: 'Madurai',
      subtitle: 'SPIRITUAL SOUL · KARI DOSA',
      image: '/images/tamilnadu_palace_dusk.jpg',
      isLive: false,
      tag: 'LAUNCHING NEXT'
    },
    {
      id: 'tenkasi',
      title: 'Tenkasi',
      subtitle: 'SERENE HERBAL CASCADES',
      image: '/images/courtallam_falls.jpg',
      isLive: false,
      tag: 'AGASTHIYAR GHATS'
    },
    {
      id: 'thanjavur',
      title: 'Thanjavur',
      subtitle: 'CHOLA BIG TEMPLE MARVEL',
      image: '/images/nellaiappar_temple.jpg',
      isLive: false,
      tag: 'KAVERI DELTA'
    }
  ];

  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-[96vh] flex flex-col justify-between overflow-visible">
      {/* Background Image with Cinematic Golden Hour Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/tamilnadu_hero_sunset.jpg"
          alt="Explore Tamil Nadu"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft vignette & gradient overlay to preserve legibility while keeping sunset golden brilliance */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />
      </div>

      {/* Top Floating Glass Navigation Bar (matching reference) */}
      <nav className="relative z-20 w-full px-5 sm:px-8 lg:px-14 pt-6 sm:pt-8 flex items-center justify-between">
        {/* Monogram Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-brand-gold/60 bg-black/30 backdrop-blur-md flex items-center justify-center text-brand-gold font-cinzel text-xl font-bold shadow-gold">
            ந
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.2em] text-white">
              NammaOor<span className="text-gold-gradient font-sans font-bold text-base sm:text-xl">.life</span>
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-brand-gold-light -mt-1 font-medium">
              DISCOVERY ARCHIVE · TAMIL NADU
            </span>
          </div>
        </div>

        {/* Center Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 text-xs font-cinzel tracking-widest uppercase text-white/90">
          <a href="#about" className="hover:text-brand-gold transition-colors">About</a>
          <a href="#districts" className="hover:text-brand-gold transition-colors">The 38 Districts</a>
          <a href="#charter" className="hover:text-brand-gold transition-colors">Sovereign Code</a>
          <a href="#inquiry" className="hover:text-brand-gold transition-colors">Inquiry & Ledger</a>
        </div>

        {/* Right CTA Button & Mobile Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const el = document.getElementById('districts');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-gold font-cinzel text-xs font-bold tracking-wider uppercase"
          >
            <span>Explore Live Hub</span>
            <ArrowRight size={14} />
          </button>

          <button
            onClick={onOpenSearchModal}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
            title="Search Archive"
          >
            <Compass size={18} />
          </button>
        </div>
      </nav>

      {/* Main Hero Typography & Callout (matching reference right-aligned title) */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-14 pt-12 sm:pt-16 pb-8 sm:pb-12">
        <div className="max-w-[1340px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="hidden md:block">
            {/* Left subtle quote */}
            <p className="font-serif italic text-white/80 text-lg sm:text-xl max-w-sm drop-shadow-md">
              "Not a packaged tour. An unbuyable local discovery archive curated by residents who love this soil."
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="block font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-brand-gold-light mb-2 drop-shadow">
              TIMELESS PLACES. MEANINGFUL DISCOVERIES.
            </span>
            <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg leading-[1.05]">
              EXPLORE <br />
              <span className="text-gold-gradient">TAMIL NADU</span>
            </h1>

            {/* Vertical Sub-attributes (matching reference right column) */}
            <div className="hidden sm:flex md:justify-end items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-white/80 font-cinzel mt-4">
              <span>CULTURE</span>
              <span className="text-brand-gold">·</span>
              <span>PEOPLE</span>
              <span className="text-brand-gold">·</span>
              <span>TASTE</span>
              <span className="text-brand-gold">·</span>
              <span className="text-brand-gold-light font-bold">A DEEPER OOR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row of 4 Hero Destination Cards + CTA (matching the reference 4-card row!) */}
      <div className="relative z-20 w-full px-5 sm:px-8 lg:px-14 -mb-16 sm:-mb-20">
        <div className="max-w-[1340px] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
          
          {destinationCards.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onSelectDistrict(dest.id)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] cursor-pointer shadow-dark border border-white/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-gold"
            >
              <img
                src={dest.image}
                alt={dest.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Status Badge */}
              <div className="absolute top-2.5 left-2.5">
                {dest.isLive ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-forest/90 backdrop-blur-md text-white text-[10px] font-bold tracking-wider shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    LIVE HUB
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-[9px] font-medium text-white/90 uppercase tracking-wider">
                    {dest.tag}
                  </span>
                )}
              </div>

              {/* Card Bottom Meta */}
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-white group-hover:text-brand-gold transition-colors">
                  {dest.title}
                </h3>
                <p className="text-[10px] tracking-wider uppercase text-white/70 font-medium truncate mt-0.5">
                  {dest.subtitle}
                </p>
              </div>
            </div>
          ))}

          {/* 5th Column (Right CTA Card in Reference) */}
          <div className="col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-1 bg-black/60 backdrop-blur-md border border-brand-gold/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-dark text-left">
            <div>
              <span className="text-[10px] font-cinzel tracking-[0.2em] uppercase text-brand-gold-light block mb-1">
                A DISCOVERY ARCHIVE
              </span>
              <p className="font-serif text-sm text-white/90 italic leading-snug">
                Across 38 sovereign districts, calibrated by unbuyable community trust.
              </p>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('districts');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-4 w-full py-2.5 px-4 rounded-full btn-gold font-cinzel text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <span>Explore Atlas</span>
              <ArrowRight size={13} />
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}
