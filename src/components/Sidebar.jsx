
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  ClipboardList,
  Warehouse,
  Wallet,
  ChartNoAxesCombined,
  MessageSquare,
  Settings,
  PanelLeft,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Dealers", href: "/dealers", icon: Users },
  { name: "Products", href: "/products", icon: Package },
  { name: "Sales", href: "/sales", icon: ShoppingCart },
  { name: "Orders", href: "/orders", icon: ClipboardList },
  { name: "Inventory", href: "/inventory", icon: Warehouse },
  { name: "Payments", href: "/payments", icon: Wallet },
  { name: "Reports", href: "/reports", icon: ChartNoAxesCombined },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
        className="fixed left-4 top-4 z-40 rounded-lg border bg-white p-2 text-gray-700 md:hidden"
      >
        <Menu size={20} />
      </button>

      {mobileOpen && (
        <button
          aria-label="Close navigation overlay"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-gray-200 bg-white px-4 py-5 transition-transform duration-200 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between px-1">
          <Link href="/" className="text-2xl font-black tracking-tight text-gray-900">
            dealer.
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            className="text-gray-500 md:hidden"
          >
            <X size={20} />
          </button>

          <PanelLeft size={17} className="hidden text-gray-500 md:block" />
        </div>

        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          Workspace
        </p>

        <nav className="flex flex-1 flex-col gap-1">
          {navigation.map(({ name, href, icon: Icon }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={name}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-[#292929] font-medium text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon size={17} strokeWidth={1.8} />
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 rounded-lg bg-gray-50 p-3">
          <p className="text-sm font-semibold text-gray-800">
            Dealer Portal
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Management workspace
          </p>
        </div>
      </aside>
    </>
  );
}
