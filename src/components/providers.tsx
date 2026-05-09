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
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#131318",
            border: "1px solid #1E1E25",
            color: "#F2F0EC",
            fontFamily: "var(--font-sans)",
            fontSize: "13.5px",
          },
        }}
      />
    </SessionProvider>
  );
}
