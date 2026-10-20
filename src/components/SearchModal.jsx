import React, { useState } from 'react';
import { Search, X, MapPin, ArrowRight } from 'lucide-react';
import { DISTRICTS } from '../data/districts';
import { TRENDING_PLACES } from '../data/trendingPlaces';

export default function SearchModal({ isOpen, onClose, onSelectPlace, onSelectDistrict, lang = 'en' }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const quickChips = [
    'Halwa', 'Nellaiappar', 'Courtallam Falls', 'Madurai', 'Parotta', 'Degree Coffee', 'Brihadeeswara'
  ];

  const matchedPlaces = query.trim()
    ? TRENDING_PLACES.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.nameTa.includes(query) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.district.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const matchedDistricts = query.trim()
    ? DISTRICTS.filter(d =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.nameTa.includes(query) ||
        d.highlight.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-sm animate-fade-in text-left">
      <div className="bg-bg-card rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-border-subtle relative max-h-[80vh] flex flex-col">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center pb-4 border-b border-border-subtle">
          <Search size={20} className="text-brand-terracotta mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === 'ta' ? 'இடங்கள், உணவுகள், கோயில்கள் தேடுங்கள்...' : 'Search places, dishes, temples, or towns...'}
            className="w-full text-base sm:text-lg font-body text-text-heading placeholder:text-text-meta outline-none bg-transparent"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-text-meta hover:text-text-heading hover:bg-bg-sand transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Chips */}
        <div className="py-3 border-b border-border-subtle flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-medium text-text-meta mr-1 shrink-0">Popular:</span>
          {quickChips.map((chip) => (
            <button
              key={chip}
              onClick={() => setQuery(chip)}
              className="px-2.5 py-1 rounded-full bg-bg-sand hover:bg-border-subtle text-xs text-text-body whitespace-nowrap transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="overflow-y-auto py-4 space-y-4 flex-1">
          {query.trim().length === 0 ? (
            <div className="text-center py-8 text-xs text-text-meta">
              Type to explore verified places, cultural icons, and authentic local spots across 38 districts.
            </div>
          ) : (
            <>
              {matchedPlaces.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-text-meta uppercase tracking-wider mb-2">
                    Verified Spots
                  </div>
                  <div className="space-y-1.5">
                    {matchedPlaces.map((place) => (
                      <button
                        key={place.id}
                        onClick={() => {
                          onSelectPlace(place);
                          onClose();
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-bg-sand flex items-center justify-between text-left transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={place.image}
                            alt={place.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-heading font-semibold text-xs sm:text-sm text-text-heading">
                              {lang === 'ta' ? place.nameTa : place.name}
                            </div>
                            <div className="text-[11px] text-text-meta">
                              {place.category} · {place.district}
                            </div>
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-text-meta" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {matchedDistricts.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-text-meta uppercase tracking-wider mb-2">
                    Districts
                  </div>
                  <div className="space-y-1.5">
                    {matchedDistricts.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => {
                          onSelectDistrict(d);
                          onClose();
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-bg-sand flex items-center justify-between text-left transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-2 h-2 rounded-full ${d.status === 'live' ? 'bg-brand-forest' : 'bg-brand-marigold'}`} />
                          <div>
                            <div className="font-heading font-medium text-xs sm:text-sm text-text-heading">
                              {lang === 'ta' ? d.nameTa : d.name}
                            </div>
                            <div className="text-[11px] text-text-meta">
                              {d.highlight}
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] text-brand-forest font-medium">
                          {d.placesCount} spots
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {matchedPlaces.length === 0 && matchedDistricts.length === 0 && (
                <div className="text-center py-6 text-xs text-text-meta">
                  No direct match found for "{query}". Try searching for "Halwa", "Temple", or "Nellai".
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}
