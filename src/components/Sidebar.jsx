
"use client";

import { useState } from "react";
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
  ChevronDown,
  Plus,
  UserRound,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Dealers",
    href: "/dashboard/dealers",
    icon: Users,
  },
  {
    name: "Products",
    icon: Package,
    children: [
      {
        name: "Product List",
        href: "/dashboard/products",
      },
      {
        name: "Add Product",
        href: "/dashboard/products/add",
        icon: Plus,
      },
    ],
  },
  {
    name: "Sales",
    href: "/dashboard/sales",
    icon: ShoppingCart,
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
    icon: ClipboardList,
  },
  {
    name: "Inventory",
    href: "/dashboard/inventory",
    icon: Warehouse,
  },
  {
    name: "Payments",
    href: "/dashboard/payments",
    icon: Wallet,
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: ChartNoAxesCombined,
  },
  {
    name: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const isProductRoute = pathname.startsWith("/dashboard/products");

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
        className="fixed left-4 top-4 z-40 rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm md:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white px-4 py-5 transition-transform duration-200 ease-in-out md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="mb-8 flex items-center justify-between px-1">
          <Link
            href="/dashboard/dashboard"
            onClick={closeMobileSidebar}
            className="text-2xl font-black tracking-tight text-gray-900"
          >
            dealer.
          </Link>

          <button
            type="button"
            onClick={closeMobileSidebar}
            aria-label="Close sidebar"
            className="rounded-md p-1 text-gray-500 hover:bg-gray-100 md:hidden"
          >
            <X size={20} />
          </button>

          <PanelLeft
            size={17}
            className="hidden text-gray-500 md:block"
          />
        </div>

        {/* Navigation label */}
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
          Workspace
        </p>

        {/* Navigation items */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;

            /* Products with submenu */
            if (item.children) {
              const productIsActive = item.children.some(
                (child) =>
                  child.href === pathname ||
                  pathname.startsWith(`${child.href}/`)
              );

              const expanded = productsOpen || productIsActive;

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setProductsOpen((previous) => !previous)
                    }
                    aria-expanded={expanded}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                      productIsActive
                        ? "bg-[#292929] font-medium text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Icon size={17} strokeWidth={1.8} />

                    <span className="flex-1 text-left">
                      {item.name}
                    </span>

                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-200 ${
                        expanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Expandable submenu */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-200 ease-in-out ${
                      expanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-3 mt-1 space-y-1 border-l border-gray-200 pl-3">
                        {item.children.map((child) => {
                          const ChildIcon = child.icon;

                          const childIsActive =
                            pathname === child.href;

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={closeMobileSidebar}
                              className={`flex items-center gap-2 rounded-md px-2.5 py-2.5 text-xs transition-colors ${
                                childIsActive
                                  ? "bg-gray-100 font-semibold text-gray-900"
                                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                              }`}
                            >
                              {ChildIcon && (
                                <ChildIcon size={14} />
                              )}

                              <span>{child.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            /* Normal navigation items */
            const active =
              item.href === "/dashboard/dashboard"
                ? pathname === item.href ||
                  pathname === "/dashboard"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileSidebar}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-[#292929] font-medium text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon size={17} strokeWidth={1.8} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom account section */}
        <div className="mt-5 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-700">
              <UserRound size={18} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-800">
                Admin
              </p>
              <p className="truncate text-xs text-gray-500">
                Management Portal
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
