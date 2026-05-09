import { Button, Section } from "@react-email/components";

interface EmailButtonProps {
  href: string;
  children: string;
}

export function EmailButton({ href, children }: EmailButtonProps) {
  return (
    <Section style={{ textAlign: "center", margin: "28px 0" }}>
      <Button
        href={href}
        style={{
          display: "inline-block",
          background: "linear-gradient(135deg,#C45D14,#F0922A)",
          backgroundColor: "#D97218",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "600",
          padding: "12px 28px",
          borderRadius: "7px",
          textDecoration: "none",
          letterSpacing: "-0.01em",
          boxShadow: "0 4px 20px rgba(217,114,24,.28)",
        }}
      >
        {children}
      </Button>
    </Section>
  );
}
