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
    image:
      "https://images.pexels.com/photos/6231790/pexels-photo-6231790.jpeg?auto=compress&cs=tinysrgb&w=1800",
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
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1800&q=80",
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
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1800&q=80",
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
      "https://images.unsplash.com/photo-1581091215367-59ab6dcef10c?auto=format&fit=crop&w=1800&q=80",
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
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80",
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
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1800&q=80",
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
    image:
      "https://images.pexels.com/photos/7299976/pexels-photo-7299976.jpeg?auto=compress&cs=tinysrgb&w=1800",
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
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1800&q=80",
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
