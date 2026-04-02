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
    "Hydroponics plantation towers, pumps and nutrient inputs, aluminum V/T slots, battery racks, and custom sheet metal products",
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
    name: "Renewable Product Catalog",
    itemListElement: [
      {
        "@type": "ListItem",
        itemOffered: {
          "@type": "Product",
          name: "Hydroponics Plantation Towers",
        },
      },
      {
        "@type": "ListItem",
        itemOffered: {
          "@type": "Product",
          name: "PaniPani Pumps and Nutrient Plans",
        },
      },
      {
        "@type": "ListItem",
        itemOffered: {
          "@type": "Product",
          name: "Aluminum V/T Slots and Frame Builds",
        },
      },
      {
        "@type": "ListItem",
        itemOffered: {
          "@type": "Product",
          name: "Battery Racks, Cases, and Custom Sheet Metal",
        },
      },
    ],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: "I CAN ENERGIES | Renewable Products and Fabrication Pakistan",
  description:
    "Browse hydroponics plantation towers, PaniPani pumps, nutrient plans, aluminum V/T slots, battery racks, and custom sheet metal products.",
  keywords: [
    "hydroponics plantation Pakistan",
    "PaniPani water pump Pakistan",
    "battery rack Pakistan",
    "barebone rack Pakistan",
    "battery case Pakistan",
    "V slot aluminum Pakistan",
    "custom sheet metal Pakistan",
    "I CAN ENERGIES",
    "M/S I CAN ENERGIES Pvt. Ltd.",
    "Karachi renewable products",
  ],
  openGraph: {
    title: "I CAN ENERGIES | Renewable Products and Fabrication",
    description:
      "Shop hydroponics towers, pumps, nutrient plans, aluminum slot systems, battery racks, and custom sheet metal products.",
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
