
import { GoogleGenAI } from "@google/genai";
import { StylingOptions } from "../types";

export const applyStyleWithAI = async (
  base64Image: string,
  options: StylingOptions
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Transform the person in the provided image.
    Apply a ${options.hairstyle} hairstyle and a ${options.beardStyle} beard style.
    The hair and beard should be colored ${options.color}.
    Maintain the person's original facial features, facial structure, skin tone, and background.
    The output should be a highly realistic, photorealistic portrait that looks like a professional salon or barber shop result.
    Seamlessly blend the new hairstyle and beard onto the person's face.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image.split(',')[1],
          },
        },
        { text: prompt },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No styled image was returned by the AI.");
};
