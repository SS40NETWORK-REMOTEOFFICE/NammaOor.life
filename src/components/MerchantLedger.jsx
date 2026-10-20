import React, { useState } from 'react';
import { Eye, MessageSquare, PhoneCall, Compass, Check, X, ShieldCheck, ArrowRight, Building2 } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function MerchantLedger({ lang = 'en' }) {
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [claimSubmitted, setClaimSubmitted] = useState(false);
  const t = TRANSLATIONS[lang];

  const stats = [
    { icon: <Eye size={22} className="text-brand-terracotta" />, value: '1,240', label: t.statViews },
    { icon: <MessageSquare size={22} className="text-brand-terracotta" />, value: '47', label: t.statLeads },
    { icon: <PhoneCall size={22} className="text-brand-terracotta" />, value: '31', label: t.statCalls },
    { icon: <Compass size={22} className="text-brand-terracotta" />, value: '89', label: t.statVisits },
  ];

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    if (businessName && ownerPhone) {
      setClaimSubmitted(true);
    }
  };

  return (
    <section id="merchant-ledger" className="w-full bg-bg-card py-16 sm:py-24 border-b border-border-subtle">
      <div className="max-w-[1000px] mx-auto px-5 sm:px-8 text-center flex flex-col items-center">
        
        {/* Header */}
        <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-terracotta mb-2 font-heading">
          Chapter 04 · The Sovereign Ledger
        </span>
        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-text-heading font-bold tracking-tight mb-3">
          {t.businessTitle}
        </h2>
        <p className="font-body text-xs sm:text-base text-text-body max-w-xl mb-12 leading-relaxed">
          {t.businessSubtitle}
        </p>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mb-8">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-bg-primary rounded-2xl p-6 border border-border-subtle flex flex-col items-center text-center shadow-banner transition-transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-bg-sand flex items-center justify-center mb-3">
                {s.icon}
              </div>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-text-heading">
                {s.value}
              </div>
              <div className="text-[11px] font-semibold text-text-meta uppercase tracking-wider mt-1.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Value Card */}
        <div className="w-full bg-brand-forest-light rounded-3xl p-8 sm:p-10 border border-brand-forest/20 flex flex-col items-center justify-center mb-10 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-forest mb-1 font-heading">
            Direct Tangible Merchant ROI
          </span>
          <div className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl text-brand-forest tracking-tight my-1">
            {t.businessValue}
          </div>
          <div className="font-body text-xs sm:text-sm text-text-body font-medium max-w-md">
            {t.businessValueLabel}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => { setClaimModalOpen(true); setClaimSubmitted(false); }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-terracotta hover:bg-brand-terracotta-dark text-white font-heading font-semibold text-sm sm:text-base shadow-button hover:shadow-button-hover transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            {t.claimListing}
          </button>

          <button
            onClick={() => setPricingModalOpen(true)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-transparent hover:bg-brand-terracotta/5 text-brand-terracotta border-2 border-brand-terracotta font-heading font-semibold text-sm sm:text-base transition-colors"
          >
            {t.seePricing}
          </button>
        </div>

      </div>

      {/* Claim Business Modal */}
      {claimModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-bg-card rounded-3xl max-w-md w-full p-7 sm:p-8 shadow-2xl border border-border-subtle relative">
            <button
              onClick={() => setClaimModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-text-meta hover:text-text-heading hover:bg-bg-sand transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-2 text-brand-terracotta font-semibold text-xs font-heading">
              <ShieldCheck size={16} />
              <span>Verified Merchant Ledger Registration</span>
            </div>

            <h3 className="font-editorial text-2xl text-text-heading font-bold mb-1">
              Claim Your Place on NammaOor
            </h3>
            <p className="text-xs text-text-meta mb-6 leading-relaxed">
              Join Tirunelveli’s unbuyable discovery platform. Never pay for reviews or algorithms.
            </p>

            {!claimSubmitted ? (
              <form onSubmit={handleClaimSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-text-heading mb-1.5">
                    Business / Place Name
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Nellai Ananda Bhavan Sweets"
                    className="w-full px-4 py-3 rounded-xl border border-border-subtle text-xs bg-bg-primary text-text-heading outline-none focus:border-brand-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-heading mb-1.5">
                    Owner Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl border border-border-subtle text-xs bg-bg-primary text-text-heading outline-none focus:border-brand-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-heading mb-1.5">
                    District
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border border-border-subtle text-xs bg-bg-primary text-text-heading outline-none focus:border-brand-terracotta">
                    <option>Tirunelveli (Live Hub)</option>
                    <option>Madurai</option>
                    <option>Coimbatore</option>
                    <option>Chennai</option>
                    <option>Other District</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-brand-terracotta text-white font-semibold text-xs tracking-wide shadow-button hover:bg-brand-terracotta-dark transition-colors"
                >
                  Verify Ownership Request →
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-brand-forest/10 text-brand-forest flex items-center justify-center mx-auto mb-3">
                  <Check size={24} />
                </div>
                <h4 className="font-heading font-bold text-lg text-text-heading mb-1">
                  Onboarding Request Received
                </h4>
                <p className="text-xs text-text-meta leading-relaxed mb-4">
                  Our district ambassador will visit in person within 24 hours to confirm physical location and activate your verified badge.
                </p>
                <button
                  onClick={() => setClaimModalOpen(false)}
                  className="w-full py-2.5 rounded-full bg-bg-sand text-text-heading font-semibold text-xs hover:bg-[#EAE2D4] transition-colors"
                >
                  Return to Journal
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pricing Modal */}
      {pricingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-bg-card rounded-3xl max-w-xl w-full p-7 sm:p-9 shadow-2xl border border-border-subtle relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setPricingModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-text-meta hover:text-text-heading hover:bg-bg-sand transition-colors"
            >
              <X size={18} />
            </button>

            <h3 className="font-editorial text-2xl text-text-heading font-bold mb-1">
              The Transparent Merchant Subscription
            </h3>
            <p className="text-xs text-text-meta mb-6 leading-relaxed">
              Votes can never be purchased. Subscriptions fund verification ambassadors and unlock direct customer WhatsApp inquiry buttons.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-6 rounded-2xl border border-border-subtle bg-bg-primary flex flex-col justify-between">
                <div>
                  <div className="font-heading font-bold text-base text-text-heading mb-1">
                    Standard Verification
                  </div>
                  <div className="text-2xl font-display font-bold text-text-heading mb-3">
                    ₹0 <span className="text-xs font-normal text-text-meta">/ forever</span>
                  </div>
                  <ul className="text-xs text-text-body space-y-2 mb-4">
                    <li className="flex items-center gap-1.5"><Check size={14} className="text-brand-forest" /> Verified local address</li>
                    <li className="flex items-center gap-1.5"><Check size={14} className="text-brand-forest" /> Community trust voting</li>
                    <li className="flex items-center gap-1.5"><Check size={14} className="text-brand-forest" /> Directory discovery</li>
                  </ul>
                </div>
                <button
                  onClick={() => setPricingModalOpen(false)}
                  className="w-full py-2.5 rounded-full border border-border-subtle text-xs font-semibold text-text-heading hover:bg-bg-sand transition-colors"
                >
                  Current Free Tier
                </button>
              </div>

              <div className="p-6 rounded-2xl border-2 border-brand-terracotta bg-white shadow-card flex flex-col justify-between relative">
                <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-brand-terracotta text-white text-[10px] font-bold uppercase tracking-wider">
                  Partner
                </span>
                <div>
                  <div className="font-heading font-bold text-base text-text-heading mb-1">
                    Oor Partner
                  </div>
                  <div className="text-2xl font-display font-bold text-brand-terracotta mb-3">
                    ₹899 <span className="text-xs font-normal text-text-meta">/ month</span>
                  </div>
                  <ul className="text-xs text-text-body space-y-2 mb-4">
                    <li className="flex items-center gap-1.5"><Check size={14} className="text-brand-forest" /> Direct WhatsApp ordering button</li>
                    <li className="flex items-center gap-1.5"><Check size={14} className="text-brand-forest" /> Weekly visitor analytics & ROI</li>
                    <li className="flex items-center gap-1.5"><Check size={14} className="text-brand-forest" /> 5 Verified photo gallery slots</li>
                  </ul>
                </div>
                <button
                  onClick={() => { setPricingModalOpen(false); setClaimModalOpen(true); }}
                  className="w-full py-2.5 rounded-full bg-brand-terracotta text-white text-xs font-semibold shadow-button hover:bg-brand-terracotta-dark transition-colors"
                >
                  Subscribe to Partner
                </button>
              </div>
            </div>

            <div className="text-[11px] text-text-meta text-center">
               Strict anti-pay-to-win policy: Subscriptions cannot alter community voter rank.
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
