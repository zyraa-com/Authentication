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

  const incoming = request.cookies.getAll();
  console.log("[session-clear] HIT → callbackUrl:", callbackUrl);
  console.log("[session-clear] NEXTAUTH_COOKIE_DOMAIN =", NEXTAUTH_COOKIE_DOMAIN || "(none)");
  console.log("[session-clear] Incoming cookies:", incoming.map((c) => c.name));

  const response = NextResponse.redirect(callbackUrl);

  const cookieBase = {
    expires: new Date(0),
    path: "/",
    ...(NEXTAUTH_COOKIE_DOMAIN ? { domain: NEXTAUTH_COOKIE_DOMAIN } : {}),
  };

  console.log("[session-clear] Clearing with:", JSON.stringify(cookieBase));

  for (const name of NEXTAUTH_COOKIES) {
    const had = request.cookies.has(name);
    console.log(`[session-clear] Clearing "${name}" (was present: ${had})`);
    response.cookies.set(name, "", cookieBase);
  }

  return response;
}
