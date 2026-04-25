import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";

interface Stat {
  label: string;
  value: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  slug: string;
}

interface CompanyData {
  stats: Stat[];
  team: TeamMember[];
}

async function getCompanyData(): Promise<CompanyData> {
  const filePath = path.join(process.cwd(), "data", "company.json");
  const file = await fs.readFile(filePath, "utf8");
  return JSON.parse(file);
}

export default async function HomePage() {
  const { stats, team } = await getCompanyData();

  return (
    <div className="overflow-hidden">
      {}
      <section className="relative h-[60vh] md:h-[70vh] text-white">
        <div className="absolute inset-0">
          <img src="/images/hero.jpg" alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">
              Hunian Nyaman <br />
              <span className="text-slate-300">Tanpa Ribet</span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-6 leading-relaxed">KOSTIN membantu mahasiswa menemukan kost terbaik dengan cepat, aman, dan terpercaya di seluruh Indonesia.</p>
            <div className="flex gap-4">
              <Link href="/services" className="bg-slate-800 border border-slate-700 px-6 py-3 rounded-full font-semibold hover:bg-slate-700 transition shadow-lg">
                Lihat Layanan
              </Link>
              <Link href="/about" className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
                Tentang Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-slate-900">{s.value}</p>
                <p className="text-slate-500 text-sm uppercase tracking-widest font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Tim Kami</h2>
            <p className="text-slate-500 mt-2">Orang-orang hebat di balik KOSTIN</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition text-center">
                <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-3xl mb-4">👤</div>
                <h3 className="text-lg font-bold text-slate-900">{t.name}</h3>
                <p className="text-slate-500 text-sm mb-4 font-medium">{t.role}</p>
                <Link href={`/team/${t.slug}`} className="text-slate-900 text-sm font-bold hover:underline">
                  Profil Lengkap →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-20 bg-slate-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Tertarik Bergabung?</h2>
        <p className="mb-8 text-slate-300">Hubungi kami dan mulai perjalanan hunian modern bersama KOSTIN.</p>
        <Link href="/contact" className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-200 transition shadow-xl">
          Hubungi Kami
        </Link>
      </section>
    </div>
  );
}
