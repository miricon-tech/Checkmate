import "server-only";
import { z } from "zod";
import { siteConfig } from "@/lib/site-config";

const turnstileResponseSchema = z.object({
  action: z.string().optional(),
  hostname: z.string().optional(),
  success: z.boolean(),
  "error-codes": z.array(z.string()).optional(),
});

const turnstileVerifyEndpoint =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const expectedAction = "lead_form";

function getExpectedHostnames() {
  const configuredHostnames = (process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const hostnames = new Set<string>([
    new URL(siteConfig.siteUrl).hostname,
    ...configuredHostnames,
  ]);

  if (process.env.VERCEL_URL) {
    hostnames.add(new URL(`https://${process.env.VERCEL_URL}`).hostname);
  }

  if (process.env.NODE_ENV !== "production") {
    hostnames.add("localhost");
    hostnames.add("127.0.0.1");
  }

  return hostnames;
}

function getTurnstileSecret() {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    throw new Error("Missing required environment variable: TURNSTILE_SECRET_KEY");
  }

  return secret;
}

export async function verifyTurnstileToken(token: string, remoteIp?: string) {
  const requestBody = new URLSearchParams({
    idempotency_key: crypto.randomUUID(),
    response: token,
    secret: getTurnstileSecret(),
  });

  if (remoteIp && remoteIp !== "unknown") {
    requestBody.set("remoteip", remoteIp);
  }

  const response = await fetch(turnstileVerifyEndpoint, {
    body: requestBody.toString(),
    cache: "no-store",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Turnstile verification failed with status ${response.status}`);
  }

  const result = turnstileResponseSchema.parse(await response.json());

  if (!result.success) {
    return {
      errorCodes: result["error-codes"] ?? [],
      ok: false as const,
      resetRequired: true,
    };
  }

  if (result.action && result.action !== expectedAction) {
    return {
      errorCodes: ["action-mismatch"],
      ok: false as const,
      resetRequired: true,
    };
  }

  if (result.hostname && !getExpectedHostnames().has(result.hostname)) {
    return {
      errorCodes: ["hostname-mismatch"],
      ok: false as const,
      resetRequired: true,
    };
  }

  return {
    errorCodes: [] as string[],
    ok: true as const,
    resetRequired: false,
  };
}
