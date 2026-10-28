import { useEffect, useState } from "react";
import api from "../services/api";





const statusConfig = [
  {
    title: "Pending",
    key: "pending",
    color: "bg-orange-50",
    text: "text-orange-400",
  },
  {
    title: "Processing",
    key: "processing",
    color: "bg-sky-100",
    text: "text-sky-400",
  },
  {
    title: "Confirmed",
    key: "confirmed",
    color: "bg-blue-100",
    text: "text-blue-400",
  },
  {
    title: "Shipped",
    key: "shipped",
    color: "bg-purple-100",
    text: "text-purple-400",
  },
  {
    title: "Delivered",
    key: "delivered",
    color: "bg-emerald-100",
    text: "text-emerald-400",
  },
  {
    title: "Cancelled",
    key: "cancelled",
    color: "bg-rose-100",
    text: "text-rose-400",
  },
];

// //////////////////////////////////////////////////////////////////






// /////////////////////////////////////////////////////////////////////////
function Dashboard() {
  



const [dashboardData, setDashboardData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [retryCount, setRetryCount] = useState(0);


useEffect(() => {
  let isMounted = true;

  const fetchDashboard = async () => {
    try {
      if (isMounted) {
        setError("");
      }

      const response = await api.get("/orders/admin/dashboard");

      if (isMounted) {
        setDashboardData(response.data.dashboard);
        setError("");
      }
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);

      if (isMounted) {
        if (error.response?.status === 401) {
          setError("Please log in to access the dashboard.");
        } else if (error.response?.status === 403) {
          setError("You don't have permission to access this dashboard.");
        } else {
          setError(
            "Failed to refresh dashboard data. Check your connection and try again."
          );
        }
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  fetchDashboard();

  const intervalId = setInterval(() => {
    fetchDashboard();
  }, 30000);

  return () => {
    isMounted = false;
    clearInterval(intervalId);
  };
}, [retryCount]);




const orderStatuses = statusConfig.map((status) => ({
  ...status,
  value: dashboardData?.orders?.[status.key] ?? "—",
}));

const stats = [
  {
    title: "Total Orders",
    value: dashboardData?.orders?.total ?? "—",
    description: "All orders received",
    color: "bg-emerald-500",
    icon: "▣",
  },
  {
    title: "Pending Orders",
    value: dashboardData?.orders?.pending ?? "—",
    description: "Awaiting action",
    color: "bg-orange-500",
    icon: "◷",
  },
  {
    title: "Revenue",
    value:
      dashboardData?.revenue?.total != null
        ? `$${dashboardData.revenue.total.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : "—",
    description: "Total gross revenue",
    color: "bg-pink-500",
    icon: "$",
  },
  {
    title: "This Month",
    value:
      dashboardData?.revenue?.thisMonth != null
        ? `$${dashboardData.revenue.thisMonth.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : "—",
    description: "Monthly revenue",
    color: "bg-cyan-500",
    icon: "🛒",
  },
  {
    title: "Top Product",
    value: dashboardData?.topProducts?.[0]?.name ?? "—",
    description:
      dashboardData?.topProducts?.[0]?.totalSold != null
        ? `${dashboardData.topProducts[0].totalSold} sold`
        : "Best-selling product",
    color: "bg-purple-500",
    icon: "◇",
  },
  {
    title: "Users",
    value: dashboardData?.totalCustomers ?? "—",
    description: "Registered customers",
    color: "bg-slate-500",
    icon: "♙",
  },
];
 
// //////////////////////////////////////////////////////////////
 
// dark mode toggle

const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("dashboard-theme") === "dark";
});

useEffect(() => {
  document.documentElement.classList.toggle("dark", darkMode);
  localStorage.setItem("dashboard-theme", darkMode ? "dark" : "light");
}, [darkMode]);


// //////////////////////////////////////////////////////////////


if (loading) {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500" />

        <p className="mt-4 text-sm text-slate-500">
          Loading dashboard...
        </p>
      </div>
    </div>
  );
}

if (error) {
  return (
    <div className="flex min-h-[300px] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-rose-100 bg-white p-6 text-center shadow-md">
        <p className="text-lg font-semibold text-slate-800">
          Something went wrong
        </p>

        <p className="mt-2 text-sm text-rose-500">
          {error}
        </p>

        <button
          onClick={() => setRetryCount((count) => count + 1)}
          className="mt-5 rounded-xl bg-cyan-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}



  return (


    


    <div className="w-full min-w-0 space-y-4 dark:bg-slate-800" >


      <header className="rounded-2xl border border-white bg-white p-5 shadow-md  dark:border-slate-700 dark:bg-slate-900">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
          Admin Overview
        </p>

        <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          Real-time commerce health
        </h1>

        <p className="mt-1 text-xs  text-slate-400 dark:text-slate-500">
          Monitor your storefront with AI-style clarity and live API metrics.
        </p>

        <button
  onClick={() => setDarkMode((prev) => !prev)}
  className="mt-4 inline-flex items-center gap-2 rounded-xl
    border border-slate-200 bg-slate-100 px-4 py-2
    text-sm font-semibold text-slate-700 transition
    hover:bg-slate-200
    dark:border-slate-700 dark:bg-slate-800
    dark:text-white dark:hover:bg-slate-700"
>
  <span>{darkMode ? "☀️" : "🌙"}</span>
  <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
</button>
      </header>




            {/* Statistics Cards */}

 
<section className="@container w-full min-w-0">
  <div className="grid grid-cols-1 gap-3 @md:grid-cols-2 @2xl:grid-cols-3">
    {stats.map((stat) => (
      <article
        key={stat.title}
       
className="flex min-w-0 items-start justify-between rounded-2xl border border-white bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="min-w-0">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {stat.title}
          </p>

          <h2 className="mt-1 break-words text-xl font-bold  text-slate-800 dark:text-slate-100">
            {stat.value}
          </h2>

          <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
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
  <section className="min-w-0 rounded-2xl border border-white bg-white p-5 shadow-md @3xl:col-span-2 dark:bg-slate-900 dark:border-slate-700">
  <div className="mb-4 flex items-center justify-between">
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
        Order Status
      </p>

      <h2 className="mt-1 text-base font-semibold text-slate-800 dark:text-slate-100">
        Live fulfillment breakdown
      </h2>
    </div>

    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] text-emerald-500 dark:bg-emerald-500 dark:text-white">
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
<section className="rounded-2xl border border-white bg-white p-5 shadow-md dark:border-slate-700 dark:bg-slate-900">
  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400 dark:text-slate-100">
    Best Sellers
  </p>

  <h2 className="mt-1 text-base font-semibold text-slate-800 dark:text-slate-100">
    Top products
  </h2>

  <div className="mt-5 space-y-5">
    {(dashboardData?.topProducts ?? []).map((product, index, products) => {
      const maxSold = Math.max(
        ...products.map((item) => Number(item.totalSold) || 0),
        1
      );

      const colors = [
        "bg-cyan-400",
        "bg-purple-400",
        "bg-emerald-400",
      ];

      return (
        <div
          key={product._id}
          className="rounded-xl p-2 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
              {product.name}
            </p>

            <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
              {product.totalSold} sold
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                colors[index % colors.length]
              }`}
              style={{
                width: `${
                  ((Number(product.totalSold) || 0) / maxSold) * 100
                }%`,
              }}
            />
          </div>
        </div>
      );
    })}

    {dashboardData && (dashboardData.topProducts ?? []).length === 0 && (
      <p className="text-sm text-slate-400">
        No products available yet.
      </p>
    )}
  </div>
</section>


  <div className="w-full min-w-0 space-y-4">
      {/* Statistics Cards */}

      {/* Order Status + Best Sellers */}

      {/* Recent Orders */}
    </div>

    
    {/* Recent Orders */}


<section className="w-full min-w-0 rounded-2xl border border-white bg-white p-5 shadow-md dark:border-slate-700 dark:bg-slate-900">
  <div className="mb-5">
    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
      Recent Orders
    </p>
   <h2 className="mt-1 text-base font-semibold text-slate-800 dark:text-slate-100">
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
      
 {(dashboardData?.recentOrders ?? []).map((order) => {
    const firstItem = order.items?.[0];
    const status = order.status ?? "pending";

    return (
      <tr
        key={order._id}
        className="border-b border-slate-50 text-xs hover:bg-slate-50"
      >
        <td className="whitespace-nowrap px-3 py-4 font-semibold text-slate-700">
          {order._id}
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-slate-600">
          {order.shippingAddress?.fullName ??
            order.user?.username ??
            "Customer"}
        </td>

        <td className="px-3 py-4 text-slate-600">
          {firstItem?.name ?? "—"}
          {order.items?.length > 1
            ? ` +${order.items.length - 1} more`
            : ""}
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-slate-700">
          {order.totalPrice != null
            ? `$${Number(order.totalPrice).toFixed(2)}`
            : "—"}
        </td>

        <td className="px-3 py-4">
          <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-600">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </td>
      </tr>
    );
  })}

      </tbody>
    </table>
  </div>
</section>


    </div>

    



  );
}

export default Dashboard;