import React, { useState } from 'react';
import { Award, MapPin, ArrowRight, UserCheck, Quote, X } from 'lucide-react';
import { VERIFIER_PICKS } from '../data/verifierPicks';
import { TRANSLATIONS } from '../data/translations';

export default function VerifierPicksSection({ lang = 'en' }) {
  const [activeStory, setActiveStory] = useState(null);
  const t = TRANSLATIONS[lang];

  return (
    <section className="w-full bg-bg-sand py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">⭐</span>
              <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-text-heading tracking-tight">
                {t.verifierTitle}
              </h2>
            </div>
            <p className="font-body text-xs sm:text-sm text-text-meta">
              {t.verifierSubtitle}
            </p>
          </div>

          <a
            href="#trust"
            className="inline-flex items-center gap-1 font-body font-medium text-xs sm:text-sm text-brand-terracotta hover:underline shrink-0"
          >
            <span>{t.seeAll}</span>
          </a>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {VERIFIER_PICKS.map((item) => (
            <div
              key={item.id}
              className="bg-bg-card rounded-2xl shadow-card hover:shadow-card-hover border border-border-subtle/80 overflow-hidden flex flex-col transition-all duration-250 ease-apple-ease hover:-translate-y-1"
            >
              {/* Photo 16:9 */}
              <div className="relative w-full aspect-[16/9] sm:h-56 overflow-hidden bg-bg-sand">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                
                {/* Floating pill badge */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg-card/95 backdrop-blur-md text-brand-forest shadow-sm text-xs font-semibold">
                    <Award size={14} className="text-brand-forest" />
                    {item.verifier.badge}
                  </span>
                </div>
              </div>

              {/* Content Block */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-bg-sand text-text-body text-xs font-medium">
                      <MapPin size={12} className="text-brand-terracotta" />
                      {lang === 'ta' ? item.districtTa : item.district}
                    </span>
                  </div>

                  <h3 className="font-heading font-semibold text-xl sm:text-2xl text-text-heading mb-2">
                    {lang === 'ta' ? item.nameTa : item.name}
                  </h3>

                  <p className="font-body text-sm sm:text-base italic text-text-body leading-relaxed">
                    {lang === 'ta' ? item.descriptionTa : item.description}
                  </p>
                </div>

                {/* Verifier Row */}
                <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-forest/10 border border-brand-forest/20 flex items-center justify-center overflow-hidden shrink-0">
                      <UserCheck size={18} className="text-brand-forest" />
                    </div>
                    <div>
                      <div className="font-heading font-semibold text-xs sm:text-sm text-text-heading">
                        {item.verifier.name}
                      </div>
                      <div className="text-[11px] text-text-meta">
                        {item.verifier.role}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveStory(item)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-terracotta hover:text-brand-terracotta-dark transition-colors self-start sm:self-auto"
                  >
                    <span>{t.readStory}</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Story Modal Dialog */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-bg-card rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-card-hover border border-border-subtle relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveStory(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-text-meta hover:text-text-heading hover:bg-bg-sand transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-brand-forest/10 text-brand-forest text-xs font-semibold">
                {activeStory.verifier.badge}
              </span>
              <span className="text-xs text-text-meta">
                Verified Resident Curation
              </span>
            </div>

            <h3 className="font-heading font-bold text-2xl text-text-heading mb-2">
              {activeStory.name}
            </h3>

            <p className="text-xs text-text-meta mb-5 flex items-center gap-1.5">
              <MapPin size={13} className="text-brand-terracotta" />
              {activeStory.district} · {activeStory.verifier.name}
            </p>

            <div className="p-4 rounded-xl bg-bg-sand/60 border border-border-subtle mb-5">
              <Quote size={20} className="text-brand-terracotta mb-2 opacity-70" />
              <p className="font-body text-sm text-text-body leading-relaxed italic">
                {activeStory.verifier.storySnippet}
              </p>
            </div>

            <p className="text-xs text-text-meta leading-relaxed mb-6">
              NammaOor verifiers are vetted residents who have lived in the district for over 15 years. They sign a legal declaration confirming zero commercial affiliation.
            </p>

            <button
              onClick={() => setActiveStory(null)}
              className="w-full py-2.5 rounded-full bg-brand-terracotta text-white font-semibold text-xs tracking-wide shadow-button hover:bg-brand-terracotta-dark transition-colors"
            >
              Close Story
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
