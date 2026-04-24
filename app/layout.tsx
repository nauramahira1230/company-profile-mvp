// File: app/layout.tsx
import Link from 'next/link';
import './globals.css'; // Pastikan Tailwind sudah aktif di file ini

export const metadata = {
  title: "KOSTIN | Modern Living Solution",
  description: "Company Profile KOSTIN - Platform Hunian Digital Indonesia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-white text-slate-900 antialiased font-sans">
        
        {/* NAVBAR */}
        <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
          <nav className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
            
            {/* LOGO */}
            <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tighter">
              🏠 KOSTIN
            </Link>

            {/* NAV MENU */}
            <ul className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
              <li><Link href="/" className="hover:text-blue-600 transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 transition">About</Link></li>
              <li><Link href="/services" className="hover:text-blue-600 transition">Services</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition">Contact</Link></li>
            </ul>

            {/* BUTTON */}
            <Link 
              href="/contact" 
              className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition active:scale-95"
            >
              Get Started
            </Link>
          </nav>
        </header>

        {/* CONTENT (Halaman page.tsx kamu bakal muncul di sini) */}
        <main className="pt-16 min-h-screen">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-slate-900 text-white pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
              
              {/* Kolom 1: Brand */}
              <div className="col-span-1 md:col-span-2">
                <h2 className="text-2xl font-bold text-blue-400 mb-4">🏠 KOSTIN</h2>
                <p className="text-slate-400 max-w-sm leading-relaxed">
                  Platform pencarian hunian modern yang mengutamakan transparansi, keamanan, dan kenyamanan bagi mahasiswa dan pekerja di seluruh Indonesia.
                </p>
              </div>

              {/* Kolom 2: Links */}
              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li><Link href="/about">Tentang Kami</Link></li>
                  <li><Link href="/services">Layanan</Link></li>
                  <li><Link href="/contact">Kontak</Link></li>
                </ul>
              </div>

              {/* Kolom 3: Support */}
              <div>
                <h4 className="font-bold mb-4">Support</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li><a href="#" className="hover:text-white">Pusat Bantuan</a></li>
                  <li><a href="#" className="hover:text-white">Syarat & Ketentuan</a></li>
                  <li><a href="#" className="hover:text-white">Kebijakan Privasi</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
              <p>© 2026 KOSTIN Technology. All rights reserved.</p>
              <div className="flex gap-6 italic">
                <span>"Solusi hunian, bukan solusi hati"</span>
              </div>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}