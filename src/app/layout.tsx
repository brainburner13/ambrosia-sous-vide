import type { Metadata } from "next";
import { Inter, Onest } from "next/font/google";
import { cookies } from "next/headers";
import { CookieBanner } from "@/components/shared/CookieBanner/CookieBanner";
import { siteConfig } from "@/config/site";
import { parseTheme, THEME_COOKIE } from "@/utils/theme";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.nameRu,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = parseTheme((await cookies()).get(THEME_COOKIE)?.value);

  return (
    <html
      lang="ru"
      data-theme={theme}
      className={`${sans.variable} ${display.variable}`}
    >
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
