import React from 'react';
import { Upload, Palette, Sparkles } from 'lucide-react';

const STEPS = [
  { icon: Upload, title: '1. Upload Photo', description: 'Choose your favourite photo of your pet.' },
  { icon: Palette, title: '2. Pick Style', description: 'Royal, Renaissance, Modern & more.' },
  { icon: Sparkles, title: '3. Get Art', description: 'AI creates your masterpiece in seconds.' }
];

export const HowItWorks: React.FC = () => {
  return (
    <div className="py-16 bg-white border-t border-neutral-100">
       <div className="max-w-6xl mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
               {/* Connecting Line (Desktop) */}
               <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[1px] bg-neutral-200 z-0"></div>

               {STEPS.map((step, idx) => (
                   <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                       <div className="w-24 h-24 bg-[#FDFBF7] rounded-full border border-neutral-200 flex items-center justify-center mb-6 shadow-sm group hover:scale-110 transition-transform duration-300">
                           <step.icon className="w-8 h-8 text-[#2C2C2C]" />
                       </div>
                       <h3 className="font-serif text-xl mb-2">{step.title}</h3>
                       <p className="text-sm text-neutral-500 max-w-xs">{step.description}</p>
                   </div>
               ))}
           </div>
       </div>
    </div>
  );
};
