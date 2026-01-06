import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface PricingPageProps {
  onCtaClick: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onCtaClick }) => {
  return (
    <div className="w-full max-w-6xl animate-in fade-in slide-in-from-bottom-8 duration-700 py-10">
      
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-5xl font-serif">Commission Rates</h2>
        <p className="text-sm font-sans text-neutral-500 max-w-lg mx-auto leading-relaxed">
            Invest in a timeless tribute. Whether digital or physical, every piece is crafted with the same attention to detail and artistic integrity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 items-stretch">
        
        {/* Digital Tier */}
        <div className="bg-white border border-neutral-200 p-8 flex flex-col hover:shadow-xl transition-shadow duration-300 relative group">
            <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">The Essential</span>
                <h3 className="text-3xl font-serif mt-2 mb-1">Digital</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-serif">$29</span>
                    <span className="text-xs text-neutral-400">USD</span>
                </div>
            </div>

            <ul className="space-y-4 flex-grow mb-8">
                <li className="flex gap-3 text-sm text-neutral-600">
                    <Check className="w-4 h-4 text-neutral-900 flex-shrink-0" />
                    <span>High-Resolution File (4K+)</span>
                </li>
                <li className="flex gap-3 text-sm text-neutral-600">
                    <Check className="w-4 h-4 text-neutral-900 flex-shrink-0" />
                    <span>Suitable for printing up to 24"</span>
                </li>
                <li className="flex gap-3 text-sm text-neutral-600">
                    <Check className="w-4 h-4 text-neutral-900 flex-shrink-0" />
                    <span>Instant Delivery</span>
                </li>
                <li className="flex gap-3 text-sm text-neutral-600">
                    <Check className="w-4 h-4 text-neutral-900 flex-shrink-0" />
                    <span>Personal Usage Rights</span>
                </li>
            </ul>

            <button onClick={onCtaClick} className="w-full py-4 border border-neutral-300 text-xs uppercase tracking-widest hover:bg-neutral-50 transition-colors">
                Select Digital
            </button>
        </div>

        {/* Canvas Tier (Featured) */}
        <div className="bg-[#2C2C2C] text-white p-8 flex flex-col shadow-2xl transform md:-translate-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-white text-black text-[10px] uppercase font-bold px-3 py-1">Most Popular</div>
            
            <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">The Masterpiece</span>
                <h3 className="text-3xl font-serif mt-2 mb-1">Canvas</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-sm text-neutral-400 mr-1">from</span>
                    <span className="text-4xl font-serif">$79</span>
                    <span className="text-xs text-neutral-400">USD</span>
                </div>
            </div>

            <ul className="space-y-4 flex-grow mb-8 border-t border-white/10 pt-6">
                <li className="flex gap-3 text-sm text-neutral-300">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span>Includes Digital File ($29 value)</span>
                </li>
                <li className="flex gap-3 text-sm text-neutral-300">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span>Museum-Grade Canvas</span>
                </li>
                <li className="flex gap-3 text-sm text-neutral-300">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span>1.25" Solid Wood Frame</span>
                </li>
                <li className="flex gap-3 text-sm text-neutral-300">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span>Ready to Hang Hardware</span>
                </li>
                <li className="flex gap-3 text-sm text-neutral-300">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span>Free Worldwide Shipping</span>
                </li>
            </ul>

            <button onClick={onCtaClick} className="w-full py-4 bg-white text-black text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 group">
                Create Canvas <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>

        {/* Size Guide / Detail Tier */}
        <div className="bg-white border border-neutral-200 p-8 flex flex-col hover:shadow-xl transition-shadow duration-300">
            <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Canvas Sizes</span>
                <h3 className="text-3xl font-serif mt-2 mb-1">Dimensions</h3>
                <p className="text-xs text-neutral-500 mt-2">All canvases come with gallery wrapping.</p>
            </div>

            <div className="space-y-6 flex-grow">
                 <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                    <span className="font-serif">12 x 16"</span>
                    <span className="text-sm font-bold">$79</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                    <span className="font-serif">18 x 24"</span>
                    <span className="text-sm font-bold">$99</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                    <span className="font-serif">24 x 36"</span>
                    <span className="text-sm font-bold">$149</span>
                 </div>
                 <p className="text-[10px] text-neutral-400 italic mt-4">
                    All prints are produced using archival inks guaranteed to last 100+ years without fading.
                 </p>
            </div>

            <button onClick={onCtaClick} className="w-full py-4 border border-neutral-300 text-xs uppercase tracking-widest hover:bg-neutral-50 transition-colors mt-8">
                Start Creating
            </button>
        </div>

      </div>
    </div>
  );
};
