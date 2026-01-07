import React from 'react';

const TRANSFORMATIONS = [
    {
        before: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80",
        after: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80&fit=crop&sepia=1&contrast=1.2", // Simulating effect
        style: "Royal Oil",
        label: "Sir Barksalot"
    },
    {
        before: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80",
        after: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80&fit=crop&sat=-100",
        style: "Charcoal Sketch",
        label: "Lady Whiskers"
    },
    {
        before: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&q=80",
        after: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&q=80",
        style: "Renaissance",
        label: "Duke of Paws"
    }
];

export const TransformationGallery: React.FC = () => {
  return (
    <div className="py-16 md:py-24 bg-[#FDFBF7]">
       <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-serif text-[#2C2C2C] mb-4">Unbelievable Transformations</h2>
             <p className="text-neutral-500 font-sans">See what's possible with our AI artistry</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {TRANSFORMATIONS.map((item, idx) => (
                <div key={idx} className="group relative">
                    <div className="aspect-[4/5] overflow-hidden relative shadow-lg">
                        {/* Split image effect simulation */}
                        <div className="absolute inset-0 z-10">
                            <img src={item.after} alt="After" className="w-full h-full object-cover" />
                            <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-sm">After</div>
                        </div>
                        <div className="absolute inset-0 z-20 w-1/2 overflow-hidden border-r-2 border-white group-hover:w-0 transition-all duration-500 ease-in-out">
                             <img src={item.before} alt="Before" className="w-full h-full object-cover max-w-none" style={{ width: '200%' }} />
                             <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-sm">Before</div>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <h3 className="font-serif text-lg">{item.label}</h3>
                        <p className="text-xs uppercase tracking-widest text-neutral-400">{item.style}</p>
                    </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};
