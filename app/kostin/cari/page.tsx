"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

// 1. Inisialisasi Supabase client
import { supabase } from "../../../lib/supabase";

// 2. Interface data lengkap dengan tipe dan fasilitas
interface Kost {
  id: number;
  name: string;
  price: number;
  location: string;
  image: string;
  latitude: number;
  longitude: number;
  tipe: "Putra" | "Putri" | "Campur";
  facilities: string[];
}

// 3. Load Map secara dinamis (Client Only) agar terhindar dari bentrokan SSR Next.js
const MapWithNoSSR = dynamic(() => import("../../../components/Map"), {
  ssr: false,
  loading: () => <div className="h-full bg-slate-100 animate-pulse rounded-[2.5rem]" />,
});

export default function CariPage() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [masterDataKost, setMasterDataKost] = useState<Kost[]>([]);

  // STATE UNTUK FILTER & SORTING
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [selectedTipe, setSelectedTipe] = useState<string>("Semua");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("default"); // default, murah, mahal

  const router = useRouter();

  useEffect(() => {
    const checkUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // DATA 1 SAMPAI 10 COCOK UNTUK FILTER & PETA BALI
      setMasterDataKost([
        {
          id: 1,
          name: "Kost Terverifikasi Singaraja",
          price: 850000,
          location: "Buleleng, Bali",
          image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=500&q=80",
          latitude: -8.1123,
          longitude: 115.0883,
          tipe: "Campur",
          facilities: ["WiFi", "Kamar Mandi Dalam"],
        },
        {
          id: 2,
          name: "Kost Eksklusif Jimbaran",
          price: 1500000,
          location: "Badung, Bali",
          image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=500&q=80",
          latitude: -8.7905,
          longitude: 115.1678,
          tipe: "Campur",
          facilities: ["AC", "WiFi", "Kamar Mandi Dalam"],
        },
        {
          id: 3,
          name: "Kost Putra Denpasar Timur",
          price: 700000,
          location: "Denpasar, Bali",
          image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=500&q=80",
          latitude: -8.6531,
          longitude: 115.2447,
          tipe: "Putra",
          facilities: ["WiFi", "Kasur"],
        },
        {
          id: 4,
          name: "Kost Putri Renon Estetik",
          price: 1200000,
          location: "Denpasar, Bali",
          image: "https://images.unsplash.com/photo-1617806118233-18e1db207fa6?auto=format&fit=crop&w=500&q=80",
          latitude: -8.6741,
          longitude: 115.2341,
          tipe: "Putri",
          facilities: ["AC", "WiFi", "Kamar Mandi Dalam"],
        },
        {
          id: 5,
          name: "Kost Campur Unugasan Sunset",
          price: 1800000,
          location: "Kuta Selatan, Bali",
          image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=500&q=80",
          latitude: -8.8312,
          longitude: 115.1624,
          tipe: "Campur",
          facilities: ["AC", "WiFi"],
        },
        {
          id: 6,
          name: "Kost Singaraja Asri Indah",
          price: 600000,
          location: "Buleleng, Bali",
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80",
          latitude: -8.1215,
          longitude: 115.0934,
          tipe: "Putra",
          facilities: ["Kasur"],
        },
        {
          id: 7,
          name: "Kost Executive Denpasar Barat",
          price: 2000000,
          location: "Denpasar, Bali",
          image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80",
          latitude: -8.6612,
          longitude: 115.1954,
          tipe: "Campur",
          facilities: ["AC", "WiFi", "Kamar Mandi Dalam"],
        },
        {
          id: 8,
          name: "Kost Putri Bukit Jimbaran",
          price: 1100000,
          location: "Kuta Selatan, Bali",
          image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=500&q=80",
          latitude: -8.7994,
          longitude: 115.1741,
          tipe: "Putri",
          facilities: ["AC", "WiFi", "Kamar Mandi Dalam"],
        },
        {
          id: 9,
          name: "Kost Backpacker Kuta",
          price: 950000,
          location: "Badung, Bali",
          image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=500&q=80",
          latitude: -8.7225,
          longitude: 115.1781,
          tipe: "Campur",
          facilities: ["WiFi", "Kasur"],
        },
        {
          id: 10,
          name: "Kost Campur Sanur Permai",
          price: 1350000,
          location: "Denpasar, Bali",
          image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=500&q=80",
          latitude: -8.6821,
          longitude: 115.2634,
          tipe: "Campur",
          facilities: ["AC", "WiFi", "Kamar Mandi Dalam"],
        },
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
    const newFavs = favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem("kostin_favs", JSON.stringify(newFavs));
  };

  const handleFacilityChange = (facility: string) => {
    setSelectedFacilities((prev) => (prev.includes(facility) ? prev.filter((f) => f !== facility) : [...prev, facility]));
  };

  // LOGIKA MULTI-FILTER
  let filtered = masterDataKost.filter((k) => {
    const matchSearch = k.name.toLowerCase().includes(search.toLowerCase()) || k.location.toLowerCase().includes(search.toLowerCase());
    const matchTipe = selectedTipe === "Semua" || k.tipe === selectedTipe;
    const matchFacilities = selectedFacilities.every((f) => k.facilities.includes(f));

    return matchSearch && matchTipe && matchFacilities;
  });

  // LOGIKA SORTING HARGA (Mengkloning array biar aman dari bug read-only)
  filtered = [...filtered];
  if (sortBy === "murah") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "mahal") {
    filtered.sort((a, b) => b.price - a.price);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-blue-950 uppercase tracking-widest mt-4 animate-pulse">MENGOTENTIKASI PORTAL KOSTIN...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER ATAS */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-blue-950 uppercase italic tracking-tighter">
            KOSTIN <span className="text-blue-600">EXPLORE</span>
          </h1>
          <Link href="/kostin/favorit" className="bg-white px-6 py-3 rounded-2xl shadow-sm font-black text-[10px] text-red-500 uppercase no-underline">
            ❤️ Favorit ({favorites.length})
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* SISI KIRI: PENCARIAN & DAFTAR KOST */}
          <div className="lg:w-1/2 space-y-6">
            {/* CONTAINER RELATIVE AGAR DROPDOWN FILTER MELAYANG SEMPURNA */}
            <div className="relative">
              <div className="flex gap-4">
                <input
                  className="flex-1 p-5 rounded-3xl border border-blue-50 shadow-sm outline-none font-bold text-slate-700 placeholder-slate-400 focus:border-blue-500 transition-colors"
                  placeholder="Cari lokasi atau nama kost..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  onClick={() => setShowFilterPanel(!showFilterPanel)}
                  className={`p-5 rounded-3xl border shadow-sm transition-all text-xl flex items-center justify-center ${showFilterPanel ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700 border-blue-50 hover:bg-slate-50"}`}
                >
                  🎛️
                </button>
              </div>

              {/* PANEL FILTER ABSOLUTE (MELAYANG DI ATAS LAYOUT) */}
              {showFilterPanel && (
                <div className="absolute left-0 right-0 top-[76px] bg-white p-6 rounded-[2rem] border border-blue-100 shadow-xl space-y-4 z-30">
                  <div>
                    <h4 className="font-black text-xs text-blue-950 uppercase tracking-wider mb-2">Tipe Kost:</h4>
                    <div className="flex gap-2">
                      {["Semua", "Putra", "Putri", "Campur"].map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTipe(t)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedTipe === t ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-black text-xs text-blue-950 uppercase tracking-wider mb-2">Fasilitas Kamar:</h4>
                    <div className="flex flex-wrap gap-3">
                      {["AC", "WiFi", "Kamar Mandi Dalam", "Kasur"].map((f) => (
                        <label
                          key={f}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer select-none transition-all ${selectedFacilities.includes(f) ? "border-blue-600 bg-blue-50/50 text-blue-600" : "border-slate-200 text-slate-600"}`}
                        >
                          <input type="checkbox" checked={selectedFacilities.includes(f)} onChange={() => handleFacilityChange(f)} className="hidden" />
                          {selectedFacilities.includes(f) ? "✅" : "⬜"} {f}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* BARIS SORT BY HARGA (POSISI TETAP TENANG KARENA FILTER MELAYANG) */}
            <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-blue-50 shadow-sm">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                Ditemukan: <span className="text-blue-600">{filtered.length} Kost</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Sort by:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-blue-950 outline-none cursor-pointer focus:border-blue-500">
                  <option value="default">Rekomendasi</option>
                  <option value="murah">Harga: Terendah ➔ Tertinggi</option>
                  <option value="mahal">Harga: Tertinggi ➔ Terendah</option>
                </select>
              </div>
            </div>

            {/* SCROLLABLE LIST KARTU KOST */}
            <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-4">
              {filtered.length > 0 ? (
                filtered.map((kost) => (
                  <Link href={`/kostin/cari/${kost.id}`} key={kost.id} className="bg-white p-4 rounded-[2rem] border border-blue-50 flex gap-5 hover:shadow-xl transition-all relative group no-underline text-inherit">
                    <button
                      onClick={(e) => toggleFav(e, kost.id)}
                      className={`absolute top-6 right-6 z-10 p-2 rounded-full shadow-md transition-transform active:scale-90 ${favorites.includes(kost.id) ? "bg-red-500 text-white" : "bg-white text-slate-300"}`}
                    >
                      ❤️
                    </button>
                    <img src={kost.image} alt={kost.name} className="w-32 h-32 rounded-2xl object-cover" />
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-black text-blue-950 uppercase italic text-lg m-0">{kost.name}</h3>
                        <span
                          className={`px-2 py-0.5 text-[9px] font-extrabold rounded-md uppercase tracking-wider ${kost.tipe === "Putra" ? "bg-blue-100 text-blue-700" : kost.tipe === "Putri" ? "bg-pink-100 text-pink-700" : "bg-purple-100 text-purple-700"}`}
                        >
                          {kost.tipe}
                        </span>
                      </div>
                      <p className="text-blue-600 font-black m-0 mt-1">Rp {kost.price.toLocaleString("id-ID")} / bulan</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase m-0">📍 {kost.location}</p>

                      {/* Badge fasilitas mini */}
                      <div className="flex gap-1 mt-2">
                        {kost.facilities.map((f) => (
                          <span key={f} className="bg-slate-50 text-slate-500 border border-slate-100 text-[8px] font-bold px-1.5 py-0.5 rounded-md">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center p-10 bg-white rounded-3xl border border-dashed border-slate-300">
                  <p className="text-slate-400 italic font-medium m-0">Kost tidak ditemukan...</p>
                </div>
              )}
            </div>
          </div>

          {/* SISI KANAN: MAP INTERAKTIF BALI */}
          <div className="lg:w-1/2 h-[700px] rounded-[3rem] overflow-hidden sticky top-10 border-4 border-white shadow-2xl">
            <MapWithNoSSR kostData={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
}
