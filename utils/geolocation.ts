import { Region } from '../types';
import { REGIONS } from './pricing';

export async function detectRegion(): Promise<Region> {
  // 1. Check localStorage
  const saved = localStorage.getItem('pawtrait_region');
  if (saved && Object.keys(REGIONS).includes(saved)) {
    return saved as Region;
  }

  // 2. Try IP Geolocation
  try {
    // Using ipapi.co as it offers a free tier (1000 requests/day) or ip-api.com
    // Using ip-api.com here as requested
    const response = await fetch('http://ip-api.com/json/?fields=countryCode');
    if (response.ok) {
        const data = await response.json();
        const countryCode = data.countryCode;

        const countryToRegion: Record<string, Region> = {
            'US': 'US',
            'GB': 'UK',
            'AU': 'AU',
            'CA': 'CA',
        };

        if (countryToRegion[countryCode]) {
            return countryToRegion[countryCode];
        }
    }
  } catch (error) {
    console.warn("Geolocation failed, falling back to browser language");
  }

  // 3. Fallback to Browser Language
  const lang = navigator.language;
  if (lang.includes('GB') || lang.includes('UK')) return 'UK';
  if (lang.includes('AU')) return 'AU';
  if (lang.includes('CA')) return 'CA';

  // Default to US
  return 'US';
}
