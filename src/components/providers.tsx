"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { useThemeSync } from "@/hooks/useThemeSync";

export function Providers({ children }: { children: React.ReactNode }) {
  useThemeSync();
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--card)",
            border: "1px solid var(--border-mid)",
            color: "var(--foreground)",
            fontFamily: "var(--font-sans)",
            fontSize: "13.5px",
          },
        }}
      />
    </SessionProvider>
  );
}
