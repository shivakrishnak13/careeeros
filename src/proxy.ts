import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/jwt";

const PROTECTED = ["/overview", "/applications", "/interviews", "/analytics", "/ai-tools", "/settings"];
const AUTH_ROUTES = ["/login", "/register"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const user = token ? await verifyToken(token) : null;
  console.log("Proxy middleware:", { pathname, token, user });
  const isProtected = PROTECTED.some((path) => pathname.startsWith(path));
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/overview", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};