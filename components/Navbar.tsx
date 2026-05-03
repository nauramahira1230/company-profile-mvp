"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // State untuk menu HP

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

        {/* Desktop Menu */}
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

        <div className="flex items-center gap-4">
          {/* Button Hubungi Kami - Sembunyi di HP kecil biar gak sumpek */}
          <Link href="/contact" className="hidden sm:block bg-blue-950 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-900 transition shadow-lg shadow-blue-900/10 active:scale-95">
            Hubungi Kami
          </Link>

          {/* Hamburger Button - Muncul hanya di Mobile */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-1"
          >
            <span className={`w-5 h-0.5 bg-blue-950 transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-0.5 bg-blue-950 transition-all ${isOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-blue-950 transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown - Muncul pas isOpen true */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-b border-blue-50 ${isOpen ? "max-h-64" : "max-h-0"}`}>
        <ul className="px-6 py-6 flex flex-col gap-5 text-[10px] font-black uppercase tracking-[0.2em]">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className={pathname === link.href ? "text-blue-950" : "text-slate-400"}
              >
                {link.name}
              </Link>
            </li>
          ))}
          {/* Link Hubungi Kami versi Mobile (dalam dropdown) */}
          <li className="pt-2 sm:hidden">
            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-blue-600">
              Hubungi Kami
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}