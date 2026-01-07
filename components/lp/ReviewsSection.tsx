import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Review {
  name: string;
  location: string;
  rating: number;
  text: string;
  petType: string;
  style: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <div className="py-16 bg-white">
       <div className="max-w-6xl mx-auto px-4">
           <h2 className="text-3xl font-serif text-center mb-12">Hear From Our Community</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {reviews.map((review, idx) => (
                   <div key={idx} className="bg-[#FDFBF7] p-8 relative">
                       <Quote className="absolute top-6 right-6 w-8 h-8 text-neutral-200" />
                       <div className="flex gap-1 mb-4">
                           {[...Array(review.rating)].map((_, i) => (
                               <Star key={i} className="w-4 h-4 fill-[#2C2C2C] text-[#2C2C2C]" />
                           ))}
                       </div>
                       <p className="font-sans text-neutral-600 text-sm leading-relaxed mb-6 relative z-10">
                           "{review.text}"
                       </p>
                       <div className="border-t border-neutral-200 pt-4">
                           <p className="font-serif font-bold text-[#2C2C2C]">{review.name}</p>
                           <p className="text-xs text-neutral-400 uppercase tracking-wide">{review.location} • {review.petType} in {review.style}</p>
                       </div>
                   </div>
               ))}
           </div>
       </div>
    </div>
  );
};
