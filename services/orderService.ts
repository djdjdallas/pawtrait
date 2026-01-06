import { CanvasSize, ProductType } from "../types";

export const getPrice = (type: ProductType, size?: CanvasSize): number => {
  if (type === 'digital') return 29;
  
  switch (size) {
    case '12x16': return 79;
    case '18x24': return 99;
    case '24x36': return 149;
    default: return 79;
  }
};

export const getProductLabel = (type: ProductType, size?: CanvasSize): string => {
  if (type === 'digital') return "High-Resolution Digital Download";
  return `${size}" Museum Quality Canvas`;
};

export const getDeliveryEstimate = (type: ProductType): string => {
  if (type === 'digital') return "Instant Delivery via Email";
  return "5-7 Business Days";
};
