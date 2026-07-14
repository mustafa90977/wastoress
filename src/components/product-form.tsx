"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import type { Product } from "@/types/database";
import { Save } from "lucide-react";

interface Props {
  initialData?: Product;
}

export default function ProductForm({ initialData }: Props) {
  const isEdit = !!initialData;
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState(initialData?.name || "");
  const [sku, setSku] = useState(initialData?.sku || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [isActive, setIsActive] = useState(
    initialData?.is_active ?? true
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(
    initialData?.image_url || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name.trim() || !sku.trim() || !price.trim()) {
      setError("الاسم، SKU، والسعر حقول مطلوبة");
      setLoading(false);
      return;
    }

    let imageUrl = initialData?.image_url || null;

    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        setError("فشل رفع الصورة: " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      imageUrl = urlData.publicUrl;
    }

    const productData = {
      name: name.trim(),
      sku: sku.trim(),
      description: description.trim() || null,
      price: parseFloat(price),
      image_url: imageUrl,
      is_active: isActive,
    };

    if (isEdit) {
      const { error: updateError } = await supabase
        .from("products")
        .update(productData)
        .eq("id", initialData!.id);

      if (updateError) {
        setError("فشل التحديث: " + updateError.message);
        setLoading(false);
        return;
      }
    } else {
      const { error: insertError } = await supabase
        .from("products")
        .insert(productData);

      if (insertError) {
        setError("فشل الإضافة: " + insertError.message);
        setLoading(false);
        return;
      }
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            اسم المنتج <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            كود المنتج (SKU) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            placeholder="مثال: IPHONE-13"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            السعر (ج.م) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            صورة المنتج
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm file:mr-2 file:rounded file:border-0 file:bg-green-50 file:px-2 file:py-1 file:text-sm file:text-green-700"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 h-24 w-24 rounded-lg object-cover"
            />
          )}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          الوصف
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
        />
        المنتج نشط (يظهر في الكتالوج)
      </label>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex w-fit items-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
      >
        <Save className="h-4 w-4" />
        {loading
          ? "جاري الحفظ..."
          : isEdit
            ? "حفظ التعديلات"
            : "إضافة المنتج"}
      </button>
    </form>
  );
}
