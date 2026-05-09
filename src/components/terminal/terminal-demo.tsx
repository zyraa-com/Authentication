import { cn } from "@/lib/utils";
import { TerminalWindow } from "./terminal-window";

interface TerminalDemoProps {
  className?: string;
}

const LINES = [
  {
    delay: "0.3s",
    content: (
      <>
        <span className="text-success-l font-bold">✓</span>{" "}
        <span className="text-muted-foreground">built </span>
        todo app with auth
        <span className="text-fg-subtle"> · 14 files · 18.4s</span>
      </>
    ),
  },
  {
    delay: "0.8s",
    topBorder: true,
    content: (
      <>
        <span className="text-brand animate-pulse">○</span>{" "}
        <span className="text-brand-l">Detecting framework…</span>
        <span className="text-fg-subtle"> nextjs · SSR required</span>
      </>
    ),
  },
  {
    delay: "1.3s",
    content: (
      <>
        <span className="text-success-l font-bold">✓</span>
        <span className="text-muted-foreground"> scaffolded · 0.9s</span>
      </>
    ),
  },
  {
    delay: "1.8s",
    content: (
      <>
        <span className="text-brand animate-pulse">○</span>{" "}
        <span className="text-brand-l">Writing files…</span>
        <span className="text-fg-subtle"> src/app/dashboard/page.tsx</span>
      </>
    ),
  },
] as const;

export function TerminalDemo({ className }: TerminalDemoProps) {
  return (
    <TerminalWindow className={cn(className)}>
      <div className="flex items-center justify-between border border-brand rounded-md px-3.25 py-1.75 mb-3.5 shadow-[0_0_20px_rgba(217,114,24,0.08)]">
        <span>
          <span className="text-brand-l font-bold">Z&nbsp;&nbsp;Zyraa</span>
          <span className="text-muted-foreground text-xs">
            {" "}
            · AI-powered full-stack builder
          </span>
        </span>
        <span className="text-muted-foreground text-xs">v0.1.0</span>
      </div>

      {LINES.map((line) => (
        <div
          key={line.delay}
          className={cn(
            "opacity-0 animate-slide-in",
            "topBorder" in line && "border-t border-border mt-2 pt-2",
          )}
          style={{ animationDelay: line.delay }}
        >
          {line.content}
        </div>
      ))}

      <div
        className="opacity-0 animate-slide-in mt-2.5"
        style={{ animationDelay: "2.3s" }}
      >
        <div className="flex items-center gap-2.5 border border-border-mid rounded-md px-3.25 py-2">
          <span className="text-brand font-bold">❯</span>
          <span className="text-muted-foreground">
            describe your next change
          </span>
          <span className="text-brand animate-cursor-blink">▌</span>
        </div>
        <div className="text-fg-subtle text-[11px] mt-1.5 pl-0.5">
          describe your next change · enter to continue · ctrl+c to exit
        </div>
      </div>
    </TerminalWindow>
  );
}
