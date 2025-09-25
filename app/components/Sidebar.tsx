"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Calendar, Heart, Pill, Bot, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

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
  className={`fixed md:static top-[64px] md:top-0 left-0 h-[calc(100%-64px)] md:h-full w-64 bg-white shadow-md p-4 flex flex-col justify-between transform transition-transform duration-300 z-40
  ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
>


      <div>
        <h1 className="hidden md:block text-green-700 font-bold text-xl mb-8">
          Panchakarma
        </h1>
        <ul className="space-y-3">
          {menu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 p-2 rounded transition ${
                    isActive
                      ? "bg-green-100 text-green-700 font-semibold"
                      : "text-gray-700 hover:bg-green-50"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <item.icon
                    size={18}
                    className={isActive ? "text-green-700" : "text-gray-500"}
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
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex items-center gap-3 p-2 rounded text-red-600 hover:bg-red-50 transition mt-6"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
