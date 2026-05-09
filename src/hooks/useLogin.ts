"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginInput } from "@/lib/validations";

export function useLogin(callbackUrl: string) {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const result = await signIn("credentials", {
        ...data,
        callbackUrl,
        redirect: true,
      });
      if (result?.error) {
        form.setError("root", { message: result.error });
      }
    } catch {
      form.setError("root", { message: "Login failed. Please try again." });
    }
  });

  return { form, onSubmit };
}
