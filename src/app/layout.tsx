import type { Metadata } from "next";
import { Inter, Onest } from "next/font/google";
import { CookieBanner } from "@/components/shared/CookieBanner/CookieBanner";
import { siteConfig } from "@/config/site";
import { themeBootScript } from "@/utils/theme";
import "./globals.css";

const sans = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const display = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const siteOrigin = (process.env.SITE_URL || siteConfig.url).replace(/\/$/, "");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.nameRu,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: `${siteOrigin}${basePath}/`,
    siteName: siteConfig.nameRu,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      data-theme="dark"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
