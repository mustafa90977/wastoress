"use client";

import { LogOut, Package, ShoppingBag, Settings, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  if (pathname === "/admin/login") return null;

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const navItems = [
    { href: "/admin/products", label: "المنتجات", icon: Package },
    { href: "/admin/orders", label: "الطلبات", icon: ShoppingBag },
    { href: "/admin/settings", label: "الإعدادات", icon: Settings },
  ];

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <Link href="/admin/products" className="text-lg font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>
            لوحة التحكم
          </Link>
          <Link href="/" className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 transition">
            <ExternalLink className="h-3.5 w-3.5" />
            عرض المتجر
          </Link>
          <nav className="flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          تسجيل الخروج
        </button>
      </div>
    </header>
  );
}
