import React, { useState, useEffect } from 'react';
import { GeneratedResult, PortraitStyle, ProductType, CanvasSize } from '../types';
import { Download, RefreshCw, ShoppingBag, Check, ChevronRight } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { getPrice, getProductLabel, getDeliveryEstimate } from '../services/orderService';
import { createCheckoutSession } from '../services/stripeService';

interface ResultStageProps {
  result: GeneratedResult;
  style: PortraitStyle;
  onReset: () => void;
}

export const ResultStage: React.FC<ResultStageProps> = ({ result, style, onReset }) => {
  const [productType, setProductType] = useState<ProductType>('canvas'); // Default to canvas for upsell
  const [size, setSize] = useState<CanvasSize>('18x24');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    // Check for success param from Stripe redirect
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      setOrderSuccess(true);
    }
  }, []);

  const price = getPrice(productType, size);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      await createCheckoutSession({
        productType,
        size: productType === 'canvas' ? size : undefined,
        imageUrl: result.imageUrl,
        style,
        price
      });
    } catch (error) {
      console.error("Checkout failed", error);
      setIsCheckingOut(false);
      alert("Checkout failed. Please try again.");
    }
  };

  const downloadPreview = () => {
    const link = document.createElement('a');
    link.href = result.imageUrl;
    link.download = `pawtrait-preview-${style.toLowerCase().replace(' ', '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (orderSuccess) {
    return (
      <div className="w-full max-w-2xl text-center py-20 animate-in fade-in zoom-in duration-700">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
           <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-4xl font-serif mb-4">A Masterpiece Awaits</h2>
        <p className="text-neutral-500 font-sans max-w-md mx-auto leading-relaxed mb-8">
          Thank you for your patronage. Your order has been confirmed. 
          {productType === 'digital' 
            ? " Your high-resolution file is ready for download." 
            : " Our artisans have begun crafting your canvas. You will receive tracking information shortly."}
        </p>
        <div className="flex justify-center gap-4">
            <button onClick={downloadPreview} className="px-8 py-3 bg-[#2C2C2C] text-white text-xs uppercase tracking-widest hover:bg-black transition-colors">
                Download Artwork
            </button>
            <button onClick={() => { setOrderSuccess(false); onReset(); }} className="px-8 py-3 border border-neutral-300 text-xs uppercase tracking-widest hover:bg-neutral-50 transition-colors">
                Create Another
            </button>
        </div>
      </div>
    );
  }

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
            
            <div className="mt-8 w-full max-w-md">
                <div className="h-48 w-full bg-transparent p-4 opacity-50">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={result.traits}>
                        <PolarGrid stroke="#e5e5e5" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#999', fontSize: 9, fontFamily: 'sans-serif' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Pet Traits" dataKey="value" stroke="#2C2C2C" fill="#2C2C2C" fillOpacity={0.1} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Right: Details & Actions */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-10 pt-4">
            
            <div className="border-b border-neutral-200 pb-4">
                <h1 className="text-3xl font-serif text-[#2C2C2C]">Acquire This Piece</h1>
                <p className="text-xs font-sans text-neutral-400 uppercase tracking-widest mt-2">Configure your edition</p>
            </div>

            {/* Product Type Selection */}
            <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest font-bold text-neutral-800">1. Select Medium</span>
                <div className="grid grid-cols-2 gap-4">
                    <div 
                        onClick={() => setProductType('digital')}
                        className={`p-4 border cursor-pointer transition-all ${productType === 'digital' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-400'}`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-medium">Digital Download</span>
                            <span className="font-serif italic">$29</span>
                        </div>
                        <p className="text-xs text-neutral-500 leading-relaxed">High-resolution file suitable for printing up to 24x36". Instant delivery.</p>
                    </div>

                    <div 
                        onClick={() => setProductType('canvas')}
                        className={`p-4 border cursor-pointer transition-all relative overflow-hidden ${productType === 'canvas' ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 hover:border-neutral-400'}`}
                    >
                        <div className="absolute top-0 right-0 p-1 bg-white text-black text-[9px] uppercase font-bold px-2">Best Value</div>
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-medium">Museum Canvas</span>
                            <span className="font-serif italic text-neutral-300">from $79</span>
                        </div>
                        <p className={`text-xs leading-relaxed ${productType === 'canvas' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                            Hand-stretched over solid wood frames. Archival quality inks. Ready to hang.
                        </p>
                    </div>
                </div>
            </div>

            {/* Size Selection (Only if Canvas) */}
            <div className={`space-y-4 transition-all duration-500 overflow-hidden ${productType === 'canvas' ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                <span className="text-xs uppercase tracking-widest font-bold text-neutral-800">2. Select Dimensions</span>
                <div className="flex gap-3">
                    {(['12x16', '18x24', '24x36'] as CanvasSize[]).map((s) => (
                        <button
                            key={s}
                            onClick={() => setSize(s)}
                            className={`flex-1 py-3 border text-xs uppercase tracking-widest transition-all ${size === s ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 hover:border-neutral-400'}`}
                        >
                            {s}"
                        </button>
                    ))}
                </div>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest text-right">
                    Depth: 1.25" • Hardware Included
                </p>
            </div>

            {/* Summary & Checkout */}
            <div className="bg-[#FDFBF7] p-6 border border-neutral-200 space-y-4">
                <div className="flex justify-between items-end border-b border-neutral-200 pb-4">
                    <div>
                        <h3 className="font-serif text-lg">{getProductLabel(productType, size)}</h3>
                        <p className="text-xs text-neutral-500 mt-1">{getDeliveryEstimate(productType)}</p>
                    </div>
                    <div className="text-3xl font-serif">
                        ${price}
                    </div>
                </div>

                <div className="pt-2">
                    <button 
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="w-full bg-[#2C2C2C] text-white py-4 flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl disabled:opacity-70 disabled:cursor-wait"
                    >
                        {isCheckingOut ? (
                            <span className="animate-pulse">Processing...</span>
                        ) : (
                            <>
                                <ShoppingBag className="w-4 h-4" />
                                <span className="text-xs uppercase tracking-widest">Proceed to Checkout</span>
                            </>
                        )}
                    </button>
                    <p className="text-[10px] text-neutral-400 text-center mt-3">
                        Secure Payment via Stripe • 100% Satisfaction Guarantee
                    </p>
                </div>
            </div>

            <div className="flex justify-between pt-4">
                 <button onClick={downloadPreview} className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors">
                    <Download className="w-3 h-3" /> Download Watermarked Preview
                 </button>
                 <button onClick={onReset} className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-red-600 transition-colors">
                    <RefreshCw className="w-3 h-3" /> Start Over
                 </button>
            </div>

        </div>
    </div>
  );
};
