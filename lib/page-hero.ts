type BreadcrumbLike = {
  label: string;
};

type HeroBackgroundPreset = {
  id: string;
  alt: string;
  image: string;
  objectPosition?: string;
  keywords: string[];
};

const heroBackgroundPresets: HeroBackgroundPreset[] = [
  {
    id: "hydroponics",
    alt: "High-tech hydroponics greenhouse",
    image: "/products/hydroponics/client/tower-greenhouse-wide.jpeg",
    objectPosition: "object-center",
    keywords: [
      "hydroponics",
      "hydroponic",
      "vertical plantation",
      "vertical farming",
      "grow",
      "greenhouse",
      "farm",
      "farming",
      "leafy greens",
    ],
  },
  {
    id: "nutrients",
    alt: "Hydroponic nutrient preparation",
    image: "/products/hydroponics/client/tower-greenhouse-row.jpeg",
    objectPosition: "object-center",
    keywords: [
      "nutrient",
      "nutrients",
      "bloom",
      "vegetative",
      "formula",
      "dosing",
      "additives",
      "concentrate",
    ],
  },
  {
    id: "battery",
    alt: "Energy storage and battery technology",
    image:
      "/products/battery/racks/rack-front.jpeg",
    objectPosition: "object-center",
    keywords: [
      "battery",
      "batteries",
      "energy storage",
      "backup",
      "enclosure",
      "enclosures",
      "cells",
      "power",
      "bracket",
      "brackets",
    ],
  },
  {
    id: "aluminum",
    alt: "Industrial structural framing and fabrication",
    image:
      "/products/aluminum/slots/profile-color-options.jpeg",
    objectPosition: "object-center",
    keywords: [
      "aluminum",
      "aluminium",
      "profile",
      "profiles",
      "connector",
      "connectors",
      "fastener",
      "fasteners",
      "structural",
      "fabrication",
      "frame",
      "frames",
    ],
  },
  {
    id: "support",
    alt: "Professional buyer support and consultation",
    image: "/images/marketing/office-team-consultation.webp",
    objectPosition: "object-center",
    keywords: [
      "contact",
      "support",
      "consultation",
      "inquiry",
      "quote",
      "buyer",
      "handoff",
      "service",
      "help",
    ],
  },
  {
    id: "legal",
    alt: "Secure digital policy and compliance background",
    image: "/images/marketing/project-documents-review.webp",
    objectPosition: "object-center",
    keywords: [
      "privacy",
      "policy",
      "terms",
      "refund",
      "return",
      "warranty",
      "legal",
      "compliance",
      "conditions",
    ],
  },
  {
    id: "shop",
    alt: "Renewable product catalog background",
    image: "/products/hydroponics/client/tower-greenhouse-wide.jpeg",
    objectPosition: "object-center",
    keywords: [
      "shop",
      "store",
      "storefront",
      "catalog",
      "product",
      "products",
      "category",
      "categories",
      "detail page",
      "detail pages",
    ],
  },
  {
    id: "default",
    alt: "Renewable energy project background",
    image: "/products/hydroponics/client/tower-greenhouse-row.jpeg",
    objectPosition: "object-center",
    keywords: [],
  },
];

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[-_/]+/g, " ").replace(/\s+/g, " ").trim();
}

export function resolvePageHeroBackground({
  title,
  description,
  eyebrow,
  backgroundContext,
  breadcrumbs = [],
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  backgroundContext?: string;
  breadcrumbs?: BreadcrumbLike[];
}) {
  const haystack = normalizeText(
    [
      title,
      description,
      eyebrow,
      backgroundContext,
      ...breadcrumbs.map((item) => item.label),
    ]
      .filter(Boolean)
      .join(" "),
  );

  const bestPreset = heroBackgroundPresets.reduce(
    (currentBest, preset) => {
      const score = preset.keywords.reduce(
        (total, keyword) => total + (haystack.includes(keyword) ? 1 : 0),
        0,
      );

      if (score > currentBest.score) {
        return { preset, score };
      }

      return currentBest;
    },
    {
      preset: heroBackgroundPresets[heroBackgroundPresets.length - 1],
      score: 0,
    },
  );

  return bestPreset.preset;
}

