import arcjet, { detectBot, shield } from "@arcjet/next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { NEXTAUTH_SECRET, ZYRAA_APP_URL, IS_PRODUCTION } from "@/lib/env";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:MONITOR"] }),
  ],
});

export async function proxy(request: NextRequest) {
  const decision = await aj.protect(request);
  if (decision.isDenied()) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const token = await getToken({
    req: request,
    secret: NEXTAUTH_SECRET,
    cookieName: IS_PRODUCTION
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token",
  });

  const { pathname, searchParams } = request.nextUrl;
  const appUrl = ZYRAA_APP_URL;

  const authPages = ["/login", "/register", "/resend-verification", "/forgot-password", "/verify"];
  const isAuthPage = authPages.some((page) => pathname.startsWith(page));

  if (token && isAuthPage) {
    const callbackUrl = searchParams.get("callbackUrl");
    if (callbackUrl) return NextResponse.redirect(callbackUrl);

    return NextResponse.redirect(`${appUrl}/dashboard`);
  }

  if (!token && pathname === "/dashboard")
    return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)" ],
};
