import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import api from "../api/axios";

const statusStyles = {
  delivered: "bg-[#187A63]/15 text-[#187A63] dark:text-emerald-300",
  confirmed: "bg-sky-500/15 text-sky-600 dark:text-sky-300",
  shipped: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300",
  processing: "bg-[#D6A85C]/20 text-[#9A6F1E] dark:text-[#D6A85C]",
  pending: "bg-[#D6A85C]/20 text-[#9A6F1E] dark:text-[#D6A85C]",
  returned: "bg-slate-500/15 text-slate-600 dark:text-slate-300",
  cancelled: "bg-red-500/15 text-red-600 dark:text-red-400",
};

const paymentStyles = {
  paid: "text-[#187A63] dark:text-emerald-300",
  pending: "text-[#9A6F1E] dark:text-[#D6A85C]",
  unpaid: "text-[#9A6F1E] dark:text-[#D6A85C]",
  failed: "text-red-600 dark:text-red-400",
  refunded: "text-slate-500 dark:text-slate-300",
};

const fieldClass =
  "rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-[#1F2937] outline-none " +
  "focus:border-[#187A63] focus:ring-2 focus:ring-[#187A63]/30 " +
  "dark:border-[#31564C] dark:bg-[#1B3B33] dark:text-[#F9FAFB]";

const isMongoId = (s) => /^[0-9a-f]{24}$/i.test(s);


const pickName = (v) => {
  if (!v) return undefined;
  if (typeof v === "string") return isMongoId(v) ? undefined : v;
  return v.name ?? v.fullName ?? v.username ?? v.email ?? undefined;
};

const pickText = (v) => {
  if (!v) return "";
  if (typeof v === "string") return v;
  return v.status ?? v.name ?? v.type ?? v.method ?? "";
};


const normalize = (o) => ({
  id: String(o.id ?? o._id ?? ""),
  customer:
    pickName(o.customer) ??
    pickName(o.user) ??
    o.customerName ??
    o.userName ??
    pickName(o.shippingAddress) ??
    "—",
  date: (o.date ?? o.createdAt ?? "").toString().slice(0, 10),
  total: Number(o.total ?? o.totalPrice ?? o.totalAmount ?? o.amount ?? 0),
  status: String(o.status ?? o.orderStatus ?? "pending").toLowerCase(),
  payment: String(
    pickText(o.paymentStatus) || pickText(o.payment) || "pending"
  ).toLowerCase(),
  method: String(
    pickText(o.paymentMethod) || pickText(o.method) || ""
  ).toLowerCase(),
});

const unique = (list, key) => [...new Set(list.map((o) => o[key]).filter(Boolean))];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [payment, setPayment] = useState("all");
  const [method, setMethod] = useState("all");

  useEffect(() => {
    api
      .get("/orders/admin")
      .then((res) => {
        console.log(res.data); 
        const list = Array.isArray(res.data)
          ? res.data
          : res.data.orders ?? res.data.data ?? [];
        setOrders(list.map(normalize));
      })
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = orders.filter(
    (o) =>
      (status === "all" || o.status === status) &&
      (payment === "all" || o.payment === payment) &&
      (method === "all" || o.method === method) &&
      `${o.id} ${o.customer}`.toLowerCase().includes(search.toLowerCase())
  );

  const messageRow = (text, className = "text-[#64748B] dark:text-[#CBD5E1]") => (
    <tr>
      <td colSpan={6} className={`px-4 py-10 text-center ${className}`}>
        {text}
      </td>
    </tr>
  );

  return (
    <div className="space-y-5 p-4 text-[#1F2937] md:p-8 dark:text-[#F9FAFB]">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-widest text-[#D6A85C]">
            ADMIN · MANAGEMENT
          </p>
          <h1 className="text-3xl font-bold">Orders</h1>
        </div>
        <div className="rounded-2xl border border-[#E5E7EB] bg-[#E9F5EF] px-4 py-3 dark:border-[#31564C] dark:bg-[#1B3B33]">
          <span className="text-2xl font-bold text-[#187A63] dark:text-emerald-300">
            {orders.length}
          </span>{" "}
          <span className="text-sm text-[#64748B] dark:text-[#CBD5E1]">total orders</span>
        </div>
      </div>

      
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] dark:text-[#CBD5E1]"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search ID, customer..."
          className={`${fieldClass} w-full pl-11`}
        />
      </div>

      
      <div className="flex flex-wrap gap-3">
        <select className={`${fieldClass} capitalize`} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All statuses</option>
          {unique(orders, "status").map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
        <select className={`${fieldClass} capitalize`} value={payment} onChange={(e) => setPayment(e.target.value)}>
          <option value="all">All payments</option>
          {unique(orders, "payment").map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
        <select className={`${fieldClass} capitalize`} value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="all">All methods</option>
          {unique(orders, "method").map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      
      <div className="overflow-x-auto rounded-2xl border border-[#E5E7EB] bg-white shadow-sm dark:border-[#31564C] dark:bg-[#1B3B33]">
        <table className="w-full min-w-[640px] text-left">
          <thead className="bg-[#E9F5EF] text-xs uppercase tracking-wider text-[#187A63] dark:bg-[#123C35] dark:text-emerald-200">
            <tr>
              {["Order", "Customer", "Date", "Total", "Status", "Payment"].map((h) => (
                <th key={h} className="px-4 py-3 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? messageRow("Loading orders...")
              : error
              ? messageRow(`Failed to load orders: ${error}`, "text-red-500")
              : filtered.length === 0
              ? messageRow("No orders found")
              : filtered.map((o) => (
                  <tr
                    key={o.id}
                    className="border-t border-[#E5E7EB] transition hover:bg-[#E9F5EF]/60 dark:border-[#31564C] dark:hover:bg-[#123C35]/70"
                  >
                    <td className="px-4 py-3 font-semibold" title={o.id}>
                      #{o.id.slice(-6)}
                    </td>
                    <td className="px-4 py-3">{o.customer}</td>
                    <td className="px-4 py-3 text-[#64748B] dark:text-[#CBD5E1]">{o.date}</td>
                    <td className="px-4 py-3 font-medium">${o.total.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${
                          statusStyles[o.status] ?? "bg-slate-500/15"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className={`px-4 py-3 font-medium capitalize ${paymentStyles[o.payment] ?? ""}`}>
                      {o.payment}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}