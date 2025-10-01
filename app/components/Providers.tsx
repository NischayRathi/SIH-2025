"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./ThemeProvider";
import GlobalThemeToggle from "./GlobalThemeToggle";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SessionProvider
        // Re-fetch session if window is focused
        refetchOnWindowFocus={true}
        // Re-fetch session every 5 minutes
        refetchInterval={5 * 60}
      >
        <GlobalThemeToggle />
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
}
