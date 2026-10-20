import React, { useState } from 'react';
import { X, MapPin, ThumbsUp, CheckCircle2, MessageCircle, Navigation, Share2, Award, Clock } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function PlaceDetailModal({ place, onClose, lang = 'en' }) {
  const [voted, setVoted] = useState(false);
  const [localVotes, setLocalVotes] = useState(place ? place.localVotes : 0);
  const [totalVotes, setTotalVotes] = useState(place ? place.votes : 0);
  const t = TRANSLATIONS[lang];

  if (!place) return null;

  const handleVote = () => {
    if (!voted) {
      setVoted(true);
      setLocalVotes(localVotes + 1);
      setTotalVotes(totalVotes + 1);
    }
  };

  const sharePlace = () => {
    if (navigator.share) {
      navigator.share({
        title: `${place.name} on NammaOor.life`,
        text: `Check out ${place.name} in ${place.district} — verified by local residents.`,
        url: window.location.href,
      }).catch(() => {});
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in text-left">
      <div className="bg-bg-card rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-border-subtle relative max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-text-heading shadow-md transition-colors"
        >
          <X size={18} />
        </button>

        {/* Top 16:9 Photo */}
        <div className="relative w-full aspect-[16/9] bg-bg-sand overflow-hidden shrink-0">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-medium">
              <MapPin size={13} className="text-brand-terracotta" />
              {place.district} · {place.distance}
            </span>
            <span className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full font-medium">
              {place.price}
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-forest/10 text-brand-forest text-xs font-semibold">
                <CheckCircle2 size={13} />
                {t.verifiedBadge}
              </span>
              <span className="text-xs text-text-meta">
                {place.category}
              </span>
            </div>

            <h3 className="font-heading font-bold text-2xl text-text-heading">
              {lang === 'ta' ? place.nameTa : place.name}
            </h3>

            <p className="text-xs text-text-body mt-1 leading-relaxed">
              {place.tagline}
            </p>
          </div>

          {/* Trust Weighted Votes */}
          <div className="p-4 rounded-xl bg-bg-sand/70 border border-border-subtle">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-text-heading">
                Community Trust Ratio
              </span>
              <span className="text-brand-forest font-bold">
                {place.voteRatio}% Verified Resident Confidence
              </span>
            </div>
            
            <div className="w-full h-2 bg-white rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-brand-forest rounded-full transition-all duration-500"
                style={{ width: `${place.voteRatio}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-text-meta">
              <span className="inline-flex items-center gap-1.5"><ThumbsUp size={12} className="text-brand-forest" /> {totalVotes} total verified votes</span>
              <span>{localVotes} votes from long-time residents</span>
            </div>
          </div>

          {/* Verifier Note */}
          <div className="border-l-2 border-brand-terracotta pl-3.5 py-1">
            <div className="text-xs font-semibold text-text-heading mb-0.5">
              Local Verifier Assurance
            </div>
            <div className="text-xs text-text-body leading-relaxed italic">
              "Tested anonymously. No sponsorship or free sample accepted. This place strictly adheres to authentic taste and fair pricing."
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleVote}
              className={`flex-1 w-full py-3 rounded-full flex items-center justify-center gap-2 text-xs font-semibold tracking-wide transition-all ${
                voted
                  ? 'bg-brand-forest text-white'
                  : 'bg-brand-terracotta text-white hover:bg-brand-terracotta-dark shadow-button'
              }`}
            >
              <ThumbsUp size={15} className={voted ? 'fill-white' : ''} />
              <span>{voted ? 'Vote Recorded!' : 'Cast Local Vote'}</span>
            </button>

            <a
              href={`https://wa.me/?text=Check%20out%20${encodeURIComponent(place.name)}%20on%20NammaOor`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-3 rounded-full border border-border-subtle bg-bg-sand hover:bg-[#EAE2D4] text-xs font-semibold text-text-heading flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageCircle size={15} className="text-brand-forest" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={sharePlace}
              className="p-3 rounded-full border border-border-subtle hover:bg-bg-sand text-text-meta hover:text-text-heading transition-colors"
              title="Share"
            >
              <Share2 size={16} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
