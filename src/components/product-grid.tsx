import type { Product } from "@/types/database";
import ProductCard from "./product-card";

interface Props {
  products: Product[];
  storePhone: string;
}

export default function ProductGrid({ products, storePhone }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} storePhone={storePhone} />
      ))}
    </div>
  );
}
