import React, { useEffect } from 'react';
import { LandingHero } from '../components/lp/LandingHero';
import { SocialProof } from '../components/lp/SocialProof';
import { TransformationGallery } from '../components/lp/TransformationGallery';
import { HowItWorks } from '../components/lp/HowItWorks';
import { PricingSection } from '../components/lp/PricingSection';
import { ReviewsSection } from '../components/lp/ReviewsSection';
import { FAQSection } from '../components/lp/FAQSection';
import { FinalCTA } from '../components/lp/FinalCTA';
import { LandingFooter } from '../components/lp/LandingFooter';
import { StickyMobileCTA } from '../components/lp/StickyMobileCTA';
import { captureUTMParams } from '../utils/utm';
import { Region } from '../types';

interface LandingPageProps {
  content: any;
  region: Region;
}

export const LandingPage: React.FC<LandingPageProps> = ({ content, region }) => {
  
  useEffect(() => {
    // Capture UTM parameters on mount
    captureUTMParams();
    
    // Update document title
    document.title = `Pawtrait Atelier | ${content.hero.headline}`;
  }, [content]);

  const handleCtaClick = () => {
    // Save region preference
    localStorage.setItem('pawtrait_region', region);
    
    // Redirect to main app
    window.location.href = `/?region=${region}&from=lp`;
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#2C2C2C] selection:bg-[#D4C5A5] selection:text-white pb-20 md:pb-0">
       <LandingHero 
         {...content.hero} 
         heroImage="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800"
         onCtaClick={handleCtaClick}
       />
       <SocialProof {...content.socialProof} />
       <TransformationGallery />
       <HowItWorks />
       <PricingSection 
         {...content.pricing} 
         shippingText={content.shipping.text}
         onCtaClick={handleCtaClick}
       />
       <ReviewsSection reviews={content.reviews} />
       <FAQSection faqs={content.faqs} />
       <FinalCTA 
         ctaText={content.hero.ctaText} 
         urgencyText={content.urgency.text}
         onCtaClick={handleCtaClick}
       />
       <LandingFooter paymentMethods={content.paymentMethods} />
       <StickyMobileCTA ctaText={content.hero.ctaText} onCtaClick={handleCtaClick} />
    </div>
  );
};
