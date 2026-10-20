import React from 'react';
import { UserCheck, Award, MapPin, Sparkles, UtensilsCrossed, Shield, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function SovereignPillars({ lang = 'en' }) {
  const t = TRANSLATIONS[lang];

  const pillars = [
    {
      icon: <UserCheck size={26} className="text-brand-gold" />,
      title: 'Named Verifiers',
      subtitle: '15+ Years Resident Vetting',
      description: 'Vetted residents who sign strict zero-commercial affidavits to protect local authenticity.'
    },
    {
      icon: <Award size={26} className="text-brand-gold" />,
      title: 'Unbuyable Votes',
      subtitle: 'Pure Community Trust',
      description: 'Zero sponsored search results. Rankings are mathematically anchored to verified local confidence.'
    },
    {
      icon: <MapPin size={26} className="text-brand-gold" />,
      title: '38 District Hubs',
      subtitle: 'Sovereign Regional Pride',
      description: 'Dedicated ambassador networks covering every district from Chennai to Kanniyakumari.'
    },
    {
      icon: <UtensilsCrossed size={26} className="text-brand-gold" />,
      title: 'Authentic Heritage',
      subtitle: 'Living Culinary & Sacred Traditions',
      description: 'Preserving firewood hearths, copper cauldrons, stone carving, and century-old recipes.'
    }
  ];

  return (
    <section id="charter" className="relative w-full bg-bg-primary py-24 sm:py-32 border-b border-border-subtle overflow-hidden">
      
      {/* Background Architectural sketch watermark on the right */}
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-80 h-80 opacity-[0.035] pointer-events-none">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <polygon points="50,10 90,90 10,90" stroke="currentColor" strokeWidth="1" fill="none" />
          <polygon points="50,25 80,85 20,85" stroke="currentColor" strokeWidth="1" fill="none" />
          <polygon points="50,40 70,80 30,80" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-14">
        
        {/* Header Block with split title & statement */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-8 border-b border-border-subtle gap-6">
          <div className="text-left">
            <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-brand-gold font-bold block mb-2">
              DISCOVERY STANDARDS
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight text-text-heading">
              WHAT DEFINES <br />
              <span className="text-brand-terracotta">NammaOor<span className="text-brand-gold text-2xl sm:text-4xl">.life</span></span>
            </h2>
          </div>

          <div className="text-left lg:text-right max-w-md">
            <p className="font-cinzel text-xs tracking-[0.2em] uppercase text-text-heading font-semibold leading-relaxed">
              EVERY RECOMMENDATION CURATED ANONYMOUSLY BY LOCALS. SO YOU CAN DISCOVER THE REAL TAMIL NADU.
            </p>
          </div>
        </div>

        {/* 4 White Elevated Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="card-elevated rounded-2xl p-7 sm:p-8 flex flex-col justify-between text-left group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-bg-sand flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-gold/15 transition-all duration-300">
                  {p.icon}
                </div>

                <h3 className="font-cinzel text-lg font-bold text-text-heading mb-1 group-hover:text-brand-gold-dark transition-colors duration-200">
                  {p.title}
                </h3>

                <p className="font-cinzel text-[10px] tracking-wider uppercase text-brand-gold font-bold mb-3">
                  {p.subtitle}
                </p>

                <p className="font-serif text-sm text-text-body leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-border-subtle flex items-center justify-between">
                <span className="text-[10px] font-mono text-text-meta uppercase tracking-wider">Charter Standard</span>
                <div className="flex items-center gap-1.5 text-brand-gold text-xs font-semibold tracking-wider font-cinzel">
                  <CheckCircle2 size={13} />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Script Accent on bottom right */}
        <div className="flex justify-end mt-10">
          <span className="font-script text-3xl sm:text-4xl text-brand-gold font-normal transform -rotate-1">
            Good People, Honest Discoveries
          </span>
        </div>

      </div>
    </section>
  );
}
