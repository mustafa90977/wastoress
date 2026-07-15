interface Props {
  title: string;
  subtitle: string;
  phone: string;
}

export default function HeroSection({ title, subtitle, phone }: Props) {
  const whatsappUrl = phone
    ? `https://wa.me/${phone.replace(/[^0-9]/g, "")}`
    : "#";

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-12 pt-8 pb-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center bg-primary-container/5 rounded-[32px] p-8 md:p-16 overflow-hidden relative">
        <div className="z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>تسوق آمن وموثوق</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-on-primary-container leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
          <p className="text-lg text-on-secondary-container max-w-lg leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#products"
              className="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 text-lg"
            >
              <span>ابدأ التسوق</span>
              <span className="material-symbols-outlined">arrow_back</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-primary/20 text-primary bg-surface/50 hover:bg-primary/5 rounded-xl font-bold transition-all flex items-center gap-2 text-lg"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
              <span>تواصل عبر واتساب</span>
            </a>
          </div>
        </div>
        <div className="relative group h-[300px] lg:h-[450px]">
          <div className="absolute inset-0 bg-primary/10 rounded-[24px] rotate-3 group-hover:rotate-6 transition-transform"></div>
          <div
            className="relative w-full h-full rounded-[24px] bg-cover bg-center shadow-2xl transition-transform duration-700 group-hover:scale-[1.03]"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </div>
    </section>
  );
}
