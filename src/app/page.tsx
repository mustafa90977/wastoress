import { createClient } from "@/lib/supabase";
import ProductGrid from "@/components/product-grid";
import EmptyState from "@/components/empty-state";

export const dynamic = "force-dynamic";

export default async function CatalogPage() {
  const supabase = createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  const storePhone = process.env.NEXT_PUBLIC_STORE_PHONE || "";

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">المتجر</h1>
        <p className="mt-2 text-gray-500">تصفح المنتجات واطلب عبر واتساب</p>
      </header>

      {!products || products.length === 0 ? (
        <EmptyState />
      ) : (
        <ProductGrid products={products} storePhone={storePhone} />
      )}
    </main>
  );
}
