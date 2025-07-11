// components/ChatInput.tsx
"use client"; // This directive is crucial for client-side functionality like hooks and input handling

import React from "react";
import { useAtom, useSetAtom } from "jotai";
// Assuming your atoms are now in '@/stores/store' based on your provided code snippet
import { promptAtom, isLoadingAtom, generateContentAtom } from "@/stores/store";

export default function ChatInput() {
  // useAtom allows reading and writing to the promptAtom
  const [prompt, setPrompt] = useAtom(promptAtom);
  // useAtom allows reading the isLoadingAtom
  const [isLoading] = useAtom(isLoadingAtom);
  // useSetAtom allows triggering the generateContentAtom (which handles the API call)
  const generateContent = useSetAtom(generateContentAtom);

  // Define a list of ready phrases in English and Tajik
  const readyPhrases = [
    { en: "What do you want to cook?", tj: "Чӣ пухтан мехоҳед?" },
    { en: "Food for breakfast", tj: "Таом барои наҳорӣ" },
    { en: "Food for dinner", tj: "Таом барои шом" },
    { en: "Easy recipes", tj: "Рецептҳои осон" },
    { en: "Vegetarian dishes", tj: "Таомҳои гиёҳхорӣ" },
    { en: "Quick meals", tj: "Хӯрокҳои зудпаз" },
    { en: "Dessert ideas", tj: "Идеяҳои шириниҳо" },
    { en: "Healthy recipes", tj: "Рецептҳои солим" },
  ];

  // Handles form submission when the send button is clicked or Enter is pressed
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    // Only send if there's a non-empty prompt and not already loading
    if (prompt.trim() && !isLoading) {
      await generateContent(); // Trigger the async atom to send the prompt
    }
  };

  // Handles key presses in the textarea, specifically for submitting on Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // If Enter key is pressed AND Shift key is NOT pressed AND not currently loading
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault(); // Prevent adding a new line in the textarea
      handleSubmit(e); // Call the submit handler
    }
  };

  // Handles click on a ready phrase button
  const handlePhraseClick = async (phrase: string) => {
    setPrompt(phrase); // Fill the input field with the phrase
    // Automatically trigger the search after a short delay to allow state update
    if (!isLoading) {
      // Small delay to ensure prompt state updates before generateContent reads it
      setTimeout(async () => {
        await generateContent();
      }, 50);
    }
  };

  return (
    <div className="w-full">
      {" "}
      {/* Wrapper div for layout */}
      {/* AI is thinking... indicator */}
      {isLoading && (
        <div className="text-center text-sm text-gray-600 mb-2 animate-pulse">
          AI is thinking...
        </div>
      )}
      {/* Ready Phrases List */}
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {readyPhrases.map((phrase, index) => (
          <button
            key={index}
            onClick={() => handlePhraseClick(phrase.tj)} // Using Tajik phrase for the input
            className="rounded-full bg-gray-200 px-4 py-2 text-sm text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {phrase.tj} {/* Display Tajik phrase on the button */}
          </button>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="chat-input-form flex items-end gap-3"
      >
        {/* AI Icon */}
        <div className="flex-shrink-0 mb-2">
        </div>

        {/* This is the input field where you can type your message */}
        <textarea
          value={prompt} // Binds the textarea's value to the 'prompt' atom
          onChange={(e) => setPrompt(e.target.value)} // Updates the 'prompt' atom as you type
          onKeyDown={handleKeyDown} // Listens for key presses (like Enter)
          placeholder="Type your message here..." // Text displayed when the textarea is empty
          rows={4} // Sets the initial visible height of the textarea
          disabled={isLoading} // Disables the textarea when a response is being generated
          className="flex-grow p-3 border border-gray-300 h-[20px] resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-y"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
