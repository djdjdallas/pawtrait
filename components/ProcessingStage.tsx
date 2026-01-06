import React, { useEffect, useState } from 'react';

const phrases = [
    "Mixing paints...",
    "Studying facial geometry...",
    "Applying base coat...",
    "Refining brushstrokes...",
    "Adjusting lighting...",
    "Adding signature..."
];

export const ProcessingStage: React.FC = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex(prev => (prev + 1) % phrases.length);
    }, 2500);

    const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 0.5, 99));
    }, 100);

    return () => {
        clearInterval(interval);
        clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Decorative Circles */}
        <div className="absolute inset-0 border border-neutral-200 rounded-full animate-spin [animation-duration:10s]"></div>
        <div className="absolute inset-4 border border-dashed border-neutral-300 rounded-full animate-spin [animation-duration:15s] [animation-direction:reverse]"></div>
        
        {/* Center Percentage */}
        <div className="text-5xl font-serif text-neutral-900">
            {Math.floor(progress)}<span className="text-lg align-top">%</span>
        </div>
      </div>

      <div className="mt-12 h-8 overflow-hidden relative">
        <p key={phraseIndex} className="text-sm font-sans uppercase tracking-[0.3em] text-neutral-500 animate-in slide-in-from-bottom-4 fade-in duration-500 absolute w-full text-center">
            {phrases[phraseIndex]}
        </p>
      </div>
      
      <div className="mt-4 w-64 h-[1px] bg-neutral-200 overflow-hidden">
        <div className="h-full bg-neutral-800 transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};
