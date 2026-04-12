export type OrderPaymentMethod = "jazzcash" | "bank-transfer";

export type OrderStatus = "pending_verification";

export type OrderCustomer = {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  notes?: string;
};

export type OrderLine = {
  product: string;
  variant: string;
  quantity: number;
  href: string;
  unitPricePkr: number;
  lineTotalPkr: number;
};

export type OrderPayment = {
  method: OrderPaymentMethod;
  reference: string;
  subtotalPkr: number;
};

export type OrderPayload = {
  source: "checkout";
  summary: string;
  customer: OrderCustomer;
  items: OrderLine[];
  payment: OrderPayment;
  metadata?: {
    page?: string;
    cartItems?: number;
  };
};
