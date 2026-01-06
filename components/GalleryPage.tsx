import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PortraitStyle } from '../types';

interface GalleryPageProps {
  onCtaClick: () => void;
}

const galleryItems = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop',
    style: PortraitStyle.ROYAL_OIL,
    title: 'The Duke of Wiggles',
    span: 'row-span-2'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop',
    style: PortraitStyle.MODERN_PASTEL,
    title: 'Minimalist Whiskers',
    span: 'row-span-1'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop',
    style: PortraitStyle.FASHION,
    title: 'Vogue Edition',
    span: 'row-span-1'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=600&auto=format&fit=crop',
    style: PortraitStyle.RENAISSANCE,
    title: 'Study of a Hound',
    span: 'row-span-2'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=600&auto=format&fit=crop',
    style: PortraitStyle.CYBERPUNK,
    title: 'Neon Paws',
    span: 'row-span-1'
  },
];

export const GalleryPage: React.FC<GalleryPageProps> = ({ onCtaClick }) => {
  return (
    <div className="w-full max-w-7xl animate-in fade-in duration-700 pb-20 pt-10">
      
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-5xl md:text-6xl font-serif italic">Curated Collection</h2>
        <p className="text-sm font-sans tracking-wide text-neutral-500 uppercase">Selected works from the Atelier</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {galleryItems.map((item) => (
          <div key={item.id} className={`relative group overflow-hidden bg-neutral-100 ${item.span} min-h-[300px]`}>
            {/* Image Container */}
            <div className="w-full h-full transform transition-transform duration-700 group-hover:scale-105">
                <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover filter contrast-[0.9] sepia-[0.1]" 
                />
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/60 transition-colors duration-500 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100">
                <span className="text-white font-serif italic text-2xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">{item.title}</span>
                <span className="text-neutral-300 text-[10px] uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">{item.style}</span>
            </div>
            
            {/* Frame Border */}
            <div className="absolute inset-0 border-[12px] border-white pointer-events-none"></div>
            <div className="absolute inset-0 border border-neutral-200 m-3 pointer-events-none opacity-50"></div>
          </div>
        ))}

        {/* Call to Action Block */}
        <div className="bg-[#2C2C2C] text-white p-8 flex flex-col justify-center items-center text-center space-y-6 relative overflow-hidden group cursor-pointer row-span-1" onClick={onCtaClick}>
             <div className="absolute inset-0 bg-neutral-800 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
             <div className="relative z-10 space-y-6">
                 <h3 className="font-serif text-3xl">Your Muse Awaits</h3>
                 <p className="text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto">
                    Join the ranks of nobility. Transform your pet into a timeless masterpiece today.
                 </p>
                 <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border-b border-white pb-1">
                    Start Commission <ArrowRight className="w-3 h-3" />
                 </div>
             </div>
        </div>
      </div>

    </div>
  );
};
