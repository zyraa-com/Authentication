import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ThemeSync } from "@/components/theme-sync";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Sign in — Zyraa",
  description: "Sign in or create your Zyraa account.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("zyraa-theme")?.value ?? "dark";

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased${theme === "light" ? "" : " dark"}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeSync />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
