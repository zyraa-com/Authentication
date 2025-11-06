"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AuthRedirect() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated" && session?.user) {
      fetch("/api/auth/generate-jwt", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}/callback?token=${data.token}`;
          }
        })
        .catch((err) => {
          console.error("Failed to generate JWT:", err);
          window.location.href = "/login";
        });
    } else {
      window.location.href = "/login";
    }
  }, [session, status]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>Redirecting...</div>
    </div>
  );
}
