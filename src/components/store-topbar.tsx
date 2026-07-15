"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface Props {
  storeName: string;
  phone: string;
  announcementText: string;
  announcementEnabled: boolean;
}

export default function StoreTopbar({ storeName, phone, announcementText, announcementEnabled }: Props) {
  const [barClosed, setBarClosed] = useState(false);
  const showBar = announcementEnabled && !barClosed;

  const barHeight = "2.75rem"; // h-11
  const headerHeight = "5rem"; // h-20

  return (
    <>
      {/* Fixed container for both bar + header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {showBar && (
          <div className="relative bg-gradient-to-r from-primary via-primary-container to-primary text-on-primary overflow-hidden h-11">
            <div className="absolute inset-0 flex items-center">
              <div className="flex whitespace-nowrap animate-marquee">
                <span className="mx-8 text-sm font-medium">{announcementText}</span>
                <span className="mx-8 text-sm font-medium">{announcementText}</span>
                <span className="mx-8 text-sm font-medium">{announcementText}</span>
                <span className="mx-8 text-sm font-medium">{announcementText}</span>
                <span className="mx-8 text-sm font-medium">{announcementText}</span>
              </div>
            </div>
            <button
              onClick={() => setBarClosed(true)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <header className="bg-surface/80 glass-effect shadow-sm border-b border-outline-variant/30">
          <div className="max-w-[1400px] mx-auto px-4 md:px-12 flex items-center justify-between h-20 gap-8">
            <div className="flex items-center gap-3 shrink-0">
              <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
              <h1 className="text-[28px] font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>{storeName}</h1>
            </div>

            <nav className="hidden lg:flex items-center gap-6">
              <a className="text-primary font-bold border-b-2 border-primary pb-1" href="/">الرئيسية</a>
            </nav>

            <div className="flex-grow max-w-md hidden md:flex items-center relative group">
              <span className="material-symbols-outlined absolute right-4 text-on-surface-variant transition-colors group-focus-within:text-primary">search</span>
              <input
                className="w-full pr-12 pl-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-full focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                placeholder="ابحث عن منتجك المفضل..."
                type="text"
              />
            </div>

            <div className="flex items-center gap-2 md:gap-4 shrink-0">
              <button className="p-2.5 hover:bg-primary-container/10 rounded-lg transition-all duration-300 active:scale-95 text-on-surface-variant">
                <span className="material-symbols-outlined">person</span>
              </button>
              <button className="p-2.5 hover:bg-primary-container/10 rounded-lg transition-all duration-300 active:scale-95 text-on-surface-variant relative">
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
              <a
                href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 rounded-lg transition-all duration-300 active:scale-95"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
              </a>
            </div>
          </div>
        </header>
      </div>

      {/* Spacer to push content below fixed topbar */}
      <div style={{ height: showBar ? `calc(${barHeight} + ${headerHeight})` : headerHeight }} />
    </>
  );
}
