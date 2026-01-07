import React from 'react';

interface StickyMobileCTAProps {
  ctaText: string;
  onCtaClick: () => void;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ ctaText, onCtaClick }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-neutral-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden z-50">
        <button 
            onClick={onCtaClick}
            className="w-full bg-[#2C2C2C] text-white py-4 uppercase text-xs font-bold tracking-widest shadow-lg active:scale-[0.98] transition-transform"
        >
            {ctaText}
        </button>
    </div>
  );
};
