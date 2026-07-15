interface Props {
  badge: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
}

export default function OfferBanner({ badge, title, subtitle, cta, image }: Props) {
  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-12">
      <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-r from-primary to-on-primary-fixed-variant p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-fixed-dim/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 space-y-6 text-on-primary max-w-2xl text-center lg:text-right">
          <div className="inline-block px-6 py-2 bg-on-primary text-primary rounded-full font-bold text-xl shadow-lg">{badge}</div>
          <h2 className="text-5xl lg:text-7xl font-bold leading-tight">{title}</h2>
          <p className="text-xl opacity-90 leading-relaxed">{subtitle}</p>
          <button className="px-10 py-5 bg-on-primary text-primary rounded-xl font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl">{cta}</button>
        </div>
        <div className="relative z-10 w-full lg:w-1/2 flex justify-center">
          <div className="w-full max-w-sm aspect-square bg-white/10 backdrop-blur-md rounded-[40px] p-8 border border-white/20 shadow-2xl rotate-3 group hover:rotate-0 transition-transform duration-500">
            <div
              className="w-full h-full rounded-[24px] bg-cover bg-center"
              style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
