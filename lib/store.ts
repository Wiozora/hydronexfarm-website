import { storeCategories, storeProducts } from "@/data/store-catalog";
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
  if (variant?.priceStatus === "pending") {
    return "Price pending";
  }

  if (variant?.pricePkr) {
    return formatPkr(variant.pricePkr);
  }

  const startingPrice = getStartingPrice(product);

  if (startingPrice) {
    return `From ${formatPkr(startingPrice)}`;
  }

  if (product.variants.some((entry) => entry.priceStatus === "pending")) {
    return "Price pending";
  }

  return "Quote required";
}

export function getModeLabel(mode: BasketMode) {
  return mode === "cart" ? "Add to cart" : "Add to quote";
}

export function getModeSummary(mode: BasketMode) {
  return mode === "cart" ? "Fixed-price item" : "Quote-only item";
}

export function getCategoryProductCount(categorySlug: string) {
  return getProductsByCategorySlug(categorySlug).length;
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
  const cartLines = lines.filter((line) => line.mode === "cart");
  const quoteLines = lines.filter((line) => line.mode === "quote");
  const hasCart = cartLines.length > 0;
  const hasQuote = quoteLines.length > 0;

  const opening = hasCart && hasQuote
    ? "Hi! I want to place an order and request a quote."
    : hasCart
      ? "Hi! I want to place an order."
      : "Hi! I want to request a quote.";

  const cartSection = hasCart
    ? [
        "",
        "Cart items:",
        ...cartLines.map(
          (line, index) =>
            `${index + 1}. ${line.product.name} - ${line.variant.name} x ${line.quantity} - ${formatPkr(
              line.lineTotalPkr ?? 0,
            )}`,
        ),
        `Estimated subtotal: ${formatPkr(getBasketSubtotal(cartLines))}`,
      ]
    : [];

  const quoteSection = hasQuote
    ? [
        "",
        "Quote items:",
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
    ...cartSection,
    ...quoteSection,
    ...notesSection,
    "",
    "Please confirm pricing, availability, and next steps.",
  ].join("\n");
}
