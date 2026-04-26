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
    console.error("Gagal membaca company.json:", error);
    return { stats: [], team: [] };
  }
}

export default async function HomePage() {
  const { stats, team } = await getCompanyData();

  return (
    <div className="overflow-hidden">
      {}
      <section className="relative h-[70vh] flex items-center text-white bg-blue-950">
        {}
        <div className="absolute inset-0 opacity-40 bg-[url('/images/hero-bali.jpg')] bg-cover bg-center"></div>

        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5 tracking-tighter">
              Cari Kost di Bali <br /> Jadi Lebih Gampang
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-xl mb-10 leading-relaxed">KOSTIN hadir khusus buat temen-temen mahasiswa Timur yang lagi nyari hunian nyaman, aman, dan terverifikasi di area Bali.</p>
            <Link href="/services" className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-2xl shadow-blue-500/20 active:scale-95">
              Cek Layanan Kami →
            </Link>
          </div>
        </div>
      </section>

      {}
      <section className="py-20 bg-white border-b border-blue-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((s, i) => (
            <div key={i} className="p-6">
              <p className="text-5xl font-extrabold text-blue-950 tracking-tighter mb-3">{s.value}</p>
              <p className="text-blue-600 text-sm uppercase font-bold tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {}
      <section className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 max-w-xl">
            <h2 className="text-4xl font-extrabold text-blue-950 tracking-tight">Tim Pengembang</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {team.map((t) => (
              <div
                key={t.id}
                className="bg-white p-10 rounded-[2rem] border border-blue-50 shadow-sm group transition-all duration-300 transform 
                           hover:shadow-2xl hover:border-blue-100 active:scale-[0.98]
                           hover:bg-gradient-to-br hover:from-white hover:to-blue-50 active:bg-gradient-to-br active:from-white active:to-blue-100"
              >
                {}
                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:bg-blue-950 group-hover:text-white transition-colors duration-300">👤</div>

                  <h3 className="text-2xl font-bold text-blue-950 group-hover:text-blue-900 transition-colors">{t.name}</h3>
                  <p className="text-blue-600 font-semibold mb-8 text-sm uppercase tracking-wide">{t.role}</p>

                  {}
                  <div className="mt-auto pt-6 border-t border-blue-50 group-hover:border-blue-100">
                    <Link href={`/team/${t.slug}`} className="text-blue-700 font-bold hover:text-blue-500 hover:underline transition-colors flex items-center gap-2">
                      Profil Lengkap <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
