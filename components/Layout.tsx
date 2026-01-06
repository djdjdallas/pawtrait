import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C2C2C] font-serif selection:bg-[#D4C5A5] selection:text-white overflow-x-hidden">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40">
        <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 border border-[#2C2C2C] rotate-45 group-hover:rotate-0 transition-transform duration-500 bg-[#2C2C2C]"></div>
            <h1 className="text-xl tracking-[0.2em] font-bold uppercase">Pawtrait<span className="font-light opacity-50">Atelier</span></h1>
        </div>
        <div className="hidden md:flex gap-8 text-xs tracking-widest uppercase font-sans">
            <span className="hover:line-through cursor-pointer">Gallery</span>
            <span className="hover:line-through cursor-pointer">Pricing</span>
            <span className="hover:line-through cursor-pointer">About</span>
        </div>
      </nav>

      <main className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-12">
        {children}
      </main>

      <footer className="fixed bottom-6 left-6 text-[10px] uppercase tracking-widest opacity-40 font-sans hidden md:block">
        Est. 2024 — Powered by Gemini AI
      </footer>
    </div>
  );
};
