import React, { useState, useEffect } from 'react';
import { Map, Share2, Sparkles, Check, X, ArrowRight, RotateCcw } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function QuizSection({ lang = 'en' }) {
  const [activeDot, setActiveDot] = useState(2);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[lang];

  // Animated dots looping
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 5);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'NammaOor.life — Discover Authentic Tamil Nadu',
        text: 'Find authentic, unbuyable local spots across all 38 districts of Tamil Nadu.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSelectAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (quizStep < 3) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizStep(4); // Results state
    }
  };

  const resetQuiz = () => {
    setQuizStep(1);
    setAnswers({});
  };

  return (
    <section className="w-full bg-bg-primary py-16 sm:py-20 lg:py-24 border-b border-border-subtle">
      <div className="max-w-[600px] mx-auto px-5 text-center flex flex-col items-center">
        
        {/* Pulsing Map Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-brand-terracotta/10 flex items-center justify-center text-brand-terracotta mb-6 shadow-banner animate-pulse-subtle">
          <Map size={36} className="text-brand-terracotta" />
        </div>

        {/* 5 Dots Indicator filling one by one */}
        <div className="flex items-center gap-2.5 mb-6">
          {[0, 1, 2, 3, 4].map((idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx <= activeDot
                  ? 'bg-brand-terracotta scale-110 shadow-sm'
                  : 'bg-transparent border-2 border-border-subtle'
              }`}
            />
          ))}
        </div>

        {/* Headline */}
        <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-text-heading tracking-tight mb-3">
          {t.quizPrompt}
        </h2>
        <p className="text-xs sm:text-sm text-text-meta mb-8 max-w-[440px]">
          {lang === 'ta'
            ? '3 எளிய கேள்விகள் மூலம் உங்கள் சுவை மற்றும் பயண விருப்பத்திற்கு ஏற்ற இடத்தை தெரிந்து கொள்ளுங்கள்.'
            : 'Answer 3 quick questions to get matched with the exact authentic spot verified by locals.'}
        </p>

        {/* Primary Marigold Button */}
        <button
          onClick={() => { setIsQuizOpen(true); resetQuiz(); }}
          className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-brand-marigold hover:bg-brand-marigold-dark text-text-heading font-heading font-semibold text-sm sm:text-base shadow-button hover:shadow-button-hover transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
        >
          <span>{t.quizButton}</span>
        </button>

        {/* Share Icon below button */}
        <div className="mt-6 flex items-center justify-center">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs text-text-meta hover:text-text-heading transition-colors"
            title="Share with friends"
          >
            <Share2 size={16} />
            <span>{copied ? (lang === 'ta' ? 'இணைப்பு நகலெடுக்கப்பட்டது!' : 'Link copied!') : t.quizShared}</span>
          </button>
        </div>

      </div>

      {/* Interactive Quiz Modal */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-bg-card rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-card-hover border border-border-subtle relative text-left">
            <button
              onClick={() => setIsQuizOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-text-meta hover:text-text-heading hover:bg-bg-sand transition-colors"
            >
              <X size={18} />
            </button>

            {/* Quiz Progress */}
            {quizStep <= 3 && (
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-brand-terracotta">
                  Question {quizStep} of 3
                </span>
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((step) => (
                    <span
                      key={step}
                      className={`w-6 h-1.5 rounded-full ${
                        quizStep >= step ? 'bg-brand-terracotta' : 'bg-bg-sand'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Question 1 */}
            {quizStep === 1 && (
              <div>
                <h3 className="font-heading font-bold text-xl text-text-heading mb-4">
                  What authentic experience are you looking for?
                </h3>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: 'Molten Ghee Wheat Halwa in plantain leaf', icon: '', value: 'halwa' },
                    { label: 'Towering 7th-century Temple & Musical Pillars', icon: '', value: 'temple' },
                    { label: 'Crisp Flaky Parotta & Pepper Nattu Kozhi Salna', icon: '', value: 'parotta' },
                    { label: 'Refreshing Herbal Waterfalls in Western Ghats', icon: '', value: 'falls' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectAnswer('experience', opt.value)}
                      className="w-full p-3.5 rounded-xl border border-border-subtle hover:border-brand-terracotta bg-bg-primary/50 hover:bg-bg-sand text-left flex items-center gap-3 transition-colors text-xs sm:text-sm font-medium text-text-heading"
                    >
                      <span className="text-xl">{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 2 */}
            {quizStep === 2 && (
              <div>
                <h3 className="font-heading font-bold text-xl text-text-heading mb-4">
                  Who are you traveling or eating with?
                </h3>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: 'Family & Elders looking for pure comfort', icon: '', value: 'family' },
                    { label: 'Close Friends on a local food quest', icon: '', value: 'friends' },
                    { label: 'Solo traveler seeking quiet culture & coffee', icon: '', value: 'solo' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectAnswer('companion', opt.value)}
                      className="w-full p-3.5 rounded-xl border border-border-subtle hover:border-brand-terracotta bg-bg-primary/50 hover:bg-bg-sand text-left flex items-center gap-3 transition-colors text-xs sm:text-sm font-medium text-text-heading"
                    >
                      <span className="text-xl">{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 3 */}
            {quizStep === 3 && (
              <div>
                <h3 className="font-heading font-bold text-xl text-text-heading mb-4">
                  Which district energy do you prefer?
                </h3>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: 'Tirunelveli — Historic riverbanks, halwa & Nellaiappar', icon: '', value: 'nellai' },
                    { label: 'Madurai & Delta — Temple towers & midnight bazaars', icon: '', value: 'madurai' },
                    { label: 'Western Ghats — Misty coffee estates & cascades', icon: '', value: 'ghats' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectAnswer('vibe', opt.value)}
                      className="w-full p-3.5 rounded-xl border border-border-subtle hover:border-brand-terracotta bg-bg-primary/50 hover:bg-bg-sand text-left flex items-center gap-3 transition-colors text-xs sm:text-sm font-medium text-text-heading"
                    >
                      <span className="text-xl">{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results Step */}
            {quizStep === 4 && (
              <div className="text-center py-2 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-brand-forest/10 text-brand-forest flex items-center justify-center mx-auto mb-3">
                  <Sparkles size={24} />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-forest">
                  100% Match Found
                </span>
                <h3 className="font-heading font-bold text-2xl text-text-heading mt-1 mb-2">
                  Iruttu Kadai Halwa & Nellaiappar Temple
                </h3>
                <p className="text-xs text-text-meta mb-4">
                  Tirunelveli, Tamil Nadu · Verified by Ramesh (Resident since 1995)
                </p>

                <div className="p-4 rounded-xl bg-bg-sand/70 border border-border-subtle text-left mb-5">
                  <div className="text-xs text-text-body leading-relaxed">
                    Based on your cravings, you belong at the East Car Street firewood hearth at 5:00 PM. Experience the warm aroma of pure Thamirabarani halwa followed by the evening lamp aarti at Nellaiappar.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsQuizOpen(false)}
                    className="flex-1 py-3 rounded-full bg-brand-terracotta text-white font-semibold text-xs tracking-wide shadow-button hover:bg-brand-terracotta-dark transition-colors"
                  >
                    View Place Details
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="p-3 rounded-full border border-border-subtle text-text-meta hover:text-text-heading transition-colors"
                    title="Retake Quiz"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
}
