import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  // We are now using standard JWT token instead of better auth
  const sessionCookie = request.cookies.get("token");
  
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
