import { ShoppingBag } from "lucide-react";

export default function EmptyState({ message = "لا توجد منتجات حاليًا" }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 py-24 text-gray-300">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
        <ShoppingBag className="h-10 w-10" />
      </div>
      <p className="text-lg font-medium text-gray-400">{message}</p>
    </div>
  );
}
