import jwt from "jsonwebtoken";
import { logger } from "./logger";
import { JWT_SECRET } from "./env";

export interface JWTPayload {
  sub: string;
  email: string;
  name: string;
  image?: string;
  emailVerified: boolean;
  isPremium: boolean;
  plan: string;
  trialUsed: boolean;
  usage: {
    totalBuilds: number;
    remainingTrial: number;
  };
  exp: number;
}

export function generateJWT(userData: {
  id: string;
  email: string;
  name: string;
  image?: string;
  emailVerified: boolean;
  isPremium: boolean;
  plan: string;
  trialUsed: boolean;
  usage: {
    totalBuilds: number;
    remainingTrial: number;
  };
}): string {
  const payload: JWTPayload = {
    sub: userData.id,
    email: userData.email,
    name: userData.name,
    image: userData.image,
    emailVerified: userData.emailVerified,
    isPremium: userData.isPremium,
    plan: userData.plan,
    trialUsed: userData.trialUsed,
    usage: userData.usage,
    exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
  };

  if (!JWT_SECRET)
    throw new Error("JWT_SECRET or NEXTAUTH_SECRET must be defined");

  return jwt.sign(payload, JWT_SECRET);
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    if (!JWT_SECRET)
      throw new Error("JWT_SECRET or NEXTAUTH_SECRET must be defined");

    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    logger.error("verifyJWT", "JWT verification failed", error);
    return null;
  }
}
