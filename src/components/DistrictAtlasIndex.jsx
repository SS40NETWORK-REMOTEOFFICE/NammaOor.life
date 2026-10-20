import React, { useState } from 'react';
import { MapPin, ArrowRight, CheckCircle2, Bell, Sparkles } from 'lucide-react';
import { DISTRICTS } from '../data/districts';
import { TRANSLATIONS } from '../data/translations';

export default function DistrictAtlasIndex({
  lang = 'en',
  selectedDistrict,
  onSelectDistrict
}) {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const t = TRANSLATIONS[lang];

  const regions = [
    { id: 'all', label: 'All 38 Districts', labelTa: 'அனைத்து 38 மாவட்டங்கள்' },
    { id: 'south', label: 'Pandya Nadu & Deep South', labelTa: 'பாண்டிய நாடு & தென் தமிழகம்', ids: ['tirunelveli', 'tenkasi', 'kanniyakumari', 'thoothukudi', 'virudhunagar', 'madurai', 'theni', 'dindigul', 'sivaganga', 'ramanathapuram'] },
    { id: 'delta', label: 'Chola Nadu & Kaveri Delta', labelTa: 'சோழ நாடு & காவிரி டெல்டா', ids: ['thanjavur', 'tiruchirappalli', 'tiruvarur', 'nagapattinam', 'mayiladuthurai', 'pudukkottai', 'karur', 'perambalur', 'ariyalur'] },
    { id: 'west', label: 'Kongu Nadu & Ghats', labelTa: 'கொங்கு நாடு & மேற்கு தொடர்ச்சி', ids: ['coimbatore', 'nilgiris', 'erode', 'salem', 'tiruppur', 'namakkal', 'dharmapuri', 'krishnagiri'] },
    { id: 'north', label: 'Thondai Nadu & Coromandel', labelTa: 'தொண்டை நாடு & வட தமிழகம்', ids: ['chennai', 'chengalpattu', 'kanchipuram', 'tiruvallur', 'vellore', 'ranipet', 'tirupattur', 'tiruvannamalai', 'viluppuram', 'kallakurichi', 'cuddalore'] },
  ];

  const displayedDistricts = selectedRegion === 'all'
    ? DISTRICTS
    : DISTRICTS.filter(d => regions.find(r => r.id === selectedRegion)?.ids.includes(d.id));

  return (
    <section id="atlas-index" className="w-full bg-bg-sand/40 py-16 sm:py-24 border-b border-border-subtle">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-border-subtle gap-6">
          <div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-brand-forest mb-2 block font-heading">
              Chapter 03 · The Gazetteer
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-text-heading font-bold tracking-tight">
              {t.allDistrictsTitle}
            </h2>
            <p className="font-body text-xs sm:text-sm text-text-meta mt-2 max-w-xl">
              {t.allDistrictsSubtitle}
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedRegion === reg.id
                    ? 'bg-brand-forest text-white'
                    : 'bg-white hover:bg-bg-sand text-text-body border border-border-subtle'
                }`}
              >
                {lang === 'ta' ? reg.labelTa : reg.label}
              </button>
            ))}
          </div>
        </div>

        {/* 38 Districts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayedDistricts.map((d, index) => {
            const isLive = d.status === 'live';
            const isSelected = selectedDistrict?.id === d.id;

            return (
              <div
                key={d.id}
                onClick={() => onSelectDistrict(d)}
                className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-brand-terracotta ring-2 ring-brand-terracotta/20 shadow-card-hover'
                    : isLive
                    ? 'bg-white border-brand-forest/30 shadow-card hover:shadow-card-hover'
                    : 'bg-white/70 hover:bg-white border-border-subtle hover:border-border-editorial shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-text-meta font-bold">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        isLive
                          ? 'bg-brand-forest/10 text-brand-forest flex items-center gap-1'
                          : 'bg-brand-marigold/15 text-brand-marigold-dark'
                      }`}
                    >
                      {isLive && <span className="w-1.5 h-1.5 rounded-full bg-brand-forest animate-pulse" />}
                      {isLive ? 'Live Hub' : 'Upcoming'}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-lg text-text-heading mb-1">
                    {lang === 'ta' ? d.nameTa : d.name}
                  </h4>

                  <p className="font-body text-xs text-text-body line-clamp-2 leading-relaxed">
                    {d.highlight}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-3 border-t border-border-subtle/70 text-xs">
                  <span className="text-text-meta font-medium">
                    {d.placesCount} spots mapped
                  </span>
                  <span className="font-semibold text-brand-terracotta flex items-center gap-1 group">
                    <span>{isLive ? 'Explore' : 'Notify Me'}</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
