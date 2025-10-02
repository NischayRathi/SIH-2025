"use client";

import { Bell, Menu, X, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { handleCompleteLogout } from "@/lib/logout";

type TopbarProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

export default function Topbar({ open, setOpen }: TopbarProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Allow guest access - don't automatically redirect to login
  // const isGuest = !session?.user;

  // Show loading state while session is loading
  if (status === "loading") {
    return (
      <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700/20 sticky top-0 z-40 transition-colors">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(!open)}
            className="block md:hidden p-2 rounded hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
          >
            {open ? (
              <X size={24} className="text-green-700 dark:text-green-400" />
            ) : (
              <Menu size={24} className="text-green-700 dark:text-green-400" />
            )}
          </button>
          <h2 className="text-xl text-green-700 dark:text-green-400 font-semibold">
            Prakriti
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="animate-pulse w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="flex items-center gap-2">
            <div className="animate-pulse w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="animate-pulse w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  // Support both authenticated users and guests
  const userName = session?.user?.name || "Guest";
  const initial = userName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    if (session?.user) {
      // Authenticated user logout
      await handleCompleteLogout();
    } else {
      // Guest user - redirect to login
      router.push("/login");
    }
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700/20 sticky top-0 z-40 transition-colors">
      {/* ✅ Left side: Dashboard title + Mobile menu button */}
      <div className="flex items-center gap-4">
        {/* Hamburger only on mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="block md:hidden p-2 rounded hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
        >
          {open ? (
            <X size={24} className="text-green-700 dark:text-green-400" />
          ) : (
            <Menu size={24} className="text-green-700 dark:text-green-400" />
          )}
        </button>
        <h2 className="text-xl text-green-700 dark:text-green-400 font-semibold">
          Prakriti
        </h2>
      </div>

      {/* ✅ Right side: Bell + Profile + Logout */}
      <div className="flex items-center gap-4">
        <Bell className="text-gray-600 dark:text-gray-400" />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-green-700 dark:bg-green-600 flex items-center justify-center text-white font-semibold">
              {initial}
            </div>
            <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">
              {userName}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
            title={session?.user ? "Logout" : "Login"}
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
