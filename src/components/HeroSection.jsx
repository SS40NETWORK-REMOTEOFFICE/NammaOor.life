import React, { useState } from 'react';
import { Search, Mic, ArrowRight, Sparkles } from 'lucide-react';
import TamilNaduMap from './TamilNaduMap';
import { TRANSLATIONS } from '../data/translations';
import { DISTRICTS } from '../data/districts';

export default function HeroSection({
  lang = 'en',
  selectedDistrict,
  onSelectDistrict,
  onPerformSearch
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const t = TRANSLATIONS[lang];

  // Quick live search suggestions
  const filteredSuggestions = searchQuery.trim()
    ? DISTRICTS.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        d.nameTa.includes(searchQuery) ||
        d.highlight.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleVoiceSearch = () => {
    setVoiceActive(true);
    setTimeout(() => {
      setSearchQuery('Tirunelveli Halwa');
      setVoiceActive(false);
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onPerformSearch) {
      onPerformSearch(searchQuery);
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-bg-primary via-bg-primary to-bg-sand/30 pt-8 sm:pt-12 pb-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col items-center text-center">
        
        {/* Soft state badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 shadow-banner border border-border-subtle mb-4 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-brand-forest animate-pulse" />
          <span className="text-xs font-heading font-medium text-text-heading">
            {lang === 'ta' ? 'தமிழ்நாட்டின் சொந்த உள்ளூர் வழிகாட்டி' : "Tamil Nadu's Own Local Discovery Platform"}
          </span>
        </div>

        {/* Hero Main Headline */}
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-text-heading tracking-tight max-w-[850px] leading-[1.18] mb-3">
          {lang === 'ta' ? (
            <>
              உங்கள் ஊர். உங்கள் பெருமை. <br />
              <span className="text-brand-terracotta">தமிழ்நாட்டின்</span> உண்மை சுவைகள்.
            </>
          ) : (
            <>
              Pure surfaces. Real places. <br />
              <span className="text-brand-terracotta">Tamil Nadu</span> uncovered by locals.
            </>
          )}
        </h1>

        <p className="font-body text-text-body text-sm sm:text-base max-w-[620px] mb-8 leading-relaxed">
          {lang === 'ta'
            ? 'வணிக விளம்பரங்கள் அல்ல. உள்ளூர் மக்களின் வாக்குகள் மற்றும் சரிபார்க்கப்பட்ட நம்பகத்தன்மை மூலம் சிறந்த இடங்களை கண்டறியுங்கள்.'
            : 'Unbuyable community votes. Named verifier curation. Discover the authentic places to eat, stay, and experience across our 38 districts.'}
        </p>

        {/* Tamil Nadu Map Illustration */}
        <div className="relative w-full flex justify-center my-2 sm:my-4">
          <TamilNaduMap
            variant="hero"
            selectedDistrict={selectedDistrict}
            onSelectDistrict={onSelectDistrict}
            lang={lang}
          />
        </div>

        {/* Floating Search Bar */}
        <div className="relative w-full max-w-[600px] -mt-10 sm:-mt-14 z-20">
          <form
            onSubmit={handleSubmit}
            className={`relative flex items-center w-full h-14 sm:h-14 bg-bg-card rounded-2xl transition-all duration-200 px-5 ${
              isFocused
                ? 'border-2 border-brand-terracotta shadow-search-focus scale-[1.01]'
                : 'border border-border-subtle shadow-search hover:shadow-card-hover'
            }`}
          >
            <Search size={20} className="text-text-meta mr-3 shrink-0" />
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-transparent border-none outline-none font-body text-text-heading placeholder:text-text-meta text-sm sm:text-base"
            />

            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`p-2 rounded-full transition-colors ${
                voiceActive ? 'text-brand-terracotta bg-brand-terracotta/10 animate-pulse' : 'text-text-meta hover:text-text-heading'
              }`}
              title="Voice Search"
            >
              <Mic size={19} />
            </button>
          </form>

          {/* Search Dropdown Results */}
          {isFocused && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-card-hover border border-border-subtle overflow-hidden text-left z-30 animate-fade-in">
              <div className="p-2 border-b border-border-subtle bg-bg-sand/40 text-[11px] font-semibold text-text-meta uppercase tracking-wider px-4">
                Districts & Highlights
              </div>
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelectDistrict(item);
                      setSearchQuery(item.name);
                    }}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-bg-sand/60 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full ${item.status === 'live' ? 'bg-brand-forest' : 'bg-brand-marigold'}`} />
                      <div>
                        <span className="font-heading font-semibold text-sm text-text-heading">
                          {lang === 'ta' ? item.nameTa : item.name}
                        </span>
                        <span className="text-xs text-text-meta ml-2">({item.placesCount} spots)</span>
                        <div className="text-xs text-text-body truncate max-w-[360px]">{item.highlight}</div>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-text-meta" />
                  </button>
                ))
              ) : (
                <div className="p-4 text-xs text-text-body text-center">
                  Searching across 38 districts for "{searchQuery}"...
                </div>
              )}
            </div>
          )}

          {/* Legend below search bar */}
          <div className="flex items-center justify-center gap-6 mt-4 text-xs font-medium text-text-meta">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-forest live-dot-glow animate-pulse-slow" />
              <span className="text-text-heading font-medium">
                {t.liveNow} (Tirunelveli)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-marigold opacity-60" />
              <span>
                {t.comingSoon} (37 districts)
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
