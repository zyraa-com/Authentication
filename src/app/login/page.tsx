import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in — Zyraa",
};

function LoginContent({ callbackUrl }: { callbackUrl: string }) {
  return <LoginForm callbackUrl={callbackUrl} />;
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="text-muted-foreground text-sm">Loading…</div>}>
        <LoginPageInner searchParams={searchParams} />
      </Suspense>
    </AuthLayout>
  );
}

async function LoginPageInner({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/auth/redirect";
  return <LoginContent callbackUrl={callbackUrl} />;
}
