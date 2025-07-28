// app/page.tsx
import ChatInput from "@/components/chatInput/ChatInput";
import ChatDisplay from "@/components/chatDis/ChatDisplay";
// No 'use client' needed here if it only imports client components

export default function HomePage() {
  return (
    <div className="app-container md:ml-[20%] md:h-[100vh] m-auto md:w-[70%] mb-20 md:mb-0 w-[100%]">
      <header className="app-header">
        <h1 className="text-3xl">CookGPT</h1>
      </header>
      <main className="app-main">
        <ChatDisplay />
        <ChatInput />
      </main>
    </div>
  );
}
