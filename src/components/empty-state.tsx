import { PackageOpen } from "lucide-react";

export default function EmptyState({ message = "لا توجد منتجات حاليًا" }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
      <PackageOpen className="mb-4 h-16 w-16" />
      <p className="text-lg">{message}</p>
    </div>
  );
}
