import React, { useState } from 'react';
import { Eye, MessageSquare, PhoneCall, Compass, Check, X, ShieldCheck, ArrowRight } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function BusinessSection({ lang = 'en' }) {
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [claimSubmitted, setClaimSubmitted] = useState(false);
  const t = TRANSLATIONS[lang];

  const stats = [
    { icon: <Eye size={24} className="text-brand-terracotta" />, value: '1,240', label: t.statViews },
    { icon: <MessageSquare size={24} className="text-brand-terracotta" />, value: '47', label: t.statLeads },
    { icon: <PhoneCall size={24} className="text-brand-terracotta" />, value: '31', label: t.statCalls },
    { icon: <Compass size={24} className="text-brand-terracotta" />, value: '89', label: t.statVisits },
  ];

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    if (businessName && ownerPhone) {
      setClaimSubmitted(true);
    }
  };

  return (
    <section className="w-full bg-bg-card py-16 sm:py-20 lg:py-24">
      <div className="max-w-[900px] mx-auto px-5 sm:px-8 text-center flex flex-col items-center">
        
        {/* Header */}
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-terracotta mb-2">
          For Business Owners / வணிகர்களுக்காக
        </span>
        <h2 className="font-heading font-semibold text-2xl sm:text-3xl lg:text-4xl text-text-heading tracking-tight mb-2">
          {t.businessTitle}
        </h2>
        <p className="font-body text-xs sm:text-base text-text-body max-w-xl mb-10">
          {t.businessSubtitle}
        </p>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mb-6">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-bg-primary rounded-2xl p-5 sm:p-6 border border-border-subtle flex flex-col items-center text-center shadow-banner transition-transform hover:-translate-y-0.5"
            >
              <div className="w-11 h-11 rounded-xl bg-bg-sand flex items-center justify-center mb-3">
                {s.icon}
              </div>
              <div className="font-display font-bold text-2xl sm:text-3xl text-text-heading">
                {s.value}
              </div>
              <div className="text-[11px] font-medium text-text-meta uppercase tracking-wider mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Value Card */}
        <div className="w-full bg-brand-forest/8 rounded-2xl p-6 sm:p-8 border border-brand-forest/15 flex flex-col items-center justify-center mb-8">
          <div className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-brand-forest tracking-tight">
            {t.businessValue}
          </div>
          <div className="font-body text-xs sm:text-sm text-text-body mt-2 font-medium">
            {t.businessValueLabel}
          </div>
        </div>

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => { setClaimModalOpen(true); setClaimSubmitted(false); }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-terracotta hover:bg-brand-terracotta-dark text-white font-heading font-semibold text-sm sm:text-base shadow-button hover:shadow-button-hover transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            {t.claimListing}
          </button>

          <button
            onClick={() => setPricingModalOpen(true)}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-transparent hover:bg-brand-terracotta/5 text-brand-terracotta border-2 border-brand-terracotta font-heading font-semibold text-sm sm:text-base transition-colors"
          >
            {t.seePricing}
          </button>
        </div>

      </div>

      {/* Claim Listing Modal */}
      {claimModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-bg-card rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-card-hover border border-border-subtle relative">
            <button
              onClick={() => setClaimModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-text-meta hover:text-text-heading hover:bg-bg-sand transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-2 text-brand-terracotta font-medium text-xs">
              <ShieldCheck size={16} />
              <span>Verified Merchant Onboarding</span>
            </div>

            <h3 className="font-heading font-bold text-2xl text-text-heading mb-1">
              Claim Your Business
            </h3>
            <p className="text-xs text-text-meta mb-5 leading-relaxed">
              Join Tirunelveli's trusted local directory. Organic discovery without paying for fake reviews.
            </p>

            {!claimSubmitted ? (
              <form onSubmit={handleClaimSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-text-heading mb-1">
                    Business / Place Name
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Nellai Ananda Bhavan Sweets"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle text-xs bg-bg-primary text-text-heading outline-none focus:border-brand-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-heading mb-1">
                    Owner Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle text-xs bg-bg-primary text-text-heading outline-none focus:border-brand-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-heading mb-1">
                    District
                  </label>
                  <select className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle text-xs bg-bg-primary text-text-heading outline-none focus:border-brand-terracotta">
                    <option>Tirunelveli (Live)</option>
                    <option>Madurai</option>
                    <option>Coimbatore</option>
                    <option>Chennai</option>
                    <option>Other district</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-brand-terracotta text-white font-semibold text-xs tracking-wide shadow-button hover:bg-brand-terracotta-dark transition-colors"
                >
                  Verify Ownership →
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-brand-forest/10 text-brand-forest flex items-center justify-center mx-auto mb-3">
                  <Check size={24} />
                </div>
                <h4 className="font-heading font-semibold text-lg text-text-heading mb-1">
                  Request Received
                </h4>
                <p className="text-xs text-text-meta leading-relaxed mb-4">
                  Our Tirunelveli district ambassador will contact you within 24 hours to verify location photos and activate your verified badge.
                </p>
                <button
                  onClick={() => setClaimModalOpen(false)}
                  className="w-full py-2.5 rounded-full bg-bg-sand text-text-heading font-semibold text-xs hover:bg-[#EAE2D4] transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pricing Modal */}
      {pricingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-bg-card rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-card-hover border border-border-subtle relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setPricingModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-text-meta hover:text-text-heading hover:bg-bg-sand transition-colors"
            >
              <X size={18} />
            </button>

            <h3 className="font-heading font-bold text-2xl text-text-heading mb-1">
              Transparent, Subscription Pricing
            </h3>
            <p className="text-xs text-text-meta mb-6">
              Votes are never for sale. Subscriptions unlock analytics, WhatsApp ordering links, and profile photos.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-5 rounded-2xl border border-border-subtle bg-bg-primary flex flex-col justify-between">
                <div>
                  <div className="font-heading font-bold text-lg text-text-heading mb-1">
                    Community Listing
                  </div>
                  <div className="text-2xl font-display font-bold text-text-heading mb-3">
                    ₹0 <span className="text-xs font-normal text-text-meta">/ forever</span>
                  </div>
                  <ul className="text-xs text-text-body space-y-2 mb-4">
                    <li className="flex items-center gap-1.5"><Check size={14} className="text-brand-forest" /> Verified local address</li>
                    <li className="flex items-center gap-1.5"><Check size={14} className="text-brand-forest" /> Community vote counting</li>
                    <li className="flex items-center gap-1.5"><Check size={14} className="text-brand-forest" /> Category discovery</li>
                  </ul>
                </div>
                <button
                  onClick={() => setPricingModalOpen(false)}
                  className="w-full py-2 rounded-full border border-border-subtle text-xs font-semibold text-text-heading hover:bg-bg-sand transition-colors"
                >
                  Standard Plan
                </button>
              </div>

              <div className="p-5 rounded-2xl border-2 border-brand-terracotta bg-white shadow-card flex flex-col justify-between relative">
                <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-brand-terracotta text-white text-[10px] font-bold uppercase tracking-wider">
                  Popular
                </span>
                <div>
                  <div className="font-heading font-bold text-lg text-text-heading mb-1">
                    Oor Partner
                  </div>
                  <div className="text-2xl font-display font-bold text-brand-terracotta mb-3">
                    ₹899 <span className="text-xs font-normal text-text-meta">/ month</span>
                  </div>
                  <ul className="text-xs text-text-body space-y-2 mb-4">
                    <li className="flex items-center gap-1.5"><Check size={14} className="text-brand-forest" /> Direct WhatsApp ordering button</li>
                    <li className="flex items-center gap-1.5"><Check size={14} className="text-brand-forest" /> Weekly visitor analytics & ROI</li>
                    <li className="flex items-center gap-1.5"><Check size={14} className="text-brand-forest" /> 5 Verified photo slots</li>
                    <li className="flex items-center gap-1.5"><Check size={14} className="text-brand-forest" /> District ambassador check-in</li>
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
               Strict anti-pay-to-win policy: Subscriptions never buy or alter voter rank.
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
