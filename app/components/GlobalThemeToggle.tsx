"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect } from "react";

export default function GlobalThemeToggle() {
  const { theme, setTheme, isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isOpen]);

  if (!mounted) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>
    );
  }

  const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ] as const;

  const currentTheme = themes.find((t) => t.value === theme);
  const CurrentIcon = currentTheme?.icon || Sun;

  return (
    <div className="fixed top-20 right-4 z-50">
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className={`p-3 rounded-full shadow-lg transition-all backdrop-blur-md ${
            isDark
              ? "bg-gray-800/90 hover:bg-gray-700/90 text-gray-100 border border-gray-600"
              : "bg-white/90 hover:bg-gray-50/90 text-gray-700 border border-gray-200"
          }`}
          title={`Current theme: ${currentTheme?.label}`}
          aria-label="Toggle theme"
        >
          <CurrentIcon size={20} />
        </button>

        {isOpen && (
          <div
            className={`absolute right-0 mt-2 w-40 rounded-lg shadow-xl border backdrop-blur-md z-10 ${
              isDark
                ? "bg-gray-800/95 border-gray-600"
                : "bg-white/95 border-gray-200"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {themes.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => {
                  setTheme(value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  theme === value
                    ? isDark
                      ? "bg-blue-600/80 text-white"
                      : "bg-blue-100/80 text-blue-900"
                    : isDark
                    ? "hover:bg-gray-700/60 text-gray-200 hover:text-white"
                    : "hover:bg-gray-100/60 text-gray-700 hover:text-gray-900"
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
                {theme === value && (
                  <div
                    className={`ml-auto w-2 h-2 rounded-full ${
                      isDark ? "bg-blue-300" : "bg-blue-600"
                    }`}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
