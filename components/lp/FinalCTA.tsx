import React from 'react';

interface FinalCTAProps {
  ctaText: string;
  urgencyText?: string;
  guaranteeText?: string;
  onCtaClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ ctaText, urgencyText, guaranteeText = "100% Satisfaction Guarantee", onCtaClick }) => {
  return (
    <div className="py-20 bg-white text-center">
       <div className="max-w-2xl mx-auto px-4 space-y-8">
           {urgencyText && (
               <div className="inline-block bg-red-50 text-red-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest animate-pulse">
                   {urgencyText}
               </div>
           )}
           <h2 className="text-4xl md:text-5xl font-serif">Ready to Immortalize Your Pet?</h2>
           <p className="text-neutral-500 font-sans max-w-lg mx-auto">
               Join thousands of happy pet parents. Create a preview for free in less than 2 minutes.
           </p>
           
           <button 
                onClick={onCtaClick}
                className="bg-[#2C2C2C] text-white px-10 py-5 text-sm md:text-base uppercase tracking-widest hover:bg-black transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 w-full md:w-auto"
            >
                {ctaText}
            </button>
            
            <p className="text-xs text-neutral-400 uppercase tracking-widest pt-4 border-t border-neutral-100 inline-block">
                {guaranteeText}
            </p>
       </div>
    </div>
  );
};
