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
  defaultTitle: "Checkmate | שותף צמיחה לעסקי B2B ושירות בישראל",
  titleTemplate: "%s | Checkmate",
  description:
    "Checkmate היא לא עוד סוכנות שיווק. אנחנו נכנסים לעסקי B2B ושירות בישראל כשותף צמיחה חיצוני ומחברים שיווק, לידים, מכירות ותהליך סגירה למערכת אחת עם ROI מדיד.",
  keywords: [
    "Checkmate",
    "שותף צמיחה",
    "טיפול בלידים",
    "ניהול לידים",
    "תיאום פגישות",
    "שיפור מכירות",
    "מערך מכירות",
    "עסקי B2B בישראל",
    "Revenue Share",
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
