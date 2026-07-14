"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import type { Order } from "@/types/database";
import { Search, RefreshCw } from "lucide-react";

const statusLabels: Record<string, string> = {
  pending: "قيد الانتظار",
  confirmed: "تم التأكيد",
  shipped: "تم الشحن",
  cancelled: "ملغي",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const supabase = createClient();

  async function fetchOrders() {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  async function handleStatusChange(
    orderId: string,
    newStatus: string
  ) {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (!error) {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: newStatus as Order["status"] } : o
        )
      );
    }
  }

  const filtered = orders.filter(
    (o) =>
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_phone.includes(search) ||
      o.product_name_snapshot.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">الطلبات</h1>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
        >
          <RefreshCw className="h-4 w-4" />
          تحديث
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="بحث برقم الطلب أو رقم العميل..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 py-2 pr-10 pl-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-400">جاري التحميل...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-400">
          {search ? "لا توجد نتائج" : "لا توجد طلبات بعد"}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-right">
                <th className="px-4 py-3 font-medium text-gray-600">رقم الطلب</th>
                <th className="px-4 py-3 font-medium text-gray-600">المنتج</th>
                <th className="px-4 py-3 font-medium text-gray-600">السعر</th>
                <th className="px-4 py-3 font-medium text-gray-600">العميل</th>
                <th className="px-4 py-3 font-medium text-gray-600">الدفع</th>
                <th className="px-4 py-3 font-medium text-gray-600">الحالة</th>
                <th className="px-4 py-3 font-medium text-gray-600">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium">
                    {order.order_number}
                  </td>
                  <td className="px-4 py-3">{order.product_name_snapshot}</td>
                  <td className="px-4 py-3">
                    {Number(order.price_snapshot).toLocaleString("ar-EG")} ج.م
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    {order.customer_phone}
                  </td>
                  <td className="px-4 py-3">
                    {order.payment_method === "cash"
                      ? "كاش"
                      : "إلكتروني"}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className={`rounded-full px-2 py-0.5 text-xs font-medium outline-none ${
                        statusColors[order.status]
                      }`}
                    >
                      {Object.entries(statusLabels).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(order.created_at).toLocaleDateString("ar-EG")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
