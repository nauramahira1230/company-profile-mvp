"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { supabase } from "../../../lib/supabase";

// Ambil data asli milikmu dari utils yang sudah diperbarui fasilitasnya
import { masterDataKost } from "../../utils/kostData";

const MapWithNoSSR = dynamic(() => import("../../../components/Map"), {
  ssr: false,
  loading: () => <div className="h-full bg-slate-100 animate-pulse rounded-[2.5rem]" />,
});

export default function CariPage() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // STATE UNTUK FILTER & SORTING
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [selectedTipe, setSelectedTipe] = useState<string>("Semua");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  const [sortBy, setSortBy] = useState<string>("default");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const router = useRouter();

  // DAFTAR FASILITAS BARU SESUAI REKUES KAMU
  const daftarFasilitas = [
    "Kasur",
    "Lemari",
    "AC",
    "TV",
    "WiFi",
    "Kamar mandi dalam",
    "Water heater",
    "Balkon",
    "Dapur",
    "Laundry",
    "Ruang santai",
    "Rooftop",
    "Mushola",
    "Mesin cuci",
    "CCTV",
    "Security",
    "Smart lock",
    "Akses 24 jam",
    "Parkir motor",
    "Parkir mobil",
    "Area sepeda",
  ];

  useEffect(() => {
    const checkUserSession = async () => {
      await supabase.auth.getSession();

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
    setSelectedFacilities((prev) => (prev.map((f) => f.toLowerCase()).includes(facility.toLowerCase()) ? prev.filter((f) => f.toLowerCase() !== facility.toLowerCase()) : [...prev, facility]));
  };

  // LOGIKA MULTI-FILTER
  let filtered = masterDataKost.filter((k) => {
    const matchSearch = k.name.toLowerCase().includes(search.toLowerCase()) || k.location.toLowerCase().includes(search.toLowerCase());
    const matchTipe = selectedTipe === "Semua" || k.tipe.toLowerCase() === selectedTipe.toLowerCase();

    const matchFacilities = selectedFacilities.every((f) => k.facilities?.map((fac) => fac.toLowerCase()).includes(f.toLowerCase()));

    return matchSearch && matchTipe && matchFacilities;
  });

  // LOGIKA SORTING HARGA
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
          <Link
            href="/kostin/favorit"
            className="bg-white px-6 py-3 rounded-2xl shadow-sm font-black text-[10px] text-red-500 uppercase no-underline hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            ❤️ Favorit ({favorites.length})
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* SISI KIRI: PENCARIAN & DAFTAR KOST */}
          <div className="lg:w-1/2 space-y-6">
            {/* CONTAINER INPUT & FILTER BUTTON */}
            <div className="relative">
              <div className="flex gap-4">
                <input
                  className="flex-1 p-5 rounded-3xl border border-blue-50 shadow-sm outline-none font-bold text-slate-700 placeholder-slate-400 focus:border-blue-500 focus:bg-white transition-all duration-300"
                  placeholder="Cari lokasi atau nama kost..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                {/* ICON FILTER DENGAN ANIMASI INTERAKTIF ACTIVE:SCALE */}
                <button
                  onClick={() => setShowFilterPanel(!showFilterPanel)}
                  className={`p-5 rounded-3xl border shadow-sm transition-all duration-200 flex items-center justify-center active:scale-90 ${
                    showFilterPanel ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20" : "bg-white text-slate-700 border-blue-50 hover:bg-slate-50"
                  }`}
                  aria-label="Filter"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-6 h-6 transition-transform duration-300 ${showFilterPanel ? "rotate-90" : ""}`}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9"
                    />
                  </svg>
                </button>
              </div>

              {/* PANEL FILTER ABSOLUTE DENGAN ANIMASI TRANSISI HALUS (FADE-IN & SLIDE-IN) */}
              {showFilterPanel && (
                <div className="absolute left-0 right-0 top-[76px] bg-white p-6 rounded-[2rem] border border-blue-100 shadow-xl space-y-5 z-30 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div>
                    <h4 className="font-black text-xs text-blue-950 uppercase tracking-wider mb-2.5">Tipe Kost:</h4>
                    <div className="flex gap-2">
                      {["Semua", "Putra", "Putri", "Campur"].map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTipe(t)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${selectedTipe.toLowerCase() === t.toLowerCase() ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-black text-xs text-blue-950 uppercase tracking-wider mb-2.5">Fasilitas:</h4>
                    <div className="flex flex-wrap gap-2.5">
                      {daftarFasilitas.map((f) => {
                        const isChecked = selectedFacilities.map((sf) => sf.toLowerCase()).includes(f.toLowerCase());
                        return (
                          <label
                            key={f}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border cursor-pointer select-none transition-all duration-200 active:scale-95 ${isChecked ? "border-blue-600 bg-blue-50/50 text-blue-600 shadow-sm" : "border-slate-100 bg-slate-50/50 text-slate-600 hover:bg-slate-50"}`}
                          >
                            <input type="checkbox" checked={isChecked} onChange={() => handleFacilityChange(f)} className="hidden" />
                            <span className="text-[10px] transition-transform duration-200">{isChecked ? "🔷" : "⬜"}</span> {f}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* BARIS INFO DAN TOMBOL SORT BY DENGAN TAMPILAN ELEGAN */}
            <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-blue-50 shadow-sm">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                Ditemukan: <span className="text-blue-600">{filtered.length} Kost</span>
              </span>

              <div className="flex items-center gap-2 relative">
                <span className="text-xs font-bold text-slate-500">Sort by:</span>

                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className={`p-4 rounded-2xl border shadow-sm transition-all duration-200 active:scale-98 flex items-center justify-between gap-3 min-w-[210px] text-xs font-bold ${
                    showSortDropdown ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20" : "bg-white text-slate-700 border-blue-50 hover:bg-slate-50"
                  }`}
                >
                  <span>
                    {sortBy === "default" && "Rekomendasi"}
                    {sortBy === "murah" && "Harga: Terendah ➔ Tertinggi"}
                    {sortBy === "mahal" && "Harga: Tertinggi ➔ Terendah"}
                  </span>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-3.5 h-3.5 transition-transform duration-200 ${showSortDropdown ? "rotate-180" : ""}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* ANIMASI DROPDOWN MENYEMBUL HALUS */}
                {showSortDropdown && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setShowSortDropdown(false)} />
                    <div className="absolute right-0 top-13 bg-white border border-blue-50 rounded-2xl shadow-xl py-2 min-w-[220px] z-40 animate-in fade-in slide-in-from-top-2 duration-150">
                      <button
                        onClick={() => {
                          setSortBy("default");
                          setShowSortDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${sortBy === "default" ? "bg-blue-50 text-blue-600 font-black" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        Rekomendasi
                      </button>
                      <button
                        onClick={() => {
                          setSortBy("murah");
                          setShowSortDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${sortBy === "murah" ? "bg-blue-50 text-blue-600 font-black" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        Harga: Terendah ➔ Tertinggi
                      </button>
                      <button
                        onClick={() => {
                          setSortBy("mahal");
                          setShowSortDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${sortBy === "mahal" ? "bg-blue-50 text-blue-600 font-black" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        Harga: Tertinggi ➔ Terendah
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* SCROLLABLE LIST KARTU KOST DENGAN MICRO-INTERACTION (HOVER LIFT & IMAGE ZOOM) */}
            <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-4 scrollbar-thin">
              {filtered.length > 0 ? (
                filtered.map((kost) => (
                  <Link
                    href={`/kostin/cari/${kost.id}`}
                    key={kost.id}
                    className="bg-white p-4 rounded-[2rem] border border-blue-50 flex gap-5 shadow-sm transition-all duration-300 relative group no-underline text-inherit hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-100/70"
                  >
                    {/* TOMBOL FAVORIT DENGAN EFEK BOUNCE POP */}
                    <button
                      onClick={(e) => toggleFav(e, kost.id)}
                      className={`absolute top-6 right-6 z-10 p-2.5 rounded-full shadow-md transition-all duration-200 active:scale-75 hover:scale-110 ${favorites.includes(kost.id) ? "bg-red-500 text-white shadow-red-500/20" : "bg-white text-slate-300 hover:text-red-400"}`}
                    >
                      ❤️
                    </button>

                    {/* CONTAINER FOTO DENGAN HOVER ZOOM EFFECT */}
                    <div className="w-32 h-32 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 relative">
                      <img src={kost.image} alt={kost.name} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                    </div>

                    <div className="flex flex-col justify-center flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-black text-blue-950 uppercase italic text-lg m-0 transition-colors group-hover:text-blue-600">{kost.name}</h3>
                        <span
                          className={`px-2 py-0.5 text-[9px] font-extrabold rounded-md uppercase tracking-wider shadow-sm ${kost.tipe === "Putra" ? "bg-blue-100 text-blue-700" : kost.tipe === "Putri" ? "bg-pink-100 text-pink-700" : "bg-purple-100 text-purple-700"}`}
                        >
                          {kost.tipe}
                        </span>
                      </div>
                      <p className="text-blue-600 font-black m-0 mt-1 text-lg">
                        Rp {kost.price.toLocaleString("id-ID")} <span className="text-[10px] text-slate-400 font-semibold uppercase">/ bulan</span>
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase m-0 flex items-center gap-0.5">📍 {kost.location}</p>

                      {/* Tag fasilitas mini */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {kost.facilities?.slice(0, 4).map((f) => (
                          <span key={f} className="bg-slate-50 text-slate-500 border border-slate-100/70 text-[8px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wide">
                            {f}
                          </span>
                        ))}
                        {kost.facilities?.length > 4 && <span className="bg-blue-50 text-blue-600 border border-blue-100/30 text-[8px] font-bold px-1.5 py-0.5 rounded-md">+{kost.facilities.length - 4} Lainnya</span>}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center p-12 bg-white rounded-3xl border border-dashed border-slate-200 animate-in fade-in duration-200">
                  <p className="text-slate-400 italic font-medium m-0">Kost tidak ditemukan...</p>
                </div>
              )}
            </div>
          </div>

          {/* SISI KANAN: MAP INTERAKTIF BALI */}
          <div className="lg:w-1/2 h-[700px] rounded-[3rem] overflow-hidden sticky top-10 border-4 border-white shadow-2xl transition-all duration-300">
            <MapWithNoSSR kostData={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
}
