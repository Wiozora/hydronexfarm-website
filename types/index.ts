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

export type ProductAssetLink = {
  label: string;
  href: string;
};

export type ProductDatasheetSection = {
  title: string;
  summary?: string;
  specifications: ProductSpecification[];
};

export type ProductDatasheet = {
  summary: string;
  sections: ProductDatasheetSection[];
  asset?: ProductAssetLink;
  notes?: string[];
};

export type PaymentMethodInfo = {
  id: string;
  title: string;
  description: string;
  meta?: string;
};

export type PaymentInfo = {
  heading?: string;
  methods: PaymentMethodInfo[];
  bankDetails?: ProductSpecification[];
  notes?: string[];
};

export type ProductRoiRow = {
  title: string;
  value: string;
  note: string;
  variantId?: string;
  plantCount?: number;
};

export type ProductRoiInput = {
  id: string;
  label: string;
  helper: string;
  placeholder: string;
  exampleValue?: number;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
};

export type ProductRoi = {
  title?: string;
  summary: string;
  rows: ProductRoiRow[];
  inputs?: ProductRoiInput[];
  sampleLabel?: string;
  sampleNote?: string;
  notes?: string[];
};

export type StoreVariant = {
  id: string;
  name: string;
  sku: string;
  summary: string;
  availability: string;
  leadTime: string;
  pricePkr?: number;
  priceStatus?: "fixed" | "quote" | "pending";
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
  datasheet?: ProductDatasheet;
  paymentInfo?: PaymentInfo;
  roi?: ProductRoi;
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
