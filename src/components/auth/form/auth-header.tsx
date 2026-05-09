import { AuthLogo } from "../auth-logo";

interface AuthHeaderProps {
  title: string;
  sub: string;
}

export function AuthHeader({ title, sub }: AuthHeaderProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <AuthLogo size="lg" />
      <h2 className="mt-5 text-[1.6rem] font-bold tracking-tight text-foreground">
        {title}
      </h2>
      <p className="text-sm text-muted-foreground">{sub}</p>
    </div>
  );
}
