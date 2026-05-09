import { TerminalDemo } from "@/components/terminal/terminal-demo";

export function AuthLeft() {
  return (
    <div className="hidden lg:flex items-center justify-center px-10 xl:px-16 py-16 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-[500px] h-[400px] bg-[radial-gradient(ellipse,rgba(217,114,24,0.11),transparent_70%)]" />
      <div className="absolute bottom-20 left-[10%] pointer-events-none w-[250px] h-[250px] bg-[radial-gradient(ellipse,rgba(217,114,24,0.05),transparent_70%)]" />

      <div className="relative z-10 w-full max-w-[600px]">
        <div className="flex gap-2 flex-wrap mb-7">
          <span className="inline-flex items-center gap-1.5 bg-surface border border-border-mid rounded-full px-3 py-[5px] text-[12px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-brand shadow-[0_0_5px_var(--brand-glow)]" />
            Beta&nbsp;·&nbsp;v0.1.0
          </span>
        </div>

        <h2 className="font-extrabold tracking-[-0.03em] leading-[1.1] mb-4 text-[clamp(28px,3.5vw,44px)]">
          Ship your next app
          <br />
          in
          <span className="text-brand-l [text-shadow:0_0_48px_rgba(217,114,24,0.30)]">
            minutes,
          </span>
          not days.
        </h2>

        <p className="text-[15.5px] text-muted-foreground leading-[1.65] mb-8">
          Describe what you want to build. Zyra handles the rest — framework
          detection, full file generation, and dependency installation.
        </p>

        <TerminalDemo className="w-full" />
      </div>
    </div>
  );
}
