import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getTokenFromCookie, verifyJWT } from "@/lib/session";

// Protected and public routes
const protectedRoutes = [
  "/dashboard",
  "/api/service",
  "/api/services",
  "/api/stats",
];
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 🧠 1. Get JWT from cookie
  const cookieStore = cookies();
  const token = getTokenFromCookie(cookieStore.get("token")?.value);
  const session = token ? verifyJWT(token) : null;

  // 🔐 2. Redirect to /login if trying to access protected route without auth
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  // 🚪 3. Redirect authenticated users away from public routes
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
