import { Link, Section, Text } from "@react-email/components";
import { EmailButton } from "./components/email-button";
import { EmailLayout, emailDivider, t } from "./components/email-layout";

interface ResetPasswordEmailProps {
  name: string;
  resetUrl: string;
}

ResetPasswordEmail.PreviewProps = {
  name: "test@zyraa.dev",
  resetUrl: "https://auth.zyraa.live/reset/demo-token-preview",
} satisfies ResetPasswordEmailProps;

export function ResetPasswordEmail({
  name,
  resetUrl,
}: ResetPasswordEmailProps) {
  return (
    <EmailLayout preview="Reset your Zyraa password">
      <Text style={t.title}>Reset your password.</Text>
      <Text style={t.body}>
        We received a reset request for <strong style={t.strong}>{name}</strong>
        . Click below to set a new password.
      </Text>

      <EmailButton href={resetUrl}>Reset password</EmailButton>

      <Text style={t.expiry}>
        Expires in <strong style={t.strong}>1 hour.</strong>
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
          href={resetUrl}
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "11px",
            color: "#F0922A",
            wordBreak: "break-all",
            textDecoration: "none",
          }}
        >
          {resetUrl}
        </Link>
      </Section>

      <Text style={t.note}>
        Didn't request this? Your password won't change.
      </Text>
    </EmailLayout>
  );
}

export default ResetPasswordEmail;
