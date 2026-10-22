import React, { useState } from 'react';
import { Search, MapPin, X, ArrowRight, Check } from 'lucide-react';
import { DISTRICTS } from '../data/districts';

export default function DistrictBottomSheet({
  isOpen,
  onClose,
  selectedDistrict,
  onSelectDistrict,
  onNavigateToDistrict,
  lang = 'en'
}) {
  const [filterQuery, setFilterQuery] = useState('');

  if (!isOpen) return null;

  const liveDistricts = DISTRICTS.filter(d => d.status === 'live');
  const comingSoonDistricts = DISTRICTS.filter(d => d.status === 'coming_soon');

  const filteredLive = liveDistricts.filter(d =>
    d.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    d.nameTa.includes(filterQuery)
  );

  const filteredComing = comingSoonDistricts.filter(d =>
    d.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    d.nameTa.includes(filterQuery)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-lg bg-bg-card rounded-t-3xl sm:rounded-2xl max-h-[85vh] sm:max-h-[75vh] flex flex-col shadow-2xl border border-border-subtle overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar on mobile */}
        <div className="w-full flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-border-subtle" />
        </div>

        {/* Header */}
        <div className="px-6 pt-4 pb-3 flex items-center justify-between border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <img
              src="/images/nammaoor_logo.webp"
              alt="NammaOor.life Tourist Guide"
              className="w-10 h-10 object-contain rounded-full bg-white p-0.5 border border-brand-gold/50 shadow-sm shrink-0"
            />
            <div>
              <h3 className="font-heading font-semibold text-xl text-text-heading">
                {lang === 'ta' ? 'மாவட்டத்தை தேர்வு செய்யுங்கள்' : 'Choose your district'}
              </h3>
              <p className="text-xs text-text-meta">
                {DISTRICTS.length} districts of Tamil Nadu · Tourist Guide
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-text-meta hover:text-text-heading hover:bg-bg-sand transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Input */}
        <div className="px-6 py-3 border-b border-border-subtle bg-bg-primary/50">
          <div className="relative flex items-center">
            <Search size={16} className="absolute left-3.5 text-text-meta pointer-events-none" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder={lang === 'ta' ? 'மாவட்டத்தை தேடுங்கள்...' : 'Search districts...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg-card border border-border-subtle text-xs sm:text-sm text-text-heading placeholder:text-text-meta outline-none focus:border-brand-terracotta"
              autoFocus
            />
          </div>
        </div>

        {/* Scrollable District List */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Live Now Section */}
          {filteredLive.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold tracking-wider uppercase text-brand-forest mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-forest animate-pulse" />
                <span>{lang === 'ta' ? 'தற்போது நேரலையில்' : 'LIVE NOW'}</span>
              </div>
              <div className="space-y-1">
                {filteredLive.map((d) => {
                  const isSelected = selectedDistrict?.id === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => {
                        onSelectDistrict(d);
                        if (onNavigateToDistrict && d.status === 'live') {
                          onNavigateToDistrict(d.id);
                        }
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-colors text-left ${
                        isSelected
                          ? 'bg-brand-forest/10 border border-brand-forest/20 text-brand-forest'
                          : 'hover:bg-bg-sand border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-brand-forest" />
                        <div>
                          <div className="font-heading font-semibold text-sm text-text-heading">
                            {lang === 'ta' ? d.nameTa : d.name}
                          </div>
                          <div className="text-[11px] text-text-meta">
                            {d.highlight}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-brand-forest bg-white px-2.5 py-1 rounded-full shadow-sm">
                        142 places
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Coming Soon Section */}
          {filteredComing.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold tracking-wider uppercase text-text-meta mb-2">
                {lang === 'ta' ? 'விரைவில் வருகிறது' : 'COMING SOON (37 DISTRICTS)'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {filteredComing.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      onSelectDistrict(d);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-bg-sand transition-colors text-left border border-transparent hover:border-border-subtle"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-brand-marigold opacity-60" />
                      <div>
                        <div className="font-heading font-medium text-xs sm:text-sm text-text-heading">
                          {lang === 'ta' ? d.nameTa : d.name}
                        </div>
                        <div className="text-[10px] text-text-meta truncate max-w-[170px]">
                          {d.highlight}
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={13} className="text-text-meta shrink-0 ml-1" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
