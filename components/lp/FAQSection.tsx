import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQ {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-16 bg-[#FDFBF7]">
       <div className="max-w-3xl mx-auto px-4">
           <h2 className="text-3xl font-serif text-center mb-12">Common Questions</h2>
           
           <div className="space-y-4">
               {faqs.map((faq, idx) => (
                   <div key={idx} className="bg-white border border-neutral-200">
                       <button 
                         onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                         className="w-full flex justify-between items-center p-6 text-left hover:bg-neutral-50 transition-colors"
                       >
                           <span className="font-serif text-lg text-[#2C2C2C]">{faq.q}</span>
                           {openIndex === idx ? <Minus className="w-5 h-5 text-neutral-400" /> : <Plus className="w-5 h-5 text-neutral-400" />}
                       </button>
                       <div className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-48' : 'max-h-0'}`}>
                           <p className="p-6 pt-0 text-neutral-600 text-sm leading-relaxed">
                               {faq.a}
                           </p>
                       </div>
                   </div>
               ))}
           </div>
       </div>
    </div>
  );
};
