"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface WithRoleProtectionProps {
  allowedRoles: string[];
}

export function withRoleProtection<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[]
) {
  return function ProtectedComponent(props: P) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return;

      if (!session) {
        router.push("/login");
        return;
      }

      const userRole = (session.user as any)?.role || "user";

      if (!allowedRoles.includes(userRole)) {
        // Redirect to appropriate dashboard
        const redirectUrl = getRoleRedirectUrl(userRole);
        router.push(redirectUrl);
        return;
      }
    }, [session, status, router]);

    if (status === "loading") {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      );
    }

    if (!session) return null;

    const userRole = (session.user as any)?.role || "user";

    if (!allowedRoles.includes(userRole)) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">🚫</div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Access Denied
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You don't have permission to access this page.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Redirecting to your dashboard...
            </p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}

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
