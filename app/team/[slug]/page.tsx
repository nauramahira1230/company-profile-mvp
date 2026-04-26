import { promises as fs } from "fs";
import path from "path";

export default async function TeamDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "data", "company.json");
  const data = JSON.parse(await fs.readFile(filePath, "utf8"));
  const person = data.team.find((m: any) => m.slug === slug);

  if (!person) return <div className="py-20 text-center">Data tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-slate-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center py-20 px-6">
      <div className="relative w-full max-w-md">
        {}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-900/5 rounded-full blur-3xl"></div>

        <div className="relative bg-white border border-blue-100 rounded-[2.5rem] shadow-2xl shadow-blue-950/10 overflow-hidden">
          {/* Header Card Navy Solid */}
          <div className="h-32 bg-blue-950 flex items-center justify-center">
            <div className="w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>

          {/* Avatar Profile */}
          <div className="relative -mt-14 flex justify-center">
            <div className="w-28 h-28 bg-white p-2 rounded-3xl shadow-xl">
              <div className="w-full h-full bg-blue-950 rounded-2xl flex items-center justify-center text-4xl text-white shadow-inner">👤</div>
            </div>
          </div>

          {/* Konten Profil */}
          <div className="p-10 pt-6 text-center">
            <h1 className="text-3xl font-black text-blue-950 tracking-tight">{person.name}</h1>

            <div className="inline-block mt-3 px-5 py-1.5 bg-blue-50 rounded-full border border-blue-100">
              <p className="text-blue-700 font-extrabold uppercase tracking-widest text-[10px]">{person.role}</p>
            </div>

            {/* Bio Section */}
            <div className="mt-10 mb-6 relative">
              <span className="absolute -top-6 left-0 text-7xl text-blue-100 font-serif opacity-40">“</span>
              <p className="relative z-10 text-slate-600 leading-relaxed italic text-lg px-2">{person.bio}</p>
              <span className="absolute -bottom-12 right-0 text-7xl text-blue-100 font-serif opacity-40">”</span>
            </div>

            {/* Navigasi Footer */}
            <div className="mt-16 pt-8 border-t border-slate-50">
              <a href="/" className="text-xs font-black text-slate-400 hover:text-blue-950 tracking-widest transition-all flex items-center justify-center gap-2 group">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> KEMBALI KE BERANDA
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
