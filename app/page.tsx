// app/page.tsx
import Link from "next/link";

export default async function LandingPage() {
  // --- TASK 4: SKELETON LOADING ---
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-white px-6">
      {/* Badge Atas */}
      <div className="mb-6 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 flex items-center gap-2">
        <span className="text-blue-500">🏠</span>
        <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">Solusi Hunian Mahasiswa Bali</span>
      </div>

      {/* Hero Title */}
      <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none text-center mb-6">
        Cari Kost di Bali <br />
        <span className="text-blue-600 italic">Jadi Lebih Mudah.</span>
      </h1>

      {/* Subtitle - Disesuaikan dengan tujuan KOSTIN */}
      <p className="text-slate-500 text-center max-w-2xl mb-10 leading-relaxed text-lg">
        KOSTIN hadir membantu mahasiswa rantau menemukan hunian terbaik yang
        <span className="font-semibold text-slate-700"> nyaman, aman, dan terverifikasi </span>
        di sekitar area kampus impianmu di Bali.
      </p>

      {/* Tombol Navigasi */}
      <div className="flex flex-col md:flex-row gap-4">
        <Link href="/portal" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 no-underline flex items-center gap-2">
          Cari Kost Sekarang <span className="text-xl">→</span>
        </Link>

        <Link href="/services" className="bg-white text-slate-900 border border-slate-200 px-10 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm no-underline">
          Lihat Layanan
        </Link>
      </div>
    </div>
  );
}
