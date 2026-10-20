import React from 'react';
import { Compass, Users, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function AboutCharter({ lang = 'en' }) {
  const t = TRANSLATIONS[lang];

  return (
    <section id="about" className="relative w-full bg-bg-primary pt-28 sm:pt-36 pb-20 sm:pb-28 border-b border-border-subtle overflow-hidden">
      
      {/* Subtle traditional watermark motif */}
      <div className="absolute top-12 left-0 w-72 h-72 opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 200 200" fill="currentColor">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M100 20 L100 180 M20 100 L180 100 M43 43 L157 157 M43 157 L157 43" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-14">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (7 cols): Editorial About Content */}
          <div className="lg:col-span-7 text-left">
            
            {/* Eyebrow with gold divider line */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-brand-gold font-bold">
                OUR SOVEREIGN PROMISE
              </span>
              <div className="w-16 h-[1.5px] bg-brand-gold/40" />
            </div>

            {/* Large Serif Title */}
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-text-heading tracking-tight mb-6 leading-[1.15]">
              ABOUT <br />
              <span className="text-brand-terracotta">NammaOor<span className="text-brand-gold text-2xl sm:text-4xl">.life</span></span>
            </h2>

            {/* Body Lede */}
            <p className="font-serif text-base sm:text-lg text-text-body leading-relaxed mb-6 font-normal">
              NammaOor.life is not a tourism package or a commercial directory. It is Tamil Nadu’s own local discovery archive. Born to preserve authentic culinary heritage, sacred Dravidian architecture, and unbuyable neighborhood trust — curated by residents who have walked these streets for decades.
            </p>

            <p className="font-body text-xs sm:text-sm text-text-meta leading-relaxed mb-10">
              Unlike generic search platforms where rankings are sold to the highest bidder, every recommendation on NammaOor.life is earned through trust-weighted community votes and named verifier verification. No sponsored lists. No algorithmic manipulation.
            </p>

            {/* 4 Icon Row (matching reference 4-icon badge row) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-border-subtle">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-gold/15 text-brand-gold-dark flex items-center justify-center shrink-0 mt-0.5">
                  <Compass size={18} />
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-text-heading">Curated Places</h4>
                  <p className="text-[11px] text-text-meta mt-0.5">Zero paid rankings</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-forest/15 text-brand-forest flex items-center justify-center shrink-0 mt-0.5">
                  <Users size={18} />
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-text-heading">Local Verifiers</h4>
                  <p className="text-[11px] text-text-meta mt-0.5">15+ yrs residents</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-terracotta/15 text-brand-terracotta flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-text-heading">Unbuyable Votes</h4>
                  <p className="text-[11px] text-text-meta mt-0.5">Pure confidence</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-gold/15 text-brand-gold-dark flex items-center justify-center shrink-0 mt-0.5">
                  <Heart size={18} />
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-text-heading">Authentic Flavors</h4>
                  <p className="text-[11px] text-text-meta mt-0.5">38 districts pride</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Callout Quote & Architectural Heritage Photo */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Serif Italic Quote with accent rule */}
            <div className="mb-6 pl-4 border-l-2 border-brand-gold">
              <span className="font-serif italic text-2xl sm:text-3xl text-text-heading font-normal leading-snug">
                “Different landscapes. <br />
                <span className="text-brand-terracotta">One timeless Tamil Nadu.”</span>
              </span>
            </div>

            {/* Image Spread with curved corners & subtle frame shadow */}
            <div className="relative rounded-3xl overflow-hidden shadow-card border border-border-subtle aspect-[16/11]">
              <img
                src="/images/nellaiappar_temple.jpg"
                alt="Ancient Nellaiappar Temple Tank"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <span className="font-cinzel font-bold text-white drop-shadow">
                  Nellaiappar Temple Tank · Tirunelveli
                </span>
                <span className="text-[10px] bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-medium">
                  7th-Century Dravidian
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
