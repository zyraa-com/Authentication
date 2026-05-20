import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./auth";
import { generateJWT } from "./jwt";
import { logger } from "./logger";
import { ZYRAA_APP_URL } from "./env";

export async function getAuthCallbackUrl(): Promise<{ url: string; name: string }> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    logger.warn("auth-redirect", "Unauthorized redirect attempt");
    redirect("/login");
  }

  const jwtToken = generateJWT({
    id: session.user.id,
    email: session.user.email!,
    name: session.user.name!,
    image: session.user.image ?? undefined,
    emailVerified: session.user.emailVerified,
  });

  logger.info("auth-redirect", `JWT generated, redirecting: ${session.user.email}`);

  return {
    url: `${ZYRAA_APP_URL}/api/auth/callback?token=${jwtToken}`,
    name: session.user.name!,
  };
}
