import React from "react";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "KOSTIN | Solusi Hunian Bali",
  description: "Platform pencarian kost terverifikasi untuk mahasiswa Timur.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-white text-blue-950 antialiased font-sans">
        {}
        <Navbar />

        {}
        <main className="pt-16 min-h-screen">{children}</main>

        {}
        <footer className="bg-blue-950 py-10 border-t border-blue-900/30">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-300 text-[10px] font-bold uppercase tracking-[0.2em]">© 2026 KOSTIN Project. Built by Sefina, Mesa, Naura</p>

            <div className="flex gap-4 text-[10px] text-blue-500 font-black uppercase tracking-widest opacity-60"></div>
          </div>
        </footer>
      </body>
    </html>
  );
}
