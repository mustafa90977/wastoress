import { createClient, createAdminClient } from "./supabase";
import type { Category, TrustBadge, Testimonial } from "@/types/database";

export interface StoreData {
  storeName: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  phone: string;
  email: string;
  address: string;
  categories: Category[];
  trustBadges: TrustBadge[];
  testimonials: Testimonial[];
  footerText: string;
}

const defaults: StoreData = {
  storeName: "متجر النخبة",
  heroTitle: "تسوق بسهولة عبر واتساب",
  heroSubtitle: "استمتع بتجربة تسوق فريدة ومبسطة. اختر منتجاتك المفضلة وسنقوم بإتمام طلبك مباشرة عبر محادثة واتساب سريعة ومباشرة مع فريقنا.",
  aboutText: "نحن نوفر لك أرقى المنتجات العالمية بلمسة عربية أصيلة. تجربة تسوق استثنائية تبدأ من هنا.",
  phone: "+966 500 000 000",
  email: "info@al-nukhba.com",
  address: "الرياض، المملكة العربية السعودية",
  categories: [
    { name: "عطور", icon: "spa" },
    { name: "أزياء", icon: "styler" },
    { name: "ساعات", icon: "watch" },
    { name: "عناية", icon: "spa" },
    { name: "هدايا", icon: "redeem" },
  ],
  trustBadges: [
    { title: "شحن سريع", desc: "توصيل لكافة المناطق في زمن قياسي", icon: "local_shipping" },
    { title: "دفع آمن", desc: "طرق دفع متعددة ومؤمنة بالكامل", icon: "verified_user" },
    { title: "منتجات مميزة", desc: "تشكيلة مختارة بعناية لأصحاب الذوق الرفيع", icon: "workspace_premium" },
    { title: "ضمان الجودة", desc: "نضمن لك أفضل جودة لجميع مشترياتك", icon: "verified" },
  ],
  testimonials: [
    { name: "أحمد العتيبي", review: "تجربة تسوق رائعة جداً، الطلب عبر واتساب سهل علي الكثير من الوقت والتوصيل كان سريعاً جداً.", rating: 5 },
    { name: "سارة القحطاني", review: "المنتجات جودتها ممتازة وتغليفها فاخر جداً، بالتأكيد لن تكون المرة الأخيرة التي أطلب فيها.", rating: 5 },
    { name: "فهد الحربي", review: "دعم فني متميز واستجابة سريعة جداً عبر الواتساب. أنصح الجميع بالتعامل مع متجر النخبة.", rating: 4 },
  ],
  footerText: "جميع الحقوق محفوظة",
};

export async function getSettings(): Promise<StoreData> {
  const supabase = createClient();
  const { data } = await supabase
    .from("store_settings")
    .select("key, value");

  if (!data) return defaults;

  const map = Object.fromEntries(
    data.map((s: { key: string; value: string }) => [s.key, s.value])
  );

  const result: StoreData = {
    storeName: map.store_name ?? defaults.storeName,
    heroTitle: map.hero_title ?? defaults.heroTitle,
    heroSubtitle: map.hero_subtitle ?? defaults.heroSubtitle,
    aboutText: map.about_text ?? defaults.aboutText,
    phone: map.phone ?? defaults.phone,
    email: map.email ?? defaults.email,
    address: map.address ?? defaults.address,
    footerText: map.footer_text ?? defaults.footerText,
    categories: safeJsonParse<Category[]>(map.categories, defaults.categories),
    trustBadges: safeJsonParse<TrustBadge[]>(map.trust_badges, defaults.trustBadges),
    testimonials: safeJsonParse<Testimonial[]>(map.testimonials, defaults.testimonials),
  };

  return result;
}

function safeJsonParse<T>(json: string | undefined, fallback: T): T {
  if (!json) return fallback;
  try { return JSON.parse(json) as T; } catch { return fallback; }
}
