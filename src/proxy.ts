import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { NEXTAUTH_SECRET, ZYRAA_APP_URL } from "@/lib/env";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: NEXTAUTH_SECRET,
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
  matcher: ["/login", "/register", "/resend-verification", "/forgot-password", "/verify/:path*", "/dashboard"],
};
