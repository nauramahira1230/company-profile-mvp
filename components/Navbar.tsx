"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-50">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-black text-blue-950 tracking-tighter">
          🏠 KOSTIN
        </Link>

        {}
        <ul className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link href={link.href} className={`transition-all duration-300 ${isActive ? "text-blue-950 scale-110" : "text-slate-400 hover:text-blue-700"}`}>
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {}
        <Link href="/contact" className="bg-blue-950 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-900 transition shadow-lg shadow-blue-900/10 active:scale-95">
          Hubungi Kami
        </Link>
      </nav>
    </header>
  );
}
