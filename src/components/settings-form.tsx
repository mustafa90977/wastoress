"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const TABS = [
  { id: "general", label: "الرئيسية" },
  { id: "announcement", label: "الشريط العلوي" },
  { id: "categories", label: "التصنيفات" },
  { id: "badges", label: "الشارات" },
  { id: "offers", label: "العروض" },
  { id: "bestsellers", label: "الأكثر مبيعاً" },
  { id: "testimonials", label: "الآراء" },
  { id: "footer", label: "التذييل" },
  { id: "whatsapp", label: "واتساب" },
  { id: "social", label: "التواصل" },
  { id: "integrations", label: "التكاملات" },
];

interface CatItem { name: string; icon: string }
interface BadgeItem { title: string; desc: string; icon: string }
interface TestimonialItem { name: string; review: string; rating: number }

const ICON_OPTIONS = [
  { value: "local_shipping", label: "شحن" },
  { value: "verified_user", label: "آمن" },
  { value: "workspace_premium", label: "مميز" },
  { value: "verified", label: "موثق" },
  { value: "spa", label: "عناية" },
  { value: "styler", label: "أزياء" },
  { value: "watch", label: "ساعات" },
  { value: "redeem", label: "هدايا" },
  { value: "favorite", label: "مفضل" },
  { value: "star", label: "نجمة" },
  { value: "card_giftcard", label: "هدية" },
  { value: "diamond", label: "ألماسة" },
  { value: "rocket_launch", label: "صاروخ" },
  { value: "support_agent", label: "دعم" },
  { value: "payment", label: "دفع" },
];

export default function SettingsForm() {
  const router = useRouter();
  const supabase = createClient();
  const [tab, setTab] = useState("general");
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // dynamic arrays for JSON fields
  const [categories, setCategories] = useState<CatItem[]>([]);
  const [badges, setBadges] = useState<BadgeItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("store_settings").select("key, value");
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((s: { key: string; value: string }) => { map[s.key] = s.value; });
        setValues(map);
        try { setCategories(JSON.parse(map.categories || "[]")); } catch { setCategories([]); }
        try { setBadges(JSON.parse(map.trust_badges || "[]")); } catch { setBadges([]); }
        try { setTestimonials(JSON.parse(map.testimonials || "[]")); } catch { setTestimonials([]); }
      }
      setLoading(false);
    }
    load();
  }, [supabase]);

  function setVal(key: string, val: string) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSave() {
    setError("");
    setSuccess(false);
    setSaving(true);

    // encode JSON fields
    const all = {
      ...values,
      categories: JSON.stringify(categories),
      trust_badges: JSON.stringify(badges),
      testimonials: JSON.stringify(testimonials),
    };

    const upserts = Object.entries(all).map(([key, value]) => ({ key, value }));
    const { error: upsertError } = await supabase
      .from("store_settings")
      .upsert(upserts, { onConflict: "key" });

    if (upsertError) {
      setError("فشل الحفظ: " + upsertError.message);
      setSaving(false);
      return;
    }

    setSuccess(true);
    setSaving(false);
    router.refresh();
    setTimeout(() => setSuccess(false), 3000);
  }

  if (loading) {
    return <p className="text-center text-gray-400 py-12">جاري التحميل...</p>;
  }

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 border-b border-gray-200">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-lg text-sm font-bold transition ${
              tab === t.id
                ? "bg-primary text-on-primary shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="min-h-[300px]">
        {tab === "general" && <GeneralTab values={values} setVal={setVal} />}
        {tab === "announcement" && <AnnouncementTab values={values} setVal={setVal} />}
        {tab === "categories" && <CategoriesTab items={categories} setItems={setCategories} />}
        {tab === "badges" && <BadgesTab items={badges} setItems={setBadges} />}
        {tab === "offers" && <OffersTab values={values} setVal={setVal} />}
        {tab === "bestsellers" && <BestSellersTab values={values} setVal={setVal} />}
        {tab === "testimonials" && <TestimonialsTab items={testimonials} setItems={setTestimonials} />}
        {tab === "footer" && <FooterTab values={values} setVal={setVal} />}
        {tab === "whatsapp" && <WhatsAppTab values={values} setVal={setVal} />}
        {tab === "social" && <SocialTab values={values} setVal={setVal} />}
        {tab === "integrations" && <IntegrationsTab values={values} setVal={setVal} />}
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      )}
      {success && (
        <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">تم حفظ الإعدادات بنجاح!</p>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-bold text-on-primary transition hover:brightness-110 disabled:opacity-50 shadow-lg"
      >
        <Save className="h-4 w-4" />
        {saving ? "جاري الحفظ..." : "حفظ الإعدادات"}
      </button>
    </div>
  );
}

/* ---------- Field helper ---------- */
function Field({ label, value, onChange, type = "text", dir = "rtl", rows, icon }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; dir?: string; rows?: number; icon?: string;
}) {
  const id = label.replace(/\s/g, "");
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-gray-700 flex items-center gap-2">
        {icon && <span className="material-symbols-outlined text-[18px] text-primary">{icon}</span>}
        {label}
      </label>
      {rows ? (
        <textarea
          id={id} rows={rows} value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          dir={dir}
        />
      ) : (
        <input
          id={id} type={type} value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          dir={dir}
        />
      )}
    </div>
  );
}

function Toggle({ label, value, onChange, icon }: {
  label: string; value: boolean; onChange: (v: boolean) => void; icon?: string;
}) {
  const id = label.replace(/\s/g, "");
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
      <label htmlFor={id} className="text-sm font-bold text-gray-700 flex items-center gap-2 cursor-pointer">
        {icon && <span className="material-symbols-outlined text-[18px] text-primary">{icon}</span>}
        {label}
      </label>
      <button
        id={id}
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative w-12 h-7 rounded-full transition-colors ${value ? "bg-primary" : "bg-gray-300"}`}
      >
        <span className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${value ? "translate-x-6" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}

/* ---------- Tabs ---------- */
function GeneralTab({ values, setVal }: { values: Record<string, string>; setVal: (k: string, v: string) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label="اسم المتجر" value={values.store_name ?? ""} onChange={(v) => setVal("store_name", v)} icon="store" />
      <Field label="رقم الهاتف" value={values.phone ?? ""} onChange={(v) => setVal("phone", v)} type="tel" dir="ltr" icon="call" />
      <Field label="البريد الإلكتروني" value={values.email ?? ""} onChange={(v) => setVal("email", v)} type="email" dir="ltr" icon="mail" />
      <Field label="العنوان" value={values.address ?? ""} onChange={(v) => setVal("address", v)} icon="location_on" />
      <div className="md:col-span-2">
        <Field label="عنوان الهيرو" value={values.hero_title ?? ""} onChange={(v) => setVal("hero_title", v)} icon="title" />
      </div>
      <div className="md:col-span-2">
        <Field label="نص الهيرو" value={values.hero_subtitle ?? ""} onChange={(v) => setVal("hero_subtitle", v)} rows={3} icon="description" />
      </div>
      <Field label="نص زر الهيرو" value={values.hero_cta ?? ""} onChange={(v) => setVal("hero_cta", v)} icon="arrow_back" />
      <Field label="شارة الهيرو" value={values.hero_badge ?? ""} onChange={(v) => setVal("hero_badge", v)} icon="verified" />
      <div className="md:col-span-2">
        <Field label="رابط صورة الهيرو" value={values.hero_image ?? ""} onChange={(v) => setVal("hero_image", v)} dir="ltr" icon="image" />
      </div>
      <div className="md:col-span-2">
        <Field label="نبذة عن المتجر" value={values.about_text ?? ""} onChange={(v) => setVal("about_text", v)} rows={3} icon="info" />
      </div>
    </div>
  );
}

function AnnouncementTab({ values, setVal }: { values: Record<string, string>; setVal: (k: string, v: string) => void }) {
  return (
    <div className="space-y-6">
      <Toggle
        label="تفعيل شريط الإعلان"
        value={values.announcement_enabled !== "false"}
        onChange={(v) => setVal("announcement_enabled", v ? "true" : "false")}
        icon="campaign"
      />
      <Field label="نص الإعلان" value={values.announcement_text ?? ""} onChange={(v) => setVal("announcement_text", v)} rows={2} icon="text_fields" />
      <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
        <p className="text-sm font-bold text-gray-600 mb-3">معاينة:</p>
        <div className="bg-gradient-to-r from-primary via-primary-container to-primary text-on-primary rounded-xl py-3 px-6 text-center text-sm font-bold overflow-hidden">
          {values.announcement_text || "🔥 نص الإعلان هنا 🎉"}
        </div>
      </div>
    </div>
  );
}

function CategoriesTab({ items, setItems }: { items: CatItem[]; setItems: (v: CatItem[]) => void }) {
  function add() { setItems([...items, { name: "", icon: "spa" }]); }
  function remove(i: number) { setItems(items.filter((_, idx) => idx !== i)); }
  function update(i: number, k: keyof CatItem, v: string) {
    const copy = [...items]; copy[i] = { ...copy[i], [k]: v }; setItems(copy);
  }
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">أضف التصنيفات التي تظهر في المتجر مع الأيقونات.</p>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
          <span className="text-gray-400 text-sm w-6">{i + 1}</span>
          <input
            value={item.name} onChange={(e) => update(i, "name", e.target.value)}
            placeholder="اسم التصنيف"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
          <select
            value={item.icon} onChange={(e) => update(i, "icon", e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            {ICON_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <button onClick={() => remove(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button onClick={add} className="flex items-center gap-2 text-sm font-bold text-primary hover:bg-primary/5 px-4 py-2 rounded-lg transition">
        <Plus className="h-4 w-4" /> إضافة تصنيف
      </button>
    </div>
  );
}

function BadgesTab({ items, setItems }: { items: BadgeItem[]; setItems: (v: BadgeItem[]) => void }) {
  function add() { setItems([...items, { title: "", desc: "", icon: "verified" }]); }
  function remove(i: number) { setItems(items.filter((_, idx) => idx !== i)); }
  function update(i: number, k: keyof BadgeItem, v: string) {
    const copy = [...items]; copy[i] = { ...copy[i], [k]: v }; setItems(copy);
  }
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">شارات الثقة تظهر أسفل الهيرو.</p>
      {items.map((item, i) => (
        <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-gray-600">الشارة {i + 1}</span>
            <button onClick={() => remove(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input value={item.title} onChange={(e) => update(i, "title", e.target.value)} placeholder="العنوان" className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            <input value={item.desc} onChange={(e) => update(i, "desc", e.target.value)} placeholder="الوصف" className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            <select value={item.icon} onChange={(e) => update(i, "icon", e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
              {ICON_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
            </select>
          </div>
        </div>
      ))}
      <button onClick={add} className="flex items-center gap-2 text-sm font-bold text-primary hover:bg-primary/5 px-4 py-2 rounded-lg transition">
        <Plus className="h-4 w-4" /> إضافة شارة
      </button>
    </div>
  );
}

function OffersTab({ values, setVal }: { values: Record<string, string>; setVal: (k: string, v: string) => void }) {
  return (
    <div className="space-y-6">
      <Toggle
        label="تفعيل شريط العروض"
        value={values.offer_banner_enabled !== "false"}
        onChange={(v) => setVal("offer_banner_enabled", v ? "true" : "false")}
        icon="local_offer"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="الشارة" value={values.offer_banner_badge ?? ""} onChange={(v) => setVal("offer_banner_badge", v)} icon="confirmation_number" />
        <div className="md:col-span-2">
          <Field label="العنوان" value={values.offer_banner_title ?? ""} onChange={(v) => setVal("offer_banner_title", v)} icon="title" />
        </div>
        <div className="md:col-span-2">
          <Field label="الوصف" value={values.offer_banner_subtitle ?? ""} onChange={(v) => setVal("offer_banner_subtitle", v)} rows={2} icon="description" />
        </div>
        <Field label="نص الزر" value={values.offer_banner_cta ?? ""} onChange={(v) => setVal("offer_banner_cta", v)} icon="touch_app" />
        <div className="md:col-span-2">
          <Field label="رابط الصورة" value={values.offer_banner_image ?? ""} onChange={(v) => setVal("offer_banner_image", v)} dir="ltr" icon="image" />
        </div>
      </div>
    </div>
  );
}

function BestSellersTab({ values, setVal }: { values: Record<string, string>; setVal: (k: string, v: string) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label="عنوان القسم" value={values.best_sellers_title ?? ""} onChange={(v) => setVal("best_sellers_title", v)} icon="trending_up" />
      <Field label="عدد المنتجات" value={values.best_sellers_count ?? "4"} onChange={(v) => setVal("best_sellers_count", v)} type="number" dir="ltr" icon="format_list_numbered" />
    </div>
  );
}

function TestimonialsTab({ items, setItems }: { items: TestimonialItem[]; setItems: (v: TestimonialItem[]) => void }) {
  function add() { setItems([...items, { name: "", review: "", rating: 5 }]); }
  function remove(i: number) { setItems(items.filter((_, idx) => idx !== i)); }
  function update(i: number, k: keyof TestimonialItem, v: string | number) {
    const copy = [...items]; copy[i] = { ...copy[i], [k]: v }; setItems(copy);
  }
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">آراء العملاء تظهر في القسم السفلي من المتجر.</p>
      {items.map((item, i) => (
        <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-gray-600">الرأي {i + 1}</span>
            <button onClick={() => remove(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input value={item.name} onChange={(e) => update(i, "name", e.target.value)} placeholder="الاسم" className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            <div className="md:col-span-2">
              <textarea value={item.review} onChange={(e) => update(i, "review", e.target.value)} placeholder="التعليق" rows={2} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">التقييم:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => update(i, "rating", star)} className="transition">
                <span className={`material-symbols-outlined text-[22px] ${star <= item.rating ? "text-[#FFB800]" : "text-gray-300"}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      <button onClick={add} className="flex items-center gap-2 text-sm font-bold text-primary hover:bg-primary/5 px-4 py-2 rounded-lg transition">
        <Plus className="h-4 w-4" /> إضافة رأي
      </button>
    </div>
  );
}

function FooterTab({ values, setVal }: { values: Record<string, string>; setVal: (k: string, v: string) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <Field label="وصف المتجر" value={values.footer_description ?? ""} onChange={(v) => setVal("footer_description", v)} rows={3} icon="description" />
      </div>
      <Field label="نص الحقوق" value={values.footer_text ?? ""} onChange={(v) => setVal("footer_text", v)} icon="copyright" />
    </div>
  );
}

function WhatsAppTab({ values, setVal }: { values: Record<string, string>; setVal: (k: string, v: string) => void }) {
  return (
    <div className="space-y-6">
      <Toggle
        label="تفعيل زر واتساب العائم"
        value={values.whatsapp_float_enabled !== "false"}
        onChange={(v) => setVal("whatsapp_float_enabled", v ? "true" : "false")}
        icon="chat"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="الرسالة الافتراضية" value={values.whatsapp_message ?? ""} onChange={(v) => setVal("whatsapp_message", v)} icon="text_fields" />
        <Field label="نص زر الطلب" value={values.whatsapp_button_text ?? ""} onChange={(v) => setVal("whatsapp_button_text", v)} icon="smart_button" />
      </div>
    </div>
  );
}

function SocialTab({ values, setVal }: { values: Record<string, string>; setVal: (k: string, v: string) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label="رابط فيسبوك" value={values.social_facebook ?? ""} onChange={(v) => setVal("social_facebook", v)} dir="ltr" icon="chat" />
      <Field label="رابط انستجرام" value={values.social_instagram ?? ""} onChange={(v) => setVal("social_instagram", v)} dir="ltr" icon="public" />
      <Field label="رابط تيك توك" value={values.social_tiktok ?? ""} onChange={(v) => setVal("social_tiktok", v)} dir="ltr" icon="camera_alt" />
      <Field label="رابط X (تويتر)" value={values.social_x ?? ""} onChange={(v) => setVal("social_x", v)} dir="ltr" icon="alternate_email" />
    </div>
  );
}

function IntegrationsTab({ values, setVal }: { values: Record<string, string>; setVal: (k: string, v: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 space-y-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">hub</span>
          n8n
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="رابط Webhook n8n" value={values.n8n_webhook_url ?? ""} onChange={(v) => setVal("n8n_webhook_url", v)} dir="ltr" icon="link" />
          <Field label="التوكن السري (n8n → المتجر)" value={values.n8n_webhook_secret ?? ""} onChange={(v) => setVal("n8n_webhook_secret", v)} dir="ltr" icon="key" />
        </div>
        {values.n8n_webhook_url && (
          <p className="text-xs text-gray-400">
            <span className="font-bold">رابط Webhook المتجر (ضيفه في n8n):</span>
            <br />
            <code dir="ltr" className="text-primary">{typeof window !== "undefined" ? window.location.origin : "https://wastoress.vercel.app"}/api/webhook/n8n</code>
          </p>
        )}
      </div>

      <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 space-y-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">chat</span>
          Wapolit
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="مفتاح API" value={values.wapolit_api_key ?? ""} onChange={(v) => setVal("wapolit_api_key", v)} dir="ltr" icon="vpn_key" />
          <Field label="معرف الجهاز (Device ID)" value={values.wapolit_device_id ?? ""} onChange={(v) => setVal("wapolit_device_id", v)} dir="ltr" icon="devices" />
        </div>
      </div>

      <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 space-y-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">payments</span>
          الدفع الإلكتروني
        </h3>
        <Field label="رابط الدفع الأساسي" value={values.payment_url ?? ""} onChange={(v) => setVal("payment_url", v)} dir="ltr" icon="link" />
        <p className="text-xs text-gray-400">يستخدم كقاعدة لروابط الدفع: {values.payment_url || "https://pay.example.com"}/order-xxxx</p>
      </div>
    </div>
  );
}
