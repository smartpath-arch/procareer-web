import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const allowedPaths = ["/", "/event"];

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/assets") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const isAllowed = allowedPaths.some((path) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  });

  if (!isAllowed) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
