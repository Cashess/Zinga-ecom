import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: string;
}

export const generateGingerRecipe = async (
  ingredients: string,
  dietary: string = "None"
): Promise<Recipe | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a world-class chef specializing in spice blends. Create a creative and delicious recipe that specifically features "Zinga Ginger Powder" as a key ingredient.
      
      The user has these available ingredients: "${ingredients}".
      Dietary preferences/restrictions: "${dietary}".
      
      The recipe should be easy to follow but impressive.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Catchy name for the dish" },
            description: { type: Type.STRING, description: "A simplified, appetizing description of the dish" },
            ingredients: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of ingredients with quantities",
            },
            instructions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Step by step cooking instructions",
            },
            prepTime: { type: Type.STRING },
            cookTime: { type: Type.STRING },
            servings: { type: Type.STRING },
            difficulty: { type: Type.STRING, description: "Easy, Medium, or Hard" },
          },
          required: ["title", "description", "ingredients", "instructions", "prepTime", "cookTime"],
        },
      },
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as Recipe;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};