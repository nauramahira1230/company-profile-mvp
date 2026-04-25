// File: app/layout.tsx
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "KOSTIN | Modern Living Solution",
  description: "Company Profile KOSTIN - Platform Hunian Digital Indonesia",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-white text-slate-900 antialiased font-sans">
        {/* NAVBAR - Warna Navy (slate-900) */}
        <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
          <nav className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
            {/* LOGO */}
            <Link href="/" className="text-2xl font-bold text-slate-900 tracking-tighter">
              🏠 KOSTIN
            </Link>

            {/* NAV MENU */}
            <ul className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
              <li>
                <Link href="/" className="hover:text-slate-900 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-slate-900 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-slate-900 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-900 transition">
                  Contact
                </Link>
              </li>
            </ul>

            {/* BUTTON - Warna Navy (bg-slate-900) */}
            <Link href="/contact" className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition active:scale-95">
              Get Started
            </Link>
          </nav>
        </header>

        {/* CONTENT */}
        <main className="pt-16 min-h-screen">{children}</main>

        {/* FOOTER - Tema Navy */}
        <footer className="bg-slate-900 text-white pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
              <div className="col-span-1 md:col-span-2">
                <h2 className="text-2xl font-bold text-slate-300 mb-4">🏠 KOSTIN</h2>
                <p className="text-slate-400 max-w-sm leading-relaxed">Platform pencarian hunian modern yang mengutamakan transparansi, keamanan, dan kenyamanan.</p>
              </div>

              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>
                    <Link href="/about">Tentang Kami</Link>
                  </li>
                  <li>
                    <Link href="/services">Layanan</Link>
                  </li>
                  <li>
                    <Link href="/contact">Kontak</Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Support</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>
                    <a href="#" className="hover:text-white">
                      Pusat Bantuan
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Syarat & Ketentuan
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
              <p>© 2026 KOSTIN Technology. All rights reserved.</p>
              <div className="italic">
                <span>"Solusi hunian, bukan solusi hati"</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
