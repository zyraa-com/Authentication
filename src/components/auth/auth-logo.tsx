export function AuthLogo({ size = "default" }: { size?: "default" | "lg" }) {
  const cls = size === "lg" ? "text-[22px]" : "text-[17px]";
  return (
    <span
      className={`font-sans font-extrabold tracking-[-0.03em] leading-none ${cls}`}
    >
      <span className="text-brand-l">Z</span>
      <span className="text-foreground">yraa</span>
    </span>
  );
}
