export type Testimonial = {
  name: string;
  location: string;
  stars: number;
  product: string;
  text: string;
  isSample?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Restaurant Grower",
    location: "Karachi",
    stars: 5,
    product: "Hydroponics System Plan",
    text: "The product detail pages made it much easier to understand capacity, pricing, and what to ask for before moving to WhatsApp.",
    isSample: true,
  },
  {
    name: "Solar Installer",
    location: "Lahore",
    stars: 5,
    product: "Battery Enclosure Support",
    text: "Quote flow, variant details, and basket summary help us send cleaner inquiries for commercial battery projects.",
    isSample: true,
  },
  {
    name: "Project Buyer",
    location: "Islamabad",
    stars: 5,
    product: "Aluminum Accessories",
    text: "Having category filters and product-level specifications reduces confusion and saves time when we prepare bulk requirements.",
    isSample: true,
  },
];
