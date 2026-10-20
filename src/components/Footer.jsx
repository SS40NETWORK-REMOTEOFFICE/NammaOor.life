import React from 'react';
import { TRANSLATIONS } from '../data/translations';
import { Mail } from 'lucide-react';

export default function Footer({
  lang = 'en',
  onToggleLang,
  onOpenDistrictSheet,
  onClaimListingClick
}) {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="w-full bg-bg-primary border-t border-border-subtle pt-16 pb-20 sm:pb-12 text-xs sm:text-sm">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 pb-12 border-b border-border-subtle">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-brand-terracotta flex items-center justify-center text-white font-heading font-bold text-sm">
                ந
              </span>
              <span className="font-heading font-extrabold text-xl text-text-heading tracking-tight">
                NammaOor<span className="text-brand-terracotta">.life</span>
              </span>
            </div>
            <p className="font-body text-text-body leading-relaxed max-w-xs">
              {t.brandTagline}
            </p>
            <div className="text-[11px] text-text-meta mt-1">
              Tamil Nadu's sovereign local discovery engine.
            </div>
          </div>

          {/* Column 2: Discover */}
          <div className="flex flex-col gap-3">
            <span className="font-heading font-semibold text-xs tracking-wider uppercase text-text-meta">
              {t.footerDiscover}
            </span>
            <ul className="space-y-2 text-text-body">
              <li>
                <button
                  onClick={onOpenDistrictSheet}
                  className="hover:text-brand-terracotta transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-forest" />
                  <span>Tirunelveli (Live)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDistrictSheet}
                  className="hover:text-brand-terracotta transition-colors"
                >
                  Madurai (Next)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDistrictSheet}
                  className="hover:text-brand-terracotta transition-colors"
                >
                  Coimbatore
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDistrictSheet}
                  className="hover:text-brand-terracotta transition-colors font-medium text-brand-terracotta"
                >
                  All 38 districts →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: For Business */}
          <div className="flex flex-col gap-3">
            <span className="font-heading font-semibold text-xs tracking-wider uppercase text-text-meta">
              {t.footerForBusiness}
            </span>
            <ul className="space-y-2 text-text-body">
              <li>
                <button
                  onClick={onClaimListingClick}
                  className="hover:text-brand-terracotta transition-colors text-left"
                >
                  Claim your listing
                </button>
              </li>
              <li>
                <a href="#pricing" onClick={onClaimListingClick} className="hover:text-brand-terracotta transition-colors">
                  Subscription pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-terracotta transition-colors">
                  ROI dashboard & leads
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-terracotta transition-colors">
                  Become a District Ambassador
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Ethics */}
          <div className="flex flex-col gap-3">
            <span className="font-heading font-semibold text-xs tracking-wider uppercase text-text-meta">
              {t.footerTrust}
            </span>
            <ul className="space-y-2 text-text-body">
              <li>
                <span className="inline-flex items-center gap-1 text-brand-forest font-medium">
                  Votes are never for sale
                </span>
              </li>
              <li>
                <a href="#" className="hover:text-brand-terracotta transition-colors">
                  Ad transparency code
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-terracotta transition-colors">
                  Named verifier verification
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-terracotta transition-colors">
                  Privacy policy & terms
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Language Toggle Pill */}
          <div className="flex items-center bg-bg-sand p-1 rounded-full border border-border-subtle text-xs font-semibold">
            <button
              onClick={() => onToggleLang('ta')}
              className={`px-3 py-1 rounded-full transition-all ${
                lang === 'ta'
                  ? 'bg-bg-card text-brand-terracotta shadow-sm font-tamil'
                  : 'text-text-meta hover:text-text-body'
              }`}
            >
              தமிழ் (த)
            </button>
            <button
              onClick={() => onToggleLang('en')}
              className={`px-3 py-1 rounded-full transition-all ${
                lang === 'en'
                  ? 'bg-bg-card text-brand-terracotta shadow-sm font-sans'
                  : 'text-text-meta hover:text-text-body'
              }`}
            >
              English
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-text-meta">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-bg-sand hover:text-brand-forest transition-colors"
              title="WhatsApp"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-bg-sand hover:text-brand-terracotta transition-colors"
              title="Instagram"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="mailto:vanakkam@nammaoor.life"
              className="p-2 rounded-full hover:bg-bg-sand hover:text-text-heading transition-colors"
              title="Email Us"
            >
              <Mail size={19} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-[11px] sm:text-xs text-text-meta flex items-center gap-1 text-center sm:text-right">
            <span>{t.footerCopyright}</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
