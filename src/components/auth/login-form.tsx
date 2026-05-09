"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { AuthDivider } from "./auth-divider";
import { AuthLogo } from "./auth-logo";
import { OAuthButtons } from "./oauth-buttons";

interface LoginFormProps {
  callbackUrl: string;
}

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        callbackUrl,
        redirect: true,
      });
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } catch {
      setError("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <div className="flex flex-col gap-1.5">
        <AuthLogo size="lg" />
        <h2 className="mt-5 text-[1.6rem] font-bold tracking-tight text-foreground">
          Welcome back
        </h2>
        <p className="text-sm text-muted-foreground">
          Sign in to your Zyraa account
        </p>
      </div>

      <OAuthButtons callbackUrl={callbackUrl} />
      <AuthDivider />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-foreground">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            placeholder="you@example.com"
            className="h-10 rounded-lg border border-border bg-input px-3.5 text-[13.5px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[13px] font-medium text-foreground">
              Password
            </label>
            <a
              href="#"
              className="text-[12px] text-brand hover:text-brand-l transition-colors"
            >
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            placeholder="••••••••"
            className="h-10 rounded-lg border border-border bg-input px-3.5 text-[13.5px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
          />
        </div>

        {error && (
          <p className="text-[12.5px] text-destructive bg-destructive/8 border border-destructive/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="h-10 rounded-lg font-semibold text-[14px] text-white bg-[linear-gradient(135deg,var(--brand-d),var(--brand-l))] shadow-[0_0_20px_var(--brand-glow)] hover:shadow-[0_0_32px_var(--brand-glow)] hover:-translate-y-px transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="text-center text-[13px] text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-brand hover:text-brand-l font-medium transition-colors"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
