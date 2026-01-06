import React, { useRef, useState } from 'react';
import { Upload, Camera, Image as ImageIcon } from 'lucide-react';

interface UploadStageProps {
  onImageSelected: (base64: string, file: File) => void;
}

export const UploadStage: React.FC<UploadStageProps> = ({ onImageSelected }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelected(reader.result as string, file);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full max-w-4xl flex flex-col md:flex-row gap-12 items-center justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* Left Text */}
      <div className="md:w-1/2 space-y-6 text-center md:text-left">
        <h2 className="text-5xl md:text-7xl font-serif italic leading-tight">
          Immortalize <br/>
          <span className="not-italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 to-neutral-500">Your Muse</span>
        </h2>
        <p className="text-sm font-sans tracking-wide leading-relaxed text-gray-500 max-w-md">
          Upload a photo of your beloved companion. Our AI atelier will re-imagine them in styles ranging from the Royal Courts of Europe to the High Fashion Runways of Paris.
        </p>
        
        <div className="flex gap-4 justify-center md:justify-start pt-4">
            <div className="px-4 py-2 border border-gray-200 text-xs uppercase tracking-widest rounded-full">One Pet Only</div>
            <div className="px-4 py-2 border border-gray-200 text-xs uppercase tracking-widest rounded-full">Good Lighting</div>
        </div>
      </div>

      {/* Right Upload Area */}
      <div 
        className={`md:w-1/2 w-full aspect-[4/5] max-w-md relative group transition-all duration-500 ${isDragging ? 'scale-105' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Frame Decoration */}
        <div className="absolute inset-0 border-[1px] border-gray-300 transform translate-x-2 translate-y-2 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4"></div>
        <div className="absolute inset-0 border-[1px] border-gray-800 bg-white shadow-xl overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-50 transition-colors"
             onClick={() => inputRef.current?.click()}>
            
            <input 
                type="file" 
                ref={inputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
            />

            <div className="relative z-10 p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-neutral-100 rounded-full flex items-center justify-center border border-neutral-200 group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-6 h-6 text-neutral-600" />
                </div>
                <div>
                    <h3 className="text-xl font-serif mb-1">Upload Portrait</h3>
                    <p className="text-xs font-sans text-gray-400 uppercase tracking-widest">or drag and drop</p>
                </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-gray-400"></div>
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-gray-400"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-gray-400"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-gray-400"></div>
        </div>
      </div>
    </div>
  );
};
