import React from 'react';
import { CreditCard } from 'lucide-react';

interface LandingFooterProps {
  paymentMethods: string[];
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ paymentMethods }) => {
  return (
    <div className="bg-[#FDFBF7] py-12 border-t border-neutral-200 text-center">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
            <h2 className="text-xl tracking-[0.2em] font-bold uppercase text-[#2C2C2C]">Pawtrait<span className="font-light opacity-50">Atelier</span></h2>
            
            <div className="flex justify-center gap-6 text-[10px] uppercase tracking-widest text-neutral-500">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
                <span>Contact Us</span>
            </div>

            <div className="flex justify-center gap-4 text-neutral-300">
                <CreditCard className="w-6 h-6" />
                {/* Icons placeholder since we don't have SVGs for all vendors */}
                <span className="text-xs flex items-center">Secure SSL Checkout</span>
            </div>
            
            <p className="text-[10px] text-neutral-400">© 2024 Pawtrait Atelier. All rights reserved.</p>
        </div>
    </div>
  );
};
