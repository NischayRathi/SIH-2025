"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, MessageSquare } from "lucide-react";
import { useChatContext } from "../ClientDashboardLayout";

interface Message {
  _id?: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
  usedRAG?: boolean;
  sourcesCount?: number;
}

export default function ChatbotPage() {
  const chatContext = useChatContext();
  const session = chatContext?.session;
  const status = chatContext?.sessionStatus || 'loading';
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loadingChats, setLoadingChats] = useState<Set<string>>(new Set());
  const [isSending, setIsSending] = useState(false); // Prevent duplicate sends
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChatId = chatContext?.currentChatId;
  const isCurrentChatLoading = currentChatId
    ? loadingChats.has(currentChatId)
    : loadingChats.has("newchat");

  // Memoize guest status to prevent unnecessary re-renders
  const isGuest = status === 'unauthenticated' || !session?.user;

  // Helper functions for managing loading state per chat
  const setLoadingForChat = (
    chatId: string | null | undefined,
    isLoading: boolean
  ) => {
    const id = chatId || "newchat";
    setLoadingChats((prev) => {
      const newSet = new Set(prev);
      if (isLoading) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  // Guest chat management functions (optimized to avoid session dependency)
  const saveGuestChat = (chatId: string, messages: Message[]) => {
    if (typeof window !== "undefined") {
      const guestChats = JSON.parse(localStorage.getItem("guestChats") || "{}");
      guestChats[chatId] = {
        messages,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem("guestChats", JSON.stringify(guestChats));
    }
  };

  const loadGuestChat = (chatId: string): Message[] => {
    if (typeof window !== "undefined") {
      const guestChats = JSON.parse(localStorage.getItem("guestChats") || "{}");
      return guestChats[chatId]?.messages || [];
    }
    return [];
  };

  const clearAllGuestChats = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("guestChats");
    }
  };

  // Show default AyurBot welcome message when no chat is selected
  useEffect(() => {
    if (!currentChatId) {
      setMessages([
        {
          sender: "bot",
          text: "Hello! I'm AyurBot, your AI assistant for Ayurveda, yoga, and holistic wellness. I have access to traditional knowledge about doshas, herbs, treatments, meditation, and natural health practices. How can I help you today?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [currentChatId]);

  // Load messages when currentChatId changes
  useEffect(() => {
    // Don't load messages if session is still loading
    if (status === 'loading') return;
    
    if (currentChatId) {
      loadChatMessages(currentChatId);
      // Clear the "newchat" loading state when switching to an existing chat
      setLoadingChats((prev) => {
        const newSet = new Set(prev);
        newSet.delete("newchat");
        return newSet;
      });
    }
  }, [currentChatId, status]); // Add status dependency to prevent loading during session check

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadChatMessages = async (chatId: string) => {
    try {
      // Always check for guest chats first (faster than API call)
      if (chatId.startsWith("guest_") || (status === 'unauthenticated' || isGuest)) {
        // For guest users, load from localStorage
        const guestMessages = loadGuestChat(chatId);
        setMessages(guestMessages);
        return;
      }

      // Only make API call for authenticated users with non-guest chats
      if (status === 'authenticated' && session?.user) {
        const response = await fetch(`/api/chats/${chatId}`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data.chatSession?.messages || []);
        }
      }
    } catch (error) {
      console.error("Error loading messages:", error);
      // Fallback to empty messages on error
      setMessages([]);
    }
  };

  const createNewChatWithMessage = async (
    firstMessage: string,
    userMessage: Message
  ) => {
    try {
      const title =
        firstMessage.slice(0, 50) + (firstMessage.length > 50 ? "..." : "");

      if (isGuest) {
        // For guest users, create a local chat session
        const guestChatId = `guest_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        const initialMessages = [
          {
            sender: "bot" as const,
            text: "Hello! I'm AyurBot, your AI assistant for Ayurveda, yoga, and holistic wellness. I have access to traditional knowledge about doshas, herbs, treatments, meditation, and natural health practices. How can I help you today?",
            timestamp: new Date(),
          },
          userMessage,
        ];

        // Save to localStorage
        saveGuestChat(guestChatId, initialMessages);

        chatContext?.onChatSelect(guestChatId);
        chatContext?.refreshChats();
        return guestChatId;
      }

      // For registered users, use database
      const response = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        const data = await response.json();

        // Add the user message to the newly created chat
        await fetch(`/api/chats/${data.chatSession._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage,
          }),
        });

        chatContext?.onChatSelect(data.chatSession._id);
        chatContext?.refreshChats();
        return data.chatSession._id;
      }
    } catch (error) {
      console.error("Error creating chat with message:", error);
    }
    return null;
  };

  const handleSend = async () => {
    if (!input.trim() || isSending || status === 'loading') return;

    setIsSending(true); // Prevent duplicate sends
    const currentInput = input;
    // Capture the current chat ID at the start to prevent race conditions
    let targetChatId = currentChatId;
    const messageSnapshot = [...messages]; // Capture current messages for this request
    const isCurrentlyGuest = status === 'unauthenticated' || !session?.user; // Capture guest status

    const userMessage: Message = {
      sender: "user",
      text: currentInput,
      timestamp: new Date(),
    };

    // Add user message to UI immediately
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      // If no chat exists, create one with the first message as title
      if (!targetChatId) {
        // Set loading for new chat creation
        setLoadingForChat(null, true);
        targetChatId = await createNewChatWithMessage(
          currentInput,
          userMessage
        );
        if (!targetChatId) {
          setLoadingForChat(null, false);
          return;
        }
        // Update loading to the actual chat ID after creation
        setLoadingForChat(null, false);
        setLoadingForChat(targetChatId, true);
      } else {
        // Set loading for existing chat
        setLoadingForChat(targetChatId, true);
        // Add user message to existing chat session
        if (isCurrentlyGuest || targetChatId?.startsWith("guest_")) {
          // For guest users, save to localStorage
          const currentMessages = [...messageSnapshot, userMessage];
          saveGuestChat(targetChatId!, currentMessages);
        } else {
          // For registered users, save to database
          await fetch(`/api/chats/${targetChatId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: userMessage,
            }),
          });
        }
      }

      // Get AI response
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentInput,
          history: messageSnapshot, // Use the snapshot, not current messages
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage: Message = {
          sender: "bot",
          text: data.answer,
          timestamp: new Date(),
          usedRAG: data.usedRAG,
          sourcesCount: data.sourcesCount,
        };

        // Only add bot message to UI if we're still on the same chat
        // This prevents race condition where user switches chats mid-request
        if (currentChatId === targetChatId) {
          setMessages((prev) => [...prev, botMessage]);
        }

        // Always save to the target chat regardless of current UI state
        if (isCurrentlyGuest || targetChatId?.startsWith("guest_")) {
          // For guest users, save to localStorage
          const updatedMessages = [...messageSnapshot, userMessage, botMessage];
          saveGuestChat(targetChatId!, updatedMessages);
        } else {
          // For registered users, save to database
          await fetch(`/api/chats/${targetChatId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: botMessage,
            }),
          });
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Only show error in UI if we're still on the same chat
      if (currentChatId === targetChatId) {
        const errorMessage: Message = {
          sender: "bot",
          text: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } finally {
      setLoadingForChat(targetChatId, false);
      setIsSending(false); // Re-enable sending
    }
  };

  // Cleanup guest chats on component mount and when logout occurs
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check for recent logout timestamp
      const lastLogoutTime = localStorage.getItem("lastLogoutTime");
      const lastGuestChatCheck = localStorage.getItem("lastGuestChatCheck");

      if (lastLogoutTime) {
        const logoutTime = parseInt(lastLogoutTime);
        const lastCheckTime = lastGuestChatCheck
          ? parseInt(lastGuestChatCheck)
          : 0;

        // If logout happened after last check, clear guest chats
        if (logoutTime > lastCheckTime) {
          clearAllGuestChats();
          localStorage.setItem("lastGuestChatCheck", Date.now().toString());
          // Force refresh of chat list
          chatContext?.refreshChats();
        }
      }
    }
  }, []); // Run only on mount

  // Additional cleanup when session status changes (only when actually changing to unauthenticated)
  useEffect(() => {
    if (typeof window !== "undefined" && status === 'unauthenticated') {
      // Check for recent logout when becoming guest - but only once per status change
      const lastLogoutTime = localStorage.getItem("lastLogoutTime");
      const lastGuestChatCheck = localStorage.getItem("lastGuestChatCheck");

      if (lastLogoutTime) {
        const logoutTime = parseInt(lastLogoutTime);
        const lastCheckTime = lastGuestChatCheck
          ? parseInt(lastGuestChatCheck)
          : 0;

        // If logout happened after last check, clear guest chats
        if (logoutTime > lastCheckTime) {
          clearAllGuestChats();
          localStorage.setItem("lastGuestChatCheck", Date.now().toString());
          chatContext?.refreshChats();
        }
      }
    }
  }, [status, chatContext]); // Use status instead of session to prevent excessive calls

  // Show loading state while session is being determined
  if (status === 'loading') {
    return (
      <div className="flex flex-col bg-white dark:bg-gray-800 -m-6 h-[calc(100vh-64px)] items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading chat...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 -m-6 h-[calc(100vh-64px)]">
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
        {isCurrentChatLoading && (
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
            onKeyDown={(e) => e.key === "Enter" && !isSending && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            disabled={isCurrentChatLoading || !input.trim() || isSending}
          >
            {isSending ? (
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
