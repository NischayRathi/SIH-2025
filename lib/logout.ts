// Utility function to handle complete logout
export const handleCompleteLogout = async () => {
  try {
    // Clear any localStorage data
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
    }

    // Sign out from NextAuth
    const { signOut } = await import("next-auth/react");
    await signOut({
      callbackUrl: "/login",
      redirect: true,
    });

    // Force reload to clear any cached state
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Logout error:", error);
    // Fallback: force redirect to login
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }
};
