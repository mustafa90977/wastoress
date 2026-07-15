import type { Product } from "@/types/database";

interface Props {
  products: Product[];
  storePhone: string;
  title: string;
  count: number;
}

export default function BestSellers({ products, storePhone, title, count }: Props) {
  const top = products.slice(0, count);
  if (top.length === 0) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-12">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-3xl font-bold text-on-surface" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
        <div className="flex gap-4">
          <button className="w-12 h-12 flex items-center justify-center border border-outline-variant rounded-full hover:bg-primary hover:text-on-primary transition-all duration-300">
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <button className="w-12 h-12 flex items-center justify-center border border-outline-variant rounded-full hover:bg-primary hover:text-on-primary transition-all duration-300">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>
      </div>
      <div className="flex gap-8 overflow-x-auto hide-scrollbar pb-10">
        {top.map((product) => (
          <div
            key={product.id}
            className="flex-none w-[350px] bg-surface-container-lowest p-6 rounded-[24px] border border-outline-variant/30 group cursor-pointer hover:shadow-2xl transition-all duration-500"
          >
            <div className="relative aspect-square rounded-[20px] overflow-hidden mb-6 bg-surface-container">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-outline">
                  <span className="material-symbols-outlined text-6xl">image</span>
                </div>
              )}
            </div>
            <h4 className="text-xl font-bold mb-2">{product.name}</h4>
            {product.description && (
              <p className="text-on-secondary-container mb-6 line-clamp-1">{product.description}</p>
            )}
            <div className="flex items-center justify-between">
              <span className="text-primary font-bold text-2xl">{Number(product.price).toLocaleString("ar-EG")} ج.م</span>
              <a
                href={`https://wa.me/${storePhone.replace(/[^0-9]/g, "")}?text=order-${product.sku}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 active:scale-90 transition-all"
              >
                <span className="material-symbols-outlined">add_shopping_cart</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
