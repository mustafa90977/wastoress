import { createClient } from "@/lib/supabase";
import { getSettings } from "@/lib/store";
import HeroSection from "@/components/hero-section";
import TrustBadges from "@/components/trust-badges";
import CategoriesSection from "@/components/categories-section";
import ProductGrid from "@/components/product-grid";
import OfferBanner from "@/components/offer-banner";
import BestSellers from "@/components/best-sellers";
import TestimonialsSection from "@/components/testimonials";
import EmptyState from "@/components/empty-state";

export const dynamic = "force-dynamic";

export default async function CatalogPage() {
  const supabase = createClient();

  const [{ data: products }, settings] = await Promise.all([
    supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false }),
    getSettings(),
  ]);

  const storePhone = process.env.NEXT_PUBLIC_STORE_PHONE || settings.phone;

  return (
    <main className="pt-20 space-y-16 md:space-y-20 pb-24 md:pb-8">
      <HeroSection
        title={settings.heroTitle}
        subtitle={settings.heroSubtitle}
        phone={storePhone}
      />

      <TrustBadges badges={settings.trustBadges} />

      <CategoriesSection categories={settings.categories} />

      <section id="products" className="max-w-[1400px] mx-auto px-4 md:px-12">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-3xl font-bold text-on-surface" style={{ fontFamily: "var(--font-display)" }}>وصل حديثاً</h3>
          <div className="flex gap-2">
            <button className="p-2 border border-outline-variant rounded-lg hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
            <button className="p-2 border border-outline-variant rounded-lg hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined">sort</span>
            </button>
          </div>
        </div>
        {!products || products.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <ProductGrid products={products} storePhone={storePhone} />
            <div className="text-center mt-10">
              <a
                href={`https://wa.me/${storePhone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                <span>تواصل معنا عبر واتساب للطلب</span>
              </a>
            </div>
          </>
        )}
      </section>

      <OfferBanner />

      {products && products.length > 0 && (
        <BestSellers products={products} storePhone={storePhone} />
      )}

      <TestimonialsSection testimonials={settings.testimonials} />
    </main>
  );
}
