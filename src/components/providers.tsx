"use client";

import { SessionProvider } from "next-auth/react";
import { useThemeSync } from "@/hooks/useThemeSync";

export function Providers({ children }: { children: React.ReactNode }) {
  useThemeSync();
  return <SessionProvider>{children}</SessionProvider>;
}
