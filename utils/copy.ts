import { Region, LocalizedCopy } from '../types';

export const COPY: Record<Region, LocalizedCopy> = {
  US: {
    shippingLabel: 'Free shipping',
    arrivalText: 'Arrives in 5-10 business days',
    colorSpelling: 'color',
    favoriteSpelling: 'favorite',
  },
  UK: {
    shippingLabel: 'Free delivery',
    arrivalText: 'Arrives in 5-7 working days',
    colorSpelling: 'colour',
    favoriteSpelling: 'favourite',
  },
  AU: {
    shippingLabel: 'Free delivery',
    arrivalText: 'Arrives in 7-14 working days',
    colorSpelling: 'colour',
    favoriteSpelling: 'favourite',
  },
  CA: {
    shippingLabel: 'Free shipping',
    arrivalText: 'Arrives in 5-10 business days',
    colorSpelling: 'colour',
    favoriteSpelling: 'favourite',
  },
  OTHER: {
    shippingLabel: 'Worldwide shipping',
    arrivalText: 'Arrives in 10-21 business days',
    colorSpelling: 'color',
    favoriteSpelling: 'favorite',
  }
};
