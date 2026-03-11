import "server-only";
import { siteConfig } from "@/lib/site-config";

const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function parsePositiveInteger(value: string | undefined, fallback: number) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
}

const maxRequests = parsePositiveInteger(
  process.env.LEAD_FORM_RATE_LIMIT_MAX,
  5
);
const rateLimitWindowSeconds = parsePositiveInteger(
  process.env.LEAD_FORM_RATE_LIMIT_WINDOW_SECONDS,
  600
);
const maxBodyBytes = parsePositiveInteger(
  process.env.LEAD_FORM_MAX_BODY_BYTES,
  12_000
);

function cleanupRateLimitBuckets(now: number) {
  for (const [key, bucket] of rateLimitBuckets) {
    if (bucket.resetAt <= now) {
      rateLimitBuckets.delete(key);
    }
  }
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

export function checkLeadRateLimit(request: Request) {
  const now = Date.now();
  const windowMs = rateLimitWindowSeconds * 1000;

  cleanupRateLimitBuckets(now);

  const key = getClientIp(request);
  const currentBucket = rateLimitBuckets.get(key);

  if (!currentBucket || currentBucket.resetAt <= now) {
    const resetAt = now + windowMs;

    rateLimitBuckets.set(key, { count: 1, resetAt });

    return {
      limited: false,
      remaining: Math.max(0, maxRequests - 1),
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (currentBucket.count >= maxRequests) {
    return {
      limited: true,
      remaining: 0,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((currentBucket.resetAt - now) / 1000)
      ),
    };
  }

  currentBucket.count += 1;

  return {
    limited: false,
    remaining: Math.max(0, maxRequests - currentBucket.count),
    retryAfterSeconds: Math.max(
      1,
      Math.ceil((currentBucket.resetAt - now) / 1000)
    ),
  };
}

export function hasAllowedLeadOrigin(request: Request) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  let normalizedOrigin: string;

  try {
    normalizedOrigin = new URL(origin).origin;
  } catch {
    return false;
  }

  const configuredOrigins = (process.env.ALLOWED_FORM_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const allowedOrigins = new Set<string>([
    new URL(request.url).origin,
    siteConfig.siteUrl,
    ...configuredOrigins,
  ]);

  return allowedOrigins.has(normalizedOrigin);
}

export function hasJsonContentType(request: Request) {
  const contentType = request.headers.get("content-type");

  return Boolean(
    contentType && contentType.toLowerCase().startsWith("application/json")
  );
}

export function isBodyTooLarge(request: Request) {
  const contentLength = request.headers.get("content-length");

  if (!contentLength) {
    return false;
  }

  const bodyLength = Number(contentLength);

  return Number.isFinite(bodyLength) && bodyLength > maxBodyBytes;
}

export function getLeadGuardConfig() {
  return {
    maxBodyBytes,
    maxRequests,
    rateLimitWindowSeconds,
  };
}
