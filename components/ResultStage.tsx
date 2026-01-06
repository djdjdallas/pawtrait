import React from 'react';
import { GeneratedResult, PortraitStyle } from '../types';
import { Download, RefreshCw, ShoppingBag } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface ResultStageProps {
  result: GeneratedResult;
  style: PortraitStyle;
  onReset: () => void;
}

export const ResultStage: React.FC<ResultStageProps> = ({ result, style, onReset }) => {
  
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = result.imageUrl;
    link.download = `pawtrait-${style.toLowerCase().replace(' ', '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-12 items-center lg:items-start animate-in fade-in duration-1000">
        
        {/* Left: The Masterpiece */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="relative p-6 bg-white shadow-2xl border border-neutral-200">
                <div className="absolute top-0 left-0 w-full h-full border-t border-b border-neutral-100 transform scale-x-110 pointer-events-none"></div>
                
                <img src={result.imageUrl} alt="Generated Masterpiece" className="w-full h-auto max-h-[70vh] object-cover shadow-inner" />
                
                <div className="mt-6 text-center">
                    <h2 className="font-serif italic text-2xl text-neutral-800">"{style}"</h2>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 mt-2">Unique Edition • 1 of 1</p>
                </div>
            </div>
        </div>

        {/* Right: Details & Actions */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-12 pt-8">
            
            {/* Analysis Section */}
            <div className="space-y-4">
                <h3 className="text-xl font-serif border-b border-neutral-200 pb-2 inline-block">Subject Analysis</h3>
                <div className="h-64 w-full bg-white border border-neutral-100 p-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={result.traits}>
                        <PolarGrid stroke="#e5e5e5" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10, fontFamily: 'sans-serif' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Pet Traits"
                            dataKey="value"
                            stroke="#2C2C2C"
                            fill="#2C2C2C"
                            fillOpacity={0.1}
                        />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                    Based on our visual analysis, the subject exhibits distinct characteristics suited for the {style} aesthetic. 
                    The composition highlights the unique markings and confident posture.
                </p>
            </div>

            {/* Purchase / Action Section */}
            <div className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="border border-neutral-200 p-4 hover:border-neutral-900 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs uppercase tracking-wider text-neutral-500">Digital</span>
                            <span className="font-serif">$29</span>
                        </div>
                        <p className="text-sm group-hover:underline decoration-1 underline-offset-4">High-Res Download</p>
                    </div>
                    <div className="border border-neutral-200 p-4 bg-neutral-900 text-white cursor-pointer relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-1 bg-white text-black text-[9px] uppercase font-bold">Best Value</div>
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs uppercase tracking-wider opacity-70">Canvas Print</span>
                            <span className="font-serif">$89</span>
                        </div>
                        <p className="text-sm">16x20" Museum Wrap</p>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <button onClick={downloadImage} className="flex-1 flex items-center justify-center gap-2 border border-neutral-300 py-3 hover:bg-neutral-50 transition-colors">
                        <Download className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-widest">Download Preview</span>
                    </button>
                    <button onClick={onReset} className="flex-none px-4 flex items-center justify-center border border-neutral-300 hover:text-red-500 hover:border-red-200 transition-colors">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                 </div>

                 <button className="w-full bg-[#2C2C2C] text-white py-4 flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl">
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest">Proceed to Checkout</span>
                 </button>
            </div>
        </div>
    </div>
  );
};
