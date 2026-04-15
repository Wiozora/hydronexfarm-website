export type Testimonial = {
  id: string;
  name: string;
  location: string;
  stars: number;
  product: string;
  text: string;
  highlight: string;
  portrait?: string;
  portraitAlt?: string;
  portraitPosition?: string;
  categorySlugs: string[];
  productSlugs?: string[];
};

export const testimonials: Testimonial[] = [
  {
    id: "hydro-school-karachi",
    name: "School Procurement Team",
    location: "Karachi",
    stars: 5,
    product: "Hydroponics System (50 Plants)",
    highlight: "Capacity and pricing were easy to compare",
    text:
      "The 50-plant product page made it clear what we would receive, what it would cost, and which setup matched our available space before we placed the order.",
    portrait: "/testimonials/school-procurement-team.jpg",
    portraitAlt: "Portrait representing a school procurement buyer",
    portraitPosition: "center top",
    categorySlugs: ["hydroponics-systems"],
    productSlugs: ["hydroponics-system-50-plants"],
  },
  {
    id: "battery-integrator-lahore",
    name: "Cabinet Integration Buyer",
    location: "Lahore",
    stars: 5,
    product: '19" Battery Box 4U',
    highlight: "Sizing and lead time were clear before inquiry",
    text:
      "The battery box page answered the main fit and lead-time questions early, so our team could send one clean quote request instead of going back and forth on dimensions.",
    portrait: "/testimonials/cabinet-integration-buyer.jpg",
    portraitAlt: "Portrait representing a cabinet integration buyer",
    portraitPosition: "60% top",
    categorySlugs: ["battery-cases"],
    productSlugs: ["19-inch-battery-box-4u", "19-inch-battery-box-3u", "19-inch-battery-box-5u"],
  },
  {
    id: "slot-fabricator-islamabad",
    name: "Fabrication Workshop Buyer",
    location: "Islamabad",
    stars: 5,
    product: "V Slot 2020 and Connectors",
    highlight: "Real images reduced selection mistakes",
    text:
      "Having profile photos, connector references, and price visibility on the same page helped us shortlist the right aluminum items much faster for fabrication work.",
    portrait: "/testimonials/fabrication-workshop-buyer.jpg",
    portraitAlt: "Portrait representing a fabrication workshop buyer",
    portraitPosition: "center top",
    categorySlugs: ["t-v-slots"],
    productSlugs: ["v-slot-2020", "triangle-connector", "tee-connector", "cross-connector"],
  },
  {
    id: "hydro-cafe-peshawar",
    name: "Cafe Growing Project",
    location: "Peshawar",
    stars: 5,
    product: "Hydroponics System (75 Plants)",
    highlight: "The order flow felt straightforward",
    text:
      "We could review pricing, note our delivery city, and submit the order details without switching channels, which made the buying process feel much more organized.",
    portrait: "/testimonials/cafe-growing-project.jpg",
    portraitAlt: "Portrait representing a cafe growing project buyer",
    portraitPosition: "center 18%",
    categorySlugs: ["hydroponics-systems"],
    productSlugs: ["hydroponics-system-75-plants"],
  },
];
