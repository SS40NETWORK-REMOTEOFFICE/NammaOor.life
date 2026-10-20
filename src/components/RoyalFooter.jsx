import React from 'react';
import { TRANSLATIONS } from '../data/translations';
import { Mail, ShieldCheck } from 'lucide-react';

export default function RoyalFooter({
  lang = 'en',
  onToggleLang,
  onOpenDistrictSheet
}) {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="w-full bg-[#050B14] text-white border-t border-white/10 pt-16 pb-20 sm:pb-12 text-xs">
      <div className="max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-14">
        
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-12 border-b border-white/10 gap-8">
          
          {/* Logo on Left */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-brand-gold/60 bg-white/5 flex items-center justify-center text-brand-gold font-cinzel text-xl font-bold shadow-gold">
              ந
            </div>
            <div className="flex flex-col text-left">
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.2em] text-white">
                NammaOor<span className="text-gold-gradient font-sans font-bold text-base">.life</span>
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-brand-gold-light -mt-1 font-medium">
                SOVEREIGN ARCHIVE BEYOND ORDINARY
              </span>
            </div>
          </div>

          {/* Center Links (matching reference) */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 font-cinzel text-xs tracking-widest uppercase text-white/70">
            <a href="#about" className="hover:text-brand-gold transition-colors">About</a>
            <a href="#districts" className="hover:text-brand-gold transition-colors">The 38 Districts</a>
            <a href="#charter" className="hover:text-brand-gold transition-colors">Sovereign Code</a>
            <a href="#inquiry" className="hover:text-brand-gold transition-colors">Merchant Ledger</a>
            <button onClick={onOpenDistrictSheet} className="hover:text-brand-gold transition-colors">District Atlas</button>
          </div>

          {/* Right Slogan */}
          <div className="text-left lg:text-right">
            <span className="font-cinzel text-xs tracking-[0.2em] uppercase text-brand-gold-light block font-semibold">
              Live Deeper · Know Your Oor
            </span>
            <span className="text-[10px] text-white/50 tracking-wider">
              Made in Tamil Nadu, for Tamil Nadu.
            </span>
          </div>

        </div>

        {/* Bottom Metadata & Social Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Language Toggle Pill */}
          <div className="flex items-center bg-white/10 px-2 py-1 rounded-full border border-white/20 text-xs font-semibold">
            <button
              onClick={() => onToggleLang('ta')}
              className={`px-3 py-1 rounded-full transition-all ${
                lang === 'ta'
                  ? 'btn-gold font-tamil font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              தமிழ் (த)
            </button>
            <button
              onClick={() => onToggleLang('en')}
              className={`px-3 py-1 rounded-full transition-all ${
                lang === 'en'
                  ? 'btn-gold font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              English
            </button>
          </div>

          {/* Social Icons (matching reference) */}
          <div className="flex items-center gap-4 text-white/60">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 hover:text-brand-gold transition-colors"
              title="WhatsApp"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 hover:text-brand-gold transition-colors"
              title="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="mailto:vanakkam@nammaoor.life"
              className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors"
              title="Email Us"
            >
              <Mail size={16} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-[11px] text-white/40">
            © 2026 NammaOor.life · All rights reserved.
          </div>

        </div>

      </div>
    </footer>
  );
}
