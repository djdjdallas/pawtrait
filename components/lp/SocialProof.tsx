import React from 'react';
import { Star } from 'lucide-react';

interface SocialProofProps {
  headline: string;
  rating: string;
  reviewCount: string;
}

export const SocialProof: React.FC<SocialProofProps> = ({ headline, rating, reviewCount }) => {
  return (
    <div className="bg-white border-y border-neutral-100 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
         <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-[#2C2C2C] text-[#2C2C2C]" />
            ))}
         </div>
         <p className="font-sans text-sm md:text-base text-neutral-800 font-medium">
            <span className="font-bold">{rating}/5</span> based on <span className="underline decoration-neutral-300">{reviewCount} reviews</span>
         </p>
         <div className="hidden md:block w-1 h-1 bg-neutral-300 rounded-full"></div>
         <p className="font-serif italic text-neutral-600">"{headline}"</p>
      </div>
    </div>
  );
};
