import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  "AQ.Ab8RN6LNuwjTT7ZRI0Pc3RABOBCOJUcFwD37eSvuXuiIZTxVAw",
);

export async function generateEvent(prompt) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
    },
  });

  const fullPrompt = `
You are a professional AI event planner.

Your task is to convert the user request into structured JSON for a venue recommendation.

STRICT RULES:
- Return ONLY valid JSON
- Do NOT use markdown or explanation
- Use realistic Indian locations and INR pricing
- Always return exactly 2 image URLs (Unsplash style)
- cost, perPerson, days must be numbers
- amenities must be an array of strings
- only one description with minimum words of 500
- divide total cost by people

User request:
"${prompt}"

Return JSON in this format:

{
  "name": "Venue name",
  "location": "City, State",
  "cost": 300000,
  "perPerson": 30000,
  "days": 3,
  "amenities": ["WiFi", "Pool", "Conference Hall"],
  "images": [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  ],"description": "Why this venue fits the requirement",
}
`;

  try {
    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();
    const data = JSON.parse(text);
    if (
      !data.name ||
      !data.location ||
      !Array.isArray(data.images) ||
      data.images.length === 0
    ) {
      throw new Error("Invalid AI response structure");
    }
    data.images = data.images.slice(0, 2);
    return data;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to generate event");
  }
}

export async function safeGenerateEvent(prompt) {
  const text = prompt.toLowerCase();
  try {
    if (prompt.length < 40) {
      const message = {
        error:
          "Please write more than 40 characters and include budget, days, location and people",
      };
      return message;
    }
    return await generateEvent(text);
  } catch (err) {
    console.log("Retrying Gemini...");
    return await generateEvent(text);
  }
}