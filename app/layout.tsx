import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { StoreProvider } from "@/components/store/StoreProvider";
import { hasPublicPhone, hasPublicSocialLink, siteConfig } from "@/lib/site-config";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const publicSocialLinks = Object.values(siteConfig.socials).filter((href) =>
  hasPublicSocialLink(href),
);

const schema = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: siteConfig.storeName,
  description:
    '19" battery cases, hydroponics systems, and T & V-Slot aluminum accessories with checkout and quote support',
  url: siteConfig.siteUrl,
  ...(hasPublicPhone() ? { telephone: siteConfig.phone } : {}),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  ...(publicSocialLinks.length > 0 ? { sameAs: publicSocialLinks } : {}),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Product Catalog",
    itemListElement: [
      {
        "@type": "ListItem",
        itemOffered: {
          "@type": "Product",
          name: "Battery Cases",
        },
      },
      {
        "@type": "ListItem",
        itemOffered: {
          "@type": "Product",
          name: "Hydroponics Systems",
        },
      },
      {
        "@type": "ListItem",
        itemOffered: {
          "@type": "Product",
          name: "T & V-Slots",
        },
      },
    ],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: "I CAN ENERGIES | Battery Cases, Hydroponics Systems, and T & V-Slots",
  description:
    'Browse 19" battery cases, hydroponics systems, and T & V-Slot aluminum accessories with checkout and quote support.',
  keywords: [
    '19" battery box Pakistan',
    '19" battery brackets Pakistan',
    "battery case Pakistan",
    "hydroponics system Pakistan",
    "V slot Pakistan",
    "T slot Pakistan",
    "triangle connector Pakistan",
    "I CAN ENERGIES",
    "M/S I CAN ENERGIES Pvt. Ltd.",
    "Karachi product supplier",
  ],
  openGraph: {
    title: "I CAN ENERGIES | Battery Cases, Hydroponics Systems, and T & V-Slots",
    description:
      'Browse 19" battery cases, hydroponics systems, and T & V-Slot aluminum accessories with checkout and quote support.',
    type: "website",
    url: siteConfig.siteUrl,
    siteName: siteConfig.storeName,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.storeName} cover image`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${inter.variable} pb-24 font-body antialiased sm:pb-0`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <AnalyticsScripts />
        <StoreProvider>
          {children}
          <FloatingWhatsApp />
          <CookieBanner />
          <Toaster position="bottom-center" />
        </StoreProvider>
      </body>
    </html>
  );
}
