// atoms/chat.ts
import { atom } from "jotai";

// Define the type for a chat message part
interface ChatPart {
  text: string;
  // Add other types if you handle images, etc.
}

// Define the type for a chat message
interface ChatMessage {
  role: "user" | "model";
  parts: ChatPart[];
}

// Atom to store the current user input for Gemini
export const promptAtom = atom<string>("");

// Atom to manage loading state during API calls
export const isLoadingAtom = atom<boolean>(false);

// Atom to store chat history (for multi-turn conversations)
export const chatHistoryAtom = atom<ChatMessage[]>([]);

// Define common greeting phrases (case-insensitive)
const GREETING_PHRASES = [
  "hello",
  "hii",
  "hola",
  "whats up",
  "good morning",
  "good afternoon",
  "good evening",
];

const GREETING_PHRASES_TJK = [
  "салом",
  "салом алейкум",
  "эй",
  "саломчӣ",
  "саломҳо",
  "чӣ хабар",
  "субҳ ба хайр",
  "рӯз ба хайр",
  "шом ба хайр",
  "чо кадӣ",
  "чо кади",
];

// Async atom to call the backend API route and update state
export const generateContentAtom = atom(
  null, // This is a write-only atom
  async (get, set) => {
    set(isLoadingAtom, true);
    const currentPrompt = get(promptAtom);
    const currentHistory = get(chatHistoryAtom);

    if (!currentPrompt.trim()) {
      set(isLoadingAtom, false);
      return;
    }

    // Add user's message to history immediately
    set(chatHistoryAtom, (prevHistory) => [
      ...prevHistory,
      { role: "user", parts: [{ text: currentPrompt }] },
    ]);
    set(promptAtom, ""); // Clear input field

    // --- NEW GREETING LOGIC ---
    const lowerCasePrompt = currentPrompt.toLowerCase();
    const isGreeting = GREETING_PHRASES.some((phrase) =>
      lowerCasePrompt.includes(phrase)
    );
    const isGreetingtjk = GREETING_PHRASES_TJK.some((phrase) =>
      lowerCasePrompt.includes(phrase)
    );

    if (isGreeting) {
      const greetingResponse = "Hi there! What do you want to cook today?";
      set(chatHistoryAtom, (prevHistory) => [
        ...prevHistory,
        { role: "model", parts: [{ text: greetingResponse }] },
      ]);
      set(isLoadingAtom, false); // Turn off loading
      return; // Exit the function, no API call needed
    }
    if (isGreetingtjk) {
      const greetingResponse = "Салом! Имрӯз чӣ таом пухтан мехоҳед?";
      set(chatHistoryAtom, (prevHistory) => [
        ...prevHistory,
        { role: "model", parts: [{ text: greetingResponse }] },
      ]);
      set(isLoadingAtom, false); // Turn off loading
      return; // Exit the function, no API call needed
    }
    // --- END NEW GREETING LOGIC ---

    try {
      // Call your Next.js API route
      const response = await fetch("/api/generate-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: currentPrompt,
          history: currentHistory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Something went wrong on the server."
        );
      }

      const data = await response.json();
      const aiText = data.text;

      // Add AI's response to history
      set(chatHistoryAtom, (prevHistory) => [
        ...prevHistory,
        { role: "model", parts: [{ text: aiText }] },
      ]);
    } catch (error: any) {
      console.error("Failed to fetch AI response:", error);
      set(chatHistoryAtom, (prevHistory) => [
        ...prevHistory,
        { role: "model", parts: [{ text: `Error: ${error.message}` }] }, // Add error to chat
      ]);
    } finally {
      set(isLoadingAtom, false);
    }
  }
);
