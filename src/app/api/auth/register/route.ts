import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { SuccessResponse, ErrorResponse } from "@/lib/apiResponse";
import { Plan, Provider } from "@/lib/types";
import { registerSchema, RegisterInput } from "@/lib/validations";
import UserModel from "@/modals/User";
import { ZodError } from "zod";
import {
  generateVerificationToken,
  getVerificationTokenExpiry,
} from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const validatedData: RegisterInput = registerSchema.parse(body);
    const { name, email, password } = validatedData;

    const existingUser = await UserModel.findOne({
      email: email,
    });
    if (existingUser)
      return ErrorResponse("User with this email already exists", 409);

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const verificationToken = generateVerificationToken();
    const verificationTokenExpires = getVerificationTokenExpiry();

    const newUser = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
      emailVerified: false,
      verificationToken,
      verificationTokenExpires,
      providers: [
        {
          provider: Provider.CREDENTIALS,
          providerAccountId: email,
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
    const savedUser = await newUser.save();

    try {
      await sendVerificationEmail(email, name, verificationToken);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
    }
    const userResponse = {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      emailVerified: savedUser.emailVerified,
      isPremium: savedUser.isPremium,
      plan: savedUser.plan,
      trialUsed: savedUser.trialUsed,
      usage: savedUser.usage,
    };

    return SuccessResponse(
      {
        message:
          "User registered successfully. Please check your email to verify your account.",
        user: userResponse,
      },
      201
    );
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof ZodError)
      return ErrorResponse(error.issues[0].message, 400);

    if (error instanceof Error && error.name === "ValidationError")
      return ErrorResponse("Invalid user data provided", 400);

    if (error instanceof Error && "code" in error && error.code === 11000)
      return ErrorResponse("User with this email already exists", 409);

    return ErrorResponse("Internal server error", 500);
  }
}
