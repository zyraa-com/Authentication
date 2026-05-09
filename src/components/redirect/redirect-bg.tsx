export function RedirectBg() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(217,114,24,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(217,114,24,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 55% at 50% 30%, #000 25%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 55% at 50% 30%, #000 25%, transparent 78%)",
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: "min(780px, 100vw)",
          height: "460px",
          top: "-120px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(ellipse, rgba(217,114,24,0.14) 0%, transparent 70%)",
        }}
      />
    </>
  );
}
