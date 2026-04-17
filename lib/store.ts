import { storeCategories, storeProducts } from "@/data/store-catalog";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { formatPkr } from "@/lib/utils";
import type {
  BasketItem,
  BasketMode,
  InquiryCustomer,
  StoreCategory,
  StoreProduct,
  StoreVariant,
} from "@/types";

export type HydratedBasketLine = {
  key: string;
  mode: BasketMode;
  quantity: number;
  product: StoreProduct;
  category: StoreCategory;
  variant: StoreVariant;
  href: string;
  unitPricePkr?: number;
  lineTotalPkr?: number;
};

export type BasketDestination = {
  href: string;
  label: string;
  cartCount: number;
  quoteCount: number;
  hasCart: boolean;
  hasQuote: boolean;
};

export function getStoreCategories() {
  return storeCategories;
}

export function getStoreProducts() {
  return storeProducts;
}

export function getFeaturedProducts() {
  return storeProducts.filter((product) => product.featured);
}

export function getCategoryBySlug(slug: string) {
  return storeCategories.find((category) => category.slug === slug);
}

export function getProductBySlug(slug: string) {
  return storeProducts.find((product) => product.slug === slug);
}

export function getProductsByCategorySlug(categorySlug: string) {
  return storeProducts.filter((product) => product.categorySlug === categorySlug);
}

export function getRelatedProducts(product: StoreProduct) {
  return storeProducts.filter(
    (candidate) =>
      candidate.categorySlug === product.categorySlug && candidate.slug !== product.slug,
  );
}

export function getTestimonialsByIds(ids: string[] = []) {
  return ids
    .map((id) => testimonials.find((testimonial) => testimonial.id === id))
    .filter((testimonial): testimonial is Testimonial => Boolean(testimonial));
}

export function getTestimonialsForCategory(categorySlug: string) {
  const category = getCategoryBySlug(categorySlug);

  if (category?.testimonialIds?.length) {
    return getTestimonialsByIds(category.testimonialIds);
  }

  return testimonials.filter((testimonial) => testimonial.categorySlugs.includes(categorySlug));
}

export function getTestimonialsForProduct(product: StoreProduct) {
  if (product.testimonialIds?.length) {
    return getTestimonialsByIds(product.testimonialIds);
  }

  return testimonials.filter((testimonial) => {
    const matchesProduct = testimonial.productSlugs?.includes(product.slug) ?? false;
    return matchesProduct || testimonial.categorySlugs.includes(product.categorySlug);
  });
}

export function getCategoryPath(category: Pick<StoreCategory, "slug">) {
  return `/shop/${category.slug}`;
}

export function getProductPath(product: Pick<StoreProduct, "categorySlug" | "slug">) {
  return `/shop/${product.categorySlug}/${product.slug}`;
}

export function getProductVariantPath(
  product: Pick<StoreProduct, "categorySlug" | "slug">,
  variantId?: string,
) {
  const basePath = getProductPath(product);
  return variantId ? `${basePath}?variant=${encodeURIComponent(variantId)}` : basePath;
}

export function getDefaultVariant(product: StoreProduct) {
  return product.variants.find((variant) => getVariantMode(variant) === "cart") ?? product.variants[0];
}

export function getVariantById(product: StoreProduct, variantId: string) {
  return product.variants.find((variant) => variant.id === variantId);
}

export function getVariantMode(variant: StoreVariant): BasketMode {
  return variant.priceStatus === "fixed" || typeof variant.pricePkr === "number" ? "cart" : "quote";
}

export function getProductModes(product: StoreProduct) {
  return Array.from(new Set(product.variants.map((variant) => getVariantMode(variant))));
}

export function getStartingPrice(product: StoreProduct) {
  const prices = product.variants
    .map((variant) => variant.pricePkr)
    .filter((price): price is number => typeof price === "number");

  if (prices.length === 0) {
    return undefined;
  }

  return Math.min(...prices);
}

export function getPriceLabel(product: StoreProduct, variant?: StoreVariant) {
  if (variant?.badge) {
    return variant.badge;
  }

  if (variant?.priceStatus === "pending") {
    return "Price pending";
  }

  if (variant?.pricePkr) {
    return formatPkr(variant.pricePkr);
  }

  const startingPrice = getStartingPrice(product);
  const singleVariant = product.variants.length === 1 ? product.variants[0] : undefined;

  if (singleVariant?.badge) {
    return singleVariant.badge;
  }

  if (startingPrice) {
    return `From ${formatPkr(startingPrice)}`;
  }

  if (product.variants.some((entry) => entry.priceStatus === "pending")) {
    return "Price pending";
  }

  return "Quote required";
}

export function getModeLabel(mode: BasketMode) {
  return mode === "cart" ? "Checkout" : "Request Quote";
}

export function getModeSummary(mode: BasketMode) {
  return mode === "cart" ? "Fixed-price item" : "Manual quote item";
}

export function getCategoryProductCount(categorySlug: string) {
  return getProductsByCategorySlug(categorySlug).length;
}

export function getCategoryCommerceSummary(categorySlug: string) {
  const modes = new Set(
    getProductsByCategorySlug(categorySlug).flatMap((product) => getProductModes(product)),
  );
  const hasCart = modes.has("cart");
  const hasQuote = modes.has("quote");

  if (hasCart && hasQuote) {
    return {
      badge: "Mixed paths",
      detail: "Checkout-ready products plus quote-led support",
    };
  }

  if (hasCart) {
    return {
      badge: "Checkout ready",
      detail: "Fixed-price ordering available",
    };
  }

  return {
    badge: "Quote-led",
    detail: "Manual pricing and support",
  };
}

export function hydrateBasketItems(items: BasketItem[]): HydratedBasketLine[] {
  return items.flatMap((item) => {
    const product = getProductBySlug(item.productSlug);

    if (!product) {
      return [];
    }

    const variant = getVariantById(product, item.variantId);
    const category = getCategoryBySlug(product.categorySlug);

    if (!variant || !category) {
      return [];
    }

    const unitPricePkr = variant.pricePkr;

    return [
      {
        key: `${product.slug}:${variant.id}:${item.mode}`,
        mode: item.mode,
        quantity: item.quantity,
        product,
        category,
        variant,
        href: getProductPath(product),
        unitPricePkr,
        lineTotalPkr: unitPricePkr ? unitPricePkr * item.quantity : undefined,
      },
    ];
  });
}

export function getBasketSubtotal(lines: HydratedBasketLine[]) {
  return lines.reduce((total, line) => total + (line.lineTotalPkr ?? 0), 0);
}

export function getBasketCount(items: BasketItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getBasketModeCounts(items: BasketItem[]) {
  return items.reduce(
    (summary, item) => {
      if (item.mode === "cart") {
        summary.cartCount += item.quantity;
      } else {
        summary.quoteCount += item.quantity;
      }

      return summary;
    },
    { cartCount: 0, quoteCount: 0 },
  );
}

export function getBasketDestination(items: BasketItem[]): BasketDestination {
  const { cartCount, quoteCount } = getBasketModeCounts(items);
  const hasCart = cartCount > 0;
  const hasQuote = quoteCount > 0;

  if (hasCart && hasQuote) {
    return {
      href: "/inquiry?mode=mixed",
      label: "Review Basket",
      cartCount,
      quoteCount,
      hasCart,
      hasQuote,
    };
  }

  if (hasCart) {
    return {
      href: "/checkout",
      label: "Checkout",
      cartCount,
      quoteCount,
      hasCart,
      hasQuote,
    };
  }

  if (hasQuote) {
    return {
      href: "/inquiry",
      label: "Request Quote",
      cartCount,
      quoteCount,
      hasCart,
      hasQuote,
    };
  }

  return {
    href: "/shop",
    label: "My List",
    cartCount,
    quoteCount,
    hasCart,
    hasQuote,
  };
}

export function getProductTrustHighlights(product: StoreProduct) {
  if (product.trustHighlights?.length) {
    return product.trustHighlights;
  }

  return getCategoryBySlug(product.categorySlug)?.trustHighlights ?? [];
}

export function getProductFaqs(product: StoreProduct) {
  if (product.faqs?.length) {
    return product.faqs;
  }

  return getCategoryBySlug(product.categorySlug)?.faqs ?? [];
}

export function getProductSelectOptions() {
  return storeProducts.map((product) => ({
    value: product.slug,
    label: product.name,
  }));
}

export function getProductFilterLabel(tag: string) {
  switch (tag) {
    case "fixed-price":
      return "Fixed price";
    case "quote-only":
      return "Quote only";
    case "bulk-order":
      return "Bulk order";
    case "custom-build":
      return "Custom build";
    case "ready-stock":
      return "Ready stock";
    case "installer":
      return "Installer";
    default:
      return tag;
  }
}

export function buildStoreInquiryMessage(
  lines: HydratedBasketLine[],
  customer: InquiryCustomer,
) {
  const quoteLines = lines.filter((line) => line.mode === "quote");
  const hasQuote = quoteLines.length > 0;

  const opening = hasQuote
    ? "Hi! I'm contacting I CAN ENERGIES from the website. I want a quote for the selected items."
    : "Hi! I'm contacting I CAN ENERGIES from the website. I want help with my product requirement.";

  const quoteSection = hasQuote
    ? [
        "",
        "Quote request items:",
        ...quoteLines.map(
          (line, index) =>
            `${index + 1}. ${line.product.name} - ${line.variant.name} x ${line.quantity}`,
        ),
      ]
    : [];

  const notesSection = customer.notes.trim().length > 0 ? ["", `Project notes: ${customer.notes}`] : [];

  return [
    opening,
    "",
    `Name: ${customer.name}`,
    `Phone / WhatsApp: ${customer.phone}`,
    `Email: ${customer.email}`,
    `City: ${customer.city}`,
    ...quoteSection,
    ...notesSection,
    "",
    "Please confirm pricing, availability, delivery to my city, and the best next step.",
  ].join("\n");
}
