"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send } from "lucide-react";

interface Message {
  id: number;
  sender: "bot" | "user";
  text: string;
  time?: string;
  usedRAG?: boolean;
  sourcesCount?: number;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Hello! I'm AyurBot, your AI assistant for Ayurveda, yoga, and holistic wellness. I have access to traditional knowledge about doshas, herbs, treatments, meditation, and natural health practices. How can I help you today?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setLoading(true);

    try {
      console.log("🚀 Sending request to /api/chat with question:", input);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: input,
          history: messages.map((msg) => ({
            sender: msg.sender,
            text: msg.text,
          })),
        }),
      });
      console.log("📡 Response status:", res.status);

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      console.log("📦 Response data:", data);

      if (data.error) {
        console.error("API returned error:", data.error, data.details);
        throw new Error(
          data.error + (data.details ? ` (${data.details})` : "")
        );
      }

      const botMsg: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.answer || "Sorry, I couldn't find an answer.",
        usedRAG: data.usedRAG || false,
        sourcesCount: data.sourcesCount || 0,
      };

      // Add fallback notice if needed
      if (data.fallback) {
        botMsg.text +=
          "\n\n💡 *Note: I'm currently running in fallback mode due to AI service issues.*";
      }
      setMessages((prev) => [...prev, botMsg]);
    } catch (error: any) {
      console.error("Chatbot error:", error);

      let errorMessage =
        "⚠️ Sorry, I'm having trouble right now. Please try again.";

      if (error.message.includes("API key")) {
        errorMessage =
          "⚠️ Configuration issue detected. Please contact support.";
      } else if (error.message.includes("quota")) {
        errorMessage =
          "⚠️ Service temporarily unavailable. Please try again later.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: "bot",
          text: errorMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[85vh] bg-gray-50 dark:bg-gray-800 rounded-lg shadow dark:shadow-xl p-4 border dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-2 text-black dark:text-gray-100">
        AI Health Assistant
      </h2>
      <div className="flex-1 overflow-y-auto space-y-4 p-2 text-black dark:text-gray-100">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" ? (
              <div className="bg-white dark:bg-gray-700 shadow dark:shadow-lg p-3 rounded-lg max-w-[70%] text-sm border dark:border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2 text-green-700 dark:text-green-400 font-medium">
                    <Bot size={14} /> AyurBot
                  </span>
                </div>
                <p className="text-gray-900 dark:text-gray-100">{msg.text}</p>
              </div>
            ) : (
              <div className="bg-green-600 dark:bg-green-500 text-white p-3 rounded-lg max-w-[70%] text-sm">
                {msg.text}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="text-gray-400 dark:text-gray-500 text-sm space-y-1">
            <p>🔍 Searching Ayurvedic knowledge base...</p>
            <p>AyurBot is preparing your response...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-3 flex gap-2">
        <input
          type="text"
          placeholder="Ask about doshas, herbs, treatments, yoga, meditation..."
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 text-black dark:text-gray-100 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          disabled={loading}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
