"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function SimpleThemeToggle() {
  const { theme, setTheme, isDark } = useTheme();

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-4 right-4 p-3 rounded-full shadow-lg transition-all z-50 ${
        isDark
          ? "bg-gray-800 hover:bg-gray-700 text-yellow-400 border border-gray-600"
          : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
      }`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
