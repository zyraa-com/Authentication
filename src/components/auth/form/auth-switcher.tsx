import Link from "next/link";

interface AuthSwitcherProps {
  prompt: string;
  label: string;
  href: string;
}

export function AuthSwitcher({ prompt, label, href }: AuthSwitcherProps) {
  return (
    <p className="text-center text-[13px] text-muted-foreground">
      {prompt}{" "}
      <Link
        href={href}
        className="text-brand hover:text-brand-l font-medium transition-colors"
      >
        {label}
      </Link>
    </p>
  );
}
