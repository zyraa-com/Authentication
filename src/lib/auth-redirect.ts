import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./auth";
import { createExchangeCode } from "./exchange-code";
import { logger } from "./logger";
import { ZYRAA_APP_URL } from "./env";

export async function getAuthCallbackUrl(): Promise<{ url: string; name: string }> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    logger.warn("auth-redirect", "Unauthorized redirect attempt");
    redirect("/login");
  }

  const code = await createExchangeCode(session.user.id);

  logger.info("auth-redirect", `Exchange code created, redirecting: ${session.user.email}`);

  return {
    url: `${ZYRAA_APP_URL}/api/auth/callback?code=${code}`,
    name: session.user.name!,
  };
}
