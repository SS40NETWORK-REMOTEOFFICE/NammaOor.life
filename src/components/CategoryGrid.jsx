import React from 'react';
import { CATEGORIES } from '../data/categories';
import { TRANSLATIONS } from '../data/translations';
import { Utensils, Coffee, Sparkles, Hotel, Landmark, Waves, Sun, Music } from 'lucide-react';

const iconMap = {
  Utensils: Utensils,
  Coffee: Coffee,
  Sparkles: Sparkles,
  Hotel: Hotel,
  Landmark: Landmark,
  Waves: Waves,
  Sun: Sun,
  Music: Music,
};

export default function CategoryGrid({ lang = 'en', onSelectCategory, activeCategory }) {
  const t = TRANSLATIONS[lang];

  return (
    <section id="explore" className="w-full bg-bg-primary py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Title */}
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-text-heading tracking-tight mb-2">
            {t.exploreTitle}
          </h2>
          <p className="font-body text-xs sm:text-sm text-text-meta">
            {lang === 'ta'
              ? 'சுவைகள், ஆன்மீகம், இயற்கை மற்றும் பண்பாடு — நீங்கள் தேடும் வழிகாட்டி'
              : 'Taste, heritage, natural cascades, and coastal escapes — curated by locals.'}
          </p>
        </div>

        {/* 8 Category Tiles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const IconComp = iconMap[cat.icon] || Sparkles;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                className={`flex flex-col items-start p-5 sm:p-6 rounded-2xl bg-bg-card border transition-all duration-200 hover:-translate-y-1 text-left group cursor-pointer ${
                  isSelected
                    ? 'border-brand-gold ring-2 ring-brand-gold/30 shadow-card-hover'
                    : 'border-border-subtle shadow-banner hover:shadow-card hover:border-brand-gold/40'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-bg-sand flex items-center justify-center text-brand-gold mb-4 group-hover:scale-110 group-hover:bg-brand-gold/15 transition-all duration-200">
                  <IconComp size={22} />
                </div>

                <div className="font-heading font-semibold text-sm sm:text-base text-text-heading group-hover:text-brand-gold-dark transition-colors duration-200">
                  {lang === 'ta' ? cat.labelTa : cat.label}
                </div>

                <div className="text-[11px] text-text-meta mt-1 line-clamp-1">
                  {cat.tag}
                </div>

                <div className="text-[10px] text-brand-forest font-semibold mt-3 bg-brand-forest/10 px-2.5 py-0.5 rounded-full">
                  {cat.count} {lang === 'ta' ? 'இடங்கள்' : 'places'}
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
