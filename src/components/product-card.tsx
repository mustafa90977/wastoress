import type { Product } from "@/types/database";
import { WhatsApp } from "lucide-react";

interface Props {
  product: Product;
  storePhone: string;
}

function isNew(createdAt: string): boolean {
  const diff = Date.now() - new Date(createdAt).getTime();
  return diff < 7 * 24 * 60 * 60 * 1000;
}

export default function ProductCard({ product, storePhone }: Props) {
  const whatsappUrl = `https://wa.me/${storePhone}?text=order-${product.sku}`;
  const newBadge = isNew(product.created_at);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        {newBadge && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-gradient-to-l from-[#25d366] to-[#128c7e] px-3 py-0.5 text-xs font-bold text-white shadow-sm">
            جديد
          </span>
        )}
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-200">
            <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="text-base font-bold text-gray-800">{product.name}</h3>
        {product.description && (
          <p className="line-clamp-2 text-sm leading-relaxed text-gray-400">
            {product.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through decoration-gray-300">
              {Number(product.price * 1.2).toLocaleString("ar-EG")} ج.م
            </span>
            <span className="text-xl font-black text-[#075e54]">
              {Number(product.price).toLocaleString("ar-EG")} ج.م
            </span>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl bg-[#25d366] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#128c7e] hover:shadow-md active:scale-95"
          >
            <WhatsApp className="h-4 w-4" />
            اطلب
          </a>
        </div>
      </div>
    </div>
  );
}
