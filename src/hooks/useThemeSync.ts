"use client";

import { useEffect } from "react";

function readCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((r) => r.startsWith(`${name}=`))
    ?.split("=")[1];
}

export function useThemeSync() {
  useEffect(() => {
    const apply = () => {
      const theme = readCookie("zyraa-theme") ?? "dark";
      const html = document.documentElement;
      if (theme === "light") {
        html.classList.remove("dark");
      } else {
        html.classList.add("dark");
      }
    };

    apply();

    const id = setInterval(apply, 2000);
    return () => clearInterval(id);
  }, []);
}
