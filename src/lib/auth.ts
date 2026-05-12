import { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { Plan, Provider } from "@/lib/types";
import UserModel from "@/modals/User";
import mongoose from "mongoose";
import { logger } from "@/lib/logger";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          await connectToDatabase();

          const user = await UserModel.findOne({
            email: credentials.email.toLowerCase(),
          });

          if (!user || !user.password) return null;

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValidPassword) return null;

          logger.info("authorize", `Login successful: ${credentials.email}`);
          return {
            id: (user._id as mongoose.Types.ObjectId).toString(),
            email: user.email,
            name: user.name,
            emailVerified: user.emailVerified,
            isPremium: user.isPremium,
            plan: user.plan,
            trialUsed: user.trialUsed,
            usage: user.usage,
          };
        } catch (error) {
          logger.error("authorize", "Login error", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },

  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax" as const,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain: process.env.NEXTAUTH_COOKIE_DOMAIN || undefined,
      },
    },
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account) return false;

      try {
        await connectToDatabase();

        if (account.provider === "google" || account.provider === "github") {
          const existingUser = await UserModel.findOne({
            email: user.email?.toLowerCase(),
          });

          if (existingUser) {
            const providerExists = existingUser.providers.some(
              (p) =>
                p.provider === account.provider &&
                p.providerAccountId === account.providerAccountId
            );

            if (!providerExists) {
              existingUser.providers.push({
                provider:
                  account.provider === "google"
                    ? Provider.GOOGLE
                    : Provider.GITHUB,
                providerAccountId: account.providerAccountId!,
              });
              await existingUser.save();
              logger.info(
                "signIn",
                `Added ${account.provider} provider to existing user: ${user.email}`
              );
            }

            if (
              (account.provider === "google" &&
                (profile as GoogleProfile)?.email_verified) ||
              account.provider === "github"
            ) {
              existingUser.emailVerified = true;
              await existingUser.save();
            }

            logger.info(
              "signIn",
              `OAuth sign in successful for existing user: ${user.email}`
            );
            return true;
          }

          const newUser = new UserModel({
            name: user.name,
            email: user.email?.toLowerCase(),
            emailVerified:
              account.provider === "google"
                ? (profile as GoogleProfile)?.email_verified || false
                : account.provider === "github"
                ? true
                : false,
            providers: [
              {
                provider:
                  account.provider === "google"
                    ? Provider.GOOGLE
                    : Provider.GITHUB,
                providerAccountId: account.providerAccountId!,
              },
            ],
            isPremium: false,
            plan: Plan.FREE,
            trialUsed: false,
            usage: {
              totalBuilds: 0,
              remainingTrial: 4,
            },
          });

          await newUser.save();
          logger.info(
            "signIn",
            `New user created via ${account.provider}: ${user.email}`
          );
          return true;
        }

        return true;
      } catch (error) {
        logger.error("signIn", "OAuth sign in error", error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.emailVerified = Boolean(user.emailVerified);
        token.isPremium = user.isPremium;
        token.plan = user.plan;
        token.trialUsed = user.trialUsed;
        token.usage = user.usage;
      }

      if (account?.provider === "google" || account?.provider === "github") {
        try {
          await connectToDatabase();
          const dbUser = await UserModel.findOne({
            email: token.email?.toLowerCase(),
          });

          if (dbUser) {
            token.id = (dbUser._id as mongoose.Types.ObjectId).toString();
            token.emailVerified = dbUser.emailVerified;
            token.isPremium = dbUser.isPremium;
            token.plan = dbUser.plan;
            token.trialUsed = dbUser.trialUsed;
            token.usage = dbUser.usage;
          }
        } catch (error) {
          logger.error("jwt", "JWT callback error", error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.emailVerified = token.emailVerified as boolean;
        session.user.isPremium = token.isPremium as boolean;
        session.user.plan = token.plan as string;
        session.user.trialUsed = token.trialUsed as boolean;
        session.user.usage = token.usage as {
          totalBuilds: number;
          remainingTrial: number;
        };
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/auth/redirect`;
      }
      return baseUrl;
    },
  },

  pages: {
    signIn: "/login",
    error: "/auth/error",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
