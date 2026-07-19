import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error)}`, request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=No+authorization+code+provided", request.url));
  }

  try {
    // 1. Exchange code for tokens using Next.js env variables
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID || "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        redirect_uri: `${process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000"}/api/auth/callback/google`,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) {
      console.error("Token exchange failed:", tokenData);
      return NextResponse.redirect(new URL("/login?error=Google+token+exchange+failed", request.url));
    }

    // 2. Send the access_token to our Express backend
    const res = await fetch(`${API_URL}/api/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential: tokenData.access_token }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(data.error || "Google login failed")}`, request.url));
    }

    // Set cookie
    const response = NextResponse.redirect(new URL("/dashboard", request.url));
    response.cookies.set({
      name: 'token',
      value: data.token,
      path: '/',
      maxAge: 604800,
      sameSite: 'lax',
    });

    return response;
  } catch (err) {
    console.error("Callback error:", err);
    return NextResponse.redirect(new URL("/login?error=Internal+server+error", request.url));
  }
}
