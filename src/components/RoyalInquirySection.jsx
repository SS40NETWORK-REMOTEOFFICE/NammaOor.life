import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function RoyalInquirySection({ lang = 'en' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    role: 'Traveler',
    district: 'Tirunelveli',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setSubmitted(true);
    }
  };

  return (
    <section id="inquiry" className="relative w-full min-h-[640px] py-24 sm:py-32 flex items-center justify-center overflow-hidden">
      
      {/* Background Image: Illuminated Tamil Nadu Palace & Temple Tank at Dusk */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/tamilnadu_palace_dusk.jpg"
          alt="Tamil Nadu Heritage Palace"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/85" />
      </div>

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-14 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (6 cols): Inquiry Copy */}
          <div className="lg:col-span-6 text-left text-white">
            <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-brand-gold font-bold block mb-3">
              JOIN THE SOVEREIGN COMMUNITY
            </span>

            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
              Ready to Explore <br />
              <span className="text-gold-gradient">Tamil Nadu?</span>
            </h2>

            <p className="font-serif text-base sm:text-lg text-white/85 leading-relaxed max-w-lg mb-8">
              Whether you are a traveler looking for untouristed gems, a lifelong resident proud of your town, or a merchant wanting to claim your verified presence — tell us where your journey begins.
            </p>

            <div className="flex items-center gap-6 text-xs font-cinzel tracking-wider text-brand-gold-light uppercase">
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-brand-gold" />
                <span>Zero Spam</span>
              </span>
              <span>·</span>
              <span>Direct WhatsApp Dispatch</span>
              <span>·</span>
              <span>Verified Ambassador Support</span>
            </div>
          </div>

          {/* Right Column (6 cols): Dark Translucent Glass Form Card (matching reference!) */}
          <div className="lg:col-span-6">
            <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-3xl p-7 sm:p-9 shadow-dark text-left">
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm outline-none focus:border-brand-gold transition-colors font-body"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="WhatsApp / Phone Number"
                      className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm outline-none focus:border-brand-gold transition-colors font-body"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-bg-midnight/90 border border-white/20 text-white text-xs outline-none focus:border-brand-gold font-body"
                    >
                      <option value="Traveler">I am a: Traveler / Explorer</option>
                      <option value="Resident">I am a: Local Resident</option>
                      <option value="Merchant">I am a: Local Business Owner</option>
                    </select>

                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-bg-midnight/90 border border-white/20 text-white text-xs outline-none focus:border-brand-gold font-body"
                    >
                      <option value="Tirunelveli">Tirunelveli (Live Hub)</option>
                      <option value="Madurai">Madurai</option>
                      <option value="Tenkasi">Tenkasi</option>
                      <option value="Thanjavur">Thanjavur</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Other">Other District...</option>
                    </select>
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about places you love, want verified, or need recommendations for..."
                      className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm outline-none focus:border-brand-gold transition-colors font-body resize-none"
                    />
                  </div>

                  {/* Golden Gradient Action Button (matching reference) */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full btn-gold font-cinzel text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Send Inquiry / Connect With NammaOor.life</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-brand-forest/20 text-brand-gold flex items-center justify-center mx-auto mb-4 border border-brand-gold/40">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="font-cinzel text-2xl font-bold text-white mb-2">
                    Vanakkam, {formData.name}!
                  </h3>
                  <p className="font-serif text-base text-white/80 max-w-sm mx-auto mb-6">
                    Your inquiry has been recorded in the Tirunelveli district dispatch queue. Our local ambassador will WhatsApp you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full border border-white/30 text-xs font-cinzel tracking-wider text-white hover:bg-white/10 transition-colors uppercase"
                  >
                    Send Another Note
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
