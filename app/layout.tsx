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
      {/* overflow-x-hidden wajib biar gak bisa digeser ke samping kalau ada elemen kegedean */}
      <body className="bg-white text-blue-950 antialiased font-sans overflow-x-hidden">
        
        <Navbar />

        {/* Tambahin padding horizontal default (px-4) biar konten gak nempel ke pinggir HP */}
        <main className="pt-16 min-h-screen w-full">
          {children}
        </main>

        <footer className="bg-blue-950 py-12 md:py-16 border-t border-blue-900/30">
          {/* mx-auto dan px-6 bikin konten tetep di tengah dan punya jarak aman di pinggir */}
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
            
            <div className="text-center md:text-left">
              <p className="text-blue-300 text-[10px] font-bold uppercase tracking-[0.2em]">
                © 2026 KOSTIN Project.
              </p>
              <p className="text-blue-500/60 text-[9px] font-black uppercase tracking-widest mt-1">
                Built by Sefina, Mesa, Naura
              </p>
            </div>

            <div className="flex gap-6 text-[10px] text-blue-400 font-black uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}