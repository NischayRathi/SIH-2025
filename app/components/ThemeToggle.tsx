"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ] as const;

  const currentTheme = themes.find((t) => t.value === theme);
  const CurrentIcon = currentTheme?.icon || Sun;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-colors ${
          isDark
            ? "hover:bg-gray-700 text-gray-300 hover:text-white"
            : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
        }`}
        title={`Current theme: ${currentTheme?.label}`}
      >
        <CurrentIcon size={20} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 mt-2 w-36 rounded-lg shadow-lg z-20 border ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            {themes.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => {
                  setTheme(value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  theme === value
                    ? isDark
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-900"
                    : isDark
                    ? "hover:bg-gray-700 text-gray-300 hover:text-white"
                    : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
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
        </>
      )}
    </div>
  );
}
