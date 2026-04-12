import type { StoreCategory, StoreProduct } from "@/types";

import { siteConfig } from "@/lib/site-config";
import {
  getCategoryPath,
  getDefaultVariant,
  getProductFaqs,
  getProductPath,
  getVariantMode,
} from "@/lib/store";

function toAbsoluteUrl(path: string) {
  return path.startsWith("http") ? path : `${siteConfig.siteUrl}${path}`;
}

function buildFaqSchema(
  faqs: { answer: string; question: string }[],
) {
  if (faqs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function buildBreadcrumbSchema(
  items: { href?: string; label: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: toAbsoluteUrl(item.href) } : {}),
    })),
  };
}

function getSchemaAvailability(value: string) {
  const normalized = value.toLowerCase();

  if (normalized.includes("order ready") || normalized.includes("available")) {
    return "https://schema.org/InStock";
  }

  return "https://schema.org/PreOrder";
}

export function buildCategoryPageStructuredData(category: StoreCategory) {
  const items: Record<string, unknown>[] = [
    buildBreadcrumbSchema([
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: category.name, href: getCategoryPath(category) },
    ]),
  ];
  const faqSchema = buildFaqSchema(category.faqs ?? []);

  if (faqSchema) {
    items.push(faqSchema);
  }

  return items;
}

export function buildProductPageStructuredData(
  product: StoreProduct,
  category?: StoreCategory,
) {
  const defaultVariant = getDefaultVariant(product);
  const faqs = getProductFaqs(product);
  const productPath = getProductPath(product);
  const productSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seoDescription ?? product.description,
    image: product.gallery.map((image) => toAbsoluteUrl(image)),
    sku: defaultVariant.sku,
    brand: {
      "@type": "Brand",
      name: siteConfig.storeName,
    },
    category: category?.name ?? product.categorySlug,
    url: toAbsoluteUrl(productPath),
    additionalProperty: [
      ...product.specifications,
      ...(product.dimensions ?? []),
      ...defaultVariant.specifications,
    ].map((item) => ({
      "@type": "PropertyValue",
      name: item.label,
      value: item.value,
    })),
  };

  if (getVariantMode(defaultVariant) === "cart" && typeof defaultVariant.pricePkr === "number") {
    productSchema.offers = {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: defaultVariant.pricePkr,
      availability: getSchemaAvailability(defaultVariant.availability),
      url: toAbsoluteUrl(productPath),
    };
  }

  const items: Record<string, unknown>[] = [
    productSchema,
    buildBreadcrumbSchema([
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      ...(category ? [{ label: category.name, href: getCategoryPath(category) }] : []),
      { label: product.name, href: productPath },
    ]),
  ];
  const faqSchema = buildFaqSchema(faqs);

  if (faqSchema) {
    items.push(faqSchema);
  }

  return items;
}
