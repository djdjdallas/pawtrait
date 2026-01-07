import React, { useState, useEffect } from 'react';
import { GeneratedResult, PortraitStyle, ProductType, CanvasSize } from '../types';
import { Download, RefreshCw, ShoppingBag, Check, ChevronRight, Star } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { createCheckoutSession } from '../services/stripeService';
import { useRegion } from '../contexts/RegionContext';

interface ResultStageProps {
  result: GeneratedResult;
  style: PortraitStyle;
  onReset: () => void;
}

interface ProductOption {
    id: string;
    type: ProductType;
    size?: CanvasSize;
    name: string;
    description: string;
    price: number;
    isPopular?: boolean;
}

export const ResultStage: React.FC<ResultStageProps> = ({ result, style, onReset }) => {
  const { region, pricing, formatPrice, copy, config } = useRegion();
  
  // Define available products based on current region pricing
  const products: ProductOption[] = [
    { 
        id: 'digital', 
        type: 'digital', 
        name: 'Digital Download', 
        description: 'High-resolution file sent via email', 
        price: pricing.digital 
    },
    { 
        id: 'canvas-12x16', 
        type: 'canvas', 
        size: '12x16', 
        name: '12 x 16" Canvas', 
        description: 'Gallery wrapped, ready to hang', 
        price: pricing.canvas_12x16 
    },
    { 
        id: 'canvas-18x24', 
        type: 'canvas', 
        size: '18x24', 
        name: '18 x 24" Canvas', 
        description: 'Perfect for living rooms', 
        price: pricing.canvas_18x24,
        isPopular: true
    },
    { 
        id: 'canvas-24x36', 
        type: 'canvas', 
        size: '24x36', 
        name: '24 x 36" Canvas', 
        description: 'Statement piece for large walls', 
        price: pricing.canvas_24x36 
    }
  ];

  // Default to the popular option (18x24 canvas)
  const [selectedProduct, setSelectedProduct] = useState<ProductOption>(products[2]);
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    // Check for success param from Stripe redirect
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      setOrderSuccess(true);
    }
  }, []);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      await createCheckoutSession({
        productType: selectedProduct.type,
        size: selectedProduct.size,
        imageUrl: result.imageUrl,
        style,
        price: selectedProduct.price
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
          {selectedProduct.type === 'digital' 
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

            {/* Product List Selector */}
            <div className="space-y-3">
                {products.map((product) => (
                    <div 
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                        className={`
                            relative flex justify-between items-center p-4 border cursor-pointer transition-all duration-200 group
                            ${selectedProduct.id === product.id 
                                ? 'border-neutral-900 bg-neutral-900 text-white shadow-lg' 
                                : 'border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-sm text-neutral-800'
                            }
                        `}
                    >
                        {product.isPopular && (
                            <div className={`
                                absolute top-0 right-0 transform -translate-y-1/2 translate-x-2 
                                px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider shadow-sm
                                ${selectedProduct.id === product.id ? 'bg-white text-black' : 'bg-neutral-900 text-white'}
                            `}>
                                Popular
                            </div>
                        )}

                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-serif text-lg">{product.name}</h3>
                                {product.isPopular && <Star className="w-3 h-3 fill-current opacity-70" />}
                            </div>
                            <p className={`text-xs ${selectedProduct.id === product.id ? 'text-neutral-400' : 'text-neutral-500'}`}>
                                {product.description}
                            </p>
                        </div>
                        <div className="font-serif text-xl">
                            {formatPrice(product.price)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Shipping Info */}
            <div className="bg-[#FDFBF7] p-4 border border-dashed border-neutral-300 text-center">
                <p className="text-xs text-neutral-600 mb-1 font-bold uppercase tracking-wider">{copy.shippingLabel} to {config.name}</p>
                <p className="text-xs text-neutral-500">{copy.arrivalText}</p>
            </div>

            {/* Checkout Area */}
            <div className="space-y-4">
                <div className="flex justify-between items-end">
                     <div>
                        <p className="text-[10px] uppercase tracking-widest text-neutral-400">Total</p>
                     </div>
                     <div className="text-4xl font-serif text-[#2C2C2C]">
                        {formatPrice(selectedProduct.price)}
                     </div>
                </div>

                <button 
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-[#2C2C2C] text-white py-4 flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl disabled:opacity-70 disabled:cursor-wait group"
                >
                    {isCheckingOut ? (
                        <span className="animate-pulse">Processing...</span>
                    ) : (
                        <>
                            <ShoppingBag className="w-4 h-4" />
                            <span className="text-xs uppercase tracking-widest">Secure Checkout</span>
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -ml-2" />
                        </>
                    )}
                </button>
                <p className="text-[10px] text-neutral-400 text-center">
                    Secure Payment via Stripe • 100% Satisfaction Guarantee
                </p>
            </div>

            <div className="flex justify-between pt-4 border-t border-neutral-100">
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
