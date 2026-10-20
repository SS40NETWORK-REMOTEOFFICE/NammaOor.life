import React, { useState } from 'react';
import { MapPin, Search, Menu, X, ChevronDown, Bookmark, ShieldCheck, Sun } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function Header({
  lang = 'en',
  onToggleLang,
  selectedDistrict,
  onOpenDistrictSheet,
  onOpenSearchModal,
  onOpenLoginModal,
  onOpenBusiness
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-40 w-full bg-bg-primary/95 backdrop-blur-md border-b border-border-subtle transition-all duration-200">
      
      {/* Top Editorial Micro-Bar */}
      <div className="hidden sm:block border-b border-border-subtle/80 bg-bg-sand/40 text-[10px] font-medium tracking-widest uppercase text-text-meta py-1.5 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>{t.journalIssue}</span>
            <span className="w-1 h-1 rounded-full bg-text-meta/40" />
            <span className="text-brand-forest font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-forest animate-pulse" />
              {t.editionStatus}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-text-body">
              <Sun size={12} className="text-brand-marigold" />
              <span>31°C · Nellai Breeze</span>
            </span>

            {/* Language Switch */}
            <div className="flex items-center gap-1 bg-white/70 px-2 py-0.5 rounded-full border border-border-subtle text-[10px]">
              <button
                onClick={() => onToggleLang('ta')}
                className={`px-1.5 py-0.5 rounded font-semibold transition-all ${
                  lang === 'ta' ? 'text-brand-terracotta bg-bg-sand font-tamil' : 'hover:text-text-heading'
                }`}
              >
                தமிழ்
              </button>
              <span className="text-text-meta/40">/</span>
              <button
                onClick={() => onToggleLang('en')}
                className={`px-1.5 py-0.5 rounded font-semibold transition-all ${
                  lang === 'en' ? 'text-brand-terracotta bg-bg-sand' : 'hover:text-text-heading'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Masthead Bar */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Left: District Explorer Pill & Mobile Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-text-heading hover:bg-bg-sand transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <button
            onClick={onOpenDistrictSheet}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-bg-card hover:bg-bg-sand/70 text-text-heading rounded-full shadow-banner border border-border-subtle text-xs font-medium tracking-wide transition-all group"
          >
            <MapPin size={13} className="text-brand-terracotta group-hover:scale-110 transition-transform" />
            <span className="font-heading font-semibold">
              {selectedDistrict ? (lang === 'ta' ? selectedDistrict.nameTa : selectedDistrict.name) : t.districtPill}
            </span>
            <span className="text-[10px] text-brand-forest bg-brand-forest/10 px-1.5 py-0.2 rounded-full uppercase font-bold">
              {selectedDistrict?.status === 'live' ? 'Live Hub' : 'Upcoming'}
            </span>
            <ChevronDown size={12} className="text-text-meta ml-0.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Center: Editorial Masthead Title */}
        <div className="flex flex-col items-center text-center">
          <a href="#" className="flex flex-col items-center group">
            <span className="font-editorial text-2xl sm:text-3xl lg:text-[32px] tracking-[0.16em] uppercase text-text-heading font-bold transition-colors group-hover:text-brand-terracotta">
              NAMMA OOR
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-text-meta font-medium -mt-1 hidden sm:block">
              The Tamil Nadu Discovery Archive
            </span>
          </a>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          
          {/* Search Trigger Button */}
          <button
            onClick={onOpenSearchModal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-sand/60 hover:bg-bg-sand border border-border-subtle text-xs text-text-body transition-colors"
            title="Search the Tamil Nadu archive"
          >
            <Search size={14} className="text-brand-terracotta" />
            <span className="hidden md:inline font-medium text-text-meta">Search archive...</span>
          </button>

          {/* District Pill for Mobile only */}
          <button
            onClick={onOpenDistrictSheet}
            className="sm:hidden flex items-center gap-1 px-2.5 py-1.5 bg-bg-card rounded-full border border-border-subtle text-xs font-semibold text-text-heading shadow-banner"
          >
            <MapPin size={12} className="text-brand-terracotta" />
            <span className="max-w-[70px] truncate">{selectedDistrict ? (lang === 'ta' ? selectedDistrict.nameTa : selectedDistrict.name) : 'Nellai'}</span>
          </button>

          {/* Merchant / Business Action Button */}
          <button
            onClick={onOpenBusiness}
            className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full border border-brand-terracotta/40 bg-brand-terracotta/5 hover:bg-brand-terracotta/10 text-brand-terracotta text-xs font-semibold tracking-wide transition-colors"
          >
            <ShieldCheck size={14} />
            <span>Merchant Ledger</span>
          </button>

          {/* Login Button */}
          <button
            onClick={onOpenLoginModal}
            className="px-4 sm:px-5 py-2 rounded-full bg-brand-terracotta hover:bg-brand-terracotta-dark text-white text-xs font-semibold tracking-wide shadow-button hover:shadow-button-hover transition-all duration-200"
          >
            {lang === 'ta' ? 'உள்நுழைவு' : 'Sign In'}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border-subtle bg-bg-primary px-6 py-5 shadow-xl animate-fade-in">
          <div className="flex flex-col gap-4">
            
            {/* Language toggle for mobile */}
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <span className="text-xs font-medium text-text-meta uppercase tracking-wider">Edition Language</span>
              <div className="flex items-center bg-bg-sand p-1 rounded-full border border-border-subtle text-xs font-semibold">
                <button
                  onClick={() => onToggleLang('ta')}
                  className={`px-3 py-1 rounded-full ${lang === 'ta' ? 'bg-bg-card text-brand-terracotta shadow-sm font-tamil' : 'text-text-meta'}`}
                >
                  தமிழ்
                </button>
                <button
                  onClick={() => onToggleLang('en')}
                  className={`px-3 py-1 rounded-full ${lang === 'en' ? 'bg-bg-card text-brand-terracotta shadow-sm' : 'text-text-meta'}`}
                >
                  English
                </button>
              </div>
            </div>

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenDistrictSheet(); }}
              className="flex items-center justify-between py-2 text-sm font-medium text-text-heading text-left"
            >
              <span className="flex items-center gap-2.5">
                <MapPin size={16} className="text-brand-terracotta" />
                Select District / மாவட்டம் மாற்றுக
              </span>
              <span className="text-xs text-brand-forest font-semibold">{selectedDistrict?.name || 'Tirunelveli'}</span>
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenSearchModal(); }}
              className="flex items-center gap-2.5 py-2 text-sm font-medium text-text-heading text-left"
            >
              <Search size={16} className="text-brand-terracotta" />
              Search Full Archive
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBusiness(); }}
              className="flex items-center gap-2.5 py-2 text-sm font-medium text-text-heading text-left"
            >
              <ShieldCheck size={16} className="text-brand-terracotta" />
              The Merchant Ledger & Claims
            </button>

            <div className="pt-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenLoginModal(); }}
                className="w-full py-2.5 rounded-full bg-brand-terracotta text-white text-sm font-semibold shadow-button text-center"
              >
                {lang === 'ta' ? 'உள்நுழைவு / பதிவு' : 'Sign In to Vote'}
              </button>
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
