"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Map,
  Calendar,
  Heart,
  Pill,
  Bot,
  LogOut,
  Plus,
  MessageSquare,
  Trash2,
} from "lucide-react";
import { handleCompleteLogout } from "@/lib/logout";
import { useState, useEffect } from "react";

type SidebarProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  onChatSelect?: (chatId: string) => void;
  onNewChat?: () => void;
  onDeleteChat?: (chatId: string) => void;
  currentChatId?: string;
  refreshTrigger?: number;
};

const menu = [
  { name: "Home", icon: Home, href: "/dashboard/home" },
  { name: "Nearby Centers", icon: Map, href: "/dashboard/nearby-centers" },
  { name: "Appointments", icon: Calendar, href: "/dashboard/appointments" },
  { name: "Health Tracker", icon: Heart, href: "/dashboard/health-tracker" },
  { name: "Medicines", icon: Pill, href: "/dashboard/medicines" },
  { name: "Chatbot", icon: Bot, href: "/dashboard/chatbot" },
];

export default function Sidebar({
  open,
  setOpen,
  onChatSelect,
  onNewChat,
  onDeleteChat,
  currentChatId,
  refreshTrigger,
}: SidebarProps) {
  const pathname = usePathname();
  const [chatSessions, setChatSessions] = useState<any[]>([]);
  const [loadingChats, setLoadingChats] = useState(false);
  const isChatbotPage = pathname === "/dashboard/chatbot";

  // Load chat sessions when on chatbot page or when refresh is triggered
  useEffect(() => {
    if (isChatbotPage) {
      loadChatSessions();
    }
  }, [isChatbotPage, refreshTrigger]);

  // Check for guest data cleanup on mount
  useEffect(() => {
    if (typeof window !== "undefined" && isChatbotPage) {
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
          loadChatSessions();
        }
      }
    }
  }, [isChatbotPage]);

  const loadChatSessions = async () => {
    try {
      setLoadingChats(true);

      // For authenticated users, load from database
      const response = await fetch("/api/chats");
      if (response.ok) {
        const data = await response.json();
        const dbChats = data.chatSessions || [];

        // For guest users, also load from localStorage
        let guestChats: any[] = [];
        if (typeof window !== "undefined") {
          const guestChatData = JSON.parse(
            localStorage.getItem("guestChats") || "{}"
          );
          guestChats = Object.entries(guestChatData).map(
            ([id, data]: [string, any]) => ({
              _id: id,
              title:
                data.messages?.[1]?.text?.slice(0, 50) +
                  (data.messages?.[1]?.text?.length > 50 ? "..." : "") ||
                "Guest Chat",
              updatedAt: data.updatedAt,
              createdAt: data.updatedAt,
              isGuest: true,
            })
          );
        }

        // Combine database chats and guest chats, sort by updatedAt
        const allChats = [...dbChats, ...guestChats].sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

        setChatSessions(allChats);
      }
    } catch (error) {
      console.error("Error loading chat sessions:", error);

      // If API fails but we're offline or guest, still load guest chats
      if (typeof window !== "undefined") {
        const guestChatData = JSON.parse(
          localStorage.getItem("guestChats") || "{}"
        );
        const guestChats = Object.entries(guestChatData).map(
          ([id, data]: [string, any]) => ({
            _id: id,
            title:
              data.messages?.[1]?.text?.slice(0, 50) +
                (data.messages?.[1]?.text?.length > 50 ? "..." : "") ||
              "Guest Chat",
            updatedAt: data.updatedAt,
            createdAt: data.updatedAt,
            isGuest: true,
          })
        );
        setChatSessions(guestChats);
      }
    } finally {
      setLoadingChats(false);
    }
  };

  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat();
      loadChatSessions(); // Refresh the list
    }
  };

  const handleDeleteChat = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (chatId.startsWith("guest_")) {
        // Handle guest chat deletion
        if (typeof window !== "undefined") {
          const guestChats = JSON.parse(
            localStorage.getItem("guestChats") || "{}"
          );
          delete guestChats[chatId];
          localStorage.setItem("guestChats", JSON.stringify(guestChats));
        }
        setChatSessions((prev) => prev.filter((chat) => chat._id !== chatId));
        if (onDeleteChat) {
          onDeleteChat(chatId);
        }
      } else {
        // Handle registered user chat deletion
        const response = await fetch(`/api/chats/${chatId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setChatSessions((prev) => prev.filter((chat) => chat._id !== chatId));
          if (onDeleteChat) {
            onDeleteChat(chatId);
          }
        }
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  return (
    <aside
      className={`fixed md:static top-[64px] md:top-0 left-0 h-[calc(100%-64px)] md:h-full w-64 bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700/20 p-4 flex flex-col justify-between transform transition-all duration-300 z-40
  ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="flex-1 overflow-y-auto min-h-0">
        <div>
          <br></br>
          <br></br>
        </div>
        <ul className="space-y-3">
          {menu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 p-2 rounded transition-colors ${
                    isActive
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <item.icon
                    size={18}
                    className={
                      isActive
                        ? "text-green-700 dark:text-green-400"
                        : "text-gray-500 dark:text-gray-400"
                    }
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Chat History Section - Only show on chatbot page */}
        {isChatbotPage && (
          <div className="mt-6 border-t dark:border-gray-700 pt-4 flex-1 flex flex-col min-h-0">
            <div className="mb-3 flex-shrink-0">
              <button
                onClick={handleNewChat}
                className="w-full flex items-center gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
              >
                <Plus size={14} />
                New Chat
              </button>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Chat History
              </h3>
              {loadingChats ? (
                <div className="text-center text-gray-500 dark:text-gray-400 text-xs py-2">
                  Loading...
                </div>
              ) : chatSessions.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 text-xs py-2">
                  No chats yet
                </div>
              ) : (
                chatSessions.map((chat) => (
                  <div
                    key={chat._id}
                    onClick={() => onChatSelect && onChatSelect(chat._id)}
                    className={`mb-1 p-2 rounded cursor-pointer transition-colors group text-sm ${
                      currentChatId === chat._id
                        ? "bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <MessageSquare
                          size={12}
                          className="text-green-600 dark:text-green-400 flex-shrink-0"
                        />
                        <span className="text-gray-900 dark:text-gray-100 truncate text-xs">
                          {chat.title}
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleDeleteChat(chat._id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-all"
                      >
                        <Trash2
                          size={10}
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
        )}
      </div>
    </aside>
  );
}
