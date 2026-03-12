import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.isIndexable) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: absoluteUrl("/sitemap.xml"),
      host: siteConfig.siteUrl,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.siteUrl,
  };
}
