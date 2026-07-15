import type { Product } from "@/types/database";

interface Props {
  product: Product;
  storePhone: string;
}

function isNew(createdAt: string): boolean {
  const diff = Date.now() - new Date(createdAt).getTime();
  return diff < 7 * 24 * 60 * 60 * 1000;
}

export default function ProductCard({ product, storePhone }: Props) {
  const whatsappUrl = `https://wa.me/${storePhone.replace(/[^0-9]/g, "")}?text=order-${product.sku}`;
  const newBadge = isNew(product.created_at);

  return (
    <div className="group bg-surface-container-lowest rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col border border-outline-variant/20">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-container">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-outline">
            <span className="material-symbols-outlined text-6xl">image</span>
          </div>
        )}
        {newBadge && (
          <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-bold">جديد</div>
        )}
        <button className="absolute top-4 left-4 w-10 h-10 bg-surface/80 backdrop-blur rounded-full flex items-center justify-center text-on-surface hover:text-error transition-colors">
          <span className="material-symbols-outlined">favorite</span>
        </button>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h4 className="text-xl font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">{product.name}</h4>
        {product.description && (
          <p className="text-on-secondary-container line-clamp-1 mb-4">{product.description}</p>
        )}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-primary font-bold text-2xl">{Number(product.price).toLocaleString("ar-EG")} ج.م</span>
            <span className="text-on-secondary-container line-through text-sm">
              {Number(product.price * 1.2).toLocaleString("ar-EG")} ج.م
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="py-2.5 bg-primary/10 text-primary rounded-lg text-sm font-bold hover:bg-primary hover:text-on-primary transition-all">
              أضف للسلة
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 bg-[#25D366] text-white rounded-lg text-sm font-bold flex items-center justify-center gap-1 hover:brightness-90 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
              <span>طلب</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
