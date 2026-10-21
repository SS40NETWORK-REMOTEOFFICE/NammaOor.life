import { useState, useEffect, useCallback } from 'react';

/**
 * Lightweight Zero-Dependency Client Router
 * Parses and synchronizes URL hash routes like:
 * - '#/' -> { type: 'home' }
 * - '#/district/tirunelveli' -> { type: 'district', districtId: 'tirunelveli' }
 * - '#/district/tirunelveli/nellaiappar-temple' -> { type: 'district', districtId: 'tirunelveli', placeId: 'nellaiappar-temple' }
 */
export function useRouter() {
  const parseRoute = useCallback(() => {
    if (typeof window === 'undefined') return { type: 'home' };

    const hash = window.location.hash || '#/';
    const cleanHash = hash.replace(/^#\/?/, ''); // strip '#/' or '#'

    if (!cleanHash) {
      return { type: 'home' };
    }

    const segments = cleanHash.split('/').filter(Boolean);

    if (segments[0] === 'district' && segments[1]) {
      return {
        type: 'district',
        districtId: segments[1].toLowerCase(),
        placeId: segments[2] || null
      };
    }

    return { type: 'home' };
  }, []);

  const [route, setRoute] = useState(parseRoute);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseRoute());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [parseRoute]);

  const navigate = useCallback((path) => {
    const targetHash = path.startsWith('#') ? path : `#${path.startsWith('/') ? path : `/${path}`}`;
    if (window.location.hash === targetHash) {
      setRoute(parseRoute());
    } else {
      window.location.hash = targetHash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [parseRoute]);

  const navigateToDistrict = useCallback((districtId, placeId = null) => {
    if (placeId) {
      navigate(`/district/${districtId}/${placeId}`);
    } else {
      navigate(`/district/${districtId}`);
    }
  }, [navigate]);

  const navigateToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return {
    route,
    navigate,
    navigateToDistrict,
    navigateToHome
  };
}
