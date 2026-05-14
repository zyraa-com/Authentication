import { Link, Section, Text } from "@react-email/components";
import { EmailButton } from "./components/email-button";
import { EmailLayout, emailDivider, t } from "./components/email-layout";

interface VerifyEmailProps {
  name: string;
  verificationUrl: string;
}

VerifyEmail.PreviewProps = {
  name: "John Doe",
  verificationUrl: "https://auth.zyraa.live/verify/demo-token-preview",
} satisfies VerifyEmailProps;

export function VerifyEmail({ name, verificationUrl }: VerifyEmailProps) {
  return (
    <EmailLayout preview="Verify your Zyraa email address">
      <Text style={t.title}>Verify your email.</Text>
      <Text style={t.body}>
        Click below to verify <strong style={t.strong}>{name}</strong> and
        activate your account.
      </Text>

      <EmailButton href={verificationUrl}>Verify email address</EmailButton>

      <Text style={t.expiry}>
        Expires in <strong style={t.strong}>24 hours.</strong>
      </Text>

      {emailDivider}

      <Text style={{ ...t.note, marginBottom: "8px" }}>
        If the button doesn't work:
      </Text>
      <Section
        style={{
          backgroundColor: "#0A0A0C",
          border: "1px solid #1E1E25",
          borderRadius: "6px",
          padding: "10px 14px",
          margin: "0 0 14px",
        }}
      >
        <Link
          href={verificationUrl}
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "11px",
            color: "#F0922A",
            wordBreak: "break-all",
            textDecoration: "none",
          }}
        >
          {verificationUrl}
        </Link>
      </Section>

      <Text style={t.note}>Didn't create an account? Ignore this email.</Text>
    </EmailLayout>
  );
}

export default VerifyEmail;
