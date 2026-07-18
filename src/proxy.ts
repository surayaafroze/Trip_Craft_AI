import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Check if session cookie exists
  // Better Auth uses 'better-auth.session_token' by default
  const sessionCookie = request.cookies.get("better-auth.session_token");
  
  if (!sessionCookie) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/items/add", "/items/manage"],
};
