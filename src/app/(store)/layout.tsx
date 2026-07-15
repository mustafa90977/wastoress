import { getSettings } from "@/lib/store";
import StoreTopbar from "@/components/store-topbar";

function FloatingWhatsApp({ phone, enabled }: { phone: string; enabled: boolean }) {
  if (!enabled) return null;
  const url = phone ? `https://wa.me/${phone.replace(/[^0-9]/g, "")}` : "#";
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 left-4 md:bottom-6 md:left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition hover:scale-110 hover:bg-[#128c7e] animate-float animate-pulse-ring"
      aria-label="تواصل عبر واتساب"
    >
      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const envPhone = process.env.NEXT_PUBLIC_STORE_PHONE || "";
  const phone = envPhone || settings.phone;

  return (
    <>
      <StoreTopbar
        storeName={settings.storeName}
        phone={phone}
        announcementText={settings.announcementText}
        announcementEnabled={settings.announcementEnabled}
      />
      {children}
      <SiteFooter settings={settings} />
      <FloatingWhatsApp phone={phone} enabled={settings.whatsappFloatEnabled} />
      <BottomNav />
    </>
  );
}

function SiteFooter({ settings }: { settings: Awaited<ReturnType<typeof getSettings>> }) {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/20 pt-20 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
            <h2 className="text-3xl font-black text-primary" style={{ fontFamily: "var(--font-display)" }}>{settings.storeName}</h2>
          </div>
          <p className="text-on-secondary-container max-w-sm">{settings.footerDescription}</p>
          <div className="flex gap-4">
            {settings.socialFacebook !== "#" && (
              <a className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300" href={settings.socialFacebook} target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined">chat</span>
              </a>
            )}
            {settings.socialInstagram !== "#" && (
              <a className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300" href={settings.socialInstagram} target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined">public</span>
              </a>
            )}
            {settings.socialTiktok !== "#" && (
              <a className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300" href={settings.socialTiktok} target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined">camera_alt</span>
              </a>
            )}
            {settings.socialX !== "#" && (
              <a className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300" href={settings.socialX} target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined">alternate_email</span>
              </a>
            )}
          </div>
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-on-surface text-lg">عن المتجر</h4>
          <ul className="space-y-4">
            <li><a className="text-on-secondary-container hover:text-primary hover:translate-x-[-4px] transition-all inline-block" href="#">من نحن</a></li>
            <li><a className="text-on-secondary-container hover:text-primary hover:translate-x-[-4px] transition-all inline-block" href="#">قصة العلامة</a></li>
            <li><a className="text-on-secondary-container hover:text-primary hover:translate-x-[-4px] transition-all inline-block" href="#">المدونة</a></li>
            <li><a className="text-on-secondary-container hover:text-primary hover:translate-x-[-4px] transition-all inline-block" href="#">الوظائف</a></li>
          </ul>
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-on-surface text-lg">مساعدة</h4>
          <ul className="space-y-4">
            <li><a className="text-on-secondary-container hover:text-primary hover:translate-x-[-4px] transition-all inline-block" href="#">سياسة الخصوصية</a></li>
            <li><a className="text-on-secondary-container hover:text-primary hover:translate-x-[-4px] transition-all inline-block" href="#">الشروط والأحكام</a></li>
            <li><a className="text-on-secondary-container hover:text-primary hover:translate-x-[-4px] transition-all inline-block" href="#">الأسئلة الشائعة</a></li>
            <li><a className="text-on-secondary-container hover:text-primary hover:translate-x-[-4px] transition-all inline-block" href="#">الشحن والتوصيل</a></li>
          </ul>
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-on-surface text-lg">تواصل معنا</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-on-secondary-container">
              <span className="material-symbols-outlined text-primary">call</span>
              <span>{settings.phone}</span>
            </li>
            <li className="flex items-center gap-3 text-on-secondary-container">
              <span className="material-symbols-outlined text-primary">mail</span>
              <span>{settings.email}</span>
            </li>
            <li className="flex items-center gap-3 text-on-secondary-container">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <span>{settings.address}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 mt-20 pt-8 border-t border-outline-variant/10 text-center">
        <p className="text-sm text-on-secondary-container">&copy; {new Date().getFullYear()} {settings.storeName}. {settings.footerText}.</p>
      </div>
    </footer>
  );
}

function BottomNav() {
  return (
    <div className="fixed bottom-0 w-full z-50 bg-white/95 backdrop-blur-md border-t border-outline-variant/10 md:hidden">
      <div className="flex items-center justify-around h-16">
        <button className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px] font-bold">الرئيسية</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">grid_view</span>
          <span className="text-[10px]">الأقسام</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">favorite</span>
          <span className="text-[10px]">المفضلة</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px]">حسابي</span>
        </button>
      </div>
    </div>
  );
}
