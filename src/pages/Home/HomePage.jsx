import React from 'react';
import RoyalHero from '../../components/RoyalHero';
import AboutCharter from '../../components/AboutCharter';
import MidnightDiscoveryTrail from '../../components/MidnightDiscoveryTrail';
import SovereignPillars from '../../components/SovereignPillars';
import AtlasInteractiveSection from '../../components/AtlasInteractiveSection';
import RoyalInquirySection from '../../components/RoyalInquirySection';
import RoyalFooter from '../../components/RoyalFooter';

export default function HomePage({
  lang = 'en',
  selectedDistrict,
  onSelectDistrict,
  onNavigateToDistrict,
  onOpenSearchModal,
  onOpenDistrictSheet,
  onToggleLang,
  onOpenPlaceDetail
}) {
  return (
    <>
      {/* 1. Cinematic Royal Hero with 4 Overlapping Destination Cards */}
      <RoyalHero
        lang={lang}
        onSelectDistrict={onSelectDistrict}
        onOpenSearchModal={onOpenSearchModal}
        onOpenPlaceDetail={onOpenPlaceDetail}
        onNavigateToDistrict={onNavigateToDistrict}
      />

      <main>
        {/* 2. About NammaOor & Sovereign Charter */}
        <AboutCharter
          lang={lang}
        />

        {/* 3. Midnight Navy Stepper Discovery Trail */}
        <MidnightDiscoveryTrail
          lang={lang}
          onSelectDistrict={onSelectDistrict}
          onOpenPlaceDetail={onOpenPlaceDetail}
          onNavigateToDistrict={onNavigateToDistrict}
        />

        {/* 4. What Defines NammaOor (4 Elevated Luxury Pillar Cards) */}
        <SovereignPillars
          lang={lang}
        />

        {/* 5. The 38-District Interactive Map Atlas */}
        <AtlasInteractiveSection
          lang={lang}
          selectedDistrict={selectedDistrict}
          onSelectDistrict={onSelectDistrict}
          onNavigateToDistrict={onNavigateToDistrict}
        />

        {/* 6. Ready to Explore Tamil Nadu Inquiry */}
        <RoyalInquirySection
          lang={lang}
        />
      </main>

      {/* 7. Dark Luxury Colophon Footer */}
      <RoyalFooter
        lang={lang}
        onToggleLang={onToggleLang}
        onOpenDistrictSheet={onOpenDistrictSheet}
      />
    </>
  );
}
