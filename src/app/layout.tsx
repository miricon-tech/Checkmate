import type { Metadata, Viewport } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import "./globals.css";

const allowIndexing = siteConfig.isIndexable;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  category: "business",
  creator: siteConfig.name,
  publisher: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      "he-IL": absoluteUrl("/"),
      "x-default": absoluteUrl("/"),
    },
  },
  robots: {
    index: allowIndexing,
    follow: allowIndexing,
    nocache: !allowIndexing,
    googleBot: {
      index: allowIndexing,
      follow: allowIndexing,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
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
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImage)],
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: "#16345c",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir={siteConfig.direction}>
      <head>
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://use.typekit.net" />
        <link rel="dns-prefetch" href="https://p.typekit.net" />
        <link
          rel="preload"
          href="https://use.typekit.net/nvz5wxq.css"
          as="style"
        />
        <link rel="stylesheet" href="https://use.typekit.net/nvz5wxq.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
