
import Sidebar from "@/components/Sidebar";
import {
  Bell,
  Users,
  ShoppingCart,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  MoreHorizontal,
} from "lucide-react";

const stats = [
  {
    title: "Total Dealers",
    value: "248",
    change: "+12.5%",
    note: "vs. last month",
    icon: Users,
    positive: true,
  },
  {
    title: "Total Sales",
    value: "৳8,45,000",
    change: "+8.2%",
    note: "vs. last month",
    icon: TrendingUp,
    positive: true,
  },
  {
    title: "Total Orders",
    value: "1,284",
    change: "+5.4%",
    note: "vs. last month",
    icon: ShoppingCart,
    positive: true,
  },
  {
    title: "Pending Payments",
    value: "৳1,26,000",
    change: "18 invoices",
    note: "Awaiting payment",
    icon: Wallet,
    positive: false,
  },
];

const orders = [
  {
    id: "ORD-1024",
    dealer: "Rahim Enterprise",
    date: "21 Oct 2026",
    amount: "৳24,500",
    status: "Completed",
  },
  {
    id: "ORD-1023",
    dealer: "Karim Traders",
    date: "20 Oct 2026",
    amount: "৳18,200",
    status: "Pending",
  },
  {
    id: "ORD-1022",
    dealer: "Nexa Distribution",
    date: "20 Oct 2026",
    amount: "৳32,000",
    status: "Completed",
  },
  {
    id: "ORD-1021",
    dealer: "M/S City Enterprise",
    date: "19 Oct 2026",
    amount: "৳12,800",
    status: "Processing",
  },
];

const bars = [
  { day: "Mon", height: 45 },
  { day: "Tue", height: 68 },
  { day: "Wed", height: 52 },
  { day: "Thu", height: 84 },
  { day: "Fri", height: 62 },
  { day: "Sat", height: 100 },
  { day: "Sun", height: 74 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900">
      <Sidebar />

      <main className="min-w-0 md:ml-60">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-gray-200 bg-white/95 px-5 pl-16 backdrop-blur sm:px-8 sm:pl-20 md:pl-8">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              Dashboard
            </h1>
            <p className="hidden text-xs text-gray-500 sm:block">
              Overview of your dealer and sales operations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="Notifications"
              className="relative rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
            >
              <Bell size={18} />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500" />
            </button>

            <div className="flex size-9 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
              AD
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1600px] space-y-6 p-5 sm:p-8">
          <section className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Welcome back, Admin
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Here is what is happening with your business today.
              </p>
            </div>

            <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
              Last 7 days
            </button>
          </section>

          {/* Summary cards */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-xl border border-gray-200 bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {stat.title}
                    </p>
                    <div className="rounded-lg bg-gray-100 p-2">
                      <Icon size={18} className="text-gray-700" />
                    </div>
                  </div>

                  <p className="mt-4 text-2xl font-semibold tracking-tight">
                    {stat.value}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-1.5 py-1 ${
                        stat.positive
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {stat.positive ? (
                        <ArrowUpRight size={13} />
                      ) : (
                        <Wallet size={13} />
                      )}
                      {stat.change}
                    </span>
                    <span className="text-gray-500">{stat.note}</span>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Sales chart and payment overview */}
          <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5 xl:col-span-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">Sales Performance</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Weekly sales overview
                  </p>
                </div>
                <button
                  aria-label="Sales chart options"
                  className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
                >
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <div className="mt-8 grid h-48 grid-cols-7 items-end gap-3 border-b border-gray-100 pb-2">
                {bars.map((bar) => (
                  <div
                    key={bar.day}
                    className="flex h-full flex-col items-center justify-end gap-2"
                  >
                    <div
                      className="w-full max-w-12 rounded-t-md bg-gray-800 transition-colors hover:bg-gray-600"
                      style={{ height: `${bar.height}%` }}
                      title={`${bar.day} sales`}
                    />
                    <span className="text-xs text-gray-500">
                      {bar.day}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
                <span className="size-2 rounded-full bg-gray-800" />
                Sales revenue
                <span className="ml-auto font-medium text-gray-800">
                  Sample data
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold">Payment Overview</h3>
              <p className="mt-1 text-sm text-gray-500">
                Dealer payment summary
              </p>

              <div className="mt-7 rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Total Outstanding
                </p>
                <p className="mt-2 text-2xl font-semibold">
                  ৳1,26,000
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Across 18 unpaid invoices
                </p>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-600">Paid</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-[78%] rounded-full bg-gray-800" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-600">Pending</span>
                    <span className="font-medium">22%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-[22%] rounded-full bg-amber-400" />
                  </div>
                </div>
              </div>

              <a
                href="/payments"
                className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium hover:bg-gray-50"
              >
                View Payments
                <ArrowUpRight size={16} />
              </a>
            </div>
          </section>

          {/* Recent orders table */}
          <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <h3 className="font-semibold">Recent Orders</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Latest dealer orders and their status
                </p>
              </div>

              <a
                href="/orders"
                className="text-sm font-medium text-gray-700 hover:text-black"
              >
                View all orders →
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="border-y border-gray-100 bg-gray-50 text-xs text-gray-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">Order ID</th>
                    <th className="px-5 py-3 font-medium">Dealer</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Amount</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="px-5 py-4 font-medium text-gray-800">
                        {order.id}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {order.dealer}
                      </td>
                      <td className="px-5 py-4 text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-5 py-4 font-medium">
                        {order.amount}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            order.status === "Completed"
                              ? "bg-green-50 text-green-700"
                              : order.status === "Pending"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-blue-50 text-blue-700"
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
      </main>
    </div>
  );
}
