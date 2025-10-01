import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const userRole = token.role as string;

    // Define role-based access rules
    const roleRoutes = {
      admin: ["/admin/dashboard", "/admin/login", "/admin/signup"],
      doctor: ["/doctor/dashboard", "/doctor/login", "/doctor/signup"],
      receptionist: [
        "/receptionist/dashboard",
        "/receptionist/login",
        "/receptionist/signup",
      ],
      user: ["/dashboard"],
    };

    // Check if user is trying to access a role-specific route
    if (pathname.startsWith("/admin/dashboard")) {
      if (userRole !== "admin") {
        return NextResponse.redirect(
          new URL(getRoleRedirectUrl(userRole), req.url)
        );
      }
    } else if (pathname.startsWith("/doctor/dashboard")) {
      if (userRole !== "doctor") {
        return NextResponse.redirect(
          new URL(getRoleRedirectUrl(userRole), req.url)
        );
      }
    } else if (pathname.startsWith("/receptionist/dashboard")) {
      if (userRole !== "receptionist") {
        return NextResponse.redirect(
          new URL(getRoleRedirectUrl(userRole), req.url)
        );
      }
    } else if (pathname.startsWith("/dashboard")) {
      // User dashboard - only allow users, not staff
      if (userRole !== "user") {
        return NextResponse.redirect(
          new URL(getRoleRedirectUrl(userRole), req.url)
        );
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

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

export const config = {
  matcher: [
    "/dashboard/:path*", // protect all patient dashboard routes
    "/admin/dashboard/:path*", // protect admin dashboard
    "/doctor/dashboard/:path*", // protect doctor dashboard
    "/receptionist/dashboard/:path*", // protect receptionist dashboard
  ],
};
