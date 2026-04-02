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
    name: "Plantation Buyer",
    location: "Karachi",
    stars: 5,
    product: "Vertical Plantation Towers",
    text: "The tower detail page now makes plant count, price, and size easy to compare before sending a WhatsApp order.",
    isSample: true,
  },
  {
    name: "Solar Installer",
    location: "Lahore",
    stars: 5,
    product: "BareBone Battery Racks",
    text: "Rack variants, case references, and quote flow make it much easier to send a clean battery project inquiry.",
    isSample: true,
  },
  {
    name: "Fabrication Buyer",
    location: "Islamabad",
    stars: 5,
    product: "V/T Slot Profiles",
    text: "Having real profile images, frame examples, and sheet metal products on the site saves time when preparing a requirement.",
    isSample: true,
  },
];
