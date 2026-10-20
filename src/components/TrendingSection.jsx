import React, { useState } from 'react';
import { ThumbsUp, MapPin, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TRENDING_PLACES } from '../data/trendingPlaces';
import { TRANSLATIONS } from '../data/translations';

export default function TrendingSection({ lang = 'en', onPlaceClick }) {
  const [places, setPlaces] = useState(TRENDING_PLACES);
  const [votedMap, setVotedMap] = useState({});
  const t = TRANSLATIONS[lang];

  const handleVote = (e, placeId) => {
    e.stopPropagation();
    if (votedMap[placeId]) return;

    setVotedMap((prev) => ({ ...prev, [placeId]: true }));
    setPlaces((prev) =>
      prev.map((p) => {
        if (p.id === placeId) {
          return {
            ...p,
            votes: p.votes + 1,
            localVotes: p.localVotes + 1,
            voteRatio: Math.min(100, p.voteRatio + 1)
          };
        }
        return p;
      })
    );
  };

  return (
    <section className="w-full bg-bg-card py-16 sm:py-20 lg:py-24 border-t border-b border-border-subtle">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl"></span>
              <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-text-heading tracking-tight">
                {t.trendingTitle}
              </h2>
            </div>
            <p className="font-body text-xs sm:text-sm text-text-meta">
              {t.trendingSubtitle}
            </p>
          </div>

          <a
            href="#explore"
            className="inline-flex items-center gap-1 font-body font-medium text-xs sm:text-sm text-brand-terracotta hover:underline shrink-0 group"
          >
            <span>{t.seeAll}</span>
          </a>
        </div>

        {/* Card Grid / Mobile Horizontal Scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto no-scrollbar sm:overflow-visible pb-4 sm:pb-0 -mx-5 px-5 sm:mx-0 sm:px-0">
          {places.map((place) => {
            const hasVoted = !!votedMap[place.id];

            return (
              <div
                key={place.id}
                onClick={() => onPlaceClick && onPlaceClick(place)}
                className="group flex flex-col bg-bg-card rounded-2xl shadow-card hover:shadow-card-hover border border-border-subtle/80 overflow-hidden cursor-pointer transition-all duration-250 ease-apple-ease hover:-translate-y-1 min-w-[270px] sm:min-w-0"
              >
                {/* 16:9 Image Container */}
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-bg-sand">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                  
                  {/* Badges row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {place.verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-brand-forest/10 text-brand-forest text-[11px] font-medium tracking-wide">
                        <CheckCircle2 size={12} className="text-brand-forest" />
                        {t.verifiedBadge}
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-bg-sand text-text-body text-[11px] font-medium">
                      <MapPin size={11} className="text-text-meta" />
                      {lang === 'ta' ? place.districtTa : place.district}
                    </span>
                  </div>

                  {/* Title & Category Meta */}
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-text-heading group-hover:text-brand-terracotta transition-colors line-clamp-1">
                      {lang === 'ta' ? place.nameTa : place.name}
                    </h3>
                    <p className="text-xs text-text-meta mt-1">
                      {place.categoryIcon} {lang === 'ta' ? place.categoryTa : place.category} · {place.price} · {place.distance}
                    </p>
                  </div>

                  {/* Vote bar and interactive thumbs-up button */}
                  <div className="pt-2 border-t border-border-subtle/70 mt-auto">
                    <div className="flex items-center justify-between text-xs text-text-body mb-2 font-medium">
                      <button
                        onClick={(e) => handleVote(e, place.id)}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all duration-200 ${
                          hasVoted
                            ? 'bg-brand-forest/15 text-brand-forest font-semibold'
                            : 'hover:bg-bg-sand text-text-body hover:text-brand-terracotta'
                        }`}
                        title="Cast local vote"
                      >
                        <ThumbsUp
                          size={14}
                          className={`transition-transform duration-300 ${hasVoted ? 'scale-125 text-brand-forest fill-brand-forest' : 'group-hover:scale-110'}`}
                        />
                        <span>{place.votes}</span>
                      </button>

                      <span className="text-[11px] text-text-meta">
                        {place.localVotes} {t.votesText}
                      </span>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="w-full h-1.5 bg-bg-sand rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-forest/80 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${place.voteRatio}%` }}
                      />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
