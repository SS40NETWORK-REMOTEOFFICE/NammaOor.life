import React, { useState } from 'react';
import TamilNaduMap from './TamilNaduMap';
import { TRANSLATIONS } from '../data/translations';
import { DISTRICTS } from '../data/districts';
import { MapPin, Users, CheckCircle, ArrowRight, X, Bell } from 'lucide-react';

export default function DistrictMapSection({
  lang = 'en',
  selectedDistrict,
  onSelectDistrict
}) {
  const [activeModalDistrict, setActiveModalDistrict] = useState(null);
  const [waitlistPhone, setWaitlistPhone] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleDistrictClick = (district) => {
    setActiveModalDistrict(district);
    setWaitlistSubmitted(false);
    setWaitlistPhone('');
    if (onSelectDistrict) {
      onSelectDistrict(district);
    }
  };

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (waitlistPhone.trim()) {
      setWaitlistSubmitted(true);
    }
  };

  return (
    <section className="w-full bg-bg-sand py-16 sm:py-20 lg:py-24 border-t border-b border-[#EAE2D4]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col items-center text-center">
        
        {/* Header */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-forest mb-2 block">
            Statewide Expansion / மாநில விரிவாக்கம்
          </span>
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl lg:text-4xl text-text-heading tracking-tight mb-3">
            {t.allDistrictsTitle}
          </h2>
          <p className="font-body text-xs sm:text-sm text-text-meta">
            {t.allDistrictsSubtitle}
          </p>
        </div>

        {/* Large Interactive Map Canvas */}
        <div className="w-full flex justify-center py-4">
          <TamilNaduMap
            variant="fullscreen"
            selectedDistrict={selectedDistrict}
            onSelectDistrict={handleDistrictClick}
            lang={lang}
          />
        </div>

        {/* District Map Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-6 pt-6 border-t border-[#EAE2D4] text-xs sm:text-sm font-medium text-text-body">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-brand-forest live-dot-glow animate-pulse" />
            <span className="font-semibold text-text-heading">
              {lang === 'ta' ? 'தற்போது நேரலையில் (திருநெல்வேலி)' : '● Live now (Tirunelveli)'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-marigold opacity-60" />
            <span className="text-text-meta">
              {lang === 'ta' ? 'விரைவில் வருகிறது (37 மாவட்டங்கள்)' : '○ Coming soon (37 districts)'}
            </span>
          </div>
        </div>

      </div>

      {/* District Detail / Waitlist Modal */}
      {activeModalDistrict && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-bg-card rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-card-hover border border-border-subtle relative text-left">
            <button
              onClick={() => setActiveModalDistrict(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-text-meta hover:text-text-heading hover:bg-bg-sand transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  activeModalDistrict.status === 'live' ? 'bg-brand-forest animate-pulse' : 'bg-brand-marigold'
                }`}
              />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-text-meta">
                {activeModalDistrict.status === 'live' ? 'District Status: Live' : 'Coming Soon to NammaOor'}
              </span>
            </div>

            <h3 className="font-heading font-bold text-2xl text-text-heading mb-1">
              {lang === 'ta' ? activeModalDistrict.nameTa : activeModalDistrict.name}
            </h3>

            <p className="text-xs text-text-meta mb-4">
              {activeModalDistrict.placesCount} spots identified by local ambassadors
            </p>

            <div className="p-4 rounded-xl bg-bg-sand/60 border border-border-subtle mb-5">
              <div className="text-xs font-semibold text-brand-terracotta uppercase tracking-wider mb-1">
                District Signature
              </div>
              <div className="font-body text-xs sm:text-sm text-text-body">
                {activeModalDistrict.highlight}
              </div>
            </div>

            {activeModalDistrict.status === 'live' ? (
              <div>
                <p className="text-xs text-text-body mb-4">
                  Tirunelveli has 142 community-voted places with live trust ratings ready to explore right now.
                </p>
                <button
                  onClick={() => setActiveModalDistrict(null)}
                  className="w-full py-3 rounded-full bg-brand-forest text-white font-semibold text-xs tracking-wide shadow-sm hover:opacity-95 transition-opacity"
                >
                  Explore Tirunelveli Now →
                </button>
              </div>
            ) : (
              <div>
                {!waitlistSubmitted ? (
                  <form onSubmit={handleWaitlistSubmit} className="space-y-3">
                    <p className="text-xs text-text-body">
                      Be the first to vote for {activeModalDistrict.name}'s hidden gems when we launch next month.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={waitlistPhone}
                        onChange={(e) => setWaitlistPhone(e.target.value)}
                        placeholder="WhatsApp number / Phone"
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-border-subtle text-xs bg-bg-primary text-text-heading outline-none focus:border-brand-terracotta"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-xl bg-brand-terracotta text-white font-semibold text-xs shrink-0 hover:bg-brand-terracotta-dark transition-colors"
                      >
                        Notify Me
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-3.5 rounded-xl bg-brand-forest/10 border border-brand-forest/20 text-brand-forest text-xs font-medium flex items-center gap-2">
                    <CheckCircle size={16} />
                    <span>You're on the priority waitlist for {activeModalDistrict.name}!</span>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
}
