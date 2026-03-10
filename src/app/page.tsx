import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { LandingPage } from "@/components/landing/landing-page";
import { siteConfig } from "@/lib/site-config";

const homeTitle = "שותף צמיחה חיצוני לעסקי B2B ושירות בישראל";

export const metadata: Metadata = {
  title: homeTitle,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | ${homeTitle}`,
    description: siteConfig.description,
    url: "/",
  },
  twitter: {
    title: `${siteConfig.name} | ${homeTitle}`,
    description: siteConfig.description,
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
