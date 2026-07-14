"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import type { Product } from "@/types/database";
import ProductForm from "@/components/product-form";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        router.push("/admin/products");
        return;
      }

      setProduct(data);
      setLoading(false);
    }

    load();
  }, [id, router, supabase]);

  if (loading) {
    return <p className="text-center text-gray-400">جاري التحميل...</p>;
  }

  if (!product) return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">تعديل المنتج</h1>
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <ProductForm initialData={product} />
      </div>
    </div>
  );
}
