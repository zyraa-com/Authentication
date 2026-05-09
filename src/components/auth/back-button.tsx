import { ArrowLeft } from "lucide-react";

const homeUrl = process.env.NEXT_PUBLIC_HOME_URL ?? "http://localhost:3000";

export function BackButton() {
  return (
    <a
      href={homeUrl}
      className="fixed top-4 right-5 z-50 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card/80 backdrop-blur-sm text-[13px] font-medium text-muted-foreground hover:text-foreground hover:border-border-mid transition-all"
    >
      <ArrowLeft className="size-3.5" />
      Home
    </a>
  );
}
