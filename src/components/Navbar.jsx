'use client'
import Link from "next/link";
import { Boxes, ArrowRight, Menu } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "About Us", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20">
            <Boxes size={25} strokeWidth={2.2} />
          </div>

          <div>
            <span className="block text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              Dealer<span className="text-indigo-600">Quest</span>
            </span>
            <span className="hidden text-[10px] font-medium tracking-[0.16em] text-slate-500 sm:block">
              SMART INVENTORY MANAGEMENT
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:flex xl:gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-indigo-600 xl:text-base"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-indigo-600 sm:inline-flex"
          >
            Log In
          </Link>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-lg sm:px-5 sm:text-base"
          >
            Get Started
            <ArrowRight size={17} />
          </Link>

          {/* Mobile menu icon */}
          <button
            type="button"
            aria-label="Open navigation menu"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 lg:hidden"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              menu?.classList.toggle("hidden");
            }}
          >
            <Menu size={23} />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        className="hidden border-t border-slate-100 bg-white px-5 py-4 sm:px-8 lg:hidden"
      >
        <div className="mx-auto flex max-w-[1600px] flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
              onClick={() => {
                document.getElementById("mobile-menu")?.classList.add("hidden");
              }}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/login"
            className="rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 sm:hidden"
          >
            Log In
          </Link>
        </div>
      </div>
    </header>
  );
}
