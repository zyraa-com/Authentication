import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SuccessResponse, ErrorResponse } from "@/lib/apiResponse";
import UserModel from "@/modals/User";
import { z } from "zod";
import {
  generateVerificationToken,
  getVerificationTokenExpiry,
} from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";

const resendSchema = z.object({
  email: z.string().email("Please provide a valid email address").toLowerCase(),
});

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { email } = resendSchema.parse(body);

    const user = await UserModel.findOne({ email });

    if (!user) return ErrorResponse("User not found", 404);

    if (user.emailVerified)
      return ErrorResponse("Email is already verified", 400);

    const verificationToken = generateVerificationToken();
    const verificationTokenExpires = getVerificationTokenExpiry();

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = verificationTokenExpires;
    await user.save();

    try {
      await sendVerificationEmail(email, user.name, verificationToken);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      return ErrorResponse("Failed to send verification email", 500);
    }

    return SuccessResponse({
      message: "Verification email sent successfully. Please check your inbox.",
    });
  } catch (error) {
    console.error("Resend verification error:", error);

    if (error instanceof z.ZodError) {
      return ErrorResponse(error.issues[0].message, 400);
    }

    return ErrorResponse("Internal server error", 500);
  }
}
