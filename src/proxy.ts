import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

const canonicalUrl = new URL(siteConfig.siteUrl);
const canonicalHostname = canonicalUrl.hostname;
const normalizedCanonicalHostname = canonicalHostname.replace(/^www\./, "");

function normalizeHostname(hostname: string) {
  return hostname.replace(/^www\./, "");
}

export function proxy(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  const currentHostname = request.nextUrl.hostname;

  if (normalizeHostname(currentHostname) !== normalizedCanonicalHostname) {
    return NextResponse.next();
  }

  if (currentHostname === canonicalHostname) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();

  redirectUrl.protocol = canonicalUrl.protocol;
  redirectUrl.hostname = canonicalHostname;
  redirectUrl.port = canonicalUrl.port;

  return NextResponse.redirect(redirectUrl, 301);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
