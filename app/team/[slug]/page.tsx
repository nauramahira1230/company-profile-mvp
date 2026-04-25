import { promises as fs } from "fs";
import path from "path";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  slug: string;
  bio: string;
}

// Tambahkan Promise pada tipe params
export default async function TeamDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. UNWRAP PARAMS (Wajib di Next.js versi terbaru)
  const resolvedParams = await params;
  const slug = resolvedParams.slug.toLowerCase();

  // 2. DATA FETCHING DARI FILE JSON (Kriteria Nilai 20%)
  const filePath = path.join(process.cwd(), "data", "company.json");
  const fileContent = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(fileContent);

  // 3. MENCARI ANGGOTA BERDASARKAN SLUG
  const person = data.team.find((m: TeamMember) => m.slug === slug);

  // ❌ Kalau data tidak ditemukan
  if (!person) {
    return <div className="py-20 text-center text-red-500 font-semibold italic">Data anggota "{slug}" tidak ditemukan. Pastikan slug di JSON sudah benar.</div>;
  }

  // ✅ TAMPILAN DETAIL DENGAN TEMA NAVY
  return (
    <div className="max-w-2xl mx-auto py-20 px-6 text-center">
      <div className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100">
        <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-4xl mb-6 border border-slate-200">👤</div>

        <h1 className="text-3xl font-bold text-slate-900">{person.name}</h1>

        <p className="text-slate-600 font-bold mt-2 uppercase tracking-wide text-sm">{person.role}</p>

        <div className="w-16 h-1 bg-slate-900 mx-auto my-6 rounded-full opacity-20"></div>

        <p className="text-slate-600 italic leading-relaxed text-lg">"{person.bio}"</p>

        <div className="mt-10">
          <a href="/" className="text-slate-500 hover:text-slate-900 text-sm font-semibold transition">
            ← Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  );
}
