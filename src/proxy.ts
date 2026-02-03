import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname, searchParams } = request.nextUrl;
  const appUrl = process.env.APP_URL || "http://localhost:3001";

  const authPages = ["/login", "/register", "/resend-verification"];
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
  matcher: ["/login", "/register", "/resend-verification", "/dashboard"],
};
