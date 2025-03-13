import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // List of protected routes
  const protectedRoutes = ["/profile", "/dashboard", "/settings"];

  // Check if the current path starts with any protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      // Redirect to login and store the original destination for post-login redirect
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to these routes
    "/profile/:path*",
    "/dashboard/:path*",
    "/settings/:path*"
  ],
};