import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { LandingPage } from "@/components/landing/landing-page";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: siteConfig.homeTitle,
  description: siteConfig.homeDescription,
  keywords: [
    ...siteConfig.keywords,
    "שותף צמיחה לעסקים",
    "שיווק ומכירות לעסקי שירות",
    "שותף צמיחה B2B",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.homeTitle}`,
    description: siteConfig.homeDescription,
    url: absoluteUrl("/"),
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: siteConfig.ogImageWidth,
        height: siteConfig.ogImageHeight,
        alt: `${siteConfig.name} - שותף צמיחה חיצוני לעסקי B2B ושירות בישראל`,
      },
    ],
  },
  twitter: {
    title: `${siteConfig.name} | ${siteConfig.homeTitle}`,
    description: siteConfig.homeDescription,
    images: [absoluteUrl(siteConfig.ogImage)],
  },
};

export default function Home() {
  return (
    <>
      <StructuredData />
      <LandingPage />
    </>
  );
}
