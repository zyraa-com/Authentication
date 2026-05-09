"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { OAUTH_PROVIDERS } from "@/lib/oauth-providers";

interface OAuthButtonsProps {
  callbackUrl: string;
}

export function OAuthButtons({ callbackUrl }: OAuthButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {OAUTH_PROVIDERS.map((provider) => (
        <Button
          key={provider.id}
          type="button"
          variant="outline"
          size="lg"
          className="w-full"
          onClick={() => signIn(provider.id, { callbackUrl })}
        >
          {provider.icon}
          {provider.label}
        </Button>
      ))}
    </div>
  );
}
