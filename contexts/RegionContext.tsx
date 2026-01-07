import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Region, RegionConfig, PricingTier, LocalizedCopy } from '../types';
import { REGIONS, PRICING, formatPrice as formatPriceHelper } from '../utils/pricing';
import { COPY } from '../utils/copy';
import { detectRegion } from '../utils/geolocation';

interface RegionContextType {
  region: Region;
  setRegion: (region: Region) => void;
  config: RegionConfig;
  pricing: PricingTier;
  copy: LocalizedCopy;
  formatPrice: (amount: number) => string;
  isLoading: boolean;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export const RegionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [region, setRegionState] = useState<Region>('US'); // Default to US initially
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initRegion = async () => {
      const detected = await detectRegion();
      setRegionState(detected);
      setIsLoading(false);
    };
    initRegion();
  }, []);

  const setRegion = (newRegion: Region) => {
    setRegionState(newRegion);
    localStorage.setItem('pawtrait_region', newRegion);
  };

  const formatPrice = (amount: number) => {
    return formatPriceHelper(amount, region);
  };

  const value = {
    region,
    setRegion,
    config: REGIONS[region],
    pricing: PRICING[region],
    copy: COPY[region],
    formatPrice,
    isLoading
  };

  return (
    <RegionContext.Provider value={value}>
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
};
