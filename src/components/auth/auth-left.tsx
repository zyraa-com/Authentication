import { MiniTerminal } from "./mini-terminal";

export function AuthLeft() {
  return (
    <div className="hidden lg:flex items-center justify-center px-12 py-16 relative overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "500px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(217,114,24,0.11), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-20 left-[10%] pointer-events-none"
        style={{
          width: "250px",
          height: "250px",
          background:
            "radial-gradient(ellipse, rgba(217,114,24,0.05), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[520px] w-full">
        <div className="flex gap-2 flex-wrap mb-7">
          <span className="inline-flex items-center gap-1.5 bg-surface border border-border-mid rounded-full px-3 py-[5px] text-[12px] text-muted-foreground">
            <span
              className="size-1.5 rounded-full bg-brand"
              style={{ boxShadow: "0 0 5px var(--brand-glow)" }}
            />
            Beta&nbsp;·&nbsp;v0.1.0
          </span>
          <span className="inline-flex items-center gap-1.5 bg-surface border border-border-mid rounded-full px-3 py-[5px] text-[12px] text-muted-foreground">
            <span
              className="size-1.5 rounded-full bg-brand"
              style={{ boxShadow: "0 0 5px var(--brand-glow)" }}
            />
            Claude-powered
          </span>
        </div>

        <h2
          className="font-extrabold tracking-[-0.03em] leading-[1.1] mb-4"
          style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
        >
          Ship your next app
          <br />
          in{" "}
          <span
            className="text-brand-l"
            style={{ textShadow: "0 0 48px rgba(217,114,24,0.30)" }}
          >
            minutes,
          </span>{" "}
          not days.
        </h2>

        <p className="text-[15.5px] text-muted-foreground leading-[1.65] mb-8">
          Describe what you want to build. Zyra handles the rest — framework
          detection, full file generation, and dependency installation.
        </p>

        <MiniTerminal />
      </div>
    </div>
  );
}
