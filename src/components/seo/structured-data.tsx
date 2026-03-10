import { absoluteUrl, siteConfig } from "@/lib/site-config";

const pageTitle = "שותף צמיחה חיצוני לעסקי B2B ושירות בישראל";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      logo: absoluteUrl(siteConfig.ogImage),
      description: siteConfig.description,
      areaServed: {
        "@type": "Country",
        name: "Israel",
      },
      knowsLanguage: ["he-IL"],
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: siteConfig.siteUrl,
      name: siteConfig.name,
      inLanguage: "he-IL",
      publisher: {
        "@id": absoluteUrl("/#organization"),
      },
    },
    {
      "@type": "WebPage",
      "@id": absoluteUrl("/#webpage"),
      url: siteConfig.siteUrl,
      name: `${siteConfig.name} | ${pageTitle}`,
      description: siteConfig.description,
      inLanguage: "he-IL",
      isPartOf: {
        "@id": absoluteUrl("/#website"),
      },
      about: {
        "@id": absoluteUrl("/#organization"),
      },
      primaryImageOfPage: absoluteUrl(siteConfig.ogImage),
      potentialAction: {
        "@type": "CommunicateAction",
        name: "בדיקת התאמה (15 דק׳)",
        target: absoluteUrl("/#cta"),
      },
    },
    {
      "@type": "Service",
      "@id": absoluteUrl("/#service"),
      name: "Checkmate Growth Partner Program",
      description: siteConfig.description,
      serviceType: [
        "שותף צמיחה חיצוני",
        "טיפול בלידים",
        "תיאום פגישות",
        "שיפור מערך המכירות",
        "מודל מבוסס ביצועים וצמיחה",
        "דוחות KPI",
      ],
      provider: {
        "@id": absoluteUrl("/#organization"),
      },
      areaServed: {
        "@type": "Country",
        name: "Israel",
      },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "עסקים עם עסקה ממוצעת של 15,000 ש\"ח ומעלה",
      },
      availableLanguage: ["he-IL"],
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
