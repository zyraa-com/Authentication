import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateJWT } from "@/lib/jwt";
import { logger } from "@/lib/logger";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      logger.warn("auth-redirect", "Unauthorized redirect attempt");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const jwtToken = generateJWT({
      id: session.user.id,
      email: session.user.email!,
      name: session.user.name!,
      emailVerified: session.user.emailVerified,
      isPremium: session.user.isPremium,
      plan: session.user.plan,
      trialUsed: session.user.trialUsed,
      usage: session.user.usage,
    });

    logger.info(
      "auth-redirect",
      `JWT generated successfully, redirecting user: ${session.user.email}`
    );
    const redirectUrl = `${
      process.env.APP_URL || "http://localhost:3001"
    }/api/auth/callback?token=${jwtToken}`;
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    logger.error("auth-redirect", "Auth redirect failed", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
