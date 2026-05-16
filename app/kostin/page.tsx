// app/kostin/page.tsx
import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";

interface CompanyData {
  stats: { label: string; value: string }[];
  team: { id: number; name: string; role: string; slug: string }[];
}

async function getCompanyData(): Promise<CompanyData> {
  const filePath = path.join(process.cwd(), "data", "company.json");
  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    return { stats: [{ label: "Data not found", value: "0" }], team: [] };
  }
}

export default async function HomePage() {
  const { stats, team } = await getCompanyData();

  return (
    <div className="overflow-hidden bg-white">
      {/* HERO SECTION */}
      <section className="relative h-[85vh] md:h-[90vh] flex items-center text-white bg-blue-950 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[url('/hero-kostin.png')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-blue-950 via-blue-950/60 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-6 z-20 w-full">
          <div className="max-w-2xl">
            <span className="inline-block text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 bg-blue-950/50 px-3 py-1 rounded-full">
              📍 Terverifikasi di Bali
            </span>
            <h1 className="text-4xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tighter">
              Cari Kost di Bali <br /> 
              <span className="text-blue-400">Jadi Lebih Gampang</span>
            </h1>
            <p className="text-base md:text-xl text-blue-100 max-w-xl mb-10 leading-relaxed font-medium">
              KOSTIN hadir khusus buat temen-temen mahasiswa Timur yang lagi nyari hunian 
              <span className="text-white font-bold"> nyaman, aman, dan terverifikasi </span> 
              di area Bali.
            </p>
            <div className="flex flex-wrap gap-4">
                {/* ✨ FIX JALUR: Menghubungkan tombol utama langsung masuk ke peta /kostin/cari */}
                <Link href="/kostin/cari" className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all active:scale-95 text-center no-underline shadow-lg shadow-blue-500/20">
                  Mulai Cari Kost Sekarang →
                </Link>
            
                {/* Logout akan menendang user kembali ke halaman paling depan (/) */}
                <Link href="/" className="inline-block border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all no-underline flex items-center">
                  ← Logout ke Portal
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-white border-b border-blue-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((s, i) => (
            <div key={i} className="p-6 transition-transform hover:scale-105 duration-300">
              <p className="text-5xl md:text-6xl font-black text-blue-950 tracking-tighter mb-3">{s.value}</p>
              <p className="text-blue-600 text-[10px] uppercase font-black tracking-[0.2em]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center md:text-left border-l-4 border-blue-600 pl-6">
            <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest">Our Creators</span>
            <h2 className="text-4xl font-black text-blue-950 tracking-tight mt-2">Tim Pengembang</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team && team.length > 0 ? team.map((t) => (
              <div key={t.id} className="group bg-white p-8 md:p-10 rounded-[2.5rem] border border-blue-50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex flex-col h-full">
                  <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">👤</div>
                  <h3 className="text-2xl font-black text-blue-950 mb-1">{t.name}</h3>
                  <p className="text-blue-600 font-bold mb-10 text-[10px] uppercase tracking-widest">{t.role}</p>
                  <div className="mt-auto pt-6 border-t border-slate-100">
                    <Link href={`/team/${t.slug}`} className="text-blue-950 font-black text-[10px] uppercase tracking-widest hover:text-blue-600 transition-colors flex items-center gap-2 no-underline">
                      Profil Lengkap →
                    </Link>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center p-10 bg-white rounded-3xl border border-dashed border-slate-300">
                <p className="text-slate-400 italic font-medium">Data tim belum tersedia dalam database (company.json).</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}