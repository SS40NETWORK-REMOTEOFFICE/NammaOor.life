import React from 'react';
import { Compass, Search, Map, Flame, User } from 'lucide-react';

export default function BottomNav({
  activeTab = 'explore',
  onTabChange,
  onOpenSearch,
  onOpenDistrictSheet,
  onOpenLogin
}) {
  const tabs = [
    { id: 'explore', label: 'Explore', icon: <Compass size={20} />, action: () => onTabChange('explore') },
    { id: 'search', label: 'Search', icon: <Search size={20} />, action: onOpenSearch },
    { id: 'districts', label: 'Districts', icon: <Map size={20} />, action: onOpenDistrictSheet },
    { id: 'trending', label: 'Trending', icon: <Flame size={20} />, action: () => {
      onTabChange('trending');
      const el = document.getElementById('explore');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }},
    { id: 'profile', label: 'Profile', icon: <User size={20} />, action: onOpenLogin },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border-subtle h-14 shadow-lg">
      <div className="grid grid-cols-5 h-full max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={tab.action}
              className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
                isActive ? 'text-brand-terracotta' : 'text-text-meta hover:text-text-body'
              }`}
            >
              <div className={`transition-transform ${isActive ? 'scale-110' : ''}`}>
                {tab.icon}
              </div>
              <span className="text-[10px] font-medium tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
