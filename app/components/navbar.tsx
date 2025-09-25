"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-transparent">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-green-700/10 flex items-center justify-center text-green-700 font-bold">
          P
        </div>
        <span className="text-xl font-bold text-[#4a7c59]">Prakriti</span>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/login" className="px-4 py-2 rounded bg-[#4a7c59] text-white">
          Login
        </Link>
        <Link href="/signup" className="px-4 py-2 rounded bg-[#4a7c59] text-white">
          Signup
        </Link>
      </div>
    </nav>
  );
}
