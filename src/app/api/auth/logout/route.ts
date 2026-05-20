import { type NextRequest, NextResponse } from "next/server";
import { HOME_URL, IS_PRODUCTION, NEXTAUTH_COOKIE_DOMAIN } from "@/lib/env";

const COOKIES = [
  { name: "auth-token", httpOnly: true },
  { name: "next-auth.session-token", httpOnly: true },
  { name: "__Secure-next-auth.session-token", httpOnly: true },
  { name: "next-auth.callback-url", httpOnly: false },
  { name: "next-auth.csrf-token", httpOnly: false },
];

export async function GET(_request: NextRequest) {
  const response = NextResponse.redirect(HOME_URL);

  const base = {
    expires: new Date(0),
    path: "/",
    secure: IS_PRODUCTION,
    sameSite: "lax" as const,
    ...(NEXTAUTH_COOKIE_DOMAIN ? { domain: NEXTAUTH_COOKIE_DOMAIN } : {}),
  };

  for (const { name, httpOnly } of COOKIES) {
    response.cookies.set(name, "", { ...base, httpOnly });
  }

  return response;
}
