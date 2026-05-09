import { getAuthCallbackUrl } from "@/lib/auth-redirect";
import { RedirectingScreen } from "@/components/redirect/redirecting-screen";

export async function AuthRedirect() {
  const { url, name } = await getAuthCallbackUrl();
  return <RedirectingScreen url={url} name={name} />;
}
