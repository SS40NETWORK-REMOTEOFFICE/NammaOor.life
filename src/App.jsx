import React, { useState } from 'react';
import RoyalHero from './components/RoyalHero';
import AboutCharter from './components/AboutCharter';
import MidnightDiscoveryTrail from './components/MidnightDiscoveryTrail';
import SovereignPillars from './components/SovereignPillars';
import AtlasInteractiveSection from './components/AtlasInteractiveSection';
import RoyalInquirySection from './components/RoyalInquirySection';
import RoyalFooter from './components/RoyalFooter';
import DistrictBottomSheet from './components/DistrictBottomSheet';
import SearchModal from './components/SearchModal';
import LoginModal from './components/LoginModal';
import PlaceDetailModal from './components/PlaceDetailModal';
import { DISTRICTS } from './data/districts';
import { TRENDING_PLACES } from './data/trendingPlaces';

export default function App() {
  const [lang, setLang] = useState('en');
  const [selectedDistrict, setSelectedDistrict] = useState(DISTRICTS[0]); // Tirunelveli (Live Hub)
  
  // Modals
  const [districtSheetOpen, setDistrictSheetOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [activePlaceDetail, setActivePlaceDetail] = useState(null);

  const handleToggleLang = (newLang) => {
    setLang(newLang);
  };

  const handleSelectDistrictById = (districtId) => {
    const found = DISTRICTS.find(d => d.id === districtId);
    if (found) {
      setSelectedDistrict(found);
    }
  };

  return (
    <div className={`min-h-screen bg-bg-primary text-text-body font-body antialiased selection:bg-brand-gold/30 selection:text-text-heading ${lang === 'ta' ? 'font-tamil' : ''}`}>
      
      {/* 1. Cinematic Royal Hero with 4 Overlapping Destination Cards */}
      <RoyalHero
        lang={lang}
        onSelectDistrict={handleSelectDistrictById}
        onOpenSearchModal={() => setSearchModalOpen(true)}
        onOpenPlaceDetail={(place) => setActivePlaceDetail(place)}
      />

      <main>
        {/* 2. About NammaOor & Sovereign Charter (Parchment Ivory with 4 Badges & Quote) */}
        <AboutCharter
          lang={lang}
        />

        {/* 3. Midnight Navy Stepper Discovery Trail (38 Districts, 4 Regional Prides) */}
        <MidnightDiscoveryTrail
          lang={lang}
          onSelectDistrict={handleSelectDistrictById}
          onOpenPlaceDetail={(place) => setActivePlaceDetail(place)}
        />

        {/* 4. What Defines NammaOor (4 Elevated Luxury Pillar Cards) */}
        <SovereignPillars
          lang={lang}
        />

        {/* 5. The 38-District Interactive Map Atlas */}
        <AtlasInteractiveSection
          lang={lang}
          selectedDistrict={selectedDistrict}
          onSelectDistrict={setSelectedDistrict}
        />

        {/* 6. Ready to Explore Tamil Nadu Inquiry (Dusk Reflection & Glassmorphic Form) */}
        <RoyalInquirySection
          lang={lang}
        />
      </main>

      {/* 7. Dark Luxury Colophon Footer */}
      <RoyalFooter
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenDistrictSheet={() => setDistrictSheetOpen(true)}
      />

      {/* Interactive Modals */}
      <DistrictBottomSheet
        isOpen={districtSheetOpen}
        onClose={() => setDistrictSheetOpen(false)}
        selectedDistrict={selectedDistrict}
        onSelectDistrict={setSelectedDistrict}
        lang={lang}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectPlace={(place) => setActivePlaceDetail(place)}
        onSelectDistrict={setSelectedDistrict}
        lang={lang}
      />

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        lang={lang}
      />

      <PlaceDetailModal
        place={activePlaceDetail}
        onClose={() => setActivePlaceDetail(null)}
        lang={lang}
      />

    </div>
  );
}
