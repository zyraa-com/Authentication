"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterInput } from "@/lib/validations";

export function useRegister() {
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setSuccessMessage("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSuccessMessage(json.data.message ?? "Account created! Check your email.");
        form.reset();
      } else {
        form.setError("root", { message: json.error ?? "Registration failed." });
      }
    } catch {
      form.setError("root", { message: "Network error. Please try again." });
    }
  });

  return { form, onSubmit, successMessage };
}
