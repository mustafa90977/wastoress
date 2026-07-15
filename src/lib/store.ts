import { createClient } from "./supabase";
import type { Category, TrustBadge, Testimonial } from "@/types/database";

export interface FooterLink {
  label: string;
  href: string;
}

export interface StoreData {
  storeName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  heroBadge: string;
  heroImage: string;
  aboutText: string;
  phone: string;
  email: string;
  address: string;

  announcementText: string;
  announcementEnabled: boolean;

  sectionProductsTitle: string;

  offerBannerEnabled: boolean;
  offerBannerBadge: string;
  offerBannerTitle: string;
  offerBannerSubtitle: string;
  offerBannerCta: string;
  offerBannerImage: string;

  bestSellersTitle: string;
  bestSellersCount: number;

  testimonialsTitle: string;
  testimonialsSubtitle: string;

  categories: Category[];
  trustBadges: TrustBadge[];
  testimonials: Testimonial[];

  footerDescription: string;
  footerText: string;

  whatsappMessage: string;
  whatsappButtonText: string;
  whatsappFloatEnabled: boolean;

  socialFacebook: string;
  socialInstagram: string;
  socialTiktok: string;
  socialX: string;
}

const defaults: StoreData = {
  storeName: "متجر النخبة",
  heroTitle: "تسوق بسهولة عبر واتساب",
  heroSubtitle: "استمتع بتجربة تسوق فريدة ومبسطة. اختر منتجاتك المفضلة وسنقوم بإتمام طلبك مباشرة عبر محادثة واتساب سريعة ومباشرة مع فريقنا.",
  heroCta: "ابدأ التسوق",
  heroBadge: "تسوق آمن وموثوق",
  heroImage: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80",
  aboutText: "نحن نوفر لك أرقى المنتجات العالمية بلمسة عربية أصيلة. تجربة تسوق استثنائية تبدأ من هنا.",
  phone: "+966 500 000 000",
  email: "info@al-nukhba.com",
  address: "الرياض، المملكة العربية السعودية",

  announcementText: "🔥 توصيل مجاني لكل الطلبات 🎉",
  announcementEnabled: true,

  sectionProductsTitle: "وصل حديثاً",

  offerBannerEnabled: true,
  offerBannerBadge: "عروض نهاية العام",
  offerBannerTitle: "خصومات تصل إلى 60% على جميع العطور",
  offerBannerSubtitle: "اكتشف مجموعتنا الحصرية من الروائح الشرقية والفرنسية بأسعار لا تقبل المنافسة.",
  offerBannerCta: "تسوق العروض الآن",
  offerBannerImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80",

  bestSellersTitle: "الأكثر مبيعاً",
  bestSellersCount: 4,

  testimonialsTitle: "ماذا يقول عملاؤنا",
  testimonialsSubtitle: "نعتز بثقتكم ونسعى دائماً لتقديم أفضل تجربة تسوق ممكنة",

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

  footerDescription: "نحن نوفر لك أرقى المنتجات العالمية بلمسة عربية أصيلة. تجربة تسوق استثنائية تبدأ من هنا.",
  footerText: "جميع الحقوق محفوظة",

  whatsappMessage: "مرحباً، أود الاستفسار عن",
  whatsappButtonText: "طلب عبر واتساب",
  whatsappFloatEnabled: true,

  socialFacebook: "#",
  socialInstagram: "#",
  socialTiktok: "#",
  socialX: "#",
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

  return {
    storeName: map.store_name ?? defaults.storeName,
    heroTitle: map.hero_title ?? defaults.heroTitle,
    heroSubtitle: map.hero_subtitle ?? defaults.heroSubtitle,
    heroCta: map.hero_cta ?? defaults.heroCta,
    heroBadge: map.hero_badge ?? defaults.heroBadge,
    heroImage: map.hero_image ?? defaults.heroImage,
    aboutText: map.about_text ?? defaults.aboutText,
    phone: map.phone ?? defaults.phone,
    email: map.email ?? defaults.email,
    address: map.address ?? defaults.address,

    announcementText: map.announcement_text ?? defaults.announcementText,
    announcementEnabled: map.announcement_enabled === "true" || defaults.announcementEnabled,

    sectionProductsTitle: map.section_products_title ?? defaults.sectionProductsTitle,

    offerBannerEnabled: map.offer_banner_enabled !== "false",
    offerBannerBadge: map.offer_banner_badge ?? defaults.offerBannerBadge,
    offerBannerTitle: map.offer_banner_title ?? defaults.offerBannerTitle,
    offerBannerSubtitle: map.offer_banner_subtitle ?? defaults.offerBannerSubtitle,
    offerBannerCta: map.offer_banner_cta ?? defaults.offerBannerCta,
    offerBannerImage: map.offer_banner_image ?? defaults.offerBannerImage,

    bestSellersTitle: map.best_sellers_title ?? defaults.bestSellersTitle,
    bestSellersCount: Number(map.best_sellers_count) || defaults.bestSellersCount,

    testimonialsTitle: map.testimonials_title ?? defaults.testimonialsTitle,
    testimonialsSubtitle: map.testimonials_subtitle ?? defaults.testimonialsSubtitle,

    categories: safeJsonParse<Category[]>(map.categories, defaults.categories),
    trustBadges: safeJsonParse<TrustBadge[]>(map.trust_badges, defaults.trustBadges),
    testimonials: safeJsonParse<Testimonial[]>(map.testimonials, defaults.testimonials),

    footerDescription: map.footer_description ?? defaults.footerDescription,
    footerText: map.footer_text ?? defaults.footerText,

    whatsappMessage: map.whatsapp_message ?? defaults.whatsappMessage,
    whatsappButtonText: map.whatsapp_button_text ?? defaults.whatsappButtonText,
    whatsappFloatEnabled: map.whatsapp_float_enabled !== "false",

    socialFacebook: map.social_facebook ?? defaults.socialFacebook,
    socialInstagram: map.social_instagram ?? defaults.socialInstagram,
    socialTiktok: map.social_tiktok ?? defaults.socialTiktok,
    socialX: map.social_x ?? defaults.socialX,
  };
}

function safeJsonParse<T>(json: string | undefined, fallback: T): T {
  if (!json) return fallback;
  try { return JSON.parse(json) as T; } catch { return fallback; }
}
