"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import { handleCompleteLogout } from "@/lib/logout";

export default function Navbar() {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await handleCompleteLogout();
  };

  // Function to get the appropriate dashboard URL based on user role
  const getDashboardUrl = () => {
    if (!session?.user) return "/dashboard";

    const userRole = (session.user as any)?.role || "user";

    switch (userRole) {
      case "admin":
        return "/admin/dashboard";
      case "doctor":
        return "/doctor/dashboard";
      case "receptionist":
        return "/receptionist/dashboard";
      case "user":
      default:
        return "/dashboard";
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-green-700/20 dark:bg-green-400/20 flex items-center justify-center text-green-700 dark:text-green-400 font-bold">
          P
        </div>
        <span className="text-xl font-bold text-green-700 dark:text-green-400">
          Prakriti
        </span>
      </div>

      <div className="flex items-center gap-3">
        {status === "authenticated" ? (
          <>
            <Link
              href={getDashboardUrl()}
              className="px-4 py-2 rounded bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-700 text-white transition-colors"
            >
              Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {session?.user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="p-2 rounded hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </>
        ) : status === "loading" ? (
          <div className="flex items-center gap-3">
            <div className="animate-pulse w-16 h-9 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="animate-pulse w-16 h-9 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="px-4 py-2 rounded bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-700 text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-700 text-white transition-colors"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
