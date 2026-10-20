import React, { useState } from 'react';
import { Award, UserCheck, Quote, X, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { VERIFIER_PICKS } from '../data/verifierPicks';
import { TRANSLATIONS } from '../data/translations';

export default function VerifierDispatches({ lang = 'en' }) {
  const [selectedStory, setSelectedStory] = useState(null);
  const t = TRANSLATIONS[lang];

  return (
    <section className="w-full bg-bg-sand/60 py-16 sm:py-24 border-b border-border-subtle">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-border-subtle gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-brand-forest mb-2 font-heading">
              <span>Chapter 02</span>
              <span>·</span>
              <span>Named Verifier Curation</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-text-heading font-bold tracking-tight">
              {t.verifierTitle}
            </h2>
            <p className="font-body text-xs sm:text-sm text-text-meta mt-2 max-w-xl">
              {t.verifierSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-brand-forest bg-brand-forest/10 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
            <ShieldCheck size={15} />
            <span>15+ Years Resident Vetting</span>
          </div>
        </div>

        {/* 2-Column Magazine Profile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {VERIFIER_PICKS.map((item) => (
            <div
              key={item.id}
              className="bg-bg-card rounded-3xl border border-border-subtle shadow-card hover:shadow-card-hover overflow-hidden flex flex-col justify-between transition-all duration-300"
            >
              <div>
                {/* Photo Header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg-sand">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-brand-forest text-xs font-semibold shadow-sm flex items-center gap-1.5">
                      <Award size={13} className="text-brand-forest" />
                      {item.verifier.badge}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-7 sm:p-9">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-bg-sand text-text-body text-xs font-medium flex items-center gap-1">
                      <MapPin size={11} className="text-brand-terracotta" />
                      {item.district}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl text-text-heading font-bold mb-3">
                    {lang === 'ta' ? item.nameTa : item.name}
                  </h3>

                  <blockquote className="font-serifAccent text-base sm:text-lg italic text-text-body leading-relaxed pl-4 border-l-2 border-brand-terracotta mb-6">
                    {lang === 'ta' ? item.descriptionTa : item.description}
                  </blockquote>

                  {/* Verifier Details */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-border-subtle">
                    <div className="w-11 h-11 rounded-full bg-brand-forest/10 border border-brand-forest/20 flex items-center justify-center shrink-0">
                      <UserCheck size={20} className="text-brand-forest" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-sm text-text-heading">
                        {item.verifier.name}
                      </div>
                      <div className="text-xs text-text-meta">
                        {item.verifier.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="px-7 sm:px-9 pb-7 sm:pb-9 pt-2">
                <button
                  onClick={() => setSelectedStory(item)}
                  className="w-full py-3 rounded-full border border-border-subtle hover:border-brand-terracotta bg-bg-sand/40 hover:bg-bg-sand text-xs font-semibold text-text-heading flex items-center justify-center gap-2 transition-all group"
                >
                  <span>{t.readStory}</span>
                  <ArrowRight size={13} className="text-brand-terracotta group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Story Reading Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-bg-card rounded-3xl max-w-lg w-full p-7 sm:p-9 shadow-2xl border border-border-subtle relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-text-meta hover:text-text-heading hover:bg-bg-sand transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-brand-forest mb-2">
              <Award size={15} />
              <span>Verified Resident Dispatch</span>
            </div>

            <h3 className="font-editorial text-3xl text-text-heading font-bold mb-1">
              {selectedStory.name}
            </h3>

            <p className="text-xs text-text-meta mb-6">
              Curated by {selectedStory.verifier.name} ({selectedStory.verifier.role})
            </p>

            <div className="p-5 rounded-2xl bg-bg-sand/70 border border-border-subtle mb-6">
              <Quote size={22} className="text-brand-terracotta mb-2 opacity-60" />
              <p className="font-serifAccent text-base sm:text-lg italic text-text-body leading-relaxed">
                {selectedStory.verifier.storySnippet}
              </p>
            </div>

            <p className="text-xs text-text-body leading-relaxed mb-6">
              All NammaOor verifiers sign a legal affidavit confirming they have received no financial reward, gift, or commercial promotion.
            </p>

            <button
              onClick={() => setSelectedStory(null)}
              className="w-full py-3 rounded-full bg-brand-terracotta text-white font-semibold text-xs tracking-wide shadow-button hover:bg-brand-terracotta-dark transition-colors"
            >
              Close Dispatch
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
