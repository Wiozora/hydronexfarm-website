import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.ogImage,
}: MetadataInput): Metadata {
  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title,
    description,
    alternates: {
      canonical: path,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: path,
      siteName: siteConfig.storeName,
      locale: "en_PK",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteConfig.storeName} cover image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    keywords: [
      '19" battery box Pakistan',
      "V slot aluminum Pakistan",
      "hydroponics system Pakistan",
      "triangle connector Pakistan",
      "I CAN ENERGIES",
      "M/S I CAN ENERGIES Pvt. Ltd.",
    ],
  };
}
