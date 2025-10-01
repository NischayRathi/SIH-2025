"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, MessageSquare } from "lucide-react";
import { useSession } from "next-auth/react";
import { useChatContext } from "../ClientDashboardLayout";

interface Message {
  _id?: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
  usedRAG?: boolean;
  sourcesCount?: number;
}

interface ChatSession {
  _id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages?: Message[];
}

export default function ChatbotPage() {
  const { data: session } = useSession();
  const chatContext = useChatContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat sessions on component mount
  useEffect(() => {
    if (session?.user) {
      loadChatSessions();
    }
  }, [session]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadChatSessions = async () => {
    try {
      const res = await fetch("/api/chats");
      if (res.ok) {
        const data = await res.json();
        setChatSessions(data.chatSessions);

        // Auto-select the most recent chat if available
        if (data.chatSessions.length > 0 && !currentChatId) {
          loadChatSession(data.chatSessions[0]._id);
        }
      }
    } catch (error) {
      console.error("Error loading chat sessions:", error);
    } finally {
      setLoadingChats(false);
    }
  };

  const loadChatSession = async (chatId: string) => {
    try {
      const res = await fetch(`/api/chats/${chatId}`);
      if (res.ok) {
        const data = await res.json();
        setCurrentChatId(chatId);
        setMessages(data.chatSession.messages || []);
      }
    } catch (error) {
      console.error("Error loading chat session:", error);
    }
  };

  const createNewChat = async () => {
    try {
      const title = `Chat ${new Date().toLocaleDateString()}`;
      const res = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (res.ok) {
        const data = await res.json();
        await loadChatSessions(); // Refresh the list
        loadChatSession(data.chatSession._id); // Load the new chat
      }
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  const deleteChat = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent chat selection when clicking delete

    if (!confirm("Are you sure you want to delete this chat?")) return;

    try {
      const res = await fetch(`/api/chats/${chatId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await loadChatSessions();

        // If the deleted chat was current, select another one or clear
        if (currentChatId === chatId) {
          const remainingChats = chatSessions.filter(
            (chat) => chat._id !== chatId
          );
          if (remainingChats.length > 0) {
            loadChatSession(remainingChats[0]._id);
          } else {
            setCurrentChatId(null);
            setMessages([]);
          }
        }
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !currentChatId) return;

    const newUserMsg: Message = {
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setLoading(true);

    try {
      // Send message to chat API
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

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const botMsg: Message = {
        sender: "bot",
        text: data.answer || "Sorry, I couldn't find an answer.",
        timestamp: new Date(),
        usedRAG: data.usedRAG || false,
        sourcesCount: data.sourcesCount || 0,
      };

      // Add fallback notice if needed
      if (data.fallback) {
        botMsg.text +=
          "\n\n💡 *Note: I'm currently running in fallback mode due to AI service issues.*";
      }

      setMessages((prev) => [...prev, botMsg]);

      // Save both messages to the chat session
      await fetch(`/api/chats/${currentChatId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newUserMsg }),
      });

      await fetch(`/api/chats/${currentChatId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: botMsg }),
      });

      // Refresh chat sessions to update timestamps
      loadChatSessions();
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

      const errorMsg: Message = {
        sender: "bot",
        text: errorMessage,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMsg]);

      // Save error message too
      if (currentChatId) {
        await fetch(`/api/chats/${currentChatId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: errorMsg }),
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center h-[85vh]">
        <p className="text-gray-600 dark:text-gray-400">
          Please log in to use the chatbot.
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="flex h-screen">
        {/* Sidebar with chat history */}
        <div className="w-80 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col">
          <div className="p-4 border-b dark:border-gray-600">
            <button
              onClick={createNewChat}
              className="w-full flex items-center gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors"
            >
              <Plus size={16} />
              New Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {loadingChats ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Loading chats...
              </div>
            ) : chatSessions.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No chats yet. Create your first chat!
              </div>
            ) : (
              chatSessions.map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => loadChatSession(chat._id)}
                  className={`mb-2 p-3 rounded-lg cursor-pointer transition-colors group ${
                    currentChatId === chat._id
                      ? "bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <MessageSquare
                        size={14}
                        className="text-green-600 dark:text-green-400 flex-shrink-0"
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {chat.title}
                      </span>
                    </div>
                    <button
                      onClick={(e) => deleteChat(chat._id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-all"
                    >
                      <Trash2
                        size={12}
                        className="text-red-500 dark:text-red-400"
                      />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(chat.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
          {currentChatId ? (
            <>
              <div className="p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  AI Health Assistant
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {chatSessions.find((chat) => chat._id === currentChatId)?.title}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.sender === "bot" ? (
                      <div className="bg-white dark:bg-gray-800 shadow-lg p-4 rounded-xl max-w-[70%] border dark:border-gray-700">
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium mb-2">
                          <Bot size={16} /> AyurBot
                        </div>
                        <p className="text-gray-900 dark:text-gray-100 leading-relaxed">
                          {msg.text}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-green-600 dark:bg-green-500 text-white p-4 rounded-xl max-w-[70%] shadow-lg">
                        <p className="leading-relaxed">{msg.text}</p>
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-gray-800 shadow-lg p-4 rounded-xl border dark:border-gray-700">
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium mb-2">
                        <Bot size={16} /> AyurBot
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="animate-spin w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full"></div>
                          <p>Searching Ayurvedic knowledge base...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Ask about doshas, herbs, treatments, yoga, meditation..."
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <button
                    onClick={handleSend}
                    className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    disabled={loading}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900">
              <div className="text-center max-w-md p-8">
                <MessageSquare
                  size={64}
                  className="mx-auto text-gray-400 dark:text-gray-600 mb-6"
                />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Welcome to AyurBot
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Your AI assistant for Ayurveda, yoga, and holistic wellness. Create a new chat to start exploring traditional knowledge about doshas, herbs, treatments, and natural health practices.
                </p>
                <button
                  onClick={createNewChat}
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors shadow-lg font-medium"
                >
                  Start Your First Chat
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
