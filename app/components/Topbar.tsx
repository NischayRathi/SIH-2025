"use client";

import { Bell, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";

type TopbarProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

export default function Topbar({ open, setOpen }: TopbarProps) {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Guest";
  const initial = userName.charAt(0).toUpperCase();

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm sticky top-0 z-50">
      {/* ✅ Left side: Dashboard title + Mobile menu button */}
      <div className="flex items-center gap-4">
        {/* Hamburger only on mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="block md:hidden p-2 rounded hover:bg-green-50"
        >
          {open ? (
            <X size={24} className="text-green-700" />
          ) : (
            <Menu size={24} className="text-green-700" />
          )}
        </button>
        <h2 className="text-xl text-green-700 font-semibold">Dashboard</h2>
      </div>

      {/* ✅ Right side: Bell + Profile */}
      <div className="flex items-center gap-6">
        <Bell className="text-gray-600" />
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center text-white font-semibold">
            {initial}
          </div>
          <span className="text-sm text-black font-medium">{userName}</span>
        </div>
      </div>
    </header>
  );
}
