import React, { useState } from 'react';
import { Search, Mic, MapPin, ArrowRight, Award, ThumbsUp, Sparkles, Compass } from 'lucide-react';
import TamilNaduMap from './TamilNaduMap';
import { TRANSLATIONS } from '../data/translations';
import { DISTRICTS } from '../data/districts';
import { TRENDING_PLACES } from '../data/trendingPlaces';

export default function SplitHeroSection({
  lang = 'en',
  selectedDistrict,
  onSelectDistrict,
  onOpenSearchModal,
  onOpenPlaceDetail
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const t = TRANSLATIONS[lang];

  const spotlightPlace = TRENDING_PLACES[0]; // Iruttu Kadai Halwa

  const quickTrails = [
    { label: '#HalwaAtFive', query: 'Halwa' },
    { label: '#NellaiapparAarti', query: 'Nellaiappar' },
    { label: '#WesternGhatsFalls', query: 'Courtallam' },
    { label: '#DegreeCoffee', query: 'Coffee' }
  ];

  const keyDistricts = ['tirunelveli', 'madurai', 'coimbatore', 'thanjavur', 'kanniyakumari', 'chennai'];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onOpenSearchModal) {
      onOpenSearchModal();
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-bg-primary via-bg-primary to-bg-sand/40 pt-8 sm:pt-12 pb-16 sm:pb-24 border-b border-border-subtle overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Top Split Layout: Left Narrative & Search | Right Interactive Map Atlas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column (7 cols): Narrative & Search */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Issue Tag */}
            <div className="inline-flex items-center gap-2 mb-4 self-start">
              <span className="w-2 h-2 rounded-full bg-brand-forest animate-pulse" />
              <span className="text-[11px] font-semibold tracking-widest uppercase text-brand-forest font-heading">
                {t.heroTag}
              </span>
            </div>

            {/* Editorial Serif Display Headline */}
            <h1 className="font-editorial text-3xl sm:text-5xl lg:text-[54px] text-text-heading font-bold leading-[1.15] tracking-tight mb-5">
              {lang === 'ta' ? (
                <>
                  தமிழ்நாட்டின் அசல் சுவைகளும் பண்பாடும், <span className="italic text-brand-terracotta">மண்ணின் மனிதர்களால்</span> ஆவணப்படுத்தப்படுகிறது.
                </>
              ) : (
                <>
                  The Unwritten Geography of Tamil Nadu, Told by Those Who <span className="italic text-brand-terracotta">Call It Home.</span>
                </>
              )}
            </h1>

            {/* Editorial Lede Paragraph */}
            <p className="font-body text-text-body text-sm sm:text-base leading-relaxed max-w-xl mb-8">
              {t.heroSubtitle}
            </p>

            {/* Search Input Bar */}
            <div className="relative w-full max-w-xl mb-4">
              <form
                onSubmit={handleSearchSubmit}
                onClick={onOpenSearchModal}
                className="flex items-center w-full h-14 bg-bg-card rounded-2xl border border-border-subtle shadow-search hover:shadow-card-hover hover:border-brand-terracotta/50 transition-all duration-200 px-5 cursor-pointer"
              >
                <Search size={18} className="text-brand-terracotta mr-3 shrink-0" />
                <span className="text-text-meta text-xs sm:text-sm font-body truncate flex-1">
                  {t.searchPlaceholder}
                </span>
                <span className="text-[10px] font-semibold text-brand-terracotta uppercase tracking-wider bg-brand-terracotta/10 px-2.5 py-1 rounded-full shrink-0">
                  Search Archive
                </span>
              </form>
            </div>

            {/* Curated Trail Tags */}
            <div className="flex items-center gap-2 flex-wrap mb-10 max-w-xl">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-text-meta mr-1">
                Curated Trails:
              </span>
              {quickTrails.map((trail) => (
                <button
                  key={trail.label}
                  onClick={onOpenSearchModal}
                  className="px-2.5 py-1 rounded-full bg-white border border-border-subtle hover:border-brand-terracotta text-[11px] text-text-body hover:text-brand-terracotta transition-colors shadow-sm"
                >
                  {trail.label}
                </button>
              ))}
            </div>

            {/* Live Spot Spotlight Card */}
            <div className="w-full max-w-xl bg-bg-card rounded-2xl p-4 sm:p-5 border border-border-subtle shadow-card hover:shadow-card-hover transition-all duration-200">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-text-meta mb-3 pb-2 border-b border-border-subtle">
                <span className="flex items-center gap-1.5 text-brand-forest">
                  <span className="w-2 h-2 rounded-full bg-brand-forest animate-pulse" />
                  Live Dispatch #01 Spotlight
                </span>
                <span>Tirunelveli Hub</span>
              </div>

              <div
                onClick={() => onOpenPlaceDetail(spotlightPlace)}
                className="flex flex-col sm:flex-row gap-4 items-start cursor-pointer group"
              >
                <div className="w-full sm:w-36 h-28 sm:h-24 rounded-xl overflow-hidden bg-bg-sand shrink-0 relative">
                  <img
                    src={spotlightPlace.image}
                    alt={spotlightPlace.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] text-white font-medium">
                     Sweets
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-base text-text-heading group-hover:text-brand-terracotta transition-colors">
                      {lang === 'ta' ? spotlightPlace.nameTa : spotlightPlace.name}
                    </h4>
                  </div>
                  <p className="text-xs text-text-body mt-1 line-clamp-2 italic font-serifAccent text-[14px]">
                    "Molten copper-pot wheat halwa straight from Thamirabarani waters at 5:00 PM."
                  </p>
                  <div className="flex items-center gap-3 mt-2.5 text-xs text-text-meta">
                    <span className="flex items-center gap-1 text-brand-forest font-semibold">
                      <ThumbsUp size={12} className="fill-brand-forest" />
                      {spotlightPlace.votes} locals
                    </span>
                    <span>·</span>
                    <span className="text-brand-terracotta font-medium flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      Read dispatch →
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): The Interactive Map Atlas Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div className="w-full bg-bg-card rounded-3xl p-5 sm:p-7 border border-border-subtle shadow-card relative overflow-hidden">
              
              {/* Atlas Header */}
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-terracotta">
                    Interactive State Map
                  </span>
                  <h3 className="font-editorial font-bold text-lg text-text-heading">
                    The 38-District Atlas
                  </h3>
                </div>

                {/* Legend indicator */}
                <div className="flex items-center gap-3 text-[11px] font-medium text-text-meta">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-brand-forest live-dot-glow" />
                    <span>Live</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-brand-marigold opacity-60" />
                    <span>Next</span>
                  </span>
                </div>
              </div>

              {/* Vector Map Canvas */}
              <div className="w-full flex justify-center -my-2">
                <TamilNaduMap
                  variant="hero"
                  selectedDistrict={selectedDistrict}
                  onSelectDistrict={onSelectDistrict}
                  lang={lang}
                />
              </div>

              {/* Active District Inspector Card */}
              <div className="mt-2 pt-4 border-t border-border-subtle bg-bg-sand/50 -mx-5 -mb-5 p-5 rounded-b-3xl">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        selectedDistrict?.status === 'live'
                          ? 'bg-brand-forest live-dot-glow animate-pulse'
                          : 'bg-brand-marigold'
                      }`}
                    />
                    <span className="font-heading font-bold text-base text-text-heading">
                      {lang === 'ta' ? selectedDistrict?.nameTa : selectedDistrict?.name}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full tracking-wider ${
                      selectedDistrict?.status === 'live'
                        ? 'bg-brand-forest/10 text-brand-forest'
                        : 'bg-brand-marigold/15 text-brand-marigold-dark'
                    }`}
                  >
                    {selectedDistrict?.status === 'live' ? 'District 01 · Live' : 'Coming Next'}
                  </span>
                </div>

                <p className="text-xs text-text-body mb-3 leading-relaxed">
                  {selectedDistrict?.highlight}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-text-meta">
                    {selectedDistrict?.placesCount} verified cultural & food spots
                  </span>

                  <button
                    onClick={() => {
                      const el = document.getElementById('story-feed');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-semibold text-brand-terracotta hover:text-brand-terracotta-dark flex items-center gap-1 group"
                  >
                    <span>View Stories</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </div>

            {/* Quick District Region Selector Pills */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap mt-4 text-xs">
              <span className="text-[11px] text-text-meta mr-1">Quick Atlas:</span>
              {DISTRICTS.filter(d => keyDistricts.includes(d.id)).map((d) => (
                <button
                  key={d.id}
                  onClick={() => onSelectDistrict(d)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                    selectedDistrict?.id === d.id
                      ? 'bg-brand-terracotta text-white font-semibold shadow-sm'
                      : 'bg-white hover:bg-bg-sand text-text-body border border-border-subtle'
                  }`}
                >
                  {d.name} {d.status === 'live' ? '●' : ''}
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
