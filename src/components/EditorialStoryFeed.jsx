import React, { useState } from 'react';
import { ThumbsUp, MapPin, Award, ArrowRight, CheckCircle2, Bookmark, Share2, Clock, Sparkles } from 'lucide-react';
import { TRENDING_PLACES } from '../data/trendingPlaces';
import { TRANSLATIONS } from '../data/translations';

export default function EditorialStoryFeed({
  lang = 'en',
  onSelectPlace
}) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [places, setPlaces] = useState(TRENDING_PLACES);
  const [votedMap, setVotedMap] = useState({});
  const t = TRANSLATIONS[lang];

  const filterTabs = [
    { id: 'all', label: 'All Dispatches', labelTa: 'அனைத்து பதிவுகள்' },
    { id: 'sweets', label: 'Molten Sweets & Feasts', labelTa: 'பாரம்பரிய சுவைகள்' },
    { id: 'temples', label: 'Ancient Sanctuaries', labelTa: 'திருக்கோயில்கள்' },
    { id: 'waterfalls', label: 'Cascades & Ghats', labelTa: 'அருவிகள் & மலைகள்' },
  ];

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

  const filteredPlaces = activeFilter === 'all'
    ? places
    : places.filter(p => p.category.toLowerCase().includes(activeFilter));

  const coverStory = places[0]; // Iruttu Kadai Halwa

  return (
    <section id="story-feed" className="w-full bg-bg-card py-16 sm:py-24 border-b border-border-subtle">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 pb-6 border-b border-border-subtle gap-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-brand-terracotta mb-2 font-heading">
              <span>Chapter 01</span>
              <span>·</span>
              <span>The Sovereign Discovery Feed</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-text-heading font-bold tracking-tight">
              {t.trendingTitle}
            </h2>
            <p className="font-body text-xs sm:text-sm text-text-meta mt-2 max-w-lg">
              {t.trendingSubtitle}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-semibold transition-all whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-brand-terracotta text-white shadow-button'
                    : 'bg-bg-sand/70 text-text-body hover:bg-bg-sand'
                }`}
              >
                {lang === 'ta' ? tab.labelTa : tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1. Large Cover Dispatch Story (The Magazine Lead Feature) */}
        {activeFilter === 'all' && (
          <div
            onClick={() => onSelectPlace(coverStory)}
            className="w-full bg-bg-primary rounded-3xl border border-border-subtle overflow-hidden mb-12 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Photo Side (7 cols) */}
              <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto overflow-hidden bg-bg-sand min-h-[300px]">
                <img
                  src={coverStory.image}
                  alt={coverStory.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:hidden" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-brand-forest text-xs font-semibold shadow-sm">
                    <CheckCircle2 size={13} />
                    Lead Cover Story
                  </span>
                </div>
              </div>

              {/* Editorial Copy Side (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-meta mb-2">
                    <span className="text-brand-terracotta">{coverStory.district}</span>
                    <span>·</span>
                    <span>Dispatch #01</span>
                    <span>·</span>
                    <span>5 min read</span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-text-heading font-bold group-hover:text-brand-terracotta transition-colors leading-[1.2] mb-4">
                    The 5:00 PM Molten Copper Hearth: Iruttu Kadai’s Century of Halwa
                  </h3>

                  <p className="font-serifAccent text-base sm:text-lg italic text-text-body leading-relaxed mb-6">
                    "Generations gather outside the modest green-shutter shop as twilight touches the Nellaiappar temple car street. No signboards. No flashy lights. Only warm cardamom steam."
                  </p>

                  <div className="p-4 rounded-2xl bg-bg-sand/60 border border-border-subtle/80 mb-6">
                    <div className="text-[11px] font-semibold text-brand-forest uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>Trust Rating: 88% Local Confidence</span>
                      <span> {coverStory.votes} votes</span>
                    </div>
                    <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                      <div className="h-full bg-brand-forest rounded-full" style={{ width: `${coverStory.voteRatio}%` }} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleVote(e, coverStory.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
                        votedMap[coverStory.id]
                          ? 'bg-brand-forest text-white'
                          : 'bg-white hover:bg-bg-sand text-text-heading border border-border-subtle'
                      }`}
                    >
                      <ThumbsUp size={13} className={votedMap[coverStory.id] ? 'fill-white' : ''} />
                      <span className="text-xs font-semibold">{coverStory.votes}</span>
                    </button>
                    <span className="text-xs text-text-meta">94 locals verified</span>
                  </div>

                  <span className="text-xs font-semibold text-brand-terracotta flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Full Story</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. Editorial Magazine Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlaces.map((place, idx) => {
            const hasVoted = !!votedMap[place.id];

            return (
              <article
                key={place.id}
                onClick={() => onSelectPlace(place)}
                className="group flex flex-col bg-bg-card rounded-2xl border border-border-subtle/90 shadow-card hover:shadow-card-hover overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
              >
                {/* 16:9 Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-bg-sand">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-semibold text-text-heading shadow-sm flex items-center gap-1">
                      <span>{place.categoryIcon}</span>
                      <span>{place.category}</span>
                    </span>
                  </div>

                  {/* District Pin */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] font-medium text-white shadow-sm flex items-center gap-1">
                      <MapPin size={11} className="text-brand-terracotta" />
                      <span>{place.district}</span>
                    </span>
                  </div>
                </div>

                {/* Article Card Content */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-forest flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        Verified Dispatch
                      </span>
                      <span className="text-text-meta text-[11px]">· {place.distance}</span>
                    </div>

                    <h4 className="font-editorial text-xl sm:text-2xl text-text-heading font-bold group-hover:text-brand-terracotta transition-colors line-clamp-1 mb-2">
                      {lang === 'ta' ? place.nameTa : place.name}
                    </h4>

                    <p className="font-body text-xs sm:text-sm text-text-body line-clamp-2 leading-relaxed">
                      {place.tagline}
                    </p>
                  </div>

                  {/* Bottom Vote & Confidence Bar */}
                  <div className="pt-3 border-t border-border-subtle/80">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <button
                        onClick={(e) => handleVote(e, place.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                          hasVoted
                            ? 'bg-brand-forest text-white'
                            : 'hover:bg-bg-sand text-text-heading border border-border-subtle/60'
                        }`}
                      >
                        <ThumbsUp size={13} className={hasVoted ? 'fill-white' : ''} />
                        <span>{place.votes}</span>
                      </button>

                      <span className="text-[11px] text-text-meta font-medium">
                        {place.voteRatio}% Local Confidence
                      </span>
                    </div>

                    <div className="w-full h-1 bg-bg-sand rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-forest/80 rounded-full transition-all duration-500"
                        style={{ width: `${place.voteRatio}%` }}
                      />
                    </div>
                  </div>

                </div>
              </article>
            );
          })}

          {/* Special Editorial Quote Card in the Feed */}
          <div className="flex flex-col justify-between p-8 rounded-2xl bg-bg-linen border border-border-editorial text-left relative overflow-hidden shadow-card">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-terracotta mb-4 block">
              The Unbuyable Promise
            </span>

            <blockquote className="font-editorial text-xl sm:text-2xl text-text-heading font-medium leading-snug italic my-auto">
              "We refused advertising dollars from day one. In Tamil Nadu, taste is inherited, not sponsored."
            </blockquote>

            <div className="pt-6 border-t border-border-editorial/80 mt-6 flex items-center justify-between">
              <span className="text-xs font-semibold text-text-heading">
                Editorial Board · NammaOor
              </span>
              <span className="text-[11px] text-brand-forest font-medium">
                Sovereign Charter
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
