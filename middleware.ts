export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*", // protect all patient dashboard routes
    "/admin/dashboard/:path*", // protect admin dashboard
    "/doctor/dashboard/:path*", // protect doctor dashboard
    "/receptionist/dashboard/:path*", // protect receptionist dashboard
  ],
};
