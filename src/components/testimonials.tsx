import type { Testimonial } from "@/types/database";

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: Props) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="bg-primary/5 py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h3 className="text-4xl md:text-5xl font-bold text-on-surface" style={{ fontFamily: "var(--font-display)" }}>
            ماذا يقول عملاؤنا
          </h3>
          <p className="text-lg text-on-secondary-container">
            نعتز بثقتكم ونسعى دائماً لتقديم أفضل تجربة تسوق ممكنة
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-surface-container-lowest p-8 rounded-[24px] shadow-sm border border-outline-variant/10 relative animate-fade-in"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="absolute -top-6 right-8 w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center text-3xl font-serif">"</div>
              <div className="flex text-[#FFB800] mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="text-lg italic mb-8 text-on-surface">"{t.review}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h5 className="font-bold text-on-surface">{t.name}</h5>
                  <span className="text-sm text-on-secondary-container">عميل موثق</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
