export function MiniTerminal() {
  return (
    <div className="rounded-xl border border-border-mid overflow-hidden bg-card shadow-[0_16px_48px_rgba(0,0,0,0.55),0_0_40px_rgba(217,114,24,0.06)]">
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-surface border-b border-border">
        <span className="size-2.5 rounded-full bg-[#FF5F57]" />
        <span className="size-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="size-2.5 rounded-full bg-[#28CA41]" />
        <span className="font-mono text-[10px] text-fg-subtle mx-auto">
          zyra
        </span>
      </div>

      <div className="px-4 py-4 font-mono text-[12px] leading-[1.85]">
        <div className="flex items-center justify-between border border-brand rounded-md px-3 py-[7px] mb-3 shadow-[0_0_20px_rgba(217,114,24,0.08)]">
          <span>
            <span className="text-brand-l font-bold">Z&nbsp;&nbsp;Zyraa</span>
            <span className="text-muted-foreground text-[11px]">
              &nbsp;·&nbsp;AI-powered full-stack builder
            </span>
          </span>
          <span className="text-muted-foreground text-[11px]">v0.1.0</span>
        </div>

        <div>
          <span className="text-success-l font-bold">✓</span>
          <span className="text-muted-foreground">
            {" "}
            built SaaS dashboard&nbsp;·&nbsp;23 files&nbsp;·&nbsp;26.1s
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2.5 border border-border-mid rounded-md px-3 py-2">
          <span className="text-brand font-bold">❯</span>
          <span className="text-muted-foreground">
            describe your next change
          </span>
          <span className="text-brand animate-cursor-blink">█</span>
        </div>
      </div>
    </div>
  );
}
