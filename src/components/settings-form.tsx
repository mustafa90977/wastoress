"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Save } from "lucide-react";

interface SettingField {
  key: string;
  label: string;
  type: "text" | "textarea" | "phone" | "email" | "json";
  group: string;
}

const FIELDS: SettingField[] = [
  { key: "store_name", label: "اسم المتجر", type: "text", group: "معلومات المتجر" },
  { key: "hero_title", label: "عنوان الهيرو", type: "text", group: "معلومات المتجر" },
  { key: "hero_subtitle", label: "نص الهيرو التعريفي", type: "textarea", group: "معلومات المتجر" },
  { key: "about_text", label: "نبذة عن المتجر", type: "textarea", group: "معلومات المتجر" },
  { key: "footer_text", label: "نص الفوتر", type: "text", group: "معلومات المتجر" },
  { key: "phone", label: "رقم الهاتف", type: "phone", group: "معلومات الاتصال" },
  { key: "email", label: "البريد الإلكتروني", type: "email", group: "معلومات الاتصال" },
  { key: "address", label: "العنوان", type: "text", group: "معلومات الاتصال" },
  { key: "categories", label: "الفئات (JSON)", type: "json", group: "إعدادات متقدمة" },
  { key: "trust_badges", label: "شارات الثقة (JSON)", type: "json", group: "إعدادات متقدمة" },
  { key: "testimonials", label: "آراء العملاء (JSON)", type: "json", group: "إعدادات متقدمة" },
];

const FIELD_HELP: Record<string, string> = {
  categories: 'مثال: [{"name":"عطور","icon":"spa"},{"name":"أزياء","icon":"styler"}]',
  trust_badges: 'مثال: [{"title":"شحن سريع","desc":"توصيل سريع","icon":"local_shipping"}]',
  testimonials: 'مثال: [{"name":"أحمد","review":"رائع","rating":5}]',
};

export default function SettingsForm() {
  const router = useRouter();
  const supabase = createClient();
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("store_settings").select("key, value");
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((s: { key: string; value: string }) => { map[s.key] = s.value; });
        setValues(map);
      }
      setLoading(false);
    }
    load();
  }, [supabase]);

  async function handleSave() {
    setError("");
    setSuccess(false);
    setSaving(true);

    const upserts = Object.entries(values).map(([key, value]) => ({
      key,
      value,
    }));

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
    return <p className="text-center text-gray-400 py-8">جاري التحميل...</p>;
  }

  const groups = [...new Set(FIELDS.map((f) => f.group))];

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group}>
          <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">{group}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FIELDS.filter((f) => f.group === group).map((field) => {
              const val = values[field.key] ?? "";
              return (
                <div key={field.key} className={field.type === "textarea" || field.type === "json" ? "md:col-span-2" : ""}>
                  <label className="mb-1 block text-sm font-medium text-gray-700">{field.label}</label>
                  {field.type === "textarea" || field.type === "json" ? (
                    <textarea
                      rows={field.type === "json" ? 5 : 3}
                      value={val}
                      onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary font-mono"
                      dir={field.type === "json" ? "ltr" : "rtl"}
                    />
                  ) : (
                    <input
                      type={field.type === "email" ? "email" : "text"}
                      value={val}
                      onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                      dir={field.type === "phone" ? "ltr" : "rtl"}
                    />
                  )}
                  {FIELD_HELP[field.key] && (
                    <p className="mt-1 text-xs text-gray-400">{FIELD_HELP[field.key]}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}
      {success && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">تم حفظ الإعدادات بنجاح!</p>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-on-primary transition hover:brightness-110 disabled:opacity-50"
      >
        <Save className="h-4 w-4" />
        {saving ? "جاري الحفظ..." : "حفظ الإعدادات"}
      </button>
    </div>
  );
}
