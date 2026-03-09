const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL ||
  "http://localhost:3000";

function normalizeSiteUrl(value: string) {
  const withProtocol = value.startsWith("http") ? value : `https://${value}`;
  return withProtocol.replace(/\/$/, "");
}

export const siteConfig = {
  name: "Checkmate",
  locale: "he_IL",
  siteUrl: normalizeSiteUrl(rawSiteUrl),
  defaultTitle: "Checkmate | טיפול בלידים, תיאום פגישות ושיפור מכירות",
  titleTemplate: "%s | Checkmate",
  description:
    "Checkmate מחברת בין שיווק, טיפול בלידים, תיאום פגישות ותהליך המכירה כדי לייצר יותר פגישות שמתקיימות, יותר שליטה ויותר סגירות.",
  keywords: [
    "Checkmate",
    "טיפול בלידים",
    "ניהול לידים",
    "תיאום פגישות",
    "שיפור מכירות",
    "מערך מכירות",
    "CRM",
    "דוחות KPI",
    "שקיפות מכירות",
    "מערכת מכירות לעסקים",
  ],
  ogImage: "/checkmate_logo.png",
  ogImageWidth: 1536,
  ogImageHeight: 1024,
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.siteUrl).toString();
}
