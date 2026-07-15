import type { TrustBadge } from "@/types/database";

interface Props {
  badges: TrustBadge[];
}

export default function TrustBadges({ badges }: Props) {
  if (!badges || badges.length === 0) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((badge, i) => (
          <div
            key={i}
            className="p-8 bg-surface-container-lowest rounded-xl border border-outline-variant/30 flex items-start gap-4 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-3xl">{badge.icon}</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-on-surface mb-1">{badge.title}</h4>
              <p className="text-on-secondary-container">{badge.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
