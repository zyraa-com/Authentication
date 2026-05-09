export function AuthDivider() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-border" />
      <span className="text-[11.5px] text-muted-foreground font-medium shrink-0">
        or continue with email
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
