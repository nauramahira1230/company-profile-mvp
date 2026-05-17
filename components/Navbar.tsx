"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; avatar: string; email: string } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUserEmail = localStorage.getItem("kostin_user_email") || "";
      const savedUserName = localStorage.getItem("kostin_user_name") || "";

      // Kondisi Belum Login: Jika data email kosong atau sedang berada di halaman auth awal
      if (!savedUserEmail || pathname === "/" || pathname === "/login" || pathname === "/register") {
        setCurrentUser(null);
      } else {
        // Kondisi Sudah Login: Mengatur data profil yang akan tampil di navbar
        const isUserAdmin = savedUserEmail.toLowerCase() === "admin@gmail.com";
        setCurrentUser({
          name: isUserAdmin ? "Admin Kostin" : savedUserName,
          email: savedUserEmail,
          avatar: isUserAdmin ? "💼" : "👩‍🎓",
        });
      }
    }
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  // Penentuan arah link profile saat diklik di navbar
  const isAdmin = currentUser?.email.toLowerCase() === "admin@gmail.com";
  const profileHref = isAdmin ? "/admin" : "/kostin";

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-50">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-black text-blue-950 tracking-tighter no-underline">
          🏠 KOSTIN
        </Link>

        {/* Menu Tengah Desktop */}
        <ul className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] list-none p-0 m-0">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className={`transition-all duration-300 no-underline ${isActive ? "text-blue-950 scale-110 font-black" : "text-slate-400 hover:text-blue-700"}`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Pojok Kanan Desktop (Kondisional) */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            /* === KONDISI SUDAH LOGIN === */
            <Link href={profileHref} className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 transition no-underline shadow-sm">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs shadow-inner">
                {currentUser.avatar}
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-900 leading-none m-0">{currentUser.name}</p>
                <p className="text-[8px] font-bold text-blue-600 tracking-wider uppercase mt-0.5 m-0">
                  {isAdmin ? "Akses Admin" : "Akun Mahasiswa"}
                </p>
              </div>
            </Link>
          ) : (
            /* === KONDISI BELUM LOGIN === */
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login" className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-blue-950 hover:text-blue-600 transition no-underline">
                Masuk
              </Link>
              <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition shadow-md no-underline">
                Daftar
              </Link>
            </div>
          )}

          {/* Hamburger Button (Mobile) */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex flex-col gap-1.5 bg-transparent border-0 cursor-pointer">
            <span className={`w-5 h-0.5 bg-blue-950 transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-0.5 bg-blue-950 transition-all ${isOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-blue-950 transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Dropdown Menu Mobile */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-b border-blue-50 ${isOpen ? "max-h-80" : "max-h-0"}`}>
        <ul className="px-6 py-6 flex flex-col gap-5 text-[10px] font-black uppercase tracking-[0.2em] list-none p-0 m-0">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} onClick={() => setIsOpen(false)} className={`no-underline ${pathname === link.href ? "text-blue-950 font-black" : "text-slate-400"}`}>
                {link.name}
              </Link>
            </li>
          ))}
          <li className="pt-2 sm:hidden border-t border-slate-100">
            {currentUser ? (
              <Link href={profileHref} onClick={() => setIsOpen(false)} className="flex items-center gap-3 no-underline">
                <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-sm shadow-inner">{currentUser.avatar}</div>
                <div>
                  <p className="text-[10px] font-black text-slate-900 m-0">{currentUser.name}</p>
                  <p className="text-[8px] font-bold text-blue-600 uppercase m-0">{isAdmin ? "Menu Admin" : "Panel Menu"}</p>
                </div>
              </Link>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/login" onClick={() => setIsOpen(false)} className="text-blue-950 font-black no-underline">Masuk</Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="text-blue-600 font-black no-underline">Daftar</Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}