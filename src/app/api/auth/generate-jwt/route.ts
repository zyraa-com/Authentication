import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateJWT } from "@/lib/jwt";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    return NextResponse.json({ token: jwtToken });
  } catch (error) {
    console.error("JWT generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate JWT" },
      { status: 500 }
    );
  }
}
