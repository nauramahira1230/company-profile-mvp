"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { masterDataKost, Kost } from "../../utils/kostData";

export default function HalamanFavorit() {
  const [favItems, setFavItems] = useState<Kost[]>([]);
  const [isClient, setIsClient] = useState(false);

  const loadFavorites = () => {
    const savedIds = JSON.parse(localStorage.getItem("kostin_favs") || "[]");
    const filtered = masterDataKost.filter((item) => savedIds.includes(item.id));
    setFavItems(filtered);
  };

  useEffect(() => {
    setIsClient(true);
    loadFavorites();
  }, []);

  const handleRemoveFav = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    const savedIds = JSON.parse(localStorage.getItem("kostin_favs") || "[]");
    const updatedIds = savedIds.filter((favId: number) => favId !== id);
    localStorage.setItem("kostin_favs", JSON.stringify(updatedIds));
    loadFavorites();
  };

  if (!isClient) {
    return <div className="text-center py-20 font-black text-xs text-slate-400 uppercase tracking-widest">Memuat Kost Favorit...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50/60 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <Link href="/kostin/cari" className="inline-flex items-center gap-1 text-xs font-black uppercase text-blue-600 hover:text-blue-700 tracking-wider no-underline mb-4 transition-colors">
            ← Kembali Cari Kost
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-blue-950 uppercase italic tracking-tighter">
            Kost <span className="text-red-500">Favorit</span> Saya
          </h1>
          <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest">{favItems.length} Properti Tersimpan</p>
        </div>

        {favItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favItems.map((kost) => (
              <div key={kost.id} className="group relative bg-white rounded-[2.5rem] border border-blue-50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img src={kost.image} alt={kost.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                  <span
                    className={`absolute top-4 left-4 text-[9px] font-extrabold rounded-md uppercase tracking-wider px-2.5 py-1 shadow-sm ${kost.tipe === "Putra" ? "bg-blue-100 text-blue-700" : kost.tipe === "Putri" ? "bg-pink-100 text-pink-700" : "bg-purple-100 text-purple-700"}`}
                  >
                    {kost.tipe}
                  </span>

                  <button
                    onClick={(e) => handleRemoveFav(e, kost.id)}
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white text-red-500 p-2.5 rounded-full shadow-md transition-all active:scale-90 flex items-center justify-center text-sm"
                    title="Hapus dari Favorit"
                  >
                    ❤️
                  </button>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-black text-blue-950 uppercase italic text-xl line-clamp-1 mb-1 group-hover:text-blue-600 transition-colors">{kost.name}</h3>

                  <p className="text-blue-600 font-black text-lg mb-2">
                    Rp {kost.price.toLocaleString("id-ID")} <span className="text-xs font-medium text-slate-400">/ bulan</span>
                  </p>

                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wide flex items-center gap-1 mb-4">📍 {kost.location}</p>

                  {/* Penggunaan kost.facilities sesuai dengan berkas aslimu */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {kost.facilities?.map((f, idx) => (
                      <span key={idx} className="bg-slate-50 text-slate-500 border border-slate-100 text-[8px] font-bold px-2 py-0.5 rounded-md">
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <Link
                      href={`/kostin/cari/${kost.id}`}
                      className="block text-center bg-blue-50 hover:bg-blue-600 text-blue-950 hover:text-white font-black text-[10px] uppercase tracking-widest py-3 rounded-xl transition-all no-underline"
                    >
                      Lihat Detail Kost →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-6 bg-white rounded-[2.5rem] border border-dashed border-slate-200 shadow-sm max-w-xl mx-auto mt-6">
            <div className="text-6xl mb-4 animate-bounce">📍</div>
            <h3 className="text-2xl font-black text-blue-950 uppercase italic tracking-tight mb-2">Belum Ada Favorit</h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto mb-8 font-medium">Kamu belum menyimpan kosan nih. Yuk cari hunian terbaikmu di Bali sekarang!</p>
            <Link
              href="/kostin/cari"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all active:scale-95 no-underline shadow-lg shadow-blue-500/20"
            >
              Mulai Eksplorasi Kost
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
