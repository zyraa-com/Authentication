import { GitHubIcon } from "@/icons/GithubIcon";
import { GoogleIcon } from "@/icons/GoogleIcon";

export const OAUTH_PROVIDERS = [
  {
    id: "google",
    label: "Google",
    icon: <GoogleIcon />,
  },
  {
    id: "github",
    label: "GitHub",
    icon: <GitHubIcon />,
  },
] as const;
