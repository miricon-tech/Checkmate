function normalizeSiteUrl(value: string) {
  const withProtocol = value.startsWith("http") ? value : `https://${value}`;
  return withProtocol.replace(/\/$/, "");
}

function getNormalizedHostname(value: string) {
  return new URL(value).hostname.replace(/^www\./, "");
}

const canonicalSiteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://checkmate.co.il"
);

const runtimeSiteUrl = normalizeSiteUrl(
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    canonicalSiteUrl
);

const canonicalHost = getNormalizedHostname(canonicalSiteUrl);
const runtimeHost = getNormalizedHostname(runtimeSiteUrl);

export const siteConfig = {
  name: "Checkmate",
  locale: "he_IL",
  language: "he-IL",
  direction: "rtl",
  siteUrl: canonicalSiteUrl,
  runtimeSiteUrl,
  isIndexable: canonicalHost === runtimeHost,
  defaultTitle: "Checkmate | שותף צמיחה חיצוני לעסקי B2B ושירות בישראל",
  titleTemplate: "%s | Checkmate",
  description:
    "Checkmate היא לא עוד סוכנות שיווק. אנחנו נכנסים לעסקי B2B ושירות בישראל כשותף צמיחה חיצוני ומחברים שיווק, לידים, מכירות ותהליך סגירה למערכת אחת עם ROI מדיד.",
  homeTitle: "שותף צמיחה חיצוני לעסקי B2B ושירות בישראל",
  homeDescription:
    "Checkmate מחברת בין שיווק, טיפול בלידים, מכירות ומדידה למערכת צמיחה אחת לעסקי B2B ושירות בישראל.",
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
  ogImage: "/checkmate-og.jpg",
  ogImageWidth: 1536,
  ogImageHeight: 1024,
  whatsappNumber: "+972546712130",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.siteUrl).toString();
}
