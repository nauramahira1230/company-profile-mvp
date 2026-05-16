"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";
import dynamic from "next/dynamic";

// 1. Ambil inisialisasi Supabase client
import { supabase } from "../../../lib/supabase"; 

// 2. Interface data disamakan dengan kebutuhan properti penuh di komponen Map.tsx
interface Kost {
  id: number;
  name: string;
  price: number;
  location: string;
  image: string;
  latitude: number;  // ✨ FIX: Menggunakan nama variabel penuh sesuai komponen Map
  longitude: number; // ✨ FIX: Menggunakan nama variabel penuh sesuai komponen Map
}

// 3. Load Map secara dinamis (Client Only) agar terhindar dari bentrokan SSR Next.js
const MapWithNoSSR = dynamic(() => import("../../../components/Map"), {
  ssr: false,
  loading: () => <div className="h-full bg-slate-100 animate-pulse rounded-[2.5rem]" />
});

export default function CariPage() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true); 
  const [masterDataKost, setMasterDataKost] = useState<Kost[]>([]);
  const router = useRouter();

  useEffect(() => {
    const checkUserSession = async () => {
      // Sesi aman dijaga oleh sistem proxy middleware utama
      const { data: { session } } = await supabase.auth.getSession();
      
      // ✨ FIX TOTAL DATA KOST: Koordinat murni dirubah menjadi latitude & longitude penuh
      setMasterDataKost([
        {
          id: 1,
          name: "Kost Terverifikasi Singaraja",
          price: 850000,
          location: "Buleleng, Bali",
          image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=500&q=80",
          latitude: -8.1134,
          longitude: 115.0885
        },
        {
          id: 2,
          name: "Kost Eksklusif Jimbaran",
          price: 1500000,
          location: "Badung, Bali",
          image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=500&q=80",
          latitude: -8.7892,
          longitude: 115.1622
        },
        {
          id: 3,
          name: "Kost Putra Denpasar Timur",
          price: 700000,
          location: "Denpasar, Bali",
          image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=500&q=80",
          latitude: -8.6525,
          longitude: 115.2426
        }
      ]);

      if (typeof window !== "undefined") {
        const saved = JSON.parse(localStorage.getItem("kostin_favs") || "[]");
        setFavorites(saved);
      }
      setLoading(false);
    };

    checkUserSession();
  }, [router]);

  const toggleFav = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    const newFavs = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem("kostin_favs", JSON.stringify(newFavs));
  };

  const filtered = masterDataKost.filter(k => 
    k.name.toLowerCase().includes(search.toLowerCase()) || 
    k.location.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-blue-950 uppercase tracking-widest mt-4 animate-pulse">
          MENGOTENTIKASI PORTAL KOSTIN...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-blue-950 uppercase italic tracking-tighter">
            KOSTIN <span className="text-blue-600">EXPLORE</span>
          </h1>
          <Link href="/kostin/favorit" className="bg-white px-6 py-3 rounded-2xl shadow-sm font-black text-[10px] text-red-500 uppercase no-underline">
            ❤️ Favorit ({favorites.length})
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* SISI KIRI: INPUT PENCARIAN & LIST KARTU KOST */}
          <div className="lg:w-1/2 space-y-6">
            <input 
              className="w-full p-5 rounded-3xl border border-blue-50 shadow-sm outline-none font-bold text-slate-700 placeholder-slate-400 focus:border-blue-500 transition-colors"
              placeholder="Cari lokasi atau nama kost..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            
            <div className="grid gap-4 max-h-[700px] overflow-y-auto pr-4">
              {filtered.length > 0 ? filtered.map(kost => (
                <Link href={`/kostin/cari/${kost.id}`} key={kost.id} className="bg-white p-4 rounded-[2rem] border border-blue-50 flex gap-5 hover:shadow-xl transition-all relative group no-underline text-inherit">
                  <button 
                    onClick={(e) => toggleFav(e, kost.id)}
                    className={`absolute top-6 right-6 z-10 p-2 rounded-full shadow-md transition-transform active:scale-90 ${favorites.includes(kost.id) ? 'bg-red-500 text-white' : 'bg-white text-slate-300'}`}
                  >
                    ❤️
                  </button>
                  <img src={kost.image} alt={kost.name} className="w-32 h-32 rounded-2xl object-cover" />
                  <div className="flex flex-col justify-center">
                    <h3 className="font-black text-blue-950 uppercase italic text-lg m-0">{kost.name}</h3>
                    <p className="text-blue-600 font-black m-0 mt-1">Rp {kost.price.toLocaleString('id-ID')} / bulan</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase m-0">📍 {kost.location}</p>
                  </div>
                </Link>
              )) : (
                <div className="text-center p-10 bg-white rounded-3xl border border-dashed border-slate-300">
                  <p className="text-slate-400 italic font-medium m-0">Kost yang kamu cari tidak ditemukan...</p>
                </div>
              )}
            </div>
          </div>

          {/* SISI KANAN: MAP INTERAKTIF BALI */}
          <div className="lg:w-1/2 h-[700px] rounded-[3rem] overflow-hidden sticky top-10 border-4 border-white shadow-2xl">
            {/* Mengirim array kostData yang filternya sudah aman & seragam koordinatnya */}
            <MapWithNoSSR kostData={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
}