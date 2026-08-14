import { NextRequest, NextResponse } from "next/server";

const protectedPrefixes = [
  "/userdashboard/dashboard",
  "/userdashboard/donations",
  "/profile",
  "/admin-dashboard",
  "/admin-analytics",
  "/volunteerdashboard",
  "/nearby-requests",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token =
    request.cookies.get("session_token")?.value ||
    request.cookies.get("session_id")?.value;

  const isProtected = protectedPrefixes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/userdashboard/dashboard/:path*",
  "/userdashboard/donations/:path*",
    "/profile",
    "/admin-dashboard/:path*",
    "/admin-analytics/:path*",
    "/volunteerdashboard/:path*",
    "/nearby-requests/:path*",
  ],
};
