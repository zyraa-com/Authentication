import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      emailVerified: boolean;
      isPremium: boolean;
      plan: string;
      trialUsed: boolean;
      usage: {
        totalBuilds: number;
        remainingTrial: number;
      };
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    emailVerified: boolean;
    isPremium: boolean;
    plan: string;
    trialUsed: boolean;
    usage: {
      totalBuilds: number;
      remainingTrial: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    emailVerified: boolean;
    isPremium: boolean;
    plan: string;
    trialUsed: boolean;
    usage: {
      totalBuilds: number;
      remainingTrial: number;
    };
  }
}
