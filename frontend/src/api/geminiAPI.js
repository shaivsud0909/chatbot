import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyABLlfHwPlfVsR3XBVd72lGw-zZAzHjrvQ";

export default async function generateText(userQuery) {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(userQuery);
    return await result.response.text();
  } catch (error) {
    console.error("API Error:", error);
    return "Error retrieving response.";
  }
}