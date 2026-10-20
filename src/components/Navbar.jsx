
"use client";

import Link from "next/link";

const Navbar = () => {
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About us", href: "#about" }
  ];

  return (
    <nav className="w-full bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-medium italic tracking-tight text-gray-900"
        >
          YOUR WEBSITE
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          <div className="hidden items-center gap-5 sm:flex md:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-gray-500 transition-colors duration-200 hover:text-gray-900"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Get Started Button */}
          <Link
            href="#contact"
            className="rounded-full bg-gradient-to-r from-indigo-400 to-violet-500 px-4 py-2 text-xs font-medium text-white shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
