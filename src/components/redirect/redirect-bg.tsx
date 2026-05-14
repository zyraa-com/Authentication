export function RedirectBg() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(217,114,24,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(217,114,24,0.06)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_70%_55%_at_50%_30%,#000_25%,transparent_78%)] [-webkit-mask-image:radial-gradient(ellipse_70%_55%_at_50%_30%,#000_25%,transparent_78%)]"
      />
      <div
        aria-hidden
        className="absolute pointer-events-none w-[min(780px,100vw)] h-[460px] -top-[120px] left-1/2 -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(217,114,24,0.14)_0%,transparent_70%)]"
      />
    </>
  );
}
