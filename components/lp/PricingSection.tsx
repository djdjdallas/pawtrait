import React from 'react';
import { Check, Star } from 'lucide-react';

interface PricingTier {
  digital: number;
  canvas_12x16: number;
  canvas_18x24: number;
  canvas_24x36: number;
}

interface PricingSectionProps {
  pricing: PricingTier;
  currency: string;
  symbol: string;
  shippingText: string;
  onCtaClick: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ pricing, currency, symbol, shippingText, onCtaClick }) => {
  return (
    <div className="py-16 md:py-24 bg-[#2C2C2C] text-white">
       <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-serif mb-4">Simple, Transparent Pricing</h2>
             <p className="text-neutral-400 font-sans uppercase tracking-widest text-sm">{shippingText}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
             
             {/* Digital */}
             <div className="bg-neutral-800/50 p-8 border border-neutral-700 hover:border-neutral-500 transition-colors">
                 <h3 className="font-serif text-2xl mb-2">Digital Only</h3>
                 <p className="text-neutral-400 text-sm mb-6">High-res download</p>
                 <div className="text-4xl font-serif mb-6">{symbol}{pricing.digital}</div>
                 <button onClick={onCtaClick} className="w-full py-3 border border-neutral-500 hover:bg-neutral-700 transition-colors uppercase text-xs tracking-widest mb-6">Select</button>
                 <ul className="space-y-3 text-sm text-neutral-300">
                    <li className="flex gap-2"><Check className="w-4 h-4" /> Instant Delivery</li>
                    <li className="flex gap-2"><Check className="w-4 h-4" /> Print at home</li>
                 </ul>
             </div>

             {/* Popular Canvas */}
             <div className="bg-white text-[#2C2C2C] p-8 transform md:-translate-y-4 shadow-2xl relative">
                 <div className="absolute top-0 right-0 bg-[#D4C5A5] text-white text-[10px] uppercase font-bold px-3 py-1 flex gap-1 items-center">
                    <Star className="w-3 h-3 fill-white" /> Most Popular
                 </div>
                 <h3 className="font-serif text-2xl mb-2">18 x 24" Canvas</h3>
                 <p className="text-neutral-500 text-sm mb-6">Perfect statement piece</p>
                 <div className="text-4xl font-serif mb-6">{symbol}{pricing.canvas_18x24}</div>
                 <button onClick={onCtaClick} className="w-full py-3 bg-[#2C2C2C] text-white hover:bg-black transition-colors uppercase text-xs tracking-widest mb-6 shadow-lg">Create This</button>
                 <ul className="space-y-3 text-sm text-neutral-600">
                    <li className="flex gap-2"><Check className="w-4 h-4" /> Museum Quality Canvas</li>
                    <li className="flex gap-2"><Check className="w-4 h-4" /> Solid Wood Frame</li>
                    <li className="flex gap-2"><Check className="w-4 h-4" /> Ready to Hang</li>
                    <li className="flex gap-2"><Check className="w-4 h-4" /> Includes Digital File</li>
                 </ul>
             </div>

             {/* Large Canvas */}
             <div className="bg-neutral-800/50 p-8 border border-neutral-700 hover:border-neutral-500 transition-colors">
                 <h3 className="font-serif text-2xl mb-2">24 x 36" Canvas</h3>
                 <p className="text-neutral-400 text-sm mb-6">Large impact</p>
                 <div className="text-4xl font-serif mb-6">{symbol}{pricing.canvas_24x36}</div>
                 <button onClick={onCtaClick} className="w-full py-3 border border-neutral-500 hover:bg-neutral-700 transition-colors uppercase text-xs tracking-widest mb-6">Select</button>
                 <ul className="space-y-3 text-sm text-neutral-300">
                    <li className="flex gap-2"><Check className="w-4 h-4" /> Museum Quality Canvas</li>
                    <li className="flex gap-2"><Check className="w-4 h-4" /> Free Shipping</li>
                 </ul>
             </div>

          </div>
       </div>
    </div>
  );
};
