import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Globe, Layers, Compass, Navigation, MapPin, ZoomIn, ZoomOut, RotateCcw, CheckCircle2 } from 'lucide-react';
import { DISTRICTS } from '../data/districts';

export default function GeographicAtlasMap({
  selectedDistrict,
  onSelectDistrict,
  lang = 'en'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const tileLayerRef = useRef(null);

  // 100% Free basemap presets with ZERO API key requirements and NO watermarks
  const [activeLayer, setActiveLayer] = useState('osm'); // 'osm' | 'topo' | 'natgeo' | 'satellite'

  const tilePresets = {
    osm: {
      id: 'osm',
      label: 'OpenStreetMap',
      icon: Globe,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      options: {
        subdomains: ['a', 'b', 'c'],
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
      }
    },
    topo: {
      id: 'topo',
      label: 'Topographic Relief',
      icon: Layers,
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      options: {
        maxZoom: 18,
        attribution: 'Tiles &copy; Esri &mdash; USGS, FAO, NPS, NRCAN, GeoBase'
      }
    },
    natgeo: {
      id: 'natgeo',
      label: 'Parchment Atlas',
      icon: Compass,
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
      options: {
        maxZoom: 16,
        attribution: 'Tiles &copy; Esri & National Geographic'
      }
    },
    satellite: {
      id: 'satellite',
      label: 'Satellite',
      icon: Navigation,
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      options: {
        maxZoom: 18,
        attribution: 'Tiles &copy; Esri &mdash; NASA, USGS, GeoEye'
      }
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center of Tamil Nadu Lat: 10.8, Lng: 78.6, Zoom: 7
      const map = L.map(mapContainerRef.current, {
        center: [10.8, 78.6],
        zoom: 7,
        minZoom: 6,
        maxZoom: 18,
        zoomControl: false,
        scrollWheelZoom: false,
      });

      // Add default 100% free OpenStreetMap layer
      tileLayerRef.current = L.tileLayer(
        tilePresets.osm.url,
        tilePresets.osm.options
      ).addTo(map);

      mapInstanceRef.current = map;

      // Plot All 38 Districts with Real GPS Coordinates
      DISTRICTS.forEach((d) => {
        const isLive = d.status === 'live';

        // Elegant Modern Marker (No Emojis)
        const iconHtml = isLive
          ? `
            <div class="relative flex items-center justify-center cursor-pointer">
              <span class="absolute w-8 h-8 rounded-full bg-[#1B432C]/25 animate-ping"></span>
              <span class="absolute w-6 h-6 rounded-full bg-[#1B432C]/40"></span>
              <span class="relative w-4 h-4 rounded-full bg-[#1B432C] border-2 border-[#D4AF37] shadow-md transition-transform duration-200 hover:scale-125"></span>
            </div>
          `
          : `
            <div class="relative flex items-center justify-center cursor-pointer">
              <span class="w-2.5 h-2.5 rounded-full bg-[#C59B27] border border-white shadow-sm transition-transform duration-200 hover:scale-150"></span>
            </div>
          `;

        const customIcon = L.divIcon({
          className: 'custom-district-marker',
          html: iconHtml,
          iconSize: isLive ? [32, 32] : [14, 14],
          iconAnchor: isLive ? [16, 16] : [7, 7],
          popupAnchor: isLive ? [0, -16] : [0, -7],
        });

        const marker = L.marker([d.lat, d.lng], { icon: customIcon }).addTo(map);

        // Tooltip hover label (Clean Typography, No Emojis)
        marker.bindTooltip(
          `<strong>${lang === 'ta' ? d.nameTa : d.name}</strong> ${isLive ? '· Live Hub' : ''}`,
          { direction: 'top', offset: [0, -10], opacity: 0.96 }
        );

        // Rich Custom Popup (Clean, Modern, No Emojis)
        const popupContent = `
          <div style="font-family: 'Inter', system-ui, sans-serif; padding: 14px 16px; min-width: 230px; max-width: 270px; color: #14120E;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="display: inline-flex; align-items: center; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: ${isLive ? '#1B432C' : '#997316'}; background: ${isLive ? 'rgba(27,67,44,0.1)' : 'rgba(197,155,39,0.12)'}; padding: 3px 9px; border-radius: 9999px;">
                ${isLive ? 'LIVE HUB' : 'COMING SOON'}
              </span>
              <span style="font-size: 11px; color: #82796E; font-weight: 500; font-family: monospace;">
                ${d.placesCount} spots
              </span>
            </div>

            <h4 style="margin: 0 0 4px 0; font-family: 'Cinzel', serif; font-size: 16px; font-weight: 700; color: #14120E;">
              ${d.name} <span style="font-family: 'Noto Sans Tamil', sans-serif; font-size: 13px; font-weight: 500; color: #82796E;">(${d.nameTa})</span>
            </h4>

            <p style="margin: 0 0 12px 0; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 14px; font-style: italic; color: #4A453E; line-height: 1.4;">
              "${d.highlight}"
            </p>

            <button id="btn-select-${d.id}" style="width: 100%; padding: 9px 16px; border-radius: 9999px; background: linear-gradient(135deg, #E8C868, #C59B27); color: #12100C; border: none; font-size: 11px; font-weight: 700; font-family: 'Cinzel', serif; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; box-shadow: 0 4px 14px rgba(197, 155, 39, 0.35); transition: transform 0.2s ease;">
              ${isLive ? 'Inspect Live Hub →' : 'Join Waitlist →'}
            </button>
          </div>
        `;

        marker.bindPopup(popupContent);

        marker.on('click', () => {
          if (onSelectDistrict) onSelectDistrict(d);
          setTimeout(() => {
            const btn = document.getElementById(`btn-select-${d.id}`);
            if (btn) {
              btn.onclick = () => {
                if (onSelectDistrict) onSelectDistrict(d);
              };
            }
          }, 100);
        });

        markersRef.current[d.id] = marker;
      });
    }

    return () => {
      // Clean up on unmount
    };
  }, []);

  // Switch Free Basemap Layer
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    const preset = tilePresets[activeLayer] || tilePresets.osm;
    tileLayerRef.current = L.tileLayer(preset.url, preset.options).addTo(mapInstanceRef.current);
  }, [activeLayer]);

  // Fly to selected district smoothly
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedDistrict) return;
    const marker = markersRef.current[selectedDistrict.id];
    if (marker) {
      mapInstanceRef.current.flyTo([selectedDistrict.lat, selectedDistrict.lng], 9.5, {
        duration: 0.9,
        easeLinearity: 0.25
      });
      marker.openPopup();
    }
  }, [selectedDistrict]);

  const resetView = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([10.8, 78.6], 7, { duration: 0.8 });
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleDistrictDropdown = (e) => {
    const dId = e.target.value;
    const found = DISTRICTS.find(d => d.id === dId);
    if (found && onSelectDistrict) {
      onSelectDistrict(found);
    }
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-border-gold/30 bg-bg-card transition-all duration-300">
      
      {/* Top Map Toolbar: Clean, Modern, No Emojis */}
      <div className="bg-bg-primary/95 backdrop-blur-md px-4 sm:px-8 py-3.5 border-b border-border-subtle flex flex-wrap items-center justify-between gap-3 z-20 relative">
        
        {/* Modern Layer Switcher with Sleek SVG Icons */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-cinzel font-bold uppercase tracking-[0.15em] text-text-meta mr-1 hidden sm:inline">
            Cartography:
          </span>
          <div className="flex items-center bg-bg-sand/80 p-1 rounded-full border border-border-subtle text-xs gap-1 flex-wrap">
            {Object.values(tilePresets).map((preset) => {
              const IconComp = preset.icon;
              const isActive = activeLayer === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => setActiveLayer(preset.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-cinzel text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'btn-gold shadow-sm font-bold scale-[1.02]'
                      : 'text-text-meta hover:text-text-heading hover:bg-white/50'
                  }`}
                  title={`Switch to ${preset.label}`}
                >
                  <IconComp size={13} className={isActive ? 'text-black' : 'text-text-meta'} />
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick GPS Fly-to Dropdown & Reset */}
        <div className="flex items-center gap-2">
          <MapPin size={15} className="text-brand-gold shrink-0" />
          <select
            value={selectedDistrict?.id || 'tirunelveli'}
            onChange={handleDistrictDropdown}
            className="px-3.5 py-1.5 rounded-full bg-white border border-border-subtle text-xs font-cinzel font-semibold text-text-heading outline-none focus:border-brand-gold shadow-sm cursor-pointer transition-colors"
          >
            <option value="" disabled>Fly to District GPS...</option>
            {DISTRICTS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} {d.status === 'live' ? '· Live Hub' : ''}
              </option>
            ))}
          </select>

          <button
            onClick={resetView}
            className="p-2 rounded-full bg-white border border-border-subtle text-text-meta hover:text-text-heading hover:border-brand-gold transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
            title="Reset View to Full Tamil Nadu"
          >
            <RotateCcw size={13} />
          </button>
        </div>

      </div>

      {/* Map Canvas */}
      <div className="relative w-full h-[520px] sm:h-[620px] z-10">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Floating Custom Zoom Controls on Map */}
        <div className="absolute right-5 bottom-8 z-[400] flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md border border-border-subtle shadow-card hover:bg-white hover:border-brand-gold text-text-heading flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn size={17} />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md border border-border-subtle shadow-card hover:bg-white hover:border-brand-gold text-text-heading flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut size={17} />
          </button>
          <button
            onClick={resetView}
            className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md border border-border-subtle shadow-card hover:bg-white text-brand-gold flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            title="Full Tamil Nadu State View"
          >
            <Compass size={17} />
          </button>
        </div>

        {/* Bottom Left Legend Floating Card */}
        <div className="absolute left-5 bottom-8 z-[400] bg-white/95 backdrop-blur-md border border-border-subtle px-4 py-3 rounded-2xl shadow-card hidden sm:flex items-center gap-5 text-xs text-text-heading font-medium">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#1B432C] border-2 border-brand-gold live-dot-glow animate-pulse" />
            <span className="font-cinzel font-bold text-[11px] text-text-heading">Tirunelveli (District 01 · Live Hub)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-gold border border-white" />
            <span className="text-text-meta font-cinzel text-[11px]">37 Upcoming Districts</span>
          </div>
        </div>

      </div>

    </div>
  );
}
