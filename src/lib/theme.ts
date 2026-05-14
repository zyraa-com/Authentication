export type Theme = "dark" | "light";

export function readTheme(): Theme {
  const match = document.cookie
    .split("; ")
    .find((r) => r.startsWith("zyraa-theme="))
    ?.split("=")[1];
  return match === "light" ? "light" : "dark";
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme !== "light");
}
