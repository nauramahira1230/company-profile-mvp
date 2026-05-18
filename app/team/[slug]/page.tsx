// app/team/[slug]/page.tsx
import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";

export default async function TeamDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "data", "company.json");
  const data = JSON.parse(await fs.readFile(filePath, "utf8"));
  const person = data.team.find((m: any) => m.slug === slug);

  if (!person) return <div className="py-20 text-center font-bold">Anggota Tim Tidak Ditemukan.</div>;

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden">
      
      {/* --- KIRI: FOTO BESAR & NAMA LANGSUNG DI ATAS FOTO (TANPA CARD) --- */}
      <div className="w-full md:w-1/2 h-[60vh] md:h-screen relative bg-blue-950">
        {/* Foto Background */}
        <div className="absolute inset-0">
          {person.image ? (
            <img 
              src={person.image} 
              alt={person.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-blue-900 bg-blue-100 text-9xl font-black">
              {person.name.charAt(0)}
            </div>
          )}
          {/* Overlay gelap di bagian bawah foto agar teks nama tetap kontras dan mudah dibaca */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-950/20 to-transparent"></div>
        </div>

        {/* Teks Nama Langsung Menempel di Atas Foto (Tanpa background kotak) */}
        <div className="absolute bottom-12 left-10 md:bottom-20 md:left-20 right-10 z-10">
          <h1 className="text-4xl md:text-7xl font-black text-white leading-none tracking-tighter uppercase drop-shadow-md">
            {person.name}
          </h1>
          <div className="w-20 h-2 bg-blue-500 mt-4 rounded-full"></div>
        </div>
      </div>

      {/* --- KANAN: INFORMASI (BIO & ROLE) --- */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-24 py-20 bg-white">
        
        {/* Tombol Kembali */}
        <div className="mb-12">
          <Link href="/kostin" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-black text-xs uppercase tracking-[0.2em] transition-all no-underline group">
            <span className="bg-slate-100 group-hover:bg-blue-600 group-hover:text-white w-8 h-8 flex items-center justify-center rounded-full transition-all">←</span> 
            Back to Dashboard
          </Link>
        </div>

        {/* Badge Role */}
        <div className="mb-6">
          <span className="bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-lg border border-blue-100">
            {person.role}
          </span>
        </div>

        {/* Judul Bio */}
        <h2 className="text-blue-950 text-xl font-black uppercase tracking-tighter mb-6">Cerita Singkat</h2>
        
        {/* Bio Konten */}
        <div className="relative">
          <span className="absolute -top-10 -left-6 text-[120px] text-blue-600/5 font-serif pointer-events-none">“</span>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium italic relative z-10">
            {person.bio}
          </p>
        </div>

        {/* Footer Informasi Tambahan */}
        <div className="mt-16 pt-10 border-t border-slate-100 grid grid-cols-2 gap-8">
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                <p className="text-sm font-bold text-blue-950">Active Contributor</p>
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Division</p>
                <p className="text-sm font-bold text-blue-950">Web Dev UI/UX</p>
            </div>
        </div>
      </div>

    </div>
  );
}