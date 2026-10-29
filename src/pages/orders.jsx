import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import api from "../services/api";

// Light: خلفية #FFFDF7 | كروت #FFFFFF | نص #1F2937 / #64748B | حدود #E5E7EB
// Dark:  خلفية #102A25 | كروت #1B3B33 | نص #F9FAFB / #CBD5E1 | حدود #31564C
const statusStyles = {
  delivered: "bg-[#187A63]/15 text-[#187A63] dark:text-emerald-300",
  processing: "bg-[#D6A85C]/20 text-[#9A6F1E] dark:text-[#D6A85C]",
  pending: "bg-[#D6A85C]/20 text-[#9A6F1E] dark:text-[#D6A85C]",
  shipped: "bg-sky-500/15 text-sky-600 dark:text-sky-300",
  cancelled: "bg-red-500/15 text-red-600 dark:text-red-400",
};

const paymentStyles = {
  paid: "text-[#187A63] dark:text-emerald-300",
  unpaid: "text-[#9A6F1E] dark:text-[#D6A85C]",
};

const fieldClass =
  "rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-[#1F2937] outline-none " +
  "focus:border-[#187A63] focus:ring-2 focus:ring-[#187A63]/30 " +
  "dark:border-[#31564C] dark:bg-[#1B3B33] dark:text-[#F9FAFB]";


const normalize = (o) => ({
  id: String(o.id ?? o._id ?? ""),
  customer: o.customer ?? o.user?.name ?? o.userName ?? "—",
  date: (o.date ?? o.createdAt ?? "").toString().slice(0, 10),
  total: Number(o.total ?? o.totalPrice ?? o.amount ?? 0),
  status: String(o.status ?? "pending").toLowerCase(),
  payment: String(o.payment ?? o.paymentStatus ?? "unpaid").toLowerCase(),
  method: String(o.method ?? o.paymentMethod ?? "").toLowerCase(),
});

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
        console.log(res.data); // شوف شكل الداتا في الـ Console
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
    <div className="min-h-screen space-y-5 bg-[#FFFDF7] p-4 text-[#1F2937] md:p-8 dark:bg-[#102A25] dark:text-[#F9FAFB]">
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

      {/* Search */}
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

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select className={fieldClass} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select className={fieldClass} value={payment} onChange={(e) => setPayment(e.target.value)}>
          <option value="all">All payments</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
        <select className={fieldClass} value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="all">All methods</option>
          <option value="cash">Cash</option>
          <option value="card">Card</option>
        </select>
      </div>

      {/* Table */}
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
                    <td className="px-4 py-3 font-semibold">#{o.id}</td>
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