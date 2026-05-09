import { render } from "@react-email/components";
import { Resend } from "resend";
import { VerifyEmail } from "@/emails/verify-email";
import { WelcomeEmail } from "@/emails/welcome";
import { logger } from "./logger";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
const APP_URL = process.env.NEXTAUTH_URL ?? "http://localhost:3001";

async function sendEmail(to: string, subject: string, react: React.ReactElement) {
  const html = await render(react);
  const { error } = await resend.emails.send({ from: FROM, to, subject, html });
  if (error) {
    logger.error("email", `Failed to send "${subject}" to ${to}`, error);
    throw new Error("Failed to send email");
  }
}

export async function sendVerificationEmail(email: string, name: string, token: string) {
  const verificationUrl = `${APP_URL}/verify/${token}`;
  await sendEmail(
    email,
    "Verify your email address — Zyraa",
    VerifyEmail({ name, verificationUrl }),
  );
}

export async function sendWelcomeEmail(email: string, name: string) {
  const dashboardUrl = `${APP_URL}/dashboard`;
  await sendEmail(
    email,
    `Welcome to Zyraa, ${name}.`,
    WelcomeEmail({ name, dashboardUrl }),
  );
}
