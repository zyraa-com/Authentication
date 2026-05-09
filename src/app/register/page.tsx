import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { RegisterForm } from "@/components/auth/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create account — Zyraa",
};

export default function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="text-muted-foreground text-sm">Loading…</div>}>
        <RegisterPageInner searchParams={searchParams} />
      </Suspense>
    </AuthLayout>
  );
}

async function RegisterPageInner({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/auth/redirect";
  return <RegisterForm callbackUrl={callbackUrl} />;
}
