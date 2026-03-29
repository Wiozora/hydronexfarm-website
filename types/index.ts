export type StoreCategory = {
  slug: string;
  name: string;
  shortName: string;
  tag: string;
  description: string;
  image: string;
  highlights: string[];
};

export type ProductSpecification = {
  label: string;
  value: string;
};

export type StoreVariant = {
  id: string;
  name: string;
  sku: string;
  summary: string;
  availability: string;
  leadTime: string;
  pricePkr?: number;
  badge?: string;
  specifications: ProductSpecification[];
};

export type StoreProduct = {
  slug: string;
  categorySlug: string;
  name: string;
  shortName: string;
  tag: string;
  summary: string;
  description: string;
  image: string;
  gallery: string[];
  features: string[];
  benefits: string[];
  applications: string[];
  specifications: ProductSpecification[];
  variants: StoreVariant[];
  filterTags: string[];
  featured?: boolean;
};

export type BasketMode = "cart" | "quote";

export type BasketItem = {
  productSlug: string;
  variantId: string;
  quantity: number;
  mode: BasketMode;
};

export type InquiryCustomer = {
  name: string;
  phone: string;
  email: string;
  city: string;
  notes: string;
};
