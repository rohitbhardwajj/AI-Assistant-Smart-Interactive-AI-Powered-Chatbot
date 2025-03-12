const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyDWqj6QHM2u0EyaE_nVueWbOfPPQKYRUN8"; // Apni actual API key yahan daal

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Explain how AI works";

async function generateResponse() {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
}

 generateResponse().catch(console.error);
