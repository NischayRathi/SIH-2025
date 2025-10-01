// Utility function to handle complete logout
export const handleCompleteLogout = async () => {
  try {
    // Immediately clear guest chats BEFORE any async operations
    if (typeof window !== "undefined") {
      localStorage.removeItem("guestChats");
      // Set timestamp flag in localStorage (survives sessionStorage.clear())
      localStorage.setItem("lastLogoutTime", Date.now().toString());
      sessionStorage.clear();
    }

    // Sign out from NextAuth
    const { signOut } = await import("next-auth/react");
    await signOut({
      callbackUrl: "/login",
      redirect: true,
    });

    // Force reload to clear any cached state (this may not run due to redirect)
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Logout error:", error);
    // Fallback: force redirect to login and clear guest chats
    if (typeof window !== "undefined") {
      localStorage.removeItem("guestChats");
      localStorage.setItem("lastLogoutTime", Date.now().toString());
      sessionStorage.clear();
      window.location.href = "/login";
    }
  }
};
