import { Plan, Provider } from "@/lib/types";
import mongoose, { Schema, Document, Model } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password?: string;
  emailVerified: boolean;
  verificationToken?: string;
  verificationTokenExpires?: Date;
  providers: {
    provider: Provider;
    providerAccountId: string;
  }[];
  isPremium: boolean;
  plan: Plan;
  trialUsed: boolean;
  usage: {
    totalBuilds: number;
    remainingTrial: number;
  };
}

const providerSchema = new Schema({
  provider: {
    type: String,
    enum: Object.values(Provider),
    required: true,
  },
  providerAccountId: String,
});

const userSchema = new Schema<User>(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    providers: [providerSchema],
    emailVerified: { type: Boolean, default: false },
    verificationToken: String,
    verificationTokenExpires: Date,
    isPremium: { type: Boolean, default: false },
    plan: { type: String, enum: Object.values(Plan), default: Plan.FREE },
    trialUsed: { type: Boolean, default: false },
    usage: {
      totalBuilds: { type: Number, default: 0 },
      remainingTrial: { type: Number, default: 4 },
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel as Model<User>;
