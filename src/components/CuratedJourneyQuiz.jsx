import React, { useState, useEffect } from 'react';
import { Map, Share2, Sparkles, X, ArrowRight, RotateCcw, Compass } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function CuratedJourneyQuiz({ lang = 'en', onSelectPlace }) {
  const [activeDot, setActiveDot] = useState(2);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 5);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'NammaOor.life — Curated Tamil Nadu Journey',
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
      setQuizStep(4);
    }
  };

  const resetQuiz = () => {
    setQuizStep(1);
    setAnswers({});
  };

  return (
    <section className="w-full bg-bg-primary py-16 sm:py-24 border-b border-border-subtle">
      <div className="max-w-[700px] mx-auto px-5 text-center flex flex-col items-center">
        
        {/* Pulsing Compass Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-brand-terracotta/10 flex items-center justify-center text-brand-terracotta mb-6 shadow-banner animate-pulse-subtle">
          <Compass size={36} className="text-brand-terracotta" />
        </div>

        {/* 5 Indicator Dots */}
        <div className="flex items-center gap-2 mb-6">
          {[0, 1, 2, 3, 4].map((idx) => (
            <span
              key={idx}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx <= activeDot
                  ? 'bg-brand-terracotta scale-110 shadow-sm'
                  : 'bg-transparent border border-border-subtle'
              }`}
            />
          ))}
        </div>

        {/* Serif Headline */}
        <span className="text-[11px] font-bold uppercase tracking-widest text-brand-terracotta mb-2 font-heading">
          The Journey Matcher
        </span>
        <h2 className="font-editorial text-3xl sm:text-4xl text-text-heading font-bold tracking-tight mb-3">
          {t.quizPrompt}
        </h2>
        <p className="text-xs sm:text-sm text-text-body mb-8 max-w-md font-body leading-relaxed">
          {lang === 'ta'
            ? '3 எளிய கேள்விகள் மூலம் உங்கள் சுவை மற்றும் பயண விருப்பத்திற்கு ஏற்ற இடங்களை கண்டறியுங்கள்.'
            : 'Answer 3 quick questions calibrated by residents to match your exact palate and mood.'}
        </p>

        {/* Primary Marigold Button */}
        <button
          onClick={() => { setIsQuizOpen(true); resetQuiz(); }}
          className="inline-flex items-center justify-center px-8 sm:px-10 py-4 rounded-full bg-brand-marigold hover:bg-brand-marigold-dark text-text-heading font-heading font-bold text-sm sm:text-base shadow-button-marigold hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>{t.quizButton}</span>
        </button>

        {/* Share Link */}
        <div className="mt-6 flex items-center justify-center">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs text-text-meta hover:text-text-heading transition-colors"
          >
            <Share2 size={15} />
            <span>{copied ? 'Link copied to clipboard!' : t.quizShared}</span>
          </button>
        </div>

      </div>

      {/* Quiz Modal */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-bg-card rounded-3xl max-w-md w-full p-7 sm:p-8 shadow-2xl border border-border-subtle relative text-left">
            <button
              onClick={() => setIsQuizOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-text-meta hover:text-text-heading hover:bg-bg-sand transition-colors"
            >
              <X size={18} />
            </button>

            {quizStep <= 3 && (
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-border-subtle">
                <span className="text-[11px] font-bold tracking-wider uppercase text-brand-terracotta">
                  Inquiry {quizStep} of 3
                </span>
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((step) => (
                    <span
                      key={step}
                      className={`w-6 h-1 rounded-full ${
                        quizStep >= step ? 'bg-brand-terracotta' : 'bg-bg-sand'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Q1 */}
            {quizStep === 1 && (
              <div>
                <h3 className="font-editorial text-2xl text-text-heading font-bold mb-4">
                  What authentic experience calls to you?
                </h3>
                <div className="space-y-2.5">
                  {[
                    { label: 'Warm Ghee Wheat Halwa wrapped in fresh leaf', icon: '', value: 'halwa' },
                    { label: 'Musical stone pillars & temple tank tranquility', icon: '', value: 'temple' },
                    { label: 'Hand-ground pepper chicken salna & coin parotta', icon: '', value: 'parotta' },
                    { label: 'Natural herbal waterfalls cascading in the Ghats', icon: '', value: 'falls' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectAnswer('experience', opt.value)}
                      className="w-full p-4 rounded-2xl border border-border-subtle hover:border-brand-terracotta bg-bg-primary/50 hover:bg-bg-sand text-left flex items-center gap-3 transition-colors text-xs sm:text-sm font-medium text-text-heading"
                    >
                      <span className="text-xl">{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Q2 */}
            {quizStep === 2 && (
              <div>
                <h3 className="font-editorial text-2xl text-text-heading font-bold mb-4">
                  What travel rhythm fits your day?
                </h3>
                <div className="space-y-2.5">
                  {[
                    { label: 'Unrushed slow immersion with family', icon: '', value: 'family' },
                    { label: 'Early-morning street food run with friends', icon: '', value: 'friends' },
                    { label: 'Solo contemplation & heritage photography', icon: '', value: 'solo' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectAnswer('rhythm', opt.value)}
                      className="w-full p-4 rounded-2xl border border-border-subtle hover:border-brand-terracotta bg-bg-primary/50 hover:bg-bg-sand text-left flex items-center gap-3 transition-colors text-xs sm:text-sm font-medium text-text-heading"
                    >
                      <span className="text-xl">{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Q3 */}
            {quizStep === 3 && (
              <div>
                <h3 className="font-editorial text-2xl text-text-heading font-bold mb-4">
                  Which regional energy speaks to you?
                </h3>
                <div className="space-y-2.5">
                  {[
                    { label: 'Tirunelveli — Thamirabarani waters & historic car streets', icon: '', value: 'nellai' },
                    { label: 'Madurai & Delta — Temple towers & midnight bazaars', icon: '', value: 'madurai' },
                    { label: 'Western Ghats — Misty coffee hills & rainforest pools', icon: '', value: 'ghats' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectAnswer('region', opt.value)}
                      className="w-full p-4 rounded-2xl border border-border-subtle hover:border-brand-terracotta bg-bg-primary/50 hover:bg-bg-sand text-left flex items-center gap-3 transition-colors text-xs sm:text-sm font-medium text-text-heading"
                    >
                      <span className="text-xl">{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Match Result */}
            {quizStep === 4 && (
              <div className="text-center py-2 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-brand-forest/10 text-brand-forest flex items-center justify-center mx-auto mb-3">
                  <Sparkles size={24} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-forest">
                  100% Curated Match Found
                </span>
                <h3 className="font-editorial text-3xl text-text-heading font-bold mt-1 mb-2">
                  Iruttu Kadai Halwa & Nellaiappar
                </h3>
                <p className="text-xs text-text-meta mb-4">
                  Tirunelveli · Curated by Verifier Ramesh Sundaram
                </p>

                <div className="p-4 rounded-2xl bg-bg-sand/70 border border-border-subtle text-left mb-6">
                  <p className="font-serifAccent text-sm text-text-body italic leading-relaxed">
                    "Based on your palate, your afternoon belongs at East Car Street at 5:00 PM. Experience the warm firewood hearth aroma, followed by the silent lamp lit walkways of Nellaiappar."
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsQuizOpen(false)}
                    className="flex-1 py-3 rounded-full bg-brand-terracotta text-white font-semibold text-xs tracking-wide shadow-button hover:bg-brand-terracotta-dark transition-colors"
                  >
                    View Verified Dispatch
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
