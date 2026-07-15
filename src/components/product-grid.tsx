import type { Product } from "@/types/database";
import ProductCard from "./product-card";

interface Props {
  products: Product[];
  storePhone: string;
}

export default function ProductGrid({ products, storePhone }: Props) {
  if (products.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} storePhone={storePhone} />
      ))}
    </div>
  );
}
