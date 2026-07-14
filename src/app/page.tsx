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
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#075e54] via-[#128c7e] to-[#25d366] pb-16 pt-12 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h1 className="animate-fade-in-up text-3xl font-bold tracking-tight sm:text-4xl">
            تسوق أسهل عبر واتساب
          </h1>
          <p className="animate-fade-in-up mx-auto mt-3 max-w-lg text-lg text-white/80" style={{ animationDelay: "0.1s" }}>
            تصفح المنتجات، اختر اللي يعجبك، واطلب مباشرة عبر واتساب — توصيل سريع ودفع آمن
          </p>
          <div className="animate-fade-in-up mt-8 flex items-center justify-center gap-2 text-sm text-white/70" style={{ animationDelay: "0.2s" }}>
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
              دفع عند الاستلام
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
              توصيل سريع
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
              دفع إلكتروني
            </span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">المنتجات</h2>
            <p className="mt-1 text-sm text-gray-400">كل اللي تحتاجه في مكان واحد</p>
          </div>
          {products && products.length > 0 && (
            <span className="rounded-full bg-[#075e54]/10 px-3 py-1 text-sm font-medium text-[#075e54]">
              {products.length} منتج
            </span>
          )}
        </div>

        {!products || products.length === 0 ? (
          <EmptyState />
        ) : (
          <ProductGrid products={products} storePhone={storePhone} />
        )}
      </main>
    </>
  );
}
