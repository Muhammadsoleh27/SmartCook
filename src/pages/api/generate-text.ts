// pages/api/generate-text.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

type ResponseData = {
  text?: string;
  error?: string;
  details?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { prompt, history } = req.body;

  // --- START DEBUGGING LOGS ---
  console.log("--- API Route Request Received (Full Gemini) ---");
  console.log("Prompt:", prompt);
  console.log("History:", JSON.stringify(history, null, 2));
  // --- END DEBUGGING LOGS ---

  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    console.error("ERROR: GEMINI_API_KEY is not set in environment variables.");
    return res
      .status(500)
      .json({ error: "Server configuration error: API Key missing." });
  }

  console.log(
    "GEMINI_API_KEY (first 5 chars):",
    API_KEY.substring(0, 5) + "..."
  );

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    console.log("GoogleGenerativeAI initialized.");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log("Gemini model obtained.");

    const chat = model.startChat({
      history: history || [],
      generationConfig: {
        maxOutputTokens: 200,
      },
    });
    console.log(
      "Chat session started with history:",
    );

    const result = await chat.sendMessage(prompt);
    const responseText = result.response.text();
    console.log("Gemini response received.");
    console.log("Response Text:", responseText);

    res.status(200).json({ text: responseText });
  } catch (error) {
    console.error("--- DETAILED SERVER ERROR (Gemini API Call Failed) ---");
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
      console.error("Error Stack Trace:", error.stack);
      res.status(500).json({
        error: "Failed to generate content from AI.",
        details: error.message,
      });
    } else {
      res.status(500).json({
        error: "An unknown error occurred.",
        details: JSON.stringify(error),
      });
    }
    console.error("--- END DETAILED SERVER ERROR ---");
  }
}
