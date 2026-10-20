import React, { useState } from 'react';
import { ArrowRight, MapPin, CheckCircle2, Sparkles, Compass, ThumbsUp } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function MidnightDiscoveryTrail({
  lang = 'en',
  onSelectDistrict,
  onOpenPlaceDetail
}) {
  const [activeStep, setActiveStep] = useState(0);
  const t = TRANSLATIONS[lang];

  const trailSteps = [
    {
      id: 'tirunelveli',
      district: 'Tirunelveli',
      districtTa: 'திருநெல்வேலி',
      tag: 'District 01 · Live Hub',
      title: 'Tirunelveli',
      description: 'Thamirabarani riverbed wheat halwa, Nellaiappar musical pillars & sacred tank.',
      placesCount: '142 Verified Spots',
      image: '/images/tirunelveli_halwa.jpg',
      isLive: true
    },
    {
      id: 'madurai',
      district: 'Madurai',
      districtTa: 'மதுரை',
      tag: 'District 02 · Launching Next',
      title: 'Madurai',
      description: 'Meenakshi Amman ancient gopuram towers, midnight Kari Dosa & authentic Jigarthanda.',
      placesCount: '186 Spots Ready',
      image: '/images/tamilnadu_palace_dusk.jpg',
      isLive: false
    },
    {
      id: 'tenkasi',
      district: 'Tenkasi',
      districtTa: 'தென்காசி',
      tag: 'District 03 · Western Ghats',
      title: 'Tenkasi & Courtallam',
      description: 'Natural mountain herbal spa cascades flowing from the Agasthiyar biosphere.',
      placesCount: '56 Spots Ready',
      image: '/images/courtallam_falls.jpg',
      isLive: false
    },
    {
      id: 'thanjavur',
      district: 'Thanjavur',
      districtTa: 'தஞ்சாவூர்',
      tag: 'District 04 · Kaveri Delta',
      title: 'Thanjavur & Delta',
      description: 'UNESCO Brihadeeswara Big Temple, royal Maratha palaces & heirloom Chola bronze.',
      placesCount: '130 Spots Ready',
      image: '/images/nellaiappar_temple.jpg',
      isLive: false
    }
  ];

  return (
    <section id="districts" className="relative w-full bg-navy-gradient text-white py-24 sm:py-32 overflow-hidden border-b border-border-gold/20">
      
      {/* Background Watermark Architecture & Golden Nebula */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-brand-gold/20 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-brand-terracotta/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-14">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 cols): Trail Intro & Script Accent */}
          <div className="lg:col-span-5 text-left sticky top-28">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-brand-gold font-bold">
                THE SOVEREIGN TRAIL
              </span>
              <div className="w-12 h-[1px] bg-brand-gold/40" />
            </div>

            {/* Heading */}
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
              38 DISTRICTS <br />
              <span className="text-gold-gradient">4 REGIONAL PRIDES</span>
            </h2>

            {/* Paragraph */}
            <p className="font-serif text-base sm:text-lg text-white/80 leading-relaxed mb-8">
              From royal granite temple courts to sacred riverbeds, fragrant spice valleys, and midnight street bazaars — experience Tamil Nadu curated by resident confidence, not sponsored advertising.
            </p>

            {/* Cursive Handwriting Accent (matching reference "Same Land, A Million Emotions") */}
            <div className="mb-10">
              <span className="font-script text-3xl sm:text-4xl text-brand-gold-light/90 block transform -rotate-2">
                Same Land, A Million Flavors
              </span>
            </div>

            {/* Button */}
            <button
              onClick={() => {
                const el = document.getElementById('atlas-map');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-gold font-cinzel text-xs font-bold tracking-wider uppercase"
            >
              <span>Explore Interactive Atlas</span>
              <ArrowRight size={14} />
            </button>

          </div>

          {/* Right Column (7 cols): Stepper Trail Layout (matching the reference timeline!) */}
          <div className="lg:col-span-7 relative">
            
            {/* Vertical Connecting Golden Line */}
            <div className="absolute left-[18px] top-6 bottom-12 w-[1.5px] bg-gradient-to-b from-brand-gold via-brand-gold/40 to-transparent z-0" />

            <div className="space-y-8 relative z-10">
              {trailSteps.map((step, idx) => (
                <div
                  key={step.id}
                  onClick={() => onSelectDistrict(step.id)}
                  className="flex items-start gap-5 sm:gap-8 group cursor-pointer"
                >
                  {/* Stepper Dot */}
                  <div className="shrink-0 pt-1">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      step.isLive
                        ? 'bg-brand-forest border-brand-gold shadow-gold text-white'
                        : 'bg-bg-midnight border-brand-gold/40 text-brand-gold group-hover:border-brand-gold'
                    }`}>
                      {step.isLive ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                      ) : (
                        <span className="text-xs font-mono font-bold">0{idx + 1}</span>
                      )}
                    </div>
                  </div>

                  {/* Stepper Content Card */}
                  <div className="flex-1 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 sm:p-6 group-hover:border-brand-gold/50 group-hover:bg-white/10 transition-all duration-300 shadow-dark flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                    
                    {/* Thumbnail */}
                    <div className="w-full sm:w-36 h-28 sm:h-24 rounded-xl overflow-hidden shrink-0 relative bg-black/40">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {step.isLive && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-brand-forest text-white text-[9px] font-bold">
                          LIVE NOW
                        </span>
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-cinzel font-semibold tracking-widest uppercase text-brand-gold">
                          {step.tag}
                        </span>
                        <span className="text-[10px] text-white/50 font-mono">
                          {step.placesCount}
                        </span>
                      </div>

                      <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white group-hover:text-brand-gold transition-colors">
                        {step.title}
                      </h3>

                      <p className="font-serif text-xs sm:text-sm text-white/70 mt-1 line-clamp-2 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                  </div>

                </div>
              ))}
            </div>

            {/* Right Vertical Label (matching reference "FOUR PLACES A DEEPER YOU") */}
            <div className="hidden xl:block absolute -right-10 top-1/2 -translate-y-1/2 text-[10px] tracking-[0.3em] uppercase text-white/30 font-cinzel rotate-90 transform origin-right">
              FOUR REGIONS · A DEEPER PRIDE
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
