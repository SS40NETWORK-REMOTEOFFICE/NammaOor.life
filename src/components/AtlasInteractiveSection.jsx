import React from 'react';
import GeographicAtlasMap from './GeographicAtlasMap';
import { TRANSLATIONS } from '../data/translations';
import { MapPin, ArrowRight, ShieldCheck, Sparkles, Navigation } from 'lucide-react';

export default function AtlasInteractiveSection({
  lang = 'en',
  selectedDistrict,
  onSelectDistrict
}) {
  const t = TRANSLATIONS[lang];

  return (
    <section id="atlas-map" className="w-full bg-bg-sand/70 py-20 sm:py-28 border-b border-border-subtle">
      <div className="max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-14 flex flex-col items-center text-center">
        
        {/* Section Header */}
        <div className="mb-10 max-w-2xl">
          <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-brand-gold font-bold mb-2 block">
            HIGH-ACCURACY GEOGRAPHIC CARTOGRAPHY
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight text-text-heading mb-4 leading-tight">
            THE 38-DISTRICT <br />
            <span className="text-brand-terracotta">INTERACTIVE ATLAS</span>
          </h2>
          <p className="font-serif text-base sm:text-lg text-text-body">
            Real satellite topography, real GPS coordinates, and historical riverbeds. Explore verified local places across all 38 districts of Tamil Nadu.
          </p>
        </div>

        {/* High-Accuracy Geographic Leaflet Map */}
        <div className="w-full mb-8">
          <GeographicAtlasMap
            selectedDistrict={selectedDistrict}
            onSelectDistrict={onSelectDistrict}
            lang={lang}
          />
        </div>

        {/* Selected District Inspection Bar */}
        <div className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-7 border border-border-subtle shadow-card flex flex-col sm:flex-row items-center justify-between gap-5 text-left">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
              selectedDistrict?.status === 'live' ? 'bg-brand-forest/15 text-brand-forest' : 'bg-brand-gold/15 text-brand-gold-dark'
            }`}>
              <MapPin size={28} />
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="font-cinzel text-2xl font-bold text-text-heading">
                  {lang === 'ta' ? selectedDistrict?.nameTa : selectedDistrict?.name}
                </h3>
                <span className={`text-[10px] font-bold uppercase px-3 py-0.5 rounded-full ${
                  selectedDistrict?.status === 'live'
                    ? 'bg-brand-forest text-white'
                    : 'bg-brand-gold/20 text-brand-gold-dark'
                }`}>
                  {selectedDistrict?.status === 'live' ? 'District 01 · Live Hub' : 'Upcoming Release'}
                </span>
              </div>
              <p className="font-serif text-sm text-text-body mt-1">
                "{selectedDistrict?.highlight}"
              </p>
              <div className="text-[11px] font-mono text-text-meta mt-1">
                GPS: {selectedDistrict?.lat.toFixed(4)}° N, {selectedDistrict?.lng.toFixed(4)}° E · {selectedDistrict?.placesCount} spots mapped
              </div>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full btn-gold font-cinzel text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>{selectedDistrict?.status === 'live' ? 'Inspect Live Hub' : 'Join Waitlist'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
