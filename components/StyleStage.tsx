import React from 'react';
import { PortraitStyle, StyleOption } from '../types';
import { ArrowLeft, ArrowRight, Palette } from 'lucide-react';

interface StyleStageProps {
  selectedStyle: PortraitStyle | null;
  onSelectStyle: (style: PortraitStyle) => void;
  onNext: () => void;
  onBack: () => void;
  previewImage: string;
}

const styles: StyleOption[] = [
  { 
    id: PortraitStyle.ROYAL_OIL, 
    name: 'Royal Oil', 
    description: '18th Century Nobility',
    previewColor: '#4A3B32'
  },
  { 
    id: PortraitStyle.MODERN_PASTEL, 
    name: 'Modern Pastel', 
    description: 'Contemporary Pop Art',
    previewColor: '#E8D5C4'
  },
  { 
    id: PortraitStyle.RENAISSANCE, 
    name: 'Renaissance', 
    description: 'Da Vinci Aesthetic',
    previewColor: '#8C7A6B'
  },
  { 
    id: PortraitStyle.FASHION, 
    name: 'Editorial', 
    description: 'High Fashion Vogue',
    previewColor: '#1A1A1A'
  },
  { 
    id: PortraitStyle.WATERCOLOR, 
    name: 'Watercolor', 
    description: 'Abstract & Dreamy',
    previewColor: '#A5B4C4'
  },
  { 
    id: PortraitStyle.CYBERPUNK, 
    name: 'Cyberpunk', 
    description: 'Neon Future',
    previewColor: '#2D1B4E'
  },
];

export const StyleStage: React.FC<StyleStageProps> = ({ selectedStyle, onSelectStyle, onNext, onBack, previewImage }) => {
  return (
    <div className="w-full max-w-6xl flex flex-col md:flex-row h-[80vh] gap-8 animate-in fade-in duration-700">
      
      {/* Left: Preview */}
      <div className="md:w-1/3 h-full flex flex-col relative">
         <div className="flex-grow relative border-[1px] border-neutral-300 p-2 bg-white shadow-lg">
            <div className="w-full h-full relative overflow-hidden bg-neutral-100">
                 <img src={previewImage} alt="Original" className="w-full h-full object-cover filter sepia-[0.3] contrast-75" />
                 <div className="absolute inset-0 bg-neutral-900/10 pointer-events-none"></div>
                 <div className="absolute bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-sm border-t border-neutral-200">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-500">Subject</p>
                    <p className="font-serif italic text-lg text-neutral-800">Original Composition</p>
                 </div>
            </div>
         </div>
         <button onClick={onBack} className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest hover:text-neutral-500 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Go Back
         </button>
      </div>

      {/* Right: Selection */}
      <div className="md:w-2/3 h-full flex flex-col">
        <div className="mb-8">
            <h2 className="text-4xl font-serif">Curate the Aesthetic</h2>
            <p className="text-sm text-neutral-500 font-sans mt-2">Select a medium for the masterpiece.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pb-20 pr-2 custom-scrollbar">
            {styles.map((style) => (
                <div 
                    key={style.id}
                    onClick={() => onSelectStyle(style.id)}
                    className={`
                        relative group cursor-pointer transition-all duration-300 border
                        ${selectedStyle === style.id 
                            ? 'border-neutral-900 bg-neutral-900 text-white shadow-xl scale-[1.02]' 
                            : 'border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-md'
                        }
                    `}
                >
                    <div className="aspect-[4/3] w-full overflow-hidden p-6 relative">
                         {/* Abstract Color Swatch simulation */}
                         <div className="w-full h-full rounded-full opacity-20 blur-3xl transition-transform duration-700 group-hover:scale-125" style={{ backgroundColor: style.previewColor }}></div>
                         <div className="absolute inset-0 flex items-center justify-center">
                            <Palette className={`w-8 h-8 ${selectedStyle === style.id ? 'text-white' : 'text-neutral-300'}`} />
                         </div>
                    </div>
                    
                    <div className="p-4 border-t border-inherit">
                        <h3 className="font-serif text-lg leading-none mb-1">{style.name}</h3>
                        <p className={`text-[10px] uppercase tracking-wider ${selectedStyle === style.id ? 'text-neutral-400' : 'text-neutral-500'}`}>{style.description}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className="absolute bottom-6 right-6 md:right-12">
            <button 
                onClick={onNext}
                disabled={!selectedStyle}
                className="bg-[#2C2C2C] text-white px-8 py-4 flex items-center gap-4 hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl group"
            >
                <span className="text-xs uppercase tracking-widest">Commence Artistry</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>
    </div>
  );
};
