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

export default function TirunelveliDistrictPage({
  lang = 'en',
  onBackToAtlas,
  onOpenSearch,
  onToggleLang
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);
  const [expandedNote, setExpandedNote] = useState('no-signboard');
  const [copiedId, setCopiedId] = useState(null);
  const [activePlace, setActivePlace] = useState(null);

  // Map references
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const [activeMapLayer, setActiveMapLayer] = useState('osm');

  // Smooth in-page navigation without altering hash router URL
  const scrollToLandmark = (elementId) => {
    if (elementId !== 'landmarks-grid') {
      setSelectedCategory('all');
      setFreeOnly(false);
    }
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: elementId === 'landmarks-grid' ? 'start' : 'center' });
        if (elementId !== 'landmarks-grid') {
          el.classList.add('ring-4', 'ring-brand-gold', 'ring-offset-4', 'transition-all', 'duration-500');
          setTimeout(() => {
            el.classList.remove('ring-4', 'ring-brand-gold', 'ring-offset-4');
          }, 3000);
        }
      }
    }, 80);
  };

  // Categories list (Brief and streamlined)
  const categories = useMemo(() => [
    { id: 'all', label: 'All (10)', labelTa: 'அனைத்தும் (10)' },
    { id: 'spiritual', label: 'Spiritual', labelTa: 'ஆன்மீகம்' },
    { id: 'culinary', label: 'Taste & Halwa', labelTa: 'அல்வா & சுவை' },
    { id: 'waterfalls', label: 'Waterfalls', labelTa: 'நீர்வீழ்ச்சி' },
    { id: 'wildlife', label: 'Tiger Reserve', labelTa: 'புலிகள் காப்பகம்' },
    { id: 'nature', label: 'Hillocks & Tea', labelTa: 'மாஞ்சோலை' },
    { id: 'science', label: 'Science Park', labelTa: 'அறிவியல்' },
    { id: 'coastal', label: 'Coast', labelTa: 'கடற்கரை' }
  ], []);

  // Filter places
  const filteredPlaces = useMemo(() => {
    return TIRUNELVELI_DATA.places.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (freeOnly && !p.fee.toLowerCase().includes('free')) return false;
      return true;
    });
  }, [selectedCategory, freeOnly]);

  // Leaflet map setup for Tirunelveli cluster
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [8.62, 77.58],
        zoom: 9,
        scrollWheelZoom: false
      });

      const tileLayer = L.tileLayer(
        activeMapLayer === 'satellite'
          ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; OpenStreetMap contributors &copy; Esri'
        }
      ).addTo(map);

      mapInstanceRef.current = map;
      mapInstanceRef.current.currentTileLayer = tileLayer;
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    // Add marker for each place
    TIRUNELVELI_DATA.places.forEach((place) => {
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            background: ${place.isConfirmed ? '#C59B27' : '#C75B39'};
            color: #FFFFFF;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border: 2px solid #FFFFFF;
            cursor: pointer;
            transition: transform 0.2s ease;
          ">
            📍
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([place.lat, place.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: sans-serif; padding: 4px; max-width: 200px;">
            <strong style="color: #1A1815; font-size: 14px; display: block; margin-bottom: 2px;">
              ${lang === 'ta' ? place.nameTa : place.name}
            </strong>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #524D46;">${place.venue}</p>
            <span style="font-size: 10px; font-weight: bold; color: #C59B27; text-transform: uppercase;">
              ${place.opens} – ${place.closes}
            </span>
          </div>
        `);

      marker.on('click', () => {
        setActivePlace(place);
      });

      markersRef.current[place.id] = marker;
    });

    return () => {
      // Keep map reference alive on re-renders, destroy on unmount
    };
  }, [lang, activeMapLayer]);

  const handleCopy = (place) => {
    const text = `${place.name} (${place.nameTa})\nVenue: ${place.venue}\nHours: ${place.opens} to ${place.closes}\nPeak Hours: ${place.peakHours}\nEntry Fee: ${place.fee}`;
    navigator.clipboard.writeText(text);
    setCopiedId(place.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleZoomToPlace = (place) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([place.lat, place.lng], 13, { animate: true });
      if (markersRef.current[place.id]) {
        markersRef.current[place.id].openPopup();
      }
      const mapEl = document.getElementById('tirunelveli-map');
      if (mapEl) {
        mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className={`min-h-screen bg-bg-primary text-text-body font-body antialiased ${lang === 'ta' ? 'font-tamil' : ''}`}>
      
      {/* 1. TOP CULTURAL ALERT TICKER (Positioned above the header) */}
      <aside className="w-full bg-stone-950 text-white py-2 border-b border-brand-gold/30 shadow-md overflow-hidden relative z-50">
        <div className="flex items-center">
          
          {/* Continuous Moving Marquee Track */}
          <div className="overflow-hidden flex-1 cursor-pointer">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-8 py-0.5 text-xs sm:text-sm">
              
              {/* Loop 1 */}
              <div className="flex items-center gap-6 text-white/90">
                <span className="font-cinzel font-bold text-brand-gold-light tracking-wide">
                  Aippasi Thirukalyanam Wedding Festival Active (Oct 15 – Nov 15)
                </span>
                <span className="text-white/40">✦</span>
                <span>Sri Nellaiappar & Mother Kanthimathi Amman Divine Wedding Ceremony</span>
                <span className="text-white/40">✦</span>
                <span className="text-amber-200">Golden Chariot Circumambulation on Four Car Streets</span>
                <span className="text-white/40">✦</span>
                <button
                  onClick={() => scrollToLandmark('nellaiappar-temple')}
                  className="inline-flex items-center gap-1 text-brand-gold hover:text-white underline font-semibold transition-colors cursor-pointer"
                >
                  <span>Temple Details & Chariot</span>
                  <ExternalLink size={12} />
                </button>
              </div>

              {/* Loop 2 (Continuous duplication for seamless infinite marquee) */}
              <div className="flex items-center gap-6 text-white/90" aria-hidden="true">
                <span className="font-cinzel font-bold text-brand-gold-light tracking-wide">
                  Aippasi Thirukalyanam Wedding Festival Active (Oct 15 – Nov 15)
                </span>
                <span className="text-white/40">✦</span>
                <span>Sri Nellaiappar & Mother Kanthimathi Amman Divine Wedding Ceremony</span>
                <span className="text-white/40">✦</span>
                <span className="text-amber-200">Golden Chariot Circumambulation on Four Car Streets</span>
                <span className="text-white/40">✦</span>
                <button
                  onClick={() => scrollToLandmark('nellaiappar-temple')}
                  className="inline-flex items-center gap-1 text-brand-gold hover:text-white underline font-semibold transition-colors cursor-pointer"
                >
                  <span>Temple Details & Chariot</span>
                  <ExternalLink size={12} />
                </button>
              </div>

            </div>
          </div>

          {/* Right Action Button */}
          <div className="z-20 bg-stone-950 px-3 sm:px-6 py-1 shrink-0 hidden sm:flex items-center border-l border-white/10 shadow-lg">
            <button
              onClick={() => scrollToLandmark('nellaiappar-temple')}
              className="inline-flex items-center gap-1.5 bg-brand-gold hover:bg-brand-gold-light text-stone-950 font-bold text-xs px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              <span>{lang === 'ta' ? 'கோயில்' : 'View Timings'}</span>
              <ExternalLink size={11} />
            </button>
          </div>

        </div>
      </aside>

      {/* Hero Wrapper containing Header & Hero Banner with seamless continuous backdrop */}
      <div className="relative w-full overflow-visible">
        
        {/* Background Image & Cinematic Lighting Overlay covering both Header & Hero */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <img
            src={TIRUNELVELI_DATA.bannerImage}
            alt="Tirunelveli Sunset Vista"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
          />
          {/* Multi-layer cinematic vignette for high contrast & elegance */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-black/55" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.45)_100%)]" />
        </div>

        {/* 2. TOP FLOATING NAVIGATION BAR OVER HERO */}
        <header className="relative z-40 w-full border-b border-white/10">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between text-white">
            
            <button
              onClick={onBackToAtlas}
              className="inline-flex items-center gap-2 text-white hover:text-brand-gold-light font-medium text-xs sm:text-sm tracking-wide transition-colors group cursor-pointer drop-shadow"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-brand-gold-light" />
              <span className="font-cinzel font-bold">{lang === 'ta' ? 'அனைத்து மாவட்டங்கள்' : 'TAMIL NADU ATLAS'}</span>
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

        {/* 3. CINEMATIC LUXURY ROYAL HERO BANNER (Editorial Reference Layout) */}
        <section className="relative z-10 w-full min-h-[82vh] lg:min-h-[88vh] flex flex-col justify-between overflow-visible pb-0 pt-8 sm:pt-12">
          
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

          {/* Hero Bottom Bar: 4 Interactive Floating Showcase Cards + Right Narrative CTA (Overlapping Hero Bottom) */}
          <div className="relative z-30 w-full px-5 sm:px-8 lg:px-14 -mb-16 sm:-mb-20">
            <div className="max-w-[1340px] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 items-stretch">
              
              {/* Card 1: Nellaiappar */}
              <button
                type="button"
                onClick={() => scrollToLandmark('nellaiappar-temple')}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] w-full min-h-[260px] sm:min-h-[290px] cursor-pointer shadow-dark border border-white/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-gold flex flex-col justify-end bg-black/40 backdrop-blur-sm text-left"
              >
                <img
                  src="/images/nellaiappar_temple_gopuram.jpg"
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
                  src="/images/iruttu_kadai_authentic.jpg"
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
                  src="/images/manimuthar_falls_dam.jpg"
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
                  src="/images/kmtr_wildlife_reserve.jpg"
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

              {/* 5th Column (Right CTA Card matching Home Page) */}
              <div className="col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-1 bg-black/60 backdrop-blur-md border border-brand-gold/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-dark text-left aspect-auto lg:aspect-[3/4] min-h-[260px] sm:min-h-[290px]">
                <div>
                  <span className="text-[10px] font-cinzel tracking-[0.2em] uppercase text-brand-gold-light block mb-1">
                    {lang === 'ta' ? 'பண்பாட்டுத் தொகுப்பு' : 'A DISCOVERY ARCHIVE'}
                  </span>
                  <p className="font-serif text-sm text-white/90 italic leading-snug">
                    {lang === 'ta' ? '10 முதன்மைத் தலங்கள், காலமுறை விதிகள் மற்றும் நேரடி வழிகாட்டல்.' : 'Across 10 curated icons, verified opening windows, and genuine dispatches.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToLandmark('landmarks-grid')}
                  className="mt-4 w-full py-2.5 px-4 rounded-full btn-gold font-cinzel text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-gold"
                >
                  <span>{lang === 'ta' ? '10 இடங்கள்' : 'Explore All 10'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>

            </div>
          </div>

        </section>

      </div>

      {/* Buffer zone that gracefully receives the bottom half of the overlapping cards */}
      <div className="w-full bg-bg-primary pt-20 sm:pt-24 pb-2" />

      {/* 4. STICKY FILTER CONTROLS & TIMINGS FILTER */}
      <section className="w-full bg-bg-sand/95 py-3.5 sm:py-4 border-y border-border-subtle sticky top-0 z-20 backdrop-blur-md shadow-sm">
        <div className="max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-14">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-brand-forest text-white shadow-sm font-semibold'
                      : 'bg-white text-text-body hover:bg-white/80 border border-border-subtle'
                  }`}
                >
                  {lang === 'ta' ? cat.labelTa : cat.label}
                </button>
              ))}
            </div>

            {/* Quick toggles */}
            <div className="flex items-center gap-3 shrink-0">
              <label className="flex items-center gap-2 text-xs text-text-heading font-medium cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={freeOnly}
                  onChange={(e) => setFreeOnly(e.target.checked)}
                  className="rounded border-border-subtle text-brand-forest focus:ring-brand-forest cursor-pointer"
                />
                <span>{lang === 'ta' ? 'இலவச அனுமதி மட்டும்' : 'Free Entry Only'}</span>
              </label>

              <a
                href="#tirunelveli-map"
                className="inline-flex items-center gap-1.5 text-xs text-brand-terracotta hover:underline font-semibold"
              >
                <Compass size={14} />
                <span>{lang === 'ta' ? 'வரைபடம் காண்க' : 'Open Leaflet Map'}</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 5. THE 10 LANDMARK CARDS GRID */}
      <main id="landmarks-grid" className="max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-14 py-12 sm:py-16 scroll-mt-6">
        
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <span className="font-cinzel text-xs tracking-[0.25em] text-brand-gold uppercase font-bold block mb-1">
              VERIFIED CULTURAL CARTOGRAPHY
            </span>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-text-heading">
              {lang === 'ta' ? 'திருநெல்வேலி முக்கிய அடையாளங்கள்' : 'Landmarks & Essential Destinations'}
            </h2>
          </div>
          <span className="text-xs text-text-meta font-medium">
            Showing {filteredPlaces.length} of 10
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPlaces.map((place) => {
            const isNoteActive = copiedId === place.id;

            return (
              <article
                key={place.id}
                id={place.id}
                className="bg-white rounded-3xl overflow-hidden border border-border-subtle shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image Header with Badges */}
                  <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-stone-100">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Top Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/60 backdrop-blur-md text-brand-gold-light border border-brand-gold/40 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                        {lang === 'ta' ? place.categoryLabelTa : place.categoryLabel}
                      </span>
                    </div>

                    {/* Place Name and Venue on Image */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-cinzel text-xl sm:text-2xl font-bold tracking-tight mb-1 text-white drop-shadow">
                        {lang === 'ta' ? place.nameTa : place.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-white/90">
                        <MapPin size={13} className="text-brand-terracotta shrink-0" />
                        <span className="truncate">{lang === 'ta' ? place.venueTa : place.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Place Body & Operational Details */}
                  <div className="p-6 sm:p-7 space-y-4">
                    
                    {/* Operational Timings Table / Details */}
                    <div className="grid grid-cols-2 gap-3 p-3.5 bg-bg-sand/60 rounded-2xl border border-border-subtle text-xs">
                      
                      {/* Opens */}
                      <div className="flex items-start gap-2">
                        <Clock size={15} className="text-brand-forest shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-text-meta block">Opens / Closes</span>
                          <span className="font-semibold text-text-heading">
                            {place.opens} – {place.closes}
                          </span>
                        </div>
                      </div>

                      {/* Peak Time */}
                      <div className="flex items-start gap-2">
                        <Users size={15} className="text-brand-gold-dark shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-text-meta block">Peak Crowd Time</span>
                          <span className="font-semibold text-text-heading">
                            {place.peakHours}
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Entry Fee Box */}
                    <div className="flex items-center justify-between text-xs p-3 bg-white border border-border-subtle rounded-xl">
                      <div className="flex items-center gap-2">
                        <Ticket size={15} className="text-brand-terracotta shrink-0" />
                        <span className="font-medium text-text-body">{place.fee}</span>
                      </div>
                      {place.phoneContact && (
                        <a
                          href={`tel:${place.phoneContact}`}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-forest hover:underline"
                        >
                          <Phone size={12} />
                          <span>{place.phoneContact}</span>
                        </a>
                      )}
                    </div>

                    {/* Highlight Description */}
                    <p className="text-xs sm:text-sm text-text-body leading-relaxed">
                      {place.highlight}
                    </p>

                    {/* Special Seasonal Variation Alert */}
                    {place.hasTimingVariation && place.seasonalNote && (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-xs text-amber-900">
                        <AlertCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                        <p>{lang === 'ta' ? place.seasonalNoteTa : place.seasonalNote}</p>
                      </div>
                    )}

                    {/* Insider Secret / Direction Guide */}
                    {place.insiderTip && (
                      <div className="p-3 bg-stone-900 text-stone-100 rounded-xl flex items-start gap-2 text-xs leading-relaxed border border-stone-800">
                        <Info size={15} className="text-brand-gold shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-brand-gold font-cinzel text-[11px] block mb-0.5">
                            {lang === 'ta' ? 'அறிந்திருக்க வேண்டிய குறிப்பு:' : 'INSIDER FIELD NOTE:'}
                          </strong>
                          <span>{lang === 'ta' ? place.insiderTipTa : place.insiderTip}</span>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0 border-t border-border-subtle/60 flex items-center justify-between gap-3 text-xs">
                  
                  <button
                    onClick={() => handleZoomToPlace(place)}
                    className="inline-flex items-center gap-1.5 text-brand-forest hover:text-brand-forest/80 font-bold transition-colors cursor-pointer"
                  >
                    <Compass size={14} />
                    <span>{lang === 'ta' ? 'வரைபடத்தில் பார்க்க' : 'Locate on Map'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(place)}
                      className="p-2 rounded-xl border border-border-subtle hover:bg-bg-sand text-text-heading transition-colors cursor-pointer"
                      title="Copy Place Details"
                    >
                      {isNoteActive ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    </button>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-brand-forest hover:bg-brand-forest/90 text-white font-semibold px-4 py-2 rounded-xl transition-colors"
                    >
                      <span>{lang === 'ta' ? 'வழிகாட்டல்' : 'Directions'}</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>

                </div>

              </article>
            );
          })}
        </div>

      </main>

      {/* 6. INSIDER TRAVELER PLAYBOOK & FIELD NOTES ACCORDION */}
      <section className="relative w-full text-white py-16 sm:py-24 border-t border-white/10 overflow-hidden bg-stone-950">
        {/* Atmospheric Background Image with Vivid Temple Illumination */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/images/tirunelveli_field_notes_bg.jpg"
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
            <span className="font-cinzel text-xs tracking-[0.25em] text-brand-gold uppercase font-bold block mb-2">
              DISPATCHES & GROUND REALITY
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

      {/* 7. INTERACTIVE TIRUNELVELI MINI-ATLAS */}
      <section id="tirunelveli-map" className="w-full bg-bg-sand/70 py-16 sm:py-20 border-b border-border-subtle">
        <div className="max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-14">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="font-cinzel text-xs tracking-[0.25em] text-brand-gold uppercase font-bold block mb-1">
                EXACT GPS CARTOGRAPHY
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-text-heading">
                {lang === 'ta' ? 'திருநெல்வேலி புவியியல் வரைபடம்' : 'Interactive District Cluster Map'}
              </h2>
              <p className="text-xs sm:text-sm text-text-meta mt-1">
                Pins represent all 10 curated landmarks from East Car St to the peaks of KMTR.
              </p>
            </div>

            {/* Map tile toggle */}
            <div className="flex items-center gap-2 bg-white p-1 rounded-full border border-border-subtle shadow-sm text-xs">
              <button
                onClick={() => setActiveMapLayer('osm')}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                  activeMapLayer === 'osm' ? 'bg-brand-forest text-white' : 'text-text-body hover:bg-bg-sand'
                }`}
              >
                Street Map
              </button>
              <button
                onClick={() => setActiveMapLayer('satellite')}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                  activeMapLayer === 'satellite' ? 'bg-brand-forest text-white' : 'text-text-body hover:bg-bg-sand'
                }`}
              >
                Satellite View
              </button>
            </div>
          </div>

          {/* Leaflet Container */}
          <div className="w-full h-[450px] sm:h-[520px] rounded-3xl overflow-hidden border border-border-subtle shadow-card relative z-10">
            <div ref={mapContainerRef} className="w-full h-full" />
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
            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-cinzel font-bold text-xs px-6 py-3 rounded-full transition-colors cursor-pointer shadow-md"
          >
            <span>{lang === 'ta' ? 'அனைத்து 38 மாவட்டங்களை ஆராய்க' : 'Explore All 38 Districts'}</span>
            <ArrowLeft size={14} className="rotate-180" />
          </button>
        </div>
      </section>

    </div>
  );
}
