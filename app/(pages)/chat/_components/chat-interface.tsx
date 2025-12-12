"use client";

import { useState } from "react";

export default function ChatInterface() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi! I'm Samuel's AI clone. Ask me anything about his work, skills, or projects!", isUser: false }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { text: data.response, isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble responding right now.", isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="border border-zinc-700/50 rounded-[20px] p-6 min-h-[400px] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-[16px] ${
                msg.isUser 
                  ? 'bg-zinc-800 text-text-normal' 
                  : 'bg-zinc-800/50 text-text-normal border border-zinc-700/30'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-zinc-800/50 text-text-normal p-4 rounded-[16px] border border-zinc-700/30">
                <p className="text-sm">Typing...</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-zinc-700/30">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 bg-zinc-800/30 text-text-normal p-3 rounded-[12px] border border-zinc-700/50 focus:border-text-heading/50 focus:outline-none transition-colors"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-zinc-700 text-text-normal px-6 py-3 rounded-[12px] font-medium hover:bg-zinc-600 disabled:opacity-50 transition-colors"
          >
            Send
          </button>
        </div>
      </div>

      <div className="text-text-normal/60 text-sm">
        <p>💡 Try asking: "What are your skills?", "Tell me about your projects", or "How can I work with you?"</p>
      </div>
    </div>
  );
}