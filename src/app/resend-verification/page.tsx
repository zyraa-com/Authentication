import { AuthLayout } from "@/components/auth/auth-layout";
import { ResendVerificationForm } from "@/components/auth/resend-verification-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify email | Zyraa",
};

export default function ResendVerificationPage() {
  return (
    <AuthLayout>
      <ResendVerificationForm />
    </AuthLayout>
  );
}
