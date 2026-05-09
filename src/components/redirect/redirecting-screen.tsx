"use client";

import { useEffect } from "react";
import { RedirectBg } from "@/components/redirect/redirect-bg";
import { RedirectDots } from "@/components/redirect/redirect-dots";
import { RedirectLogo } from "@/components/redirect/redirect-logo";
import { RedirectProgress } from "@/components/redirect/redirect-progress";

interface RedirectingScreenProps {
  url: string;
  name: string;
}

export function RedirectingScreen({ url, name }: RedirectingScreenProps) {
  const firstName = name.split(" ")[0];

  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center overflow-hidden relative">
      <RedirectBg />

      <div className="relative z-10 flex flex-col items-center gap-10">
        <RedirectLogo />
        <RedirectDots firstName={firstName} />
      </div>

      <RedirectProgress />
    </div>
  );
}
