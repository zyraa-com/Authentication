import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SuccessResponse, ErrorResponse } from "@/lib/apiResponse";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations";
import { generateResetToken, getResetTokenExpiry } from "@/lib/tokens";
import { sendResetPasswordEmail } from "@/lib/email";
import { logger } from "@/lib/logger";
import { UserModel } from "@zyraalabs/zyraa-db";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { email }: ForgotPasswordInput = forgotPasswordSchema.parse(body);

    const user = await UserModel.findOne({ email });

    if (!user) {
      return SuccessResponse({
        message: "If an account with that email exists, a reset link has been sent.",
      });
    }

    const resetToken = generateResetToken();
    const resetTokenExpires = getResetTokenExpiry();

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpires = resetTokenExpires;
    await user.save();

    try {
      await sendResetPasswordEmail(email, resetToken);
      logger.info("forgot-password", `Reset email sent to: ${email}`);
    } catch (emailError) {
      logger.error("forgot-password", `Failed to send reset email to: ${email}`, emailError);
      return ErrorResponse("Failed to send reset email", 500);
    }

    return SuccessResponse({
      message: "If an account with that email exists, a reset link has been sent.",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      logger.warn("forgot-password", `Validation error: ${error.issues[0].message}`);
      return ErrorResponse(error.issues[0].message, 400);
    }

    logger.error("forgot-password", "Forgot password request failed", error);
    return ErrorResponse("Internal server error", 500);
  }
}
