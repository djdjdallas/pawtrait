export type AppStage = 'upload' | 'style' | 'processing' | 'result';

export enum PortraitStyle {
  ROYAL_OIL = 'Royal Oil Painting',
  MODERN_PASTEL = 'Modern Pastel',
  RENAISSANCE = 'Vintage Renaissance',
  FASHION = 'Fashion Editorial',
  WATERCOLOR = 'Abstract Watercolor',
  CYBERPUNK = 'Neon Cyberpunk'
}

export interface PetImage {
  originalUrl: string;
  base64: string;
  file: File;
}

export interface GeneratedResult {
  imageUrl: string;
  traits: { subject: string; value: number; fullMark: number }[];
}

export interface StyleOption {
  id: PortraitStyle;
  name: string;
  description: string;
  previewColor: string;
}
