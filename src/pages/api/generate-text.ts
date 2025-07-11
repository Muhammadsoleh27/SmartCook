// pages/api/generate-text.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

type ResponseData = {
  text?: string;
  error?: string;
  details?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt, history } = req.body;

  // --- START DEBUGGING LOGS ---
  console.log('--- API Route Request Received (Full Gemini) ---');
  console.log('Prompt:', prompt);
  console.log('History:', JSON.stringify(history, null, 2)); // Stringify history for better readability
  // --- END DEBUGGING LOGS ---

  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    console.error("ERROR: GEMINI_API_KEY is not set in environment variables.");
    return res.status(500).json({ error: 'Server configuration error: API Key missing.' });
  }

  // Log the first few characters of the API key to confirm it's being read
  console.log('GEMINI_API_KEY (first 5 chars):', API_KEY.substring(0, 5) + '...');

  try {
    // Attempt to initialize GoogleGenerativeAI
    const genAI = new GoogleGenerativeAI(API_KEY);
    console.log('GoogleGenerativeAI initialized.');

    // Use gemini-1.5-flash for faster responses, or gemini-pro for general purpose
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log('Gemini model obtained.');

    const chat = model.startChat({
      history: history || [], // Pass the conversation history
      generationConfig: {
        maxOutputTokens: 200, // Optional: Limit response length
      },
    });
    console.log('Chat session started with history:', JSON.stringify(chat.history, null, 2));

    const result = await chat.sendMessage(prompt);
    const responseText = result.response.text();
    console.log('Gemini response received.');
    console.log('Response Text:', responseText);

    res.status(200).json({ text: responseText });
  } catch (error: any) {
    // This is the most important log. It should show the full error details.
    console.error("--- DETAILED SERVER ERROR (Gemini API Call Failed) ---");
    console.error("Error calling Gemini API:", error);
    if (error.stack) {
      console.error("Error Stack Trace:", error.stack);
    }
    console.error("--- END DETAILED SERVER ERROR ---");
    res.status(500).json({ error: 'Failed to generate content from AI.', details: error.message });
  }
}
