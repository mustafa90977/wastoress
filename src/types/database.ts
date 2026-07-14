export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_phone: string;
  product_id: string;
  product_name_snapshot: string;
  price_snapshot: number;
  status: "pending" | "confirmed" | "shipped" | "cancelled";
  payment_method: "cash" | "electronic";
  payment_link: string | null;
  created_at: string;
}
