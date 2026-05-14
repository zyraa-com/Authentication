import { type NextRequest, NextResponse } from "next/server";
import { NEXTAUTH_COOKIE_DOMAIN } from "@/lib/env";

const NEXTAUTH_COOKIES = [
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
  "next-auth.callback-url",
  "next-auth.csrf-token",
];

export async function GET(request: NextRequest) {
  const callbackUrl =
    request.nextUrl.searchParams.get("callbackUrl") ?? "http://localhost:3000";

  const response = NextResponse.redirect(callbackUrl);

  const cookieBase = {
    expires: new Date(0),
    path: "/",
    ...(NEXTAUTH_COOKIE_DOMAIN ? { domain: NEXTAUTH_COOKIE_DOMAIN } : {}),
  };

  for (const name of NEXTAUTH_COOKIES) {
    response.cookies.set(name, "", cookieBase);
  }

  return response;
}
