import type { Category } from "@/types/database";

interface Props {
  categories: Category[];
}

export default function CategoriesSection({ categories }: Props) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-12">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-bold text-on-surface" style={{ fontFamily: "var(--font-display)" }}>تسوق حسب الفئة</h3>
        <a className="text-primary font-bold hover:underline" href="#">عرض الكل</a>
      </div>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
        {categories.map((cat, i) => (
          <div key={i} className="flex-none w-40 group cursor-pointer">
            <div className="w-full aspect-square bg-surface-container-high rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
              <span className="material-symbols-outlined text-4xl">{cat.icon}</span>
            </div>
            <p className="text-center font-bold">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
