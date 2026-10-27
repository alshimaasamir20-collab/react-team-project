import { useEffect, useState } from "react";
import api from "../services/api";


const stats = [
  {
    title: "Total Orders",
    value: "366",
    description: "All orders received",
    color: "bg-emerald-500",
    icon: "▣",
  },
  {
    title: "Pending Orders",
    value: "11",
    description: "Awaiting action",
    color: "bg-orange-500",
    icon: "◷",
  },
  {
    title: "Revenue",
    value: "$385,668.73",
    description: "Total gross revenue",
    color: "bg-pink-500",
    icon: "$",
  },
  {
    title: "This Month",
    value: "$601.56",
    description: "Monthly sales target",
    color: "bg-cyan-500",
    icon: "🛒",
  },
  {
    title: "Top Product",
    value: "Modern Floor Lamp",
    description: "51 sold",
    color: "bg-purple-500",
    icon: "◇",
  },
  {
    title: "Users",
    value: "2",
    description: "Registered customers",
    color: "bg-slate-500",
    icon: "♙",
  },
];



const orderStatuses = [
  { title: "Pending", value: 11, color: "bg-orange-50", text: "text-orange-400" },
  { title: "Processing", value: 24, color: "bg-sky-100", text: "text-sky-400" },
  { title: "Confirmed", value: 25, color: "bg-blue-100", text: "text-blue-400" },
  { title: "Shipped", value: 45, color: "bg-purple-100", text: "text-purple-400" },
  { title: "Delivered", value: 108, color: "bg-emerald-100", text: "text-emerald-400" },
  { title: "Cancelled", value: 143, color: "bg-rose-100", text: "text-rose-400" },
];


const recentOrders = [
  { id: "#ORD-1001", customer: "Ahmed Ali", product: "Modern Floor Lamp", amount: "$120.00", status: "Delivered" },
  { id: "#ORD-1002", customer: "Sara Mohamed", product: "Wireless Headphones", amount: "$85.00", status: "Pending" },
  { id: "#ORD-1003", customer: "Omar Hassan", product: "Minimal Desk", amount: "$240.00", status: "Processing" },
  { id: "#ORD-1004", customer: "Mona Adel", product: "Modern Floor Lamp", amount: "$120.00", status: "Cancelled" },
];


function Dashboard() {
  

// الكود ده بيعمل إيه؟
// - useState(null): بيجهّز مكان نخزّن فيه بيانات الـAPI.
// - api.get(...): بيطلب بيانات الـDashboard من السيرفر.
// - setDashboardData(...): بيحفظ البيانات اللي رجعت.
// - useEffect(..., []): بيشغّل الطلب أول ما الـDashboard يفتح.
// ملحوظة: دي تجربة الجلب الأولية فقط؛ لسه ما فعلناش التحديث كل 30 ثانية.

const [dashboardData, setDashboardData] = useState(null);

useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const response = await api.get("/orders/admin/dashboard");
      setDashboardData(response.data.dashboard);
      console.log("Dashboard data:", response.data.dashboard);
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
    }
  };

  fetchDashboard();
}, []);


  return (


    


    <div className="w-full min-w-0 space-y-4">


      <header className="rounded-2xl border border-white bg-white p-5 shadow-md">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
          Admin Overview
        </p>

        <h1 className="text-lg font-bold text-slate-800">
          Real-time commerce health
        </h1>

        <p className="mt-1 text-xs text-slate-500">
          Monitor your storefront with AI-style clarity and live API metrics.
        </p>
      </header>




            {/* Statistics Cards */}

 
<section className="@container w-full min-w-0">
  <div className="grid grid-cols-1 gap-3 @md:grid-cols-2 @2xl:grid-cols-3">
    {stats.map((stat) => (
      <article
        key={stat.title}
       
className="flex min-w-0 items-start justify-between rounded-2xl border border-white bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"

      >
        <div className="min-w-0">
          <p className="text-xs text-slate-500">
            {stat.title}
          </p>

          <h2 className="mt-1 break-words text-xl font-bold text-slate-800">
            {stat.value}
          </h2>

          <p className="mt-1 text-[10px] text-slate-400">
            {stat.description}
          </p>
        </div>

        <div
          className={`ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg text-white shadow-sm ${stat.color}`}
        >
          {stat.icon}
        </div>
      </article>
    ))}
  </div>
</section>




{/*  */}


      <div className="@container mt-4 w-full min-w-0">
  <div className="grid grid-cols-1 gap-4 @3xl:grid-cols-3">

    {/* Order Status */}
  <section className="min-w-0 rounded-2xl border border-white bg-white p-5 shadow-md @3xl:col-span-2">
  <div className="mb-4 flex items-center justify-between">
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
        Order Status
      </p>

      <h2 className="mt-1 text-base font-semibold text-slate-800">
        Live fulfillment breakdown
      </h2>
    </div>

    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] text-emerald-500">
      Updated live API
    </span>
  </div>

  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
    {orderStatuses.map((status) => (
      <div
        key={status.title}
        className={`rounded-2xl p-4 ${status.color}`}
      >
        <p className={`text-xs font-semibold uppercase tracking-widest ${status.text}`}>
          {status.title}
        </p>

        <p className={`mt-2 text-2xl font-bold ${status.text}`}>
          {status.value}
        </p>
      </div>
    ))}
  </div>
</section>
</div>
</div>


{/* Best Sellers */}

         <section className="rounded-2xl border border-white bg-white p-5 shadow-md">
  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
    Best Sellers
  </p>

  <h2 className="mt-1 text-base font-semibold text-slate-800">
    Top products
  </h2>

  <div className="mt-5 space-y-5">
    {[
      { name: "Modern Floor Lamp", sold: 51, color: "bg-cyan-400" },
      { name: "Wireless Headphones", sold: 38, color: "bg-purple-400" },
      { name: "Minimal Desk", sold: 27, color: "bg-emerald-400" },
    ].map((product) => (
      <div key={product.name}   className="rounded-xl p-2 transition-all duration-300 hover:bg-slate-50">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-slate-700">
            {product.name}
          </p>

          <span className="text-xs text-slate-400">
            {product.sold} sold
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          
          <div
            className={`h-full transition-all duration-500 rounded-full ${product.color}`}
            style={{ width: `${(product.sold / 51) * 100}%` }}
          />
          
        </div>
      </div>
    ))}
  </div>
</section>



  <div className="w-full min-w-0 space-y-4">
      {/* Statistics Cards */}

      {/* Order Status + Best Sellers */}

      {/* Recent Orders */}
    </div>

    
    {/* Recent Orders */}


<section className="w-full min-w-0 rounded-2xl border border-white bg-white p-5 shadow-md">
  <div className="mb-5">
    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
      Recent Orders
    </p>
    <h2 className="mt-1 text-base font-semibold text-slate-800">
      Latest transactions
    </h2>
  </div>


   
  <div className="w-full overflow-x-auto">
    <table className="w-full min-w-[600px] text-left">
      <thead>
        <tr className="border-b border-slate-100 text-xs text-slate-400">
          <th className="px-3 py-3 font-medium">Order ID</th>
          <th className="px-3 py-3 font-medium">Customer</th>
          <th className="px-3 py-3 font-medium">Product</th>
          <th className="px-3 py-3 font-medium">Amount</th>
          <th className="px-3 py-3 font-medium">Status</th>
        </tr>
      </thead>

      <tbody>
        {recentOrders.map((order) => (
          <tr
            key={order.id}
            className="border-b border-slate-50 text-xs last:border-0 transition-colors duration-200 hover:bg-slate-50"
          >
            <td className="whitespace-nowrap px-3 py-4 font-semibold text-slate-700">
              {order.id}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-slate-600">
              {order.customer}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-slate-600">
              {order.product}
            </td>
            <td className="whitespace-nowrap px-3 py-4 font-medium text-slate-700">
              {order.amount}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
              <span
                className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                  order.status === "Delivered"
                    ? "bg-emerald-50 text-emerald-600"
                    : order.status === "Pending"
                    ? "bg-orange-50 text-orange-600"
                    : order.status === "Processing"
                    ? "bg-sky-50 text-sky-600"
                    : "bg-rose-50 text-rose-600"
                }`}
              >
                {order.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>


    </div>

    



  );
}

export default Dashboard;