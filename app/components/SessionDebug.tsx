"use client";

import { useSession } from "next-auth/react";

export default function SessionDebug() {
  const { data: session, status } = useSession();

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-3 rounded-lg text-xs z-50">
      <div>Status: {status}</div>
      <div>Session: {session ? "Yes" : "No"}</div>
      <div>User: {session?.user?.name || "None"}</div>
      <div>Email: {session?.user?.email || "None"}</div>
      <div>Timestamp: {new Date().toLocaleTimeString()}</div>
    </div>
  );
}
