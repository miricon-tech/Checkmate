import "server-only";

import { statSync } from "node:fs";
import path from "node:path";
import { siteConfig } from "@/lib/site-config";

const landingContentFiles = [
  "src/content/landing.ts",
  "src/app/page.tsx",
  "src/app/layout.tsx",
  "src/components/landing/landing-page.tsx",
  "src/components/seo/structured-data.tsx",
] as const;

function readFileModifiedAt(filePath: string) {
  const absolutePath = path.join(process.cwd(), filePath);

  try {
    return statSync(absolutePath).mtime;
  } catch {
    return null;
  }
}

export function getLandingLastModified() {
  const fileDates = landingContentFiles
    .map(readFileModifiedAt)
    .filter((value): value is Date => value instanceof Date);

  if (fileDates.length > 0) {
    return new Date(
      Math.max(...fileDates.map((value) => value.getTime()))
    );
  }

  return new Date(siteConfig.lastModified);
}
