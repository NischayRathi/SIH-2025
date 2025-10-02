"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Calendar, Heart, Pill, Bot, LogOut } from "lucide-react";
import { handleCompleteLogout } from "@/lib/logout";

type SidebarProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

const menu = [
  { name: "Home", icon: Home, href: "/dashboard/home" },
  { name: "Nearby Centers", icon: Map, href: "/dashboard/nearby-centers" },
  { name: "Appointments", icon: Calendar, href: "/dashboard/appointments" },
  { name: "Health Tracker", icon: Heart, href: "/dashboard/health-tracker" },
  { name: "Medicines", icon: Pill, href: "/dashboard/medicines" },
  { name: "Chatbot", icon: Bot, href: "/dashboard/chatbot" },
];

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed md:static top-[64px] md:top-0 left-0 h-[calc(100%-64px)] md:h-full w-64 bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700/20 p-4 flex flex-col justify-between transform transition-all duration-300 z-40
  ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div>
        <h1 className="hidden md:block text-green-700 dark:text-green-400 font-bold text-xl mb-8">
          Panchakarma
        </h1>
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
      </div>

      {/* Logout */}
      <button
        onClick={handleCompleteLogout}
        className="flex items-center gap-3 p-2 rounded text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors mt-6"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
