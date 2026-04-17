import type { StoreCategory, StoreProduct, StoreVariant } from "@/types";

function buildVariant({
  id,
  name,
  sku,
  summary,
  availability,
  leadTime,
  pricePkr,
  badge,
  priceStatus = typeof pricePkr === "number" ? "fixed" : "quote",
  specifications,
}: {
  id: string;
  name: string;
  sku: string;
  summary: string;
  availability: string;
  leadTime: string;
  pricePkr?: number;
  badge?: string;
  priceStatus?: "fixed" | "quote" | "pending";
  specifications: StoreVariant["specifications"];
}): StoreVariant {
  return {
    id,
    name,
    sku,
    summary,
    availability,
    leadTime,
    pricePkr,
    priceStatus,
    badge,
    specifications,
  };
}

function buildProduct({
  slug,
  categorySlug,
  name,
  tag,
  summary,
  description,
  image,
  gallery,
  features,
  benefits,
  applications,
  specifications,
  dimensions,
  faqs,
  trustHighlights,
  testimonialIds,
  seoTitle,
  seoDescription,
  variant,
  filterTags,
  featured = false,
}: {
  slug: string;
  categorySlug: string;
  name: string;
  tag: string;
  summary: string;
  description: string;
  image: string;
  gallery: string[];
  features: string[];
  benefits: string[];
  applications: string[];
  specifications: StoreProduct["specifications"];
  dimensions?: StoreProduct["dimensions"];
  faqs?: StoreProduct["faqs"];
  trustHighlights?: StoreProduct["trustHighlights"];
  testimonialIds?: StoreProduct["testimonialIds"];
  seoTitle?: StoreProduct["seoTitle"];
  seoDescription?: StoreProduct["seoDescription"];
  variant: StoreVariant;
  filterTags: string[];
  featured?: boolean;
}): StoreProduct {
  return {
    slug,
    categorySlug,
    name,
    shortName: name,
    tag,
    summary,
    description,
    image,
    gallery,
    features,
    benefits,
    applications,
    specifications,
    dimensions,
    faqs,
    trustHighlights,
    testimonialIds: testimonialIds ?? categoryTestimonialIds[categorySlug],
    seoTitle: seoTitle ?? `${name} | I CAN ENERGIES`,
    seoDescription: seoDescription ?? description,
    variants: [variant],
    filterTags,
    featured,
  };
}

const hydroponicsGallery = [
  "/products/hydroponics/tower-main.jpeg",
  "/products/hydroponics/tower-side.jpeg",
  "/products/hydroponics/vertical-system-1.jpeg",
  "/products/hydroponics/vertical-system-2.jpeg",
  "/products/hydroponics/client/tower-greenhouse-wide.jpeg",
  "/products/hydroponics/client/tower-greenhouse-row.jpeg",
];

const batteryBracketGallery = [
  "/products/battery/brackets/mount-panel-front.jpeg",
  "/products/battery/brackets/mount-bracket-front.jpeg",
  "/products/battery/brackets/mount-bracket-angle.jpeg",
];

const slotGallery = [
  "/products/aluminum/slots/profile-series.jpeg",
  "/products/aluminum/slots/profile-size-stack.jpeg",
  "/products/aluminum/slots/profile-color-options.jpeg",
  "/products/aluminum/slots/v-slot-vs-t-slot.jpeg",
];

const connectorGallery = [
  "/products/aluminum/connectors/triangle-bracket.jpeg",
  "/products/aluminum/connectors/connector-2.jpeg",
  "/products/aluminum/connectors/connector-3.jpeg",
];

const categoryTestimonialIds: Record<string, string[]> = {
  "battery-cases": ["battery-integrator-lahore"],
  "hydroponics-systems": ["hydro-school-karachi", "hydro-cafe-peshawar"],
  "t-v-slots": ["slot-fabricator-islamabad"],
};

const batteryTrustHighlights: StoreCategory["trustHighlights"] = [
  {
    title: "Rack-fit guidance",
    detail: '19 inch format, U-size, and lead-time details stay visible before you request a quote.',
  },
  {
    title: "Manual quote review",
    detail: "Battery case pricing stays tailored to size, quantity, and cabinet requirements instead of showing a generic estimate.",
  },
  {
    title: "Warranty clarity",
    detail: "Refund and warranty terms are published before commercial confirmation.",
    href: "/refund-policy",
    linkLabel: "View refund and warranty",
  },
];

const hydroponicsTrustHighlights: StoreCategory["trustHighlights"] = [
  {
    title: "Checkout-ready pricing",
    detail: "Tower systems with fixed pricing can move straight into checkout with a pending-verification order flow.",
  },
  {
    title: "Manual payment confirmation",
    detail: "JazzCash and bank transfer references are reviewed before dispatch so the buying flow stays clear and documented.",
  },
  {
    title: "Delivery planning",
    detail: "City, address, and installation notes are captured during checkout before the team confirms the next step.",
  },
];

const slotTrustHighlights: StoreCategory["trustHighlights"] = [
  {
    title: "Price visibility",
    detail: "Profiles and connectors show fixed pricing so buyers can estimate material requirements before checkout.",
  },
  {
    title: "Real reference images",
    detail: "Product photos help buyers confirm the profile or connector type before they place an order.",
  },
  {
    title: "Support for custom builds",
    detail: "If the standard part is not enough, the team can still guide framing and quantity requirements through inquiry support.",
  },
];

const batteryFaqs: StoreCategory["faqs"] = [
  {
    question: 'How do I choose between the 3U, 4U, and 5U battery boxes?',
    answer:
      "Choose the U-size based on the battery stack height, cabinet clearance, and any mounting constraints in your enclosure plan. If you are comparing cabinet fit, send the project notes in the quote request so the team can guide you.",
  },
  {
    question: 'Are these battery boxes made for 19 inch rack-style installations?',
    answer:
      'Yes. The battery box range is listed in a 19 inch format so buyers can quickly confirm compatibility with cabinet and rack-based layouts before final commercial discussion.',
  },
  {
    question: "How is pricing handled for battery cases?",
    answer:
      "Battery case pricing is handled through a manual quote because size, quantity, fabrication scope, and delivery city can change the final commercial terms.",
  },
];

const hydroponicsFaqs: StoreCategory["faqs"] = [
  {
    question: "What is the difference between the 25, 50, and 75 plant systems?",
    answer:
      "The main differences are plant capacity, tower height, and the type of location each system suits. Smaller systems work well for compact spaces, while larger towers are better for higher-output projects.",
  },
  {
    question: "Can I place an order online for hydroponics systems?",
    answer:
      "Yes. Fixed-price hydroponics systems can move into the checkout flow, where you submit city, address, payment method, and transaction reference for manual order verification.",
  },
  {
    question: "What should I include in the project notes?",
    answer:
      "Include your city, intended installation space, quantity, and any questions about capacity or delivery. That helps the team confirm the right configuration and the next step more quickly.",
  },
];

const slotFaqs: StoreCategory["faqs"] = [
  {
    question: "How are V Slot profile prices shown?",
    answer:
      "The profile range shows fixed pricing per feet, while connectors show unit pricing. This gives buyers a clear planning reference before they move to checkout or request support.",
  },
  {
    question: "Can I use the site for both profiles and connectors in one order?",
    answer:
      "Yes. Fixed-price profiles and connectors can be combined in the same checkout-ready basket, and any custom framing questions can still be handled through inquiry support.",
  },
  {
    question: "What if I need help selecting the right connector type?",
    answer:
      "Use the real reference images and the listed connector names to shortlist the right part, then share any framing notes through inquiry or WhatsApp if you need technical guidance.",
  },
];

function buildRackDimensions(size: string): StoreProduct["dimensions"] {
  return [
    { label: "Rack format", value: '19 inch cabinet width' },
    { label: "Height", value: size },
    { label: "Use case", value: "Battery enclosure and cabinet planning" },
  ];
}

function buildTowerDimensions(height: string, footprint: string): StoreProduct["dimensions"] {
  return [
    { label: "Tower height", value: height },
    { label: "Suggested footprint", value: footprint },
    { label: "Setup type", value: "Vertical hydroponics tower" },
  ];
}

function buildProfileDimensions(profile: string): StoreProduct["dimensions"] {
  return [
    { label: "Profile size", value: profile },
    { label: "Pricing basis", value: "Per feet" },
    { label: "Common use", value: "Frames, stands, and modular structures" },
  ];
}

function buildConnectorDimensions(type: string): StoreProduct["dimensions"] {
  return [
    { label: "Connector type", value: type },
    { label: "Pricing basis", value: "Per unit" },
    { label: "Common use", value: "Profile joining and frame support" },
  ];
}

export const storeCategories: StoreCategory[] = [
  {
    slug: "battery-cases",
    name: "Battery Cases",
    shortName: "Battery Cases",
    tag: "19 inch range",
    description:
      '19" battery boxes and brackets with clear sizing, real workshop imagery, and manual quote support for cabinet and enclosure work.',
    image: "/products/battery/boxes/battery-box-1-new.png",
    highlights: ["3U / 4U / 5U battery boxes", '19" Brackets 7U', "Quote-led support"],
    faqs: batteryFaqs,
    trustHighlights: batteryTrustHighlights,
    testimonialIds: categoryTestimonialIds["battery-cases"],
    seoTitle: '19" Battery Cases and Brackets | I CAN ENERGIES',
    seoDescription:
      'Explore 19 inch battery boxes and brackets with real product images, sizing details, and manual quote support from I CAN ENERGIES.',
  },
  {
    slug: "hydroponics-systems",
    name: "Hydroponics Systems",
    shortName: "Hydroponics",
    tag: "25 to 75 plants",
    description:
      "Hydroponics towers for 25, 50, and 75 plants with fixed pricing, checkout-ready ordering, and delivery planning support.",
    image: "/products/hydroponics/client/tower-greenhouse-wide.jpeg",
    highlights: ["25 / 50 / 75 plants", "Fixed prices", "Checkout ready"],
    faqs: hydroponicsFaqs,
    trustHighlights: hydroponicsTrustHighlights,
    testimonialIds: categoryTestimonialIds["hydroponics-systems"],
    seoTitle: "Hydroponics Systems | I CAN ENERGIES",
    seoDescription:
      "Compare 25, 50, and 75 plant hydroponics systems with fixed prices, real product photos, and a checkout-ready order flow from I CAN ENERGIES.",
  },
  {
    slug: "t-v-slots",
    name: "T & V-Slots",
    shortName: "T & V-Slots",
    tag: "Aluminum accessories",
    description:
      "V Slot profiles and aluminum connectors with fixed pricing, real reference imagery, and support for modular frame planning.",
    image: "/products/aluminum/slots/profile-series.jpeg",
    highlights: ["2020 / 2030 / 2040 / 4040", "Triangle / Tee / Cross", "Fixed prices"],
    faqs: slotFaqs,
    trustHighlights: slotTrustHighlights,
    testimonialIds: categoryTestimonialIds["t-v-slots"],
    seoTitle: "V Slot Profiles and Connectors | I CAN ENERGIES",
    seoDescription:
      "Browse V Slot profiles and aluminum connectors with price visibility, real images, and checkout-ready ordering from I CAN ENERGIES.",
  },
];

export const storeProducts: StoreProduct[] = [
  buildProduct({
    slug: "19-inch-battery-box-3u",
    categorySlug: "battery-cases",
    name: '19" Battery Box 3U',
    tag: "Price on request",
    summary: '19" battery box in 3U size for compact cabinet and enclosure setups.',
    description:
      '19" Battery Box 3U helps buyers confirm compact rack-fit requirements quickly, so cabinet planning and quote discussion can start with the right size from the first message.',
    image: "/products/battery/boxes/battery-box-1-new.png",
    gallery: [
      "/products/battery/boxes/battery-box-1-new.png",
      "/products/battery/boxes/battery-box-2.jpeg",
      "/products/battery/cases/case-angle.jpeg",
      "/products/battery/cases/case-side.jpeg",
      "/products/battery/cases/case-open-top.jpeg",
    ],
    features: [
      '19" battery box format',
      "Compact 3U size",
      "Real product images",
      "WhatsApp inquiry support",
    ],
    benefits: [
      "Easy to identify for buyers who need a smaller battery case",
      "Useful for cleaner cabinet planning",
      "Simple quote discussion before confirmation",
    ],
    applications: ["Battery cabinets", "Backup power setups", "Technical enclosures"],
    specifications: [
      { label: "Product type", value: '19" Battery Box' },
      { label: "Size", value: "3U" },
      { label: "Price", value: "Price on request" },
    ],
    dimensions: buildRackDimensions("3U"),
    variant: buildVariant({
      id: "19-inch-battery-box-3u",
      name: '19" Battery Box 3U',
      sku: "BB-3U-19",
      summary: "Compact 3U battery box for 19 inch case requirements.",
      availability: "Available on inquiry",
      leadTime: "3 to 7 working days",
      badge: "Price on request",
      priceStatus: "quote",
      specifications: [
        { label: "Format", value: '19 inch' },
        { label: "Size", value: "3U" },
        { label: "Use", value: "Battery enclosure work" },
      ],
    }),
    filterTags: ["quote-only", "battery-case"],
    featured: true,
  }),
  buildProduct({
    slug: "19-inch-battery-box-4u",
    categorySlug: "battery-cases",
    name: '19" Battery Box 4U',
    tag: "Price on request",
    summary: '19" battery box in 4U size for standard battery cabinet and rack use.',
    description:
      '19" Battery Box 4U gives buyers a clear mid-range enclosure option for standard cabinet work, making it easier to compare size, availability, and fit before final quotation.',
    image: "/products/battery/boxes/battery-box-2.jpeg",
    gallery: [
      "/products/battery/boxes/battery-box-2.jpeg",
      "/products/battery/boxes/battery-box-1-new.png",
      "/products/battery/cases/case-angle.jpeg",
      "/products/battery/cases/case-side.jpeg",
    ],
    features: [
      '19" battery box format',
      "4U size",
      "Real product and workshop images",
      "Simple quote request flow",
    ],
    benefits: [
      "Clear product naming for faster shortlisting",
      "Useful for battery box discussions on WhatsApp",
      "Better fit for general cabinet planning",
    ],
    applications: ["Battery boxes", "Rack cabinet planning", "Backup systems"],
    specifications: [
      { label: "Product type", value: '19" Battery Box' },
      { label: "Size", value: "4U" },
      { label: "Price", value: "Price on request" },
    ],
    dimensions: buildRackDimensions("4U"),
    variant: buildVariant({
      id: "19-inch-battery-box-4u",
      name: '19" Battery Box 4U',
      sku: "BB-4U-19",
      summary: "4U battery box for 19 inch cabinet and enclosure requirements.",
      availability: "Available on inquiry",
      leadTime: "3 to 7 working days",
      badge: "Price on request",
      priceStatus: "quote",
      specifications: [
        { label: "Format", value: '19 inch' },
        { label: "Size", value: "4U" },
        { label: "Use", value: "Battery cabinet setups" },
      ],
    }),
    filterTags: ["quote-only", "battery-case"],
    featured: true,
  }),
  buildProduct({
    slug: "19-inch-battery-box-5u",
    categorySlug: "battery-cases",
    name: '19" Battery Box 5U',
    tag: "Price on request",
    summary: '19" battery box in 5U size for larger cabinet and enclosure requirements.',
    description:
      '19" Battery Box 5U gives larger projects more enclosure height, so buyers can move into a quote conversation with clearer expectations around cabinet fit and lead time.',
    image: "/products/battery/boxes/battery-box-3.jpeg",
    gallery: [
      "/products/battery/boxes/battery-box-3.jpeg",
      "/products/battery/boxes/battery-box-4.jpeg",
      "/products/battery/cases/case-front.jpeg",
      "/products/battery/cases/case-open-top.jpeg",
    ],
    features: [
      '19" battery box format',
      "5U size",
      "Workshop images available",
      "WhatsApp inquiry support",
    ],
    benefits: [
      "Clearer choice for larger battery case needs",
      "Helps buyers ask about fit before ordering",
      "Simple quote-first flow",
    ],
    applications: ["Battery cabinets", "Larger enclosure work", "Energy backup projects"],
    specifications: [
      { label: "Product type", value: '19" Battery Box' },
      { label: "Size", value: "5U" },
      { label: "Price", value: "Price on request" },
    ],
    dimensions: buildRackDimensions("5U"),
    variant: buildVariant({
      id: "19-inch-battery-box-5u",
      name: '19" Battery Box 5U',
      sku: "BB-5U-19",
      summary: "5U battery box for larger 19 inch enclosure requirements.",
      availability: "Available on inquiry",
      leadTime: "3 to 7 working days",
      badge: "Price on request",
      priceStatus: "quote",
      specifications: [
        { label: "Format", value: '19 inch' },
        { label: "Size", value: "5U" },
        { label: "Use", value: "Battery enclosure planning" },
      ],
    }),
    filterTags: ["quote-only", "battery-case"],
  }),
  buildProduct({
    slug: "19-inch-brackets-7u",
    categorySlug: "battery-cases",
    name: '19" Brackets 7U',
    tag: "Price on request",
    summary: '19" brackets in 7U size for battery box, rack, and mounting support.',
    description:
      '19" Brackets 7U keeps mounting support separate from full battery boxes, helping buyers request the exact rack accessory they need without slowing down the quotation process.',
    image: "/products/battery/brackets/mount-panel-front.jpeg",
    gallery: batteryBracketGallery,
    features: [
      '19" bracket format',
      "7U size",
      "Real bracket images",
      "Straight WhatsApp inquiry",
    ],
    benefits: [
      "Makes bracket requirements easier to explain",
      "Separates bracket requests from full battery boxes",
      "Supports faster quote discussions",
    ],
    applications: ["Battery box support", "Rack mounting", "Technical installations"],
    specifications: [
      { label: "Product type", value: '19" Brackets' },
      { label: "Size", value: "7U" },
      { label: "Price", value: "Price on request" },
    ],
    dimensions: buildRackDimensions("7U"),
    variant: buildVariant({
      id: "19-inch-brackets-7u",
      name: '19" Brackets 7U',
      sku: "BRKT-7U-19",
      summary: "7U bracket support for 19 inch battery and rack requirements.",
      availability: "Available on inquiry",
      leadTime: "3 to 7 working days",
      badge: "Price on request",
      priceStatus: "quote",
      specifications: [
        { label: "Format", value: '19 inch' },
        { label: "Size", value: "7U" },
        { label: "Use", value: "Bracket and mounting support" },
      ],
    }),
    filterTags: ["quote-only", "brackets"],
  }),
  buildProduct({
    slug: "hydroponics-system-25-plants",
    categorySlug: "hydroponics-systems",
    name: "Hydroponics System (25 Plants)",
    tag: "Rs. 25,000",
    summary: "Hydroponics system for 25 plants in a compact tower format.",
    description:
      "Hydroponics System (25 Plants) is the easiest entry point for compact spaces, giving first-time buyers a clear price, manageable capacity, and a straightforward checkout path.",
    image: "/products/hydroponics/tower-main.jpeg",
    gallery: hydroponicsGallery,
    features: [
      "25 plant capacity",
      "Tower-based hydroponics format",
      "Real product images",
      "Fixed price shown clearly",
    ],
    benefits: [
      "Easy to understand for first-time buyers",
      "Good fit for smaller spaces",
      "Direct WhatsApp inquiry with product name",
    ],
    applications: ["Homes", "Schools", "Small spaces"],
    specifications: [
      { label: "Product type", value: "Hydroponics System" },
      { label: "Plant capacity", value: "25 plants" },
      { label: "Price", value: "Rs. 25,000" },
    ],
    dimensions: buildTowerDimensions("24 inches", "Compact home or classroom footprint"),
    variant: buildVariant({
      id: "hydroponics-system-25-plants",
      name: "Hydroponics System (25 Plants)",
      sku: "HYS-25",
      summary: "25 plant hydroponics system for compact setups.",
      availability: "Order ready",
      leadTime: "3 to 5 working days",
      pricePkr: 25000,
      badge: "Rs. 25,000",
      specifications: [
        { label: "Plant capacity", value: "25 plants" },
        { label: "Height", value: "24 inches" },
        { label: "Best for", value: "Homes and starter installations" },
      ],
    }),
    filterTags: ["fixed-price", "hydroponics"],
    featured: true,
  }),
  buildProduct({
    slug: "hydroponics-system-50-plants",
    categorySlug: "hydroponics-systems",
    name: "Hydroponics System (50 Plants)",
    tag: "Rs. 40,000",
    summary: "Hydroponics system for 50 plants for balanced home and business use.",
    description:
      "Hydroponics System (50 Plants) balances price and output for buyers who want more growing capacity without stepping into a larger custom installation.",
    image: "/products/hydroponics/vertical-system-1.jpeg",
    gallery: hydroponicsGallery,
    features: [
      "50 plant capacity",
      "Tower-based hydroponics format",
      "Fixed price shown clearly",
      "Direct WhatsApp inquiry",
    ],
    benefits: [
      "Good mid-size option for buyers comparing capacities",
      "Simple product page with clear naming",
      "Useful for homes, cafes, and schools",
    ],
    applications: ["Homes", "Cafes", "Schools"],
    specifications: [
      { label: "Product type", value: "Hydroponics System" },
      { label: "Plant capacity", value: "50 plants" },
      { label: "Price", value: "Rs. 40,000" },
    ],
    dimensions: buildTowerDimensions("48 inches", "Balanced footprint for homes, cafes, and schools"),
    variant: buildVariant({
      id: "hydroponics-system-50-plants",
      name: "Hydroponics System (50 Plants)",
      sku: "HYS-50",
      summary: "50 plant hydroponics system for balanced capacity.",
      availability: "Order ready",
      leadTime: "3 to 5 working days",
      pricePkr: 40000,
      badge: "Rs. 40,000",
      specifications: [
        { label: "Plant capacity", value: "50 plants" },
        { label: "Height", value: "48 inches" },
        { label: "Best for", value: "Homes, cafes, and schools" },
      ],
    }),
    filterTags: ["fixed-price", "hydroponics"],
    featured: true,
  }),
  buildProduct({
    slug: "hydroponics-system-75-plants",
    categorySlug: "hydroponics-systems",
    name: "Hydroponics System (75 Plants)",
    tag: "Rs. 65,000",
    summary: "Hydroponics system for 75 plants for larger growing capacity.",
    description:
      "Hydroponics System (75 Plants) is built for buyers who want a larger, higher-output tower with fixed pricing and a cleaner path from product review to checkout.",
    image: "/products/hydroponics/vertical-system-2.jpeg",
    gallery: hydroponicsGallery,
    features: [
      "75 plant capacity",
      "Tower-based hydroponics format",
      "Fixed price shown clearly",
      "Real installation photos",
    ],
    benefits: [
      "Clear larger-capacity option",
      "Useful for stronger output planning",
      "Simple path to WhatsApp inquiry",
    ],
    applications: ["Cafes", "Schools", "Small business growing projects"],
    specifications: [
      { label: "Product type", value: "Hydroponics System" },
      { label: "Plant capacity", value: "75 plants" },
      { label: "Price", value: "Rs. 65,000" },
    ],
    dimensions: buildTowerDimensions("72 inches", "Larger footprint for higher-capacity growing"),
    variant: buildVariant({
      id: "hydroponics-system-75-plants",
      name: "Hydroponics System (75 Plants)",
      sku: "HYS-75",
      summary: "75 plant hydroponics system for larger capacity needs.",
      availability: "Order ready",
      leadTime: "5 to 7 working days",
      pricePkr: 65000,
      badge: "Rs. 65,000",
      specifications: [
        { label: "Plant capacity", value: "75 plants" },
        { label: "Height", value: "72 inches" },
        { label: "Best for", value: "Larger growing setups" },
      ],
    }),
    filterTags: ["fixed-price", "hydroponics"],
  }),
  buildProduct({
    slug: "v-slot-2020",
    categorySlug: "t-v-slots",
    name: "V Slot 2020",
    tag: "Rs. 1,200 / feet",
    summary: "V Slot 2020 aluminum profile with price shown per feet.",
    description:
      "V Slot 2020 gives smaller frame builds a clear fixed-price starting point, helping buyers choose the right profile size before they move to checkout.",
    image: "/products/aluminum/slots/profile-2020-spec.jpeg",
    gallery: slotGallery,
    features: [
      "V Slot 2020 profile",
      "Per-feet price shown clearly",
      "Real profile reference images",
      "Simple WhatsApp inquiry",
    ],
    benefits: [
      "Easy to identify the correct profile size",
      "Clear price display before inquiry",
      "Useful for frame and structure planning",
    ],
    applications: ["Frames", "Light structures", "Aluminum accessories"],
    specifications: [
      { label: "Product type", value: "V Slot profile" },
      { label: "Size", value: "2020" },
      { label: "Price", value: "Rs. 1,200 per feet" },
    ],
    dimensions: buildProfileDimensions("2020"),
    variant: buildVariant({
      id: "v-slot-2020",
      name: "V Slot 2020",
      sku: "VSL-2020",
      summary: "2020 aluminum V Slot profile.",
      availability: "Available on inquiry",
      leadTime: "2 to 5 working days",
      pricePkr: 1200,
      badge: "Rs. 1,200 / feet",
      specifications: [
        { label: "Profile size", value: "2020" },
        { label: "Unit price", value: "Rs. 1,200 per feet" },
        { label: "Use", value: "Frames and aluminum structures" },
      ],
    }),
    filterTags: ["fixed-price", "aluminum"],
    featured: true,
  }),
  buildProduct({
    slug: "v-slot-2030",
    categorySlug: "t-v-slots",
    name: "V Slot 2030",
    tag: "Rs. 1,300 / feet",
    summary: "V Slot 2030 aluminum profile with price shown per feet.",
    description:
      "V Slot 2030 gives buyers a stronger profile option with visible pricing, making frame selection and order planning faster.",
    image: "/products/aluminum/slots/profile-size-stack.jpeg",
    gallery: slotGallery,
    features: [
      "V Slot 2030 profile",
      "Per-feet price shown clearly",
      "Real profile reference images",
      "Direct WhatsApp inquiry",
    ],
    benefits: [
      "Helps buyers choose the right profile size faster",
      "Clear pricing direction for inquiry",
      "Useful for stronger frame builds",
    ],
    applications: ["Frames", "Support structures", "Aluminum accessories"],
    specifications: [
      { label: "Product type", value: "V Slot profile" },
      { label: "Size", value: "2030" },
      { label: "Price", value: "Rs. 1,300 per feet" },
    ],
    dimensions: buildProfileDimensions("2030"),
    variant: buildVariant({
      id: "v-slot-2030",
      name: "V Slot 2030",
      sku: "VSL-2030",
      summary: "2030 aluminum V Slot profile.",
      availability: "Available on inquiry",
      leadTime: "2 to 5 working days",
      pricePkr: 1300,
      badge: "Rs. 1,300 / feet",
      specifications: [
        { label: "Profile size", value: "2030" },
        { label: "Unit price", value: "Rs. 1,300 per feet" },
        { label: "Use", value: "Frames and modular builds" },
      ],
    }),
    filterTags: ["fixed-price", "aluminum"],
  }),
  buildProduct({
    slug: "v-slot-2040",
    categorySlug: "t-v-slots",
    name: "V Slot 2040",
    tag: "Rs. 1,400 / feet",
    summary: "V Slot 2040 aluminum profile with price shown per feet.",
    description:
      "V Slot 2040 helps buyers move into stronger frame builds with a wider profile size, visible pricing, and a cleaner checkout-ready decision path.",
    image: "/products/aluminum/slots/profile-2040-spec.jpeg",
    gallery: slotGallery,
    features: [
      "V Slot 2040 profile",
      "Per-feet price shown clearly",
      "Real profile images",
      "Simple inquiry flow",
    ],
    benefits: [
      "Easy to shortlist the right profile size",
      "Clear price visibility",
      "Good for medium-duty aluminum structures",
    ],
    applications: ["Frames", "Equipment stands", "Aluminum structures"],
    specifications: [
      { label: "Product type", value: "V Slot profile" },
      { label: "Size", value: "2040" },
      { label: "Price", value: "Rs. 1,400 per feet" },
    ],
    dimensions: buildProfileDimensions("2040"),
    variant: buildVariant({
      id: "v-slot-2040",
      name: "V Slot 2040",
      sku: "VSL-2040",
      summary: "2040 aluminum V Slot profile.",
      availability: "Available on inquiry",
      leadTime: "2 to 5 working days",
      pricePkr: 1400,
      badge: "Rs. 1,400 / feet",
      specifications: [
        { label: "Profile size", value: "2040" },
        { label: "Unit price", value: "Rs. 1,400 per feet" },
        { label: "Use", value: "Stands and structural builds" },
      ],
    }),
    filterTags: ["fixed-price", "aluminum"],
  }),
  buildProduct({
    slug: "v-slot-4040",
    categorySlug: "t-v-slots",
    name: "V Slot 4040",
    tag: "Rs. 1,500 / feet",
    summary: "V Slot 4040 aluminum profile with price shown per feet.",
    description:
      "V Slot 4040 is the larger fixed-price profile in the range, helping buyers plan heavier structures with less confusion before they check out.",
    image: "/products/aluminum/slots/profile-3030-4040.jpeg",
    gallery: slotGallery,
    features: [
      "V Slot 4040 profile",
      "Per-feet price shown clearly",
      "Real profile images",
      "Direct WhatsApp inquiry",
    ],
    benefits: [
      "Clear larger-profile option",
      "Easy price reference before inquiry",
      "Useful for stronger aluminum structures",
    ],
    applications: ["Frames", "Heavier structures", "Industrial accessories"],
    specifications: [
      { label: "Product type", value: "V Slot profile" },
      { label: "Size", value: "4040" },
      { label: "Price", value: "Rs. 1,500 per feet" },
    ],
    dimensions: buildProfileDimensions("4040"),
    variant: buildVariant({
      id: "v-slot-4040",
      name: "V Slot 4040",
      sku: "VSL-4040",
      summary: "4040 aluminum V Slot profile.",
      availability: "Available on inquiry",
      leadTime: "2 to 5 working days",
      pricePkr: 1500,
      badge: "Rs. 1,500 / feet",
      specifications: [
        { label: "Profile size", value: "4040" },
        { label: "Unit price", value: "Rs. 1,500 per feet" },
        { label: "Use", value: "Stronger aluminum frame builds" },
      ],
    }),
    filterTags: ["fixed-price", "aluminum"],
  }),
  buildProduct({
    slug: "triangle-connector",
    categorySlug: "t-v-slots",
    name: "Triangle Connector",
    tag: "Rs. 350",
    summary: "Triangle connector for aluminum profile joining and support.",
    description:
      "Triangle Connector gives aluminum buyers a clear fixed-price joining part, so they can confirm the right connector visually before checkout.",
    image: "/products/aluminum/connectors/triangle-bracket.jpeg",
    gallery: connectorGallery,
    features: [
      "Triangle connector",
      "Clear unit pricing",
      "Real connector images",
      "Simple WhatsApp inquiry",
    ],
    benefits: [
      "Easy connector identification",
      "Clear price before inquiry",
      "Useful for aluminum profile assemblies",
    ],
    applications: ["Profile joins", "Frame support", "Aluminum assemblies"],
    specifications: [
      { label: "Product type", value: "Connector" },
      { label: "Connector type", value: "Triangle" },
      { label: "Price", value: "Rs. 350" },
    ],
    dimensions: buildConnectorDimensions("Triangle"),
    variant: buildVariant({
      id: "triangle-connector",
      name: "Triangle Connector",
      sku: "CON-TRI",
      summary: "Triangle connector for aluminum profile structures.",
      availability: "Available on inquiry",
      leadTime: "2 to 5 working days",
      pricePkr: 350,
      badge: "Rs. 350",
      specifications: [
        { label: "Connector type", value: "Triangle" },
        { label: "Unit price", value: "Rs. 350" },
        { label: "Use", value: "Profile and frame joining" },
      ],
    }),
    filterTags: ["fixed-price", "connector"],
    featured: true,
  }),
  buildProduct({
    slug: "tee-connector",
    categorySlug: "t-v-slots",
    name: "Tee Connector",
    tag: "Rs. 350",
    summary: "Tee connector for aluminum profile joining and support.",
    description:
      "Tee Connector makes it easier to select the right joining part with price visibility already in place, reducing hesitation before checkout.",
    image: "/products/aluminum/connectors/connector-2.jpeg",
    gallery: [
      "/products/aluminum/connectors/connector-2.jpeg",
      "/products/aluminum/connectors/triangle-bracket.jpeg",
      "/products/aluminum/connectors/connector-3.jpeg",
    ],
    features: [
      "Tee connector",
      "Clear unit pricing",
      "Real connector images",
      "Simple inquiry flow",
    ],
    benefits: [
      "Easy to understand product naming",
      "Clear price visibility",
      "Useful for profile connection points",
    ],
    applications: ["Profile joins", "Aluminum frames", "Support assemblies"],
    specifications: [
      { label: "Product type", value: "Connector" },
      { label: "Connector type", value: "Tee" },
      { label: "Price", value: "Rs. 350" },
    ],
    dimensions: buildConnectorDimensions("Tee"),
    variant: buildVariant({
      id: "tee-connector",
      name: "Tee Connector",
      sku: "CON-TEE",
      summary: "Tee connector for aluminum profile structures.",
      availability: "Available on inquiry",
      leadTime: "2 to 5 working days",
      pricePkr: 350,
      badge: "Rs. 350",
      specifications: [
        { label: "Connector type", value: "Tee" },
        { label: "Unit price", value: "Rs. 350" },
        { label: "Use", value: "Profile and frame joining" },
      ],
    }),
    filterTags: ["fixed-price", "connector"],
  }),
  buildProduct({
    slug: "cross-connector",
    categorySlug: "t-v-slots",
    name: "Cross Connector",
    tag: "Rs. 350",
    summary: "Cross connector for aluminum profile joining and support.",
    description:
      "Cross Connector helps buyers choose the correct four-way joining option quickly, with real imagery and fixed pricing visible before checkout.",
    image: "/products/aluminum/connectors/connector-3.jpeg",
    gallery: [
      "/products/aluminum/connectors/connector-3.jpeg",
      "/products/aluminum/connectors/connector-2.jpeg",
      "/products/aluminum/connectors/triangle-bracket.jpeg",
    ],
    features: [
      "Cross connector",
      "Clear unit pricing",
      "Real connector images",
      "WhatsApp inquiry support",
    ],
    benefits: [
      "Simple connector choice for buyers",
      "Clear price before inquiry",
      "Useful for profile connection layouts",
    ],
    applications: ["Profile joins", "Frame support", "Connector layouts"],
    specifications: [
      { label: "Product type", value: "Connector" },
      { label: "Connector type", value: "Cross" },
      { label: "Price", value: "Rs. 350" },
    ],
    dimensions: buildConnectorDimensions("Cross"),
    variant: buildVariant({
      id: "cross-connector",
      name: "Cross Connector",
      sku: "CON-CROSS",
      summary: "Cross connector for aluminum profile structures.",
      availability: "Available on inquiry",
      leadTime: "2 to 5 working days",
      pricePkr: 350,
      badge: "Rs. 350",
      specifications: [
        { label: "Connector type", value: "Cross" },
        { label: "Unit price", value: "Rs. 350" },
        { label: "Use", value: "Profile and frame joining" },
      ],
    }),
    filterTags: ["fixed-price", "connector"],
  }),
];
