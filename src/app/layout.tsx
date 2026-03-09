import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Checkmate | Landing Page Infrastructure",
  description:
    "Landing page scaffold built with Next.js, TypeScript, Tailwind, and Adobe Fonts.",
  icons: {
    icon: "/checkmate_logo.png",
    shortcut: "/checkmate_logo.png",
    apple: "/checkmate_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/nvz5wxq.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
