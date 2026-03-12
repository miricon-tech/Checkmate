import { faqItems } from "@/content/landing";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

const pageTitle = siteConfig.homeTitle;
const pageDescription = siteConfig.homeDescription;
const primaryImageId = absoluteUrl("/#primaryimage");
const faqPageId = absoluteUrl("/#faq");

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      logo: absoluteUrl(siteConfig.ogImage),
      description: pageDescription,
      areaServed: {
        "@type": "Country",
        name: "Israel",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: siteConfig.whatsappNumber,
          areaServed: "IL",
          availableLanguage: ["he-IL"],
        },
      ],
      knowsLanguage: [siteConfig.language],
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: siteConfig.siteUrl,
      name: siteConfig.name,
      inLanguage: siteConfig.language,
      publisher: {
        "@id": absoluteUrl("/#organization"),
      },
    },
    {
      "@type": "ImageObject",
      "@id": primaryImageId,
      url: absoluteUrl(siteConfig.ogImage),
      contentUrl: absoluteUrl(siteConfig.ogImage),
      width: siteConfig.ogImageWidth,
      height: siteConfig.ogImageHeight,
      caption: `${siteConfig.name} - שותף צמיחה חיצוני לעסקי B2B ושירות בישראל`,
    },
    {
      "@type": "WebPage",
      "@id": absoluteUrl("/#webpage"),
      url: siteConfig.siteUrl,
      name: `${siteConfig.name} | ${pageTitle}`,
      description: pageDescription,
      inLanguage: siteConfig.language,
      isPartOf: {
        "@id": absoluteUrl("/#website"),
      },
      about: {
        "@id": absoluteUrl("/#organization"),
      },
      primaryImageOfPage: {
        "@id": primaryImageId,
      },
      mainEntity: [
        { "@id": absoluteUrl("/#service") },
        { "@id": faqPageId },
      ],
      potentialAction: {
        "@type": "CommunicateAction",
        name: "בדיקת התאמה (15 דק׳)",
        target: absoluteUrl("/#cta"),
      },
    },
    {
      "@type": "Service",
      "@id": absoluteUrl("/#service"),
      name: pageTitle,
      description: pageDescription,
      url: siteConfig.siteUrl,
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
      availableLanguage: [siteConfig.language],
    },
    {
      "@type": "FAQPage",
      "@id": faqPageId,
      url: absoluteUrl("/#faq"),
      inLanguage: siteConfig.language,
      isPartOf: {
        "@id": absoluteUrl("/#webpage"),
      },
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer.join(" "),
        },
      })),
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
