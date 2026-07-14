"use client";

import ProductForm from "@/components/product-form";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">إضافة منتج جديد</h1>
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <ProductForm />
      </div>
    </div>
  );
}
