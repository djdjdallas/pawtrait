import { Region, RegionConfig, PricingTier } from '../types';

export const REGIONS: Record<Region, RegionConfig> = {
  US: { code: 'US', currency: 'USD', currencySymbol: '$', locale: 'en-US', flagEmoji: '🇺🇸', name: 'United States' },
  UK: { code: 'UK', currency: 'GBP', currencySymbol: '£', locale: 'en-GB', flagEmoji: '🇬🇧', name: 'United Kingdom' },
  AU: { code: 'AU', currency: 'AUD', currencySymbol: '$', locale: 'en-AU', flagEmoji: '🇦🇺', name: 'Australia' },
  CA: { code: 'CA', currency: 'CAD', currencySymbol: '$', locale: 'en-CA', flagEmoji: '🇨🇦', name: 'Canada' },
  OTHER: { code: 'OTHER', currency: 'USD', currencySymbol: '$', locale: 'en-US', flagEmoji: '🌍', name: 'International' }
};

export const PRICING: Record<Region, PricingTier> = {
  US: {
    digital: 29,
    canvas_12x16: 79,
    canvas_18x24: 99,
    canvas_24x36: 149
  },
  UK: {
    digital: 25,
    canvas_12x16: 69,
    canvas_18x24: 89,
    canvas_24x36: 129
  },
  AU: {
    digital: 39,
    canvas_12x16: 99,
    canvas_18x24: 129,
    canvas_24x36: 179
  },
  CA: {
    digital: 35,
    canvas_12x16: 89,
    canvas_18x24: 119,
    canvas_24x36: 169
  },
  OTHER: {
    digital: 29,
    canvas_12x16: 79,
    canvas_18x24: 99,
    canvas_24x36: 149
  }
};

export function formatPrice(amount: number, region: Region): string {
  const config = REGIONS[region];
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
