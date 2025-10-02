"use client";

import { useState, createContext, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

// Create context for chat functionality
const ChatContext = createContext<{
  currentChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
  refreshChats: () => void;
} | null>(null);

export const useChatContext = () => useContext(ChatContext);

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Chat handlers
  const handleChatSelect = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const handleNewChat = () => {
    setCurrentChatId(null);
  };

  const handleDeleteChat = (chatId: string) => {
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  const handleRefreshChats = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // Allow guest access - don't redirect to login automatically
  // Only redirect if user explicitly tries to access authenticated features
  const isGuest = !session?.user;

  // Check for guest data cleanup on layout mount
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
          localStorage.removeItem("guestChats");
          localStorage.setItem("lastGuestChatCheck", Date.now().toString());
          handleRefreshChats();
        }
      }
    }
  }, []);

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 dark:border-green-400"></div>
      </div>
    );
  }

  const chatContextValue = {
    currentChatId,
    onChatSelect: handleChatSelect,
    onNewChat: handleNewChat,
    onDeleteChat: handleDeleteChat,
    refreshChats: handleRefreshChats,
  };

  return (
    <ChatContext.Provider value={chatContextValue}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar
          open={open}
          setOpen={setOpen}
          onChatSelect={handleChatSelect}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
          currentChatId={currentChatId || undefined}
          refreshTrigger={refreshTrigger}
        />

        {/* Overlay (mobile only) */}
        {open && (
          <div
            className="fixed inset-0 bg-black/20 dark:bg-black/40 md:hidden z-30 transition-colors"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
          <Topbar open={open} setOpen={setOpen} />

          {/* Page content */}
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </div>
    </ChatContext.Provider>
  );
}
