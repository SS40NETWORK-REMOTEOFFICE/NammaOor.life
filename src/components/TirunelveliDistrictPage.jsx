import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  Users,
  Ticket,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Phone,
  Compass,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  EyeOff,
  ShieldAlert,
  Info,
  ChevronDown,
  Navigation,
  Globe,
  Layers,
  Search
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TIRUNELVELI_DATA } from '../data/districts/tirunelveliData';
import { DISTRICTS } from '../data/districts';
import AtlasInteractiveSection from './AtlasInteractiveSection';

function MandalaWatermark({ className = '' }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="130" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
      <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="70" stroke="currentColor" strokeWidth="1" />
      <circle cx="200" cy="200" r="40" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="15" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
      {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 200 200)`}>
          <path
            d="M200 40 C208 70, 215 95, 200 130 C185 95, 192 70, 200 40 Z"
            stroke="currentColor"
            strokeWidth="1"
            fill="currentColor"
            fillOpacity="0.08"
          />
          <path
            d="M200 100 C206 120, 210 140, 200 160 C190 140, 194 120, 200 100 Z"
            stroke="currentColor"
            strokeWidth="1"
            fill="currentColor"
            fillOpacity="0.12"
          />
          <circle cx="200" cy="30" r="3" fill="currentColor" />
          <line x1="200" y1="160" x2="200" y2="190" stroke="currentColor" strokeWidth="1" />
        </g>
      ))}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <g key={`arch-${deg}`} transform={`rotate(${deg} 200 200)`}>
          <path
            d="M170 10 Q200 -5 230 10"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
          />
        </g>
      ))}
    </svg>
  );
}

export default function TirunelveliDistrictPage({
  lang = 'en',
  onBackToAtlas,
  onOpenSearch,
  onToggleLang,
  onNavigateToDistrict
}) {
  const [expandedNote, setExpandedNote] = useState('no-signboard');
  const [copiedId, setCopiedId] = useState(null);
  const [activePlace, setActivePlace] = useState(null);

  // Selected district for 38-District Atlas Section
  const [selectedAtlasDistrict, setSelectedAtlasDistrict] = useState(
    DISTRICTS.find((d) => d.id === 'tirunelveli') || DISTRICTS[0]
  );

  // Sticky Scrollytelling Animation States for Section 5
  const cinemaTrackRef = useRef(null);
  const [cinemaActiveIndex, setCinemaActiveIndex] = useState(0);
  const [cinemaProgress, setCinemaProgress] = useState(0);

  // All curated landmark places
  const filteredPlaces = useMemo(() => {
    return TIRUNELVELI_DATA.places;
  }, []);

  // Dynamic navbar scroll state for floating over-hero effect
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleNavScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
    return () => window.removeEventListener('scroll', handleNavScroll);
  }, []);

  // Zero-latency image preloader: Instantiates all district WebP images into browser memory cache immediately on mount
  useEffect(() => {
    if (TIRUNELVELI_DATA?.places?.length) {
      TIRUNELVELI_DATA.places.forEach((p) => {
        if (p?.image) {
          const img = new Image();
          img.src = p.image;
        }
      });
    }
    if (TIRUNELVELI_DATA?.bannerImage) {
      const img = new Image();
      img.src = TIRUNELVELI_DATA.bannerImage;
    }
  }, []);

  // Jump to frame in cinema track
  const jumpToCinemaFrame = (targetIndex) => {
    if (!cinemaTrackRef.current) return;
    const rect = cinemaTrackRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const trackTop = rect.top + scrollTop;
    const windowHeight = window.innerHeight;
    const totalScrollableDistance = rect.height - windowHeight;

    const targetFraction = (targetIndex + 0.1) / Math.max(1, filteredPlaces.length);
    const targetScrollY = trackTop + targetFraction * totalScrollableDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  // Smooth in-page navigation without altering hash router URL
  const scrollToLandmark = (elementId) => {
    if (elementId !== 'landmarks-grid') {
      const targetIdx = filteredPlaces.findIndex(p => p.id === elementId);
      if (targetIdx !== -1) {
        jumpToCinemaFrame(targetIdx);
        return;
      }
    }
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  };

  // Passive High-Performance Scrollytelling Listener (Synced Frame-by-Frame Scrubbing)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!cinemaTrackRef.current) {
            ticking = false;
            return;
          }

          const rect = cinemaTrackRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const totalScrollableDistance = rect.height - windowHeight;

          if (totalScrollableDistance <= 0) {
            setCinemaActiveIndex(0);
            setCinemaProgress(0);
            ticking = false;
            return;
          }

          // Progress from 0.0 (top entering) to 1.0 (bottom reached)
          const scrolled = -rect.top;
          const rawProgress = scrolled / totalScrollableDistance;
          const clampedProgress = Math.max(0, Math.min(1, rawProgress));

          setCinemaProgress(clampedProgress);

          const totalFrames = filteredPlaces.length;
          if (totalFrames > 0) {
            // Index from 0 to totalFrames - 1
            const frameIndex = Math.min(
              totalFrames - 1,
              Math.max(0, Math.floor(clampedProgress * totalFrames))
            );
            setCinemaActiveIndex(frameIndex);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredPlaces.length]);

  const handleCopy = (place) => {
    const text = `${place.name} (${place.nameTa})\nVenue: ${place.venue}\nHours: ${place.opens} to ${place.closes}\nPeak Hours: ${place.peakHours}\nEntry Fee: ${place.fee}`;
    navigator.clipboard.writeText(text);
    setCopiedId(place.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleZoomToPlace = (place) => {
    const mapEl = document.getElementById('atlas-map') || document.getElementById('tirunelveli-map');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`min-h-screen bg-bg-primary text-text-body font-body antialiased ${lang === 'ta' ? 'font-tamil' : ''}`}>
      
      {/* 1. TOP FLOATING OVER-HERO GLOBAL NAVIGATION BAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-stone-950/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3 sm:py-3.5'
            : 'bg-gradient-to-b from-black/80 via-black/25 to-transparent border-b border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between text-white">
          
          {/* Left: Brand Back Navigation */}
          <button
            onClick={onBackToAtlas}
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer text-left"
            title="Return to NammaOor.life"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 group-hover:border-brand-gold text-brand-gold-light flex items-center justify-center transition-all drop-shadow">
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <img
              src="/images/nammaoor_logo.webp"
              alt="NammaOor.life Tourist Guide"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-full bg-white p-0.5 shadow-md border border-brand-gold/40 group-hover:scale-105 transition-transform"
            />
            <div className="hidden sm:block">
              <div className="font-cinzel font-black text-sm text-white tracking-wide leading-tight group-hover:text-brand-gold-light transition-colors drop-shadow">
                NammaOor.life
              </div>
              <div className="text-[10px] tracking-wider uppercase text-brand-gold-light font-bold leading-none mt-0.5 drop-shadow">
                {lang === 'ta' ? 'சுற்றுலா வழிகாட்டி' : 'TOURIST GUIDE'}
              </div>
            </div>
          </button>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-4 sm:py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer shadow-sm"
              title="Search Places"
            >
              <Search size={15} className="text-brand-gold-light" />
              <span className="hidden sm:inline font-medium">{lang === 'ta' ? 'தேடுக' : 'Search Places'}</span>
            </button>

            <button
              onClick={() => onToggleLang(lang === 'en' ? 'ta' : 'en')}
              className="px-4 py-2 rounded-full border border-brand-gold bg-brand-gold/25 hover:bg-brand-gold/40 text-brand-gold-light font-bold text-xs backdrop-blur-md transition-all cursor-pointer shadow-gold"
            >
              {lang === 'en' ? 'தமிழ்' : 'English'}
            </button>
          </div>

        </div>
      </header>

      {/* Hero Wrapper containing Hero Banner with seamless continuous backdrop */}
      <div className="relative w-full overflow-visible">
        
        {/* Background Image & Cinematic Lighting Overlay covering Hero */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <img
            src={TIRUNELVELI_DATA.bannerImage}
            alt="Tirunelveli Sunset Vista"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          {/* Multi-layer cinematic vignette for high contrast & elegance */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-black/55" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.45)_100%)]" />
        </div>

        {/* 2. CINEMATIC LUXURY ROYAL HERO BANNER (Editorial Reference Layout) */}
        <section className="relative z-10 w-full min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between overflow-visible pb-0 pt-24 sm:pt-28 lg:pt-32">
          
          {/* Hero Middle Content: Asymmetric Editorial Typography & Cultural Pillars */}
          <div className="max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-14 w-full text-white flex-1 flex flex-col justify-center my-6 sm:my-8">
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 sm:gap-12">
              
              {/* Left: Eyebrow + EXPLORE + TIRUNELVELI + Tamil Name + Tagline */}
              <div className="max-w-3xl animate-hero-fade">
                
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                  <span className="font-cinzel text-xs sm:text-sm tracking-[0.28em] text-brand-gold-light uppercase font-semibold">
                    {lang === 'ta' ? 'தொன்மையான பண்பாட்டுத் தொட்டில் · தடம் 01' : 'TIMELESS SOUTHERN HERITAGE · SACRED ROOTS'}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white/90 font-light tracking-wide">
                    {lang === 'ta' ? 'கண்டறியுங்கள்' : 'EXPLORE'}
                  </span>
                  
                  <h1 className="font-cinzel text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] my-1">
                    <span className="text-gold-gradient drop-shadow-2xl">
                      {TIRUNELVELI_DATA.name.toUpperCase()}
                    </span>
                  </h1>

                  <div className="font-tamil text-2xl sm:text-4xl lg:text-5xl font-semibold text-brand-gold-light/95 drop-shadow-lg mt-1 mb-4">
                    {TIRUNELVELI_DATA.nameTa}
                  </div>
                </div>

                <p className="font-serif text-base sm:text-xl lg:text-2xl text-white/90 max-w-2xl leading-relaxed drop-shadow">
                  {lang === 'ta' ? TIRUNELVELI_DATA.taglineTa : TIRUNELVELI_DATA.tagline}
                </p>
              </div>

              {/* Right: Vertical Cultural Pillar Stack */}
              <div className="hidden lg:flex items-center gap-6 animate-hero-fade anim-delay-100 self-center">
                <div className="w-[1.5px] h-36 bg-gradient-to-b from-transparent via-brand-gold to-transparent" />
                <div className="flex flex-col gap-3 font-cinzel text-xs sm:text-sm tracking-[0.22em] text-white/80 uppercase">
                  <span className="hover:text-brand-gold-light transition-colors flex items-center gap-2">
                    <span className="text-brand-gold">✦</span> {lang === 'ta' ? 'ஆன்மீகம் & கோயில்கள்' : 'HERITAGE & TEMPLES'}
                  </span>
                  <span className="hover:text-brand-gold-light transition-colors flex items-center gap-2">
                    <span className="text-brand-gold">✦</span> {lang === 'ta' ? 'தாமிரபரணி நதி' : 'THAMIRABARANI RIVER'}
                  </span>
                  <span className="hover:text-brand-gold-light transition-colors flex items-center gap-2">
                    <span className="text-brand-gold">✦</span> {lang === 'ta' ? 'இருட்டுக் கடை அல்வா' : 'HALWA TRADITION'}
                  </span>
                  <span className="hover:text-brand-gold-light transition-colors flex items-center gap-2">
                    <span className="text-brand-gold">✦</span> {lang === 'ta' ? 'KMTR புலிகள் சரணாலயம்' : 'WILD SANCTUARIES'}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Hero Bottom Bar: 4 Interactive Floating Showcase Cards (Overlapping Hero Bottom) */}
          <div className="relative z-30 w-full px-5 sm:px-8 lg:px-14 -mb-16 sm:-mb-20">
            <div className="max-w-[1340px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 items-stretch">
              
              {/* Card 1: Nellaiappar */}
              <button
                type="button"
                onClick={() => scrollToLandmark('nellaiappar-temple')}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] w-full min-h-[260px] sm:min-h-[290px] cursor-pointer shadow-dark border border-white/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-gold flex flex-col justify-end bg-black/40 backdrop-blur-sm text-left"
              >
                <img
                  src="/images/nellaiappar_temple_gopuram.webp"
                  alt="Nellaiappar Temple"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="relative z-10 p-3 sm:p-4 text-left">
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-white group-hover:text-brand-gold transition-colors line-clamp-1">
                    {lang === 'ta' ? 'நெல்லையப்பர்' : 'Nellaiappar Temple'}
                  </h3>
                  <p className="text-[10px] tracking-wider uppercase text-brand-gold-light font-medium truncate mt-0.5">
                    {lang === 'ta' ? 'ஆன்மீக அதிசயம்' : 'Spiritual & Musical Pillars'}
                  </p>
                </div>
              </button>

              {/* Card 2: Iruttu Kadai */}
              <button
                type="button"
                onClick={() => scrollToLandmark('iruttu-kadai-halwa')}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] w-full min-h-[260px] sm:min-h-[290px] cursor-pointer shadow-dark border border-white/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-gold flex flex-col justify-end bg-black/40 backdrop-blur-sm text-left"
              >
                <img
                  src="/images/iruttu_kadai_authentic.webp"
                  alt="Iruttu Kadai Halwa"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="relative z-10 p-3 sm:p-4 text-left">
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-white group-hover:text-brand-gold transition-colors line-clamp-1">
                    {lang === 'ta' ? 'இருட்டுக் கடை' : 'Iruttu Kadai'}
                  </h3>
                  <p className="text-[10px] tracking-wider uppercase text-amber-200 font-medium truncate mt-0.5">
                    {lang === 'ta' ? 'அசல் நெய் அல்வா' : 'Legendary Pure Ghee Halwa'}
                  </p>
                </div>
              </button>

              {/* Card 3: Waterfalls */}
              <button
                type="button"
                onClick={() => scrollToLandmark('manimuthar-falls')}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] w-full min-h-[260px] sm:min-h-[290px] cursor-pointer shadow-dark border border-white/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-gold flex flex-col justify-end bg-black/40 backdrop-blur-sm text-left"
              >
                <img
                  src="/images/manimuthar_falls_dam.webp"
                  alt="Manimuthar & Thamirabarani Falls"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="relative z-10 p-3 sm:p-4 text-left">
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-white group-hover:text-brand-gold transition-colors line-clamp-1">
                    {lang === 'ta' ? 'மணிமுத்தாறு' : 'Manimuthar Falls'}
                  </h3>
                  <p className="text-[10px] tracking-wider uppercase text-cyan-200 font-medium truncate mt-0.5">
                    {lang === 'ta' ? 'தாமிரபரணி அருவி' : 'Twin Falls & Dam'}
                  </p>
                </div>
              </button>

              {/* Card 4: KMTR Wildlife Reserve */}
              <button
                type="button"
                onClick={() => scrollToLandmark('kmtr-reserve')}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] w-full min-h-[260px] sm:min-h-[290px] cursor-pointer shadow-dark border border-white/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-gold flex flex-col justify-end bg-black/40 backdrop-blur-sm text-left"
              >
                <img
                  src="/images/kmtr_wildlife_reserve.webp"
                  alt="KMTR Tiger Reserve & Manjolai"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="relative z-10 p-3 sm:p-4 text-left">
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-white group-hover:text-brand-gold transition-colors line-clamp-1">
                    {lang === 'ta' ? 'களக்காடு KMTR' : 'KMTR Sanctuary'}
                  </h3>
                  <p className="text-[10px] tracking-wider uppercase text-emerald-200 font-medium truncate mt-0.5">
                    {lang === 'ta' ? 'புலிகள் & மாஞ்சோலை' : 'Tiger Reserve & Tea Mist'}
                  </p>
                </div>
              </button>



            </div>
          </div>

        </section>

      </div>

      {/* Buffer zone that gracefully receives the bottom half of the overlapping cards */}
      <div className="w-full bg-bg-primary pt-14 sm:pt-16 pb-2" />

      {/* 5. THE 10 LANDMARK FULL-BLEED STICKY SCROLLYTELLING CINEMA */}
      <section className="w-full pt-12 pb-4">
        {/* Section Editorial Header */}
        <div className="max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-14 mb-8 pb-8 border-b border-brand-gold/30 relative flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl relative z-10 text-left">
            <div className="flex items-center gap-3 mb-2.5">
              <span className="font-cinzel text-xs tracking-[0.25em] text-brand-gold uppercase font-bold">
                {lang === 'ta' ? 'அதிகாரப்பூர்வ கள வழிகாட்டி' : 'NAMMAOOR.LIFE TOURIST GUIDE'}
              </span>
              <div className="h-[1.5px] w-16 bg-brand-gold/60" />
            </div>
            <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-black text-text-heading tracking-tight mb-3 leading-[1.15]">
              {lang === 'ta' ? 'திருநெல்வேலி முக்கிய அடையாளங்கள்' : 'Tirunelveli Landmarks & Essential Destinations'}
            </h2>
            <p className="font-serif text-sm sm:text-base text-text-body/85 leading-relaxed">
              {lang === 'ta'
                ? 'தாமிரபரணி ஆற்றங்கரை, 7-ஆம் நூற்றாண்டு இசைத்தூண்கள், மாஞ்சோலை தேயிலை மேகங்கள் மற்றும் அசல் உணவுப் பாரம்பரியங்கள் — நெல்லை மண்ணின் முதன்மைத் தலங்களின் நேரடி களத் தொகுப்பு.'
                : 'Thamirabarani’s sacred waters, 7th-century musical stone pillars, mist-clad tea hills, and unhurried culinary legends — curated with verified timings, honest rules, and genuine traveler protocols.'}
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-start lg:items-end gap-2 relative z-10">
            <div className="text-left lg:text-right italic font-serif text-sm sm:text-base text-text-heading/90 max-w-xs">
              “{lang === 'ta'
                ? 'வற்றாத தாமிரபரணியும், இசைத்தூண் அதிசயங்களும்... தென் தமிழகத்தின் தலைசிறந்த ஆன்மா.'
                : 'Perennial river, musical pillars, eternal heritage. The sovereign soul of South Tamil Nadu.'}”
              <div className="h-[1px] w-16 bg-brand-gold/60 mt-2 lg:ml-auto" />
            </div>
            <span className="text-xs font-mono font-medium text-brand-forest mt-2 px-3.5 py-1 rounded-full bg-brand-forest/10 border border-brand-forest/20">
              Showing {filteredPlaces.length} of 10 Verified Places
            </span>
          </div>
        </div>
      </section>

      {/* Main Sticky Scrollytelling Stage */}
      <main
        id="landmarks-grid"
        ref={cinemaTrackRef}
        className="relative w-full"
        style={{ height: `${Math.max(4, filteredPlaces.length) * 85}vh` }}
      >
        <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between bg-stone-950">
          
          {/* Layer 1: Stacked Panoramic Frames for Smooth Video-Scrub Crossfade */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
            {filteredPlaces.map((place, idx) => {
              const isActive = idx === cinemaActiveIndex;
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={`bg-${place.id}`}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-out ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${
                      isActive ? 'scale-105' : 'scale-100'
                    } ${isEven ? 'object-center lg:object-left' : 'object-center lg:object-right'}`}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              );
            })}
          </div>

          {/* Layer 2: Intelligent Directional Scrim Overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-stone-950 via-stone-950/85 to-stone-950/30 lg:hidden pointer-events-none" />
          <div
            className={`hidden lg:block absolute inset-0 z-10 pointer-events-none transition-all duration-700 ${
              cinemaActiveIndex % 2 === 1
                ? 'bg-gradient-to-l from-stone-950 via-stone-950/95 via-stone-950/75 to-transparent w-3/5 ml-auto'
                : 'bg-gradient-to-r from-stone-950 via-stone-950/95 via-stone-950/75 to-transparent w-3/5'
            }`}
          />
          <div className="hidden lg:block absolute inset-0 z-10 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/50 pointer-events-none" />

          {/* Layer 3: Top Ambient Status in Cinema Viewport */}
          <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 pt-5 sm:pt-7 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-cinzel text-[11px] sm:text-xs tracking-[0.25em] text-brand-gold uppercase font-bold">
                {lang === 'ta' ? 'அதிவேக சினிமா களப் பார்வை' : 'CINEMATIC FIELD DISPATCH'}
              </span>
              <div className="h-[1px] w-12 bg-brand-gold/60" />
              <span className="text-[11px] font-mono text-brand-gold-light/80">
                {String(cinemaActiveIndex + 1).padStart(2, '0')} / {String(filteredPlaces.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Layer 4: Synchronized Morphing Content */}
          <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 my-auto py-2">
            {filteredPlaces.length > 0 && (() => {
              const currentPlace = filteredPlaces[cinemaActiveIndex] || filteredPlaces[0];
              const isEven = cinemaActiveIndex % 2 === 1;
              const isNoteActive = copiedId === currentPlace.id;

              return (
                <div
                  key={currentPlace.id}
                  className={`w-full lg:w-[50%] flex flex-col justify-between text-left transition-all duration-500 ease-out ${
                    isEven ? 'lg:ml-auto' : ''
                  }`}
                >
                  {/* Category Eyebrow */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-cinzel text-xs font-bold text-brand-gold tracking-[0.25em] uppercase">
                      {lang === 'ta' ? currentPlace.categoryLabelTa : currentPlace.categoryLabel}
                    </span>
                    <div className="h-[1px] w-16 bg-brand-gold/50" />
                    <span className="text-[11px] font-mono text-brand-gold-light/70">
                      {String(cinemaActiveIndex + 1).padStart(2, '0')} / {String(filteredPlaces.length).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Heading & Venue */}
                  <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2 drop-shadow-lg leading-tight">
                    {lang === 'ta' ? currentPlace.nameTa : currentPlace.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-brand-gold-light mb-3 drop-shadow">
                    <MapPin size={15} className="shrink-0 text-brand-gold" />
                    <span>{lang === 'ta' ? currentPlace.venueTa : currentPlace.venue}</span>
                  </div>

                  {/* Narrative Story Description */}
                  <p className="font-serif text-sm sm:text-base text-white/90 leading-relaxed mb-4 drop-shadow">
                    {currentPlace.highlight}
                  </p>

                  {/* Editorial Pull-Quote / Insider Ground Reality Insight */}
                  {currentPlace.insiderTip && (
                    <div className="relative pl-4 border-l-2 border-brand-gold my-3 py-2 italic font-serif text-xs sm:text-sm text-white/95 bg-black/40 backdrop-blur-md rounded-r-2xl pr-4 border-r border-t border-b border-white/10 shadow-sm">
                      <div className="flex items-center gap-2 mb-1 not-italic">
                        <img
                          src="/images/nammaoor_logo.webp"
                          alt="NammaOor"
                          className="w-4 h-4 object-contain rounded-full bg-white p-0.5"
                        />
                        <span className="text-brand-gold font-bold font-cinzel text-[10px] tracking-widest uppercase">
                          {lang === 'ta' ? 'அங்கீகரிக்கப்பட்ட கள உண்மை' : 'AUTHENTICATED GROUND DISPATCH'}
                        </span>
                      </div>
                      “{lang === 'ta' ? currentPlace.insiderTipTa : currentPlace.insiderTip}”
                    </div>
                  )}

                  {/* Seasonal Variation Alert if any */}
                  {currentPlace.hasTimingVariation && currentPlace.seasonalNote && (
                    <div className="p-2.5 bg-amber-950/70 backdrop-blur-md border border-amber-500/40 rounded-xl flex items-start gap-2 text-xs text-amber-200 my-2">
                      <AlertCircle size={15} className="text-amber-400 shrink-0 mt-0.5" />
                      <p>{lang === 'ta' ? currentPlace.seasonalNoteTa : currentPlace.seasonalNote}</p>
                    </div>
                  )}

                  {/* Operational Details Glass Pills Row */}
                  <div className="pt-3 mt-1 border-t border-white/15">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs mb-4">
                      {/* Timings */}
                      <div className="flex items-start gap-2 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10">
                        <Clock size={15} className="text-brand-gold shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-white/60 font-bold block">
                            {lang === 'ta' ? 'திறக்கும் நேரம்' : 'HOURS'}
                          </span>
                          <span className="font-semibold text-white text-[11px] sm:text-xs">
                            {currentPlace.opens} – {currentPlace.closes}
                          </span>
                        </div>
                      </div>

                      {/* Fee */}
                      <div className="flex items-start gap-2 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10">
                        <Ticket size={15} className="text-brand-gold shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-white/60 font-bold block">
                            {lang === 'ta' ? 'அனுமதி' : 'ENTRY'}
                          </span>
                          <span className="font-semibold text-white text-[11px] sm:text-xs">
                            {currentPlace.fee}
                          </span>
                        </div>
                      </div>

                      {/* Peak Crowd */}
                      <div className="flex items-start gap-2 col-span-2 sm:col-span-1 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10">
                        <Users size={15} className="text-brand-gold shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-white/60 font-bold block">
                            {lang === 'ta' ? 'கூட்டம் நேரம்' : 'PEAK RUSH'}
                          </span>
                          <span className="font-semibold text-white text-[11px] sm:text-xs">
                            {currentPlace.peakHours}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => handleZoomToPlace(currentPlace)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-gold hover:text-brand-gold-light transition-colors cursor-pointer"
                      >
                        <Compass size={15} />
                        <span>{lang === 'ta' ? 'வரைபடத்தில் பார்க்க' : 'Locate on Map'}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(currentPlace)}
                          className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-white/20 bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer text-xs flex items-center gap-1.5 font-medium shadow-sm backdrop-blur-md"
                          title="Copy Field Details"
                        >
                          {isNoteActive ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                          <span className="hidden sm:inline">
                            {isNoteActive
                              ? (lang === 'ta' ? 'நகலெடுக்கப்பட்டது' : 'Copied')
                              : (lang === 'ta' ? 'குறிப்பு நகலெடு' : 'Copy Note')}
                          </span>
                        </button>

                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${currentPlace.lat},${currentPlace.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-brand-forest hover:bg-brand-forest/90 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors shadow-md"
                        >
                          <span>{lang === 'ta' ? 'வழிகாட்டல்' : 'Directions'}</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Bottom spacing buffer for pure cinematic immersion */}
          <div className="relative z-20 w-full pb-6" />

        </div>
      </main>

      {/* 6. THE 38-DISTRICT INTERACTIVE MAP ATLAS */}
      <AtlasInteractiveSection
        lang={lang}
        selectedDistrict={selectedAtlasDistrict}
        onSelectDistrict={(dist) => {
          if (typeof dist === 'string') {
            const found = DISTRICTS.find((d) => d.id === dist);
            if (found) setSelectedAtlasDistrict(found);
          } else if (dist?.id) {
            setSelectedAtlasDistrict(dist);
          }
        }}
        onNavigateToDistrict={onNavigateToDistrict}
      />

      {/* 7. INSIDER TRAVELER PLAYBOOK & FIELD NOTES ACCORDION */}
      <section className="relative w-full text-white py-16 sm:py-24 border-t border-white/10 overflow-hidden bg-stone-950">
        {/* Atmospheric Background Image with Vivid Temple Illumination */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/images/tirunelveli_field_notes_bg.webp"
            alt="Ancient Heritage & Pillar Hall Corridor"
            className="w-full h-full object-cover object-center opacity-70 select-none"
          />
          {/* Subtle edge vignetting to maintain pristine text contrast */}
          <div className="absolute inset-0 bg-stone-950/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-transparent to-stone-950" />
        </div>

        <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-14">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            {/* Official Brand Crest Emblem */}
            <div className="w-14 h-14 mx-auto mb-3.5 p-1 rounded-2xl bg-white/10 backdrop-blur-md border border-brand-gold/40 shadow-gold flex items-center justify-center">
              <img
                src="/images/nammaoor_logo.webp"
                alt="NammaOor.life Tourist Guide"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-cinzel text-xs tracking-[0.25em] text-brand-gold uppercase font-bold block mb-2">
              AUTHENTICATED FIELD INTELLIGENCE · NAMMAOOR.LIFE
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              {lang === 'ta' ? 'பயணக் களக்குறிப்புகள்' : 'Tirunelveli Field Notes & Playbook'}
            </h2>
            <p className="font-serif text-base text-white/70">
              Essential knowledge gathered from genuine traveler logs, forest permits, and temple traditions.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {TIRUNELVELI_DATA.insiderNotes.map((note) => {
              const isOpen = expandedNote === note.id;

              return (
                <div
                  key={note.id}
                  className="bg-stone-950/80 border border-white/10 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setExpandedNote(isOpen ? null : note.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center shrink-0 text-brand-gold">
                        {note.id === 'no-signboard' && <EyeOff size={20} />}
                        {note.id === 'temple-monthly-shifts' && <Calendar size={20} />}
                        {note.id === 'manjolai-permits' && <ShieldAlert size={20} />}
                        {note.id === 'honest-gaps' && <Info size={20} />}
                      </div>
                      <div>
                        <h3 className="font-cinzel font-bold text-base sm:text-lg text-white">
                          {lang === 'ta' ? note.titleTa : note.title}
                        </h3>
                        <p className="text-xs text-white/60 mt-0.5">
                          {lang === 'ta' ? note.summaryTa : note.summary}
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      size={18}
                      className={`text-brand-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/10 text-xs sm:text-sm text-white/80 leading-relaxed font-body">
                        {note.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

      {/* 8. NEXT DISTRICT TEASER FOOTER */}
      <section className="w-full bg-bg-primary py-12 border-t border-border-subtle">
        <div className="max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-14 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center text-brand-gold-dark font-cinzel text-xl font-bold">
              02
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-meta block">Coming Next</span>
              <h3 className="font-cinzel text-xl font-bold text-text-heading">
                Madurai · Meenakshi & Kari Dosa
              </h3>
            </div>
          </div>

          <button
            onClick={onBackToAtlas}
            className="inline-flex items-center gap-3 bg-stone-900 hover:bg-stone-800 text-white font-cinzel font-bold text-xs px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-md hover:shadow-gold border border-brand-gold/30 group"
          >
            <img
              src="/images/nammaoor_logo.webp"
              alt="NammaOor.life"
              className="w-6 h-6 object-contain rounded-full bg-white p-0.5"
            />
            <span>{lang === 'ta' ? 'அனைத்து 38 மாவட்ட முகப்பு' : 'Return to NammaOor.life Hub'}</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-brand-gold" />
          </button>
        </div>
      </section>

    </div>
  );
}
