"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface RoleGuardProps {
  allowedRoles: string[];
  children: ReactNode;
  fallbackUrl?: string;
}

export default function RoleGuard({
  allowedRoles,
  children,
  fallbackUrl,
}: RoleGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session) {
      router.push("/login");
      return;
    }

    const userRole = (session.user as any)?.role || "user";

    if (!allowedRoles.includes(userRole)) {
      // Redirect to appropriate dashboard based on user's actual role
      const redirectUrl = fallbackUrl || getRoleRedirectUrl(userRole);
      router.push(redirectUrl);
      return;
    }
  }, [session, status, router, allowedRoles, fallbackUrl]);

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (!session) {
    return null;
  }

  const userRole = (session.user as any)?.role || "user";

  if (!allowedRoles.includes(userRole)) {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
}

// Helper function to get redirect URL based on role
function getRoleRedirectUrl(role: string): string {
  switch (role) {
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
}
