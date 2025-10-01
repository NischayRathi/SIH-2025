"use client";
import Link from "next/link";

export default function Navbar() {
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
      </div>
    </nav>
  );
}
