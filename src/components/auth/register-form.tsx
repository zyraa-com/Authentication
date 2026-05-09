"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthDivider } from "./auth-divider";
import { AuthLogo } from "./auth-logo";
import { OAuthButtons } from "./oauth-buttons";

interface RegisterFormProps {
  callbackUrl: string;
}

export function RegisterForm({ callbackUrl }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsError(false);
        setMessage(data.data.message ?? "Account created! Check your email.");
        setFormData({ name: "", email: "", password: "" });
      } else {
        setIsError(true);
        setMessage(data.error ?? "Registration failed.");
      }
    } catch {
      setIsError(true);
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <div className="flex flex-col gap-1.5">
        <AuthLogo size="lg" />
        <h2 className="mt-5 text-[1.6rem] font-bold tracking-tight text-foreground">
          Create account
        </h2>
        <p className="text-sm text-muted-foreground">
          Start building in under a minute
        </p>
      </div>

      <OAuthButtons callbackUrl={callbackUrl} />
      <AuthDivider />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-foreground">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Your name"
            className="h-10 rounded-lg border border-border bg-input px-3.5 text-[13.5px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
          />
        </div>
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
          <label className="text-[13px] font-medium text-foreground">
            Password
          </label>
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

        {message && (
          <p
            className={`text-[12.5px] rounded-lg px-3 py-2 border ${isError ? "text-destructive bg-destructive/8 border-destructive/20" : "text-success-l bg-success-l/8 border-success-l/20"}`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="h-10 rounded-lg font-semibold text-[14px] text-white bg-[linear-gradient(135deg,var(--brand-d),var(--brand-l))] shadow-[0_0_20px_var(--brand-glow)] hover:shadow-[0_0_32px_var(--brand-glow)] hover:-translate-y-px transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="text-center text-[13px] text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-brand hover:text-brand-l font-medium transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
