import type { Metadata } from "next";
// Self-hosted fonts (offline-friendly). Latin + Cyrillic subsets for UA text.
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/inter/cyrillic-400.css";
import "@fontsource/inter/cyrillic-500.css";
import "@fontsource/inter/cyrillic-600.css";
import "@fontsource/inter/cyrillic-700.css";
import "@fontsource/playfair-display/latin-400.css";
import "@fontsource/playfair-display/latin-500.css";
import "@fontsource/playfair-display/latin-600.css";
import "@fontsource/playfair-display/cyrillic-400.css";
import "@fontsource/playfair-display/cyrillic-500.css";
import "@fontsource/playfair-display/cyrillic-600.css";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";
import { StructuredData } from "@/components/seo/structured-data";
import { SITE_URL, localeMeta } from "@/lib/i18n";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: localeMeta.ua.title,
    template: "%s · LAVANDA",
  },
  description: localeMeta.ua.description,
  applicationName: "LAVANDA",
  authors: [{ name: "LAVANDA / COMPANY VASYNA" }],
  creator: "LAVANDA / COMPANY VASYNA",
  publisher: "LAVANDA / COMPANY VASYNA",
  keywords: [
    "дикий зруб",
    "будинки з дерева",
    "канадська технологія",
    "log homes",
    "handcrafted log homes",
    "дерев'яні будинки преміум",
    "LAVANDA",
    "HolzbauRustikal",
    "Naturstammhaus",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "LAVANDA",
    title: localeMeta.ua.title,
    description: localeMeta.ua.description,
    url: SITE_URL,
    locale: "uk_UA",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/white-log-house-at-night.jpg",
        alt: "Дерев'яний зруб LAVANDA з архітектурним підсвічуванням уночі",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: localeMeta.ua.title,
    description: localeMeta.ua.description,
    images: ["/white-log-house-at-night.jpg"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className="scroll-smooth">
      <body className="bg-[#0F0F0F] font-sans text-[#EAE7E1] antialiased">
        <StructuredData locale="ua" />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
