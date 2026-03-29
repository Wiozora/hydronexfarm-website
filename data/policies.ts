export type PolicySection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type PolicyDocument = {
  eyebrow: string;
  title: string;
  description: string;
  updatedLabel: string;
  sections: PolicySection[];
};

export const privacyPolicy: PolicyDocument = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  description:
    "How inquiry details, quote requests, and website activity are handled across the HydroNexfarm storefront.",
  updatedLabel: "Updated March 27, 2026",
  sections: [
    {
      title: "Information we collect",
      paragraphs: [
        "We collect the details you provide through inquiry forms, quote requests, basket submissions, and contact actions on the website.",
        "This may include your name, phone number, email address, city, product interest, quantities, and project notes.",
      ],
    },
    {
      title: "How we use your information",
      paragraphs: [
        "Submitted details are used to respond to inquiries, prepare quotations, confirm availability, and improve the buying process on the website.",
        "We may also use site activity and form interactions to understand which pages and products perform better over time.",
      ],
      bullets: [
        "Respond to WhatsApp and form inquiries",
        "Prepare quotations and product recommendations",
        "Improve catalog pages and buyer journeys",
        "Measure campaign and website performance",
      ],
    },
    {
      title: "Analytics and tracking",
      paragraphs: [
        "The website may use analytics and advertising tools such as Google Analytics and Meta Pixel when they are configured for the project.",
        "These tools help measure visits, conversions, and campaign effectiveness. They do not replace direct communication for confirming an order.",
      ],
    },
    {
      title: "Data sharing",
      paragraphs: [
        "We do not sell inquiry data. Information may be shared only with trusted services used for analytics, website hosting, or lead routing when required to operate the storefront.",
      ],
    },
    {
      title: "Your choices",
      paragraphs: [
        "You can decide not to submit forms or inquiry baskets. You may also request that previously shared details be corrected or removed from operational records where possible.",
      ],
    },
  ],
};

export const termsAndConditions: PolicyDocument = {
  eyebrow: "Legal",
  title: "Terms & Conditions",
  description:
    "The terms that apply when browsing products, requesting quotations, and using the storefront and inquiry flow.",
  updatedLabel: "Updated March 27, 2026",
  sections: [
    {
      title: "Website use",
      paragraphs: [
        "This website is intended to help buyers browse products, review specifications, and submit order or quotation requests.",
        "Submitting an inquiry or adding items to the basket does not by itself create a final confirmed order.",
      ],
    },
    {
      title: "Product information",
      paragraphs: [
        "We aim to keep pricing, specifications, availability notes, and lead times as accurate as possible, but some products may require final confirmation before dispatch.",
      ],
      bullets: [
        "Prices may change without notice unless already confirmed in writing",
        "Availability may vary by product type or project requirement",
        "Custom and bulk orders may require separate quotation approval",
      ],
    },
    {
      title: "Inquiry and quotation flow",
      paragraphs: [
        "Basket and form submissions are treated as sales inquiries. Final order acceptance depends on product confirmation, project scope, pricing approval, and delivery arrangements.",
      ],
    },
    {
      title: "Intellectual property",
      paragraphs: [
        "The website design, written content, catalog structure, and branded materials should not be copied or reused without permission.",
      ],
    },
    {
      title: "Service limitations",
      paragraphs: [
        "We are not responsible for delays caused by supplier constraints, courier issues, incomplete customer information, or project-side approval delays outside normal operational control.",
      ],
    },
  ],
};

export const refundPolicy: PolicyDocument = {
  eyebrow: "Legal",
  title: "Refund, Return & Warranty Policy",
  description:
    "How returns, replacements, warranty handling, and custom-order expectations should be communicated before final confirmation.",
  updatedLabel: "Updated March 27, 2026",
  sections: [
    {
      title: "Order confirmation",
      paragraphs: [
        "Refund and return handling depends on whether the order is fixed-price, built-to-order, or customized for a project requirement.",
      ],
    },
    {
      title: "Eligible return cases",
      paragraphs: [
        "Returns are usually considered only when a product arrives damaged, the wrong item is supplied, or a verified issue is reported within the agreed review period.",
      ],
      bullets: [
        "Wrong item delivered",
        "Verified shipping damage",
        "Manufacturer defect covered by the applicable warranty",
      ],
    },
    {
      title: "Non-returnable cases",
      paragraphs: [
        "Custom, project-made, installer-specific, or bulk-prepared items may not be eligible for return once production or procurement has started.",
      ],
    },
    {
      title: "Warranty handling",
      paragraphs: [
        "Where a product includes supplier or manufacturer warranty coverage, the issue will be reviewed against the relevant usage conditions, installation handling, and damage assessment.",
      ],
    },
    {
      title: "Refund processing",
      paragraphs: [
        "Approved refunds, credits, or replacements are handled only after internal review of the order, issue details, and product condition. Exact processing timelines depend on the order type and supplier confirmation.",
      ],
    },
  ],
};
