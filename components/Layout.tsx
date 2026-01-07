import React, { useState, useRef, useEffect } from 'react';
import { AppStage, Region } from '../types';
import { useRegion } from '../contexts/RegionContext';
import { REGIONS } from '../utils/pricing';
import { ChevronDown, Globe } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (stage: AppStage) => void;
  currentStage: AppStage;
}

export const Layout: React.FC<LayoutProps> = ({ children, onNavigate, currentStage }) => {
  const { region, setRegion, config } = useRegion();
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const regionDropdownRef = useRef<HTMLDivElement>(null);

  const navLinkClass = (stage: AppStage) => 
    `cursor-pointer transition-all hover:opacity-100 ${currentStage === stage ? 'opacity-100 line-through decoration-1 underline-offset-4' : 'opacity-60 hover:line-through'}`;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (regionDropdownRef.current && !regionDropdownRef.current.contains(event.target as Node)) {
        setIsRegionOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C2C2C] font-serif selection:bg-[#D4C5A5] selection:text-white overflow-x-hidden">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 bg-[#FDFBF7]/80 backdrop-blur-sm border-b border-transparent hover:border-neutral-200 transition-colors">
        <div 
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => onNavigate('upload')}
        >
            <div className="w-8 h-8 border border-[#2C2C2C] rotate-45 group-hover:rotate-0 transition-transform duration-500 bg-[#2C2C2C]"></div>
            <h1 className="text-xl tracking-[0.2em] font-bold uppercase">Pawtrait<span className="font-light opacity-50">Atelier</span></h1>
        </div>
        
        <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-8 text-xs tracking-widest uppercase font-sans">
                <span 
                className={navLinkClass('gallery')}
                onClick={() => onNavigate('gallery')}
                >
                Gallery
                </span>
                <span 
                className={navLinkClass('pricing')}
                onClick={() => onNavigate('pricing')}
                >
                Pricing
                </span>
                <span 
                className={navLinkClass('upload')}
                onClick={() => onNavigate('upload')}
                >
                Create
                </span>
            </div>

            {/* Region Selector */}
            <div className="relative" ref={regionDropdownRef}>
                <button 
                    onClick={() => setIsRegionOpen(!isRegionOpen)}
                    className="flex items-center gap-2 text-xs uppercase tracking-widest border border-neutral-200 px-3 py-1.5 hover:border-neutral-400 transition-colors"
                >
                    <span className="text-base leading-none">{config.flagEmoji}</span>
                    <span className="hidden sm:inline">{config.currency}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${isRegionOpen ? 'rotate-180' : ''}`} />
                </button>

                {isRegionOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-neutral-200 shadow-xl py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                        {(Object.keys(REGIONS) as Region[]).map((r) => {
                            const rConfig = REGIONS[r];
                            return (
                                <div 
                                    key={r}
                                    onClick={() => {
                                        setRegion(r);
                                        setIsRegionOpen(false);
                                    }}
                                    className={`px-4 py-3 flex items-center justify-between hover:bg-neutral-50 cursor-pointer text-xs uppercase tracking-wider ${region === r ? 'bg-neutral-50 font-bold' : ''}`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg">{rConfig.flagEmoji}</span>
                                        {rConfig.code}
                                    </span>
                                    <span>{rConfig.currencySymbol}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
      </nav>

      <main className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-12 mt-16 md:mt-0">
        {children}
      </main>

      <footer className="fixed bottom-6 left-6 text-[10px] uppercase tracking-widest opacity-40 font-sans hidden md:block">
        Est. 2024 — Powered by Gemini AI
      </footer>
    </div>
  );
};
