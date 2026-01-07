import React from 'react';
import { Check } from 'lucide-react';

interface LandingHeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  trustBadges: string[];
  heroImage: string;
  onCtaClick: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ headline, subheadline, ctaText, trustBadges, heroImage, onCtaClick }) => {
  return (
    <div className="relative overflow-hidden bg-[#FDFBF7]">
       {/* Background Decoration */}
       <div className="absolute top-0 right-0 w-2/3 h-full bg-neutral-100/50 skew-x-12 translate-x-20 z-0 pointer-events-none"></div>

       <div className="max-w-6xl mx-auto px-4 py-12 md:py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Text Content */}
              <div className="flex-1 space-y-8 text-center md:text-left">
                  <h1 className="text-4xl md:text-6xl font-serif text-[#2C2C2C] leading-tight">
                    {headline}
                  </h1>
                  <p className="text-lg text-neutral-600 font-sans leading-relaxed max-w-lg mx-auto md:mx-0">
                    {subheadline}
                  </p>
                  
                  <div className="flex flex-col gap-4 items-center md:items-start">
                     <button 
                        onClick={onCtaClick}
                        className="bg-[#2C2C2C] text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 w-full md:w-auto min-h-[48px] flex items-center justify-center"
                     >
                        {ctaText}
                     </button>
                     
                     <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-[10px] md:text-xs text-neutral-500 uppercase tracking-wide">
                        {trustBadges.map((badge, idx) => (
                           <span key={idx} className="flex items-center gap-1">
                              {badge.includes('✓') ? <Check className="w-3 h-3 text-green-600" /> : null}
                              {badge.replace('✓', '')}
                           </span>
                        ))}
                     </div>
                  </div>
              </div>

              {/* Hero Image */}
              <div className="flex-1 w-full relative">
                  <div className="relative aspect-[4/5] md:aspect-square max-w-md mx-auto">
                     <div className="absolute inset-0 border-[12px] border-white shadow-2xl z-20">
                        <img src={heroImage} alt="Pet Portrait Example" className="w-full h-full object-cover" />
                     </div>
                     {/* Decorative Frame */}
                     <div className="absolute -inset-4 border-2 border-[#D4C5A5] z-10"></div>
                     <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#D4C5A5]/20 rounded-full blur-xl z-0"></div>
                  </div>
              </div>
          </div>
       </div>
    </div>
  );
};
