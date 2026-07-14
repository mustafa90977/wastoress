import type { Metadata } from "next";
import { WhatsApp, ShoppingBag } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "المتجر",
  description: "تسوق أسهل عبر واتساب",
};

function FloatingWhatsApp() {
  const phone = process.env.NEXT_PUBLIC_STORE_PHONE || "";
  const url = phone ? `https://wa.me/${phone}` : "#";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition hover:scale-110 hover:bg-[#128c7e] animate-float animate-pulse-ring"
      aria-label="تواصل عبر واتساب"
    >
      <WhatsApp className="h-7 w-7" />
    </a>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <a href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#075e54] to-[#25d366] text-white shadow-sm">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-gray-800">المتجر</span>
            </a>
            <a
              href={process.env.NEXT_PUBLIC_STORE_PHONE ? `https://wa.me/${process.env.NEXT_PUBLIC_STORE_PHONE}` : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-[#25d366] px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-[#128c7e]"
            >
              <WhatsApp className="h-4 w-4" />
              تواصل
            </a>
          </div>
        </header>

        {children}

        <footer className="border-t border-gray-100 bg-white py-8 text-center text-sm text-gray-400">
          <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} — المتجر</p>
        </footer>

        <FloatingWhatsApp />
      </body>
    </html>
  );
}
