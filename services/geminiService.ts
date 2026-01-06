import { GoogleGenAI } from "@google/genai";
import { PortraitStyle } from "../types";

const getSystemInstruction = () => `
You are a world-class digital artist and pet portraitist. 
Your goal is to transform a provided pet photo into a specific artistic style.
You must maintain the key physical features of the pet (fur color, eye shape, distinct markings) so it remains recognizable, 
but completely transform the lighting, background, and texture to match the requested art style.
`;

const getPromptForStyle = (style: PortraitStyle): string => {
  switch (style) {
    case PortraitStyle.ROYAL_OIL:
      return "Transform this pet into a 18th-century royal oil painting. Dress the pet in regal victorian clothing (a ruff, a velvet robe, or military attire appropriate for a pet). The background should be a dark, moody luxury interior. Heavy brushstrokes, chiaroscuro lighting, museum quality masterpiece.";
    case PortraitStyle.MODERN_PASTEL:
      return "Create a modern, minimal pop-art style portrait. Use soft pastel colors (mint, coral, cream). Flat lighting, clean lines, vector art aesthetic. Isolate the pet on a solid or simple geometric background. High fashion, cute, and contemporary.";
    case PortraitStyle.RENAISSANCE:
      return "A vintage renaissance painting style. Soft, warm lighting, cracked varnish texture, earthy tones (sienna, umber, gold). The pet should look noble and serious. Background of a tuscan landscape or dark drapery. Leonardo da Vinci style sketches underneath.";
    case PortraitStyle.FASHION:
      return "High-fashion editorial photography. Vogue magazine style. Dramatic studio lighting, sharp focus, glossy finish. The pet should look like a supermodel. Monochrome or high contrast vivid colors. Chic, elegant, expensive look.";
    case PortraitStyle.WATERCOLOR:
      return "Abstract watercolor painting. Wet-on-wet technique, paint splashes, bleeding edges. Dreamy, ethereal atmosphere. White paper background with texture visible. Soft, romantic focus.";
    case PortraitStyle.CYBERPUNK:
      return "Futuristic cyberpunk neon style. Glowing blue and pink lights, rain-slicked streets in background. The pet has a holographic aura or high-tech collar. Cinematic, blade runner aesthetic.";
    default:
      return "A high quality artistic portrait of the pet.";
  }
};

export const generatePetPortrait = async (
  base64Image: string,
  style: PortraitStyle
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Clean the base64 string if it has the prefix
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

  try {
    const prompt = getPromptForStyle(style);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', 
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: prompt + " Ensure the output is a high-resolution image."
          }
        ]
      },
      config: {
        systemInstruction: getSystemInstruction(),
      }
    });

    // Extract the image from the response
    // The model returns candidates with content parts. We look for inlineData or executable code, 
    // but for 2.5-flash-image it typically returns an inlineData blob if successful.
    for (const candidate of response.candidates || []) {
      for (const part of candidate.content?.parts || []) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image generated in response");

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};

export const generatePetTraits = async (base64Image: string): Promise<{ subject: string; value: number; fullMark: number }[]> => {
    // A fun separate call to analyze the "vibes" of the pet
    if (!process.env.API_KEY) return [];
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image', // Using flash for speed on this metadata analysis
            contents: {
                parts: [
                    { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } },
                    { text: "Analyze this pet's personality based on the photo. Return a JSON array of 5 traits (e.g., Cuteness, Regality, Mischief, Fluffiness, Energy) with a score from 0-100. Format: [{ subject: 'Name', value: 80, fullMark: 100 }]" }
                ]
            }
        });

        const text = response.text || "";
        const jsonMatch = text.match(/\[.*\]/s);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return [
            { subject: 'Cuteness', value: 100, fullMark: 100 },
            { subject: 'Chaos', value: 50, fullMark: 100 },
            { subject: 'Hunger', value: 90, fullMark: 100 },
        ];
    } catch (e) {
        return [{ subject: 'Mystery', value: 100, fullMark: 100 }];
    }
}
