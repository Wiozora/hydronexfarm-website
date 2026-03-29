import type { MetadataRoute } from "next";

import { storeCategories, storeProducts } from "@/data/store-catalog";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/shop",
    "/inquiry",
    "/privacy-policy",
    "/terms-and-conditions",
    "/refund-policy",
  ];
  const categoryPaths = storeCategories.map((category) => `/shop/${category.slug}`);
  const productPaths = storeProducts.map(
    (product) => `/shop/${product.categorySlug}/${product.slug}`,
  );

  return [...staticPaths, ...categoryPaths, ...productPaths].map((path) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
