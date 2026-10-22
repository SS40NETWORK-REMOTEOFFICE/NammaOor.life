import { TIRUNELVELI_DATA } from './tirunelveliData';
import { DISTRICTS } from '../districts';

/**
 * Master Registry of all fully curated district dossiers
 */
export const DISTRICT_REGISTRY = {
  tirunelveli: {
    ...TIRUNELVELI_DATA,
    status: 'live'
  }
};

/**
 * Universal lookup function for any of Tamil Nadu's 38 districts.
 * If fully documented in registry (like Tirunelveli), returns the complete dossier.
 * If upcoming (like Madurai, Tenkasi), returns a curated preview contract.
 */
export function getDistrictData(districtId) {
  if (!districtId) return null;
  const normalizedId = districtId.toLowerCase();

  if (DISTRICT_REGISTRY[normalizedId]) {
    return {
      isLive: true,
      data: DISTRICT_REGISTRY[normalizedId]
    };
  }

  // Find in the 38-district master list
  const summary = DISTRICTS.find((d) => d.id === normalizedId);

  if (summary) {
    return {
      isLive: false,
      data: {
        id: summary.id,
        name: summary.name,
        nameTa: summary.nameTa,
        tagline: summary.highlight,
        taglineTa: summary.highlight,
        bannerImage: '/images/tamilnadu_hero_sunset.webp',
        stats: {
          totalPlaces: summary.placesCount,
          curatedKeyLandmarks: 0,
          river: 'Regional Basin',
          status: 'Upcoming Release'
        },
        places: [],
        insiderNotes: [],
        lat: summary.lat,
        lng: summary.lng
      }
    };
  }

  return null;
}
