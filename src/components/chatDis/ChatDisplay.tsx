// components/ChatDisplay.tsx
'use client'; // This directive is crucial for client-side functionality like hooks

import React from "react";
import { useAtom } from "jotai";
import { chatHistoryAtom, isLoadingAtom } from "@/stores/store"; // Adjust path if needed

export default function ChatDisplay() {
  const [chatHistory] = useAtom(chatHistoryAtom);
  const [isLoading] = useAtom(isLoadingAtom);

  // Scroll to bottom whenever history changes
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="chat-display w-full mx-auto p-6 bg-white rounded-3xl flex flex-col space-y-6 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
      {chatHistory.map((msg, index) => (
        <div
          key={index}
          className={`chat-message p-4 rounded-2xl max-w-[85%] relative ${
            msg.role === "user"
              ? "bg-yellow-300 text-gray-800 self-end rounded-br-none" // User message style (stronger yellow!)
              : "bg-yellow-400 text-gray-800 self-start rounded-bl-none" // CookGPT message style (orange!)
          } shadow-lg animate-fade-in`}
        >
          <strong className="block text-sm mb-1">
            {msg.role === "user" ? "You:" : "CookGPT:"}
          </strong>
          <p className="text-base leading-relaxed">{msg.parts[0].text}</p>
        </div>
      ))}
      {isLoading && (
        <div className="loading-indicator text-center text-lg font-semibold text-orange-600 my-4 animate-bounce">
          CookGPT is thinking...
        </div>
      )}
      <div ref={messagesEndRef} /> {/* For auto-scrolling */}
    </div>
  );
}
