import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import ClientDashboardLayout from "./ClientDashboardLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Check if user has the correct role for this dashboard
  const userRole = (session.user as any)?.role || "user";

  // Only users should access the main dashboard
  if (userRole !== "user") {
    // Redirect to appropriate dashboard based on role
    switch (userRole) {
      case "admin":
        redirect("/admin/dashboard");
      case "doctor":
        redirect("/doctor/dashboard");
      case "receptionist":
        redirect("/receptionist/dashboard");
      default:
        redirect("/login");
    }
  }

  return <ClientDashboardLayout>{children}</ClientDashboardLayout>;
}

// Disable caching for dashboard pages
export const dynamic = "force-dynamic";
export const revalidate = 0;
