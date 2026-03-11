const { GoogleGenerativeAI } = require("@google/generative-ai");

const client = new GoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY
});

async function getTokenInsight(prompt) {
  const model = client.getGenerativeModel({ model: process.env.AI_MODEL || "gemini-pro" });
  
  const fullPrompt = `You are a crypto analyst. Respond ONLY in valid JSON format.

${prompt}`;

  try {
    const response = await model.generateContent(fullPrompt);
    const text = response.response.text();
    return JSON.parse(text);
  } catch (err) {
    return {
      reasoning: "Unable to parse AI response",
      sentiment: "Neutral"
    };
  }
}

module.exports = { getTokenInsight };
