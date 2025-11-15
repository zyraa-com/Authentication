import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SuccessResponse, ErrorResponse } from "@/lib/apiResponse";
import UserModel from "@/modals/User";
import {
  generateVerificationToken,
  getVerificationTokenExpiry,
} from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";
import { logger } from "@/lib/logger";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    await connectToDatabase();
    const { token } = await params;

    if (!token) {
      logger.warn("verify-email", "Verification attempt without token");
      return ErrorResponse("Verification token is required", 400);
    }

    const user = await UserModel.findOne({ verificationToken: token });

    if (!user) {
      logger.warn(
        "verify-email",
        `Invalid verification token: ${token.substring(0, 10)}...`
      );
      return ErrorResponse("Invalid or expired verification token", 400);
    }

    if (user.emailVerified) {
      logger.warn("verify-email", `Email already verified: ${user.email}`);
      return ErrorResponse("Email is already verified", 400);
    }

    if (
      user.verificationTokenExpires &&
      new Date() > user.verificationTokenExpires
    ) {
      const newToken = generateVerificationToken();
      const newExpiry = getVerificationTokenExpiry();

      user.verificationToken = newToken;
      user.verificationTokenExpires = newExpiry;
      await user.save();

      try {
        await sendVerificationEmail(user.email, user.name, newToken);
        logger.info(
          "verify-email",
          `New verification email sent to: ${user.email}`
        );
        return ErrorResponse(
          "Token expired. A new verification email has been sent to your inbox.",
          400
        );
      } catch (emailError) {
        logger.error(
          "verify-email",
          `Failed to send new verification email to: ${user.email}`,
          emailError
        );
        return ErrorResponse(
          "Token expired. Please request a new verification email.",
          400
        );
      }
    }

    user.emailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    logger.info("verify-email", `Email verified successfully: ${user.email}`);
    return SuccessResponse({
      message: "Email verified successfully",
      email: user.email,
    });
  } catch (error) {
    logger.error("verify-email", "Email verification failed", error);
    return ErrorResponse("Internal server error", 500);
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    await connectToDatabase();
    const { token } = await params;

    if (!token) {
      return new Response(
        `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Email Verification - Zyraa</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5;">
  <div style="max-width: 500px; margin: 50px auto; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Verification Failed</h1>
    </div>
    <div style="padding: 40px; text-align: center;">
      <p style="color: #666; margin: 0; font-size: 16px;">Invalid verification token</p>
    </div>
  </div>
</body>
</html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    const user = await UserModel.findOne({ verificationToken: token });

    if (!user) {
      return new Response(
        `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Email Verification - Zyraa</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5;">
  <div style="max-width: 500px; margin: 50px auto; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Verification Failed</h1>
    </div>
    <div style="padding: 40px; text-align: center;">
      <p style="color: #666; margin: 0 0 20px 0; font-size: 16px;">Invalid or expired verification token</p>
      <a href="/auth/signin" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">Sign In</a>
    </div>
  </div>
</body>
</html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    if (user.emailVerified) {
      return new Response(
        `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Email Verification - Zyraa</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5;">
  <div style="max-width: 500px; margin: 50px auto; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Already Verified</h1>
    </div>
    <div style="padding: 40px; text-align: center;">
      <p style="color: #666; margin: 0 0 20px 0; font-size: 16px;">Your email is already verified</p>
      <a href="/auth/signin" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">Sign In</a>
    </div>
  </div>
</body>
</html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    if (
      user.verificationTokenExpires &&
      new Date() > user.verificationTokenExpires
    ) {
      const newToken = generateVerificationToken();
      const newExpiry = getVerificationTokenExpiry();

      user.verificationToken = newToken;
      user.verificationTokenExpires = newExpiry;
      await user.save();

      let message =
        "Verification token has expired. A new verification email has been sent to your inbox.";
      let bgColor = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
      let title = "New Email Sent";

      try {
        await sendVerificationEmail(user.email, user.name, newToken);
      } catch (emailError) {
        logger.error(
          "verify-email",
          "Failed to send new verification email",
          emailError
        );
        message =
          "Verification token has expired. Please request a new verification email.";
        bgColor = "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";
        title = "Token Expired";
      }

      return new Response(
        `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Email Verification - Zyraa</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5;">
  <div style="max-width: 500px; margin: 50px auto; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="background: ${bgColor}; padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">${title}</h1>
    </div>
    <div style="padding: 40px; text-align: center;">
      <p style="color: #666; margin: 0 0 20px 0; font-size: 16px;">${message}</p>
      <a href="/auth/signin" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">Sign In</a>
    </div>
  </div>
</body>
</html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    user.emailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    return new Response(
      `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Email Verification - Zyraa</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5;">
  <div style="max-width: 500px; margin: 50px auto; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Email Verified</h1>
    </div>
    <div style="padding: 40px; text-align: center;">
      <p style="color: #666; margin: 0 0 20px 0; font-size: 16px;">Your email has been successfully verified!</p>
      <a href="/auth/signin" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">Sign In</a>
    </div>
  </div>
</body>
</html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (error) {
    logger.error("verify-email", "Verification error", error);
    return new Response(
      `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Email Verification - Zyraa</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5;">
  <div style="max-width: 500px; margin: 50px auto; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Verification Error</h1>
    </div>
    <div style="padding: 40px; text-align: center;">
      <p style="color: #666; margin: 0 0 20px 0; font-size: 16px;">Something went wrong. Please try again later.</p>
      <a href="/auth/signin" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">Sign In</a>
    </div>
  </div>
</body>
</html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }
}
