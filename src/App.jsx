import React, { useState } from 'react';
import HomePage from './pages/Home/HomePage';
import DistrictPage from './pages/District/DistrictPage';
import DistrictBottomSheet from './components/DistrictBottomSheet';
import SearchModal from './components/SearchModal';
import LoginModal from './components/LoginModal';
import PlaceDetailModal from './components/PlaceDetailModal';
import { useRouter } from './hooks/useRouter';
import { DISTRICTS } from './data/districts';

export default function App() {
  const [lang, setLang] = useState('en');
  const [selectedDistrict, setSelectedDistrict] = useState(DISTRICTS[0]); // Tirunelveli

  // Lightweight hash router
  const { route, navigateToDistrict, navigateToHome } = useRouter();

  // Global modals state
  const [districtSheetOpen, setDistrictSheetOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [activePlaceDetail, setActivePlaceDetail] = useState(null);

  const handleToggleLang = (newLang) => {
    setLang(newLang);
  };

  const handleSelectDistrict = (district) => {
    if (typeof district === 'string') {
      const found = DISTRICTS.find((d) => d.id === district);
      if (found) setSelectedDistrict(found);
    } else if (district?.id) {
      setSelectedDistrict(district);
    }
  };

  return (
    <div className={`min-h-screen bg-bg-primary text-text-body font-body antialiased selection:bg-brand-gold/30 selection:text-text-heading ${lang === 'ta' ? 'font-tamil' : ''}`}>
      
      {/* Route Switch */}
      {route.type === 'district' ? (
        <DistrictPage
          districtId={route.districtId}
          lang={lang}
          onBackToAtlas={navigateToHome}
          onOpenSearch={() => setSearchModalOpen(true)}
          onToggleLang={handleToggleLang}
          onNavigateToDistrict={navigateToDistrict}
        />
      ) : (
        <HomePage
          lang={lang}
          selectedDistrict={selectedDistrict}
          onSelectDistrict={handleSelectDistrict}
          onNavigateToDistrict={navigateToDistrict}
          onOpenSearchModal={() => setSearchModalOpen(true)}
          onOpenDistrictSheet={() => setDistrictSheetOpen(true)}
          onToggleLang={handleToggleLang}
          onOpenPlaceDetail={(place) => setActivePlaceDetail(place)}
        />
      )}

      {/* Global Overlays & Modals */}
      <DistrictBottomSheet
        isOpen={districtSheetOpen}
        onClose={() => setDistrictSheetOpen(false)}
        selectedDistrict={selectedDistrict}
        onSelectDistrict={handleSelectDistrict}
        onNavigateToDistrict={navigateToDistrict}
        lang={lang}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectPlace={(place) => setActivePlaceDetail(place)}
        onSelectDistrict={(dist) => {
          handleSelectDistrict(dist);
          navigateToDistrict(dist.id);
        }}
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
