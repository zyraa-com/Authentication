import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
  bodyClassName?: string;
}

export function TerminalWindow({
  children,
  label = "zsh · ~/projects",
  className,
  bodyClassName,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border-mid rounded-[14px] overflow-hidden",
        "shadow-[0_32px_80px_rgba(0,0,0,0.7),0_0_60px_rgba(217,114,24,0.05)]",
        className,
      )}
    >
      <div className="flex items-center gap-1.75 px-4 py-3 bg-surface border-b border-border">
        <span className="size-2.75 rounded-full bg-[#FF5F57] shrink-0" />
        <span className="size-2.75 rounded-full bg-[#FFBD2E] shrink-0" />
        <span className="size-2.75 rounded-full bg-[#28CA41] shrink-0" />
        <span className="font-mono text-[11px] text-fg-subtle mx-auto">
          {label}
        </span>
      </div>
      <div
        className={cn(
          "p-[22px_24px] font-mono text-[13px] leading-[1.9]",
          bodyClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
