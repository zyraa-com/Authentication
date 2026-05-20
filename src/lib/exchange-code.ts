import { redis } from "./redis";

const PREFIX = "exc:";
const TTL_SECONDS = 60;

function generateCode(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Buffer.from(bytes).toString("base64url");
}

export async function createExchangeCode(userId: string): Promise<string> {
  const code = generateCode();
  await redis.set(`${PREFIX}${code}`, userId, { ex: TTL_SECONDS });
  return code;
}
