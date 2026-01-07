export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

export function captureUTMParams(): UTMParams {
  const params = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};
  
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  
  keys.forEach(key => {
    const value = params.get(key);
    if (value) utm[key as keyof UTMParams] = value;
  });
  
  // Store in sessionStorage for checkout
  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem('utm_params', JSON.stringify(utm));
  }
  
  return utm;
}

export function getStoredUTMParams(): UTMParams {
    try {
        const stored = sessionStorage.getItem('utm_params');
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
}
