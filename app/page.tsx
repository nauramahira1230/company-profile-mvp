// app/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

export default function MainLandingPage() {
  // Data statistik real-time KOSTIN
  const [stats] = useState({
    totalKost: 124,
    tersedia: 86,
    terverifikasi: 124,
    daerah: 5
  });

  // Data Keunggulan "Mengapa Harus KOSTIN"
  const features = [
    {
      emoji: "🛡️",
      title: "100% Terverifikasi",
      desc: "Semua lokasi, fasilitas, dan harga kost sudah dicek langsung oleh tim lapangan kami untuk menghindari penipuan."
    },
    {
      emoji: "⚡",
      title: "Pencarian Cepat",
      desc: "Cari hunian impian di Bali berdasarkan area kampus terdekat hanya dalam hitungan detik tanpa ribet."
    },
    {
      emoji: "💸",
      title: "Harga Transparan",
      desc: "Tidak ada biaya tersembunyi. Harga yang tertera di aplikasi adalah harga asli dari pemilik kost."
    }
  ];

  // Data Testimoni Pengguna
  const testimonials = [
    {
      name: "Bani Irawan",
      role: "Mahasiswa Rantau",
      avatar: "👨‍🎓",
      comment: "Awalnya bingung banget mau kuliah di Bali tapi gak punya kenalan. Untung ada KOSTIN, langsung dapet kamar yang deket banget sama kampus!"
    },
    {
      name: "Naura Mahira",
      role: "Mahasiswi Kedokteran",
      avatar: "👩‍🎓",
      comment: "Fitur verifikasinya beneran ngebantu. Foto di aplikasi sama kondisi aslinya pas didatengin sama persis, gak zonk. Recommended!"
    },
    {
      name: "Putu Arya",
      role: "Pemilik Kost Jimbaran",
      avatar: "👨‍",
      comment: "Semenjak pasang iklan kost di KOSTIN, kamar kosong saya langsung penuh semua dalam waktu kurang dari dua minggu. Mantap!"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <main className="max-w-7xl mx-auto w-full px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center flex-grow">
        
        {/* SISI KIRI: Teks Utama & Tombol Aksi */}
        <div className="space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold tracking-widest uppercase mx-auto md:mx-0">
            <span>✨</span> Solusi Hunian Mahasiswa Bali
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-[1.1]">
            Cari Kost di Bali <br />
            <span className="text-blue-600 italic">Mudah & Cepat.</span>
          </h1>
          
          <p className="text-slate-500 max-w-xl mx-auto md:mx-0 leading-relaxed text-sm sm:text-base">
            KOSTIN hadir membantu mahasiswa rantau menemukan hunian terbaik yang 
            <span className="font-bold text-slate-800"> nyaman, aman, dan terverifikasi </span> 
            di sekitar area kampus impianmu di Bali.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
            <Link href="/login" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-100 hover:-translate-y-0.5 transition-all active:scale-95 no-underline flex items-center justify-center gap-2">
              Masuk untuk mulai →
            </Link>
            <Link href="/register" className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 hover:border-slate-300 transition-all no-underline text-center shadow-sm">
              Daftar Akun Baru
            </Link>
          </div>
        </div>

        {/* SISI KANAN: Ilustrasi Menyatu Tanpa Bingkai Kotak */}
        <div className="relative flex justify-center items-center w-full">
          {/* Efek Sorotan Gradasi Lembut di Background */}
          <div className="absolute w-72 h-72 sm:w-[450px]/10 sm:h-[450px] bg-blue-400/10 blur-3xl rounded-full -z-10 animate-pulse"></div>
          
          {/* Gambar langsung dipanggil tanpa div kontainer putih berkotak */}
          <img 
            src="/images/hero-kostin.png" 
            alt="Ilustrasi KOSTIN Bali" 
            className="w-full max-w-xl h-auto object-contain select-none pointer-events-none drop-shadow-sm"
          />
        </div>
      </main>

      {/* ==================== 2. MENGAPA HARUS KOSTIN ==================== */}
      <section className="bg-slate-50 border-t border-b border-slate-200/60 py-16 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Mengapa Harus KOSTIN?</h2>
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mt-1">Keunggulan utama layanan portal hunian kami</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all group">
                <div className="text-4xl mb-4 bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-100 shadow-inner group-hover:scale-110 transition-transform">
                  {feat.emoji}
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 3. TESTIMONI PENGGUNA ==================== */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Suara Pengguna Kami</h2>
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mt-1">Apa kata mereka yang sudah merasakan kemudahan KOSTIN</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testi, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-3xl border border-slate-200/60 shadow-md shadow-slate-100 flex flex-col justify-between">
                <p className="text-slate-600 text-sm italic leading-relaxed mb-6">
                  "{testi.comment}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                  <div className="w-10 h-10 bg-blue-50 border border-blue-100 text-xl rounded-full flex items-center justify-center shadow-inner">
                    {testi.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{testi.name}</h4>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 4. STATISTIK SECTION ==================== */}
      <section className="bg-slate-50 border-t border-slate-200 w-full px-6 py-12 rounded-t-[3.5rem] shadow-inner">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Data Real-Time KOSTIN</h2>
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mt-1">Perkembangan hunian mahasiswa aktif bulan ini</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex items-center gap-4 shadow-sm">
              <div className="bg-blue-100 p-3 rounded-xl text-xl">📋</div>
              <div>
                <div className="text-2xl font-black text-slate-900 leading-none">{stats.totalKost}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Total Hunian</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex items-center gap-4 shadow-sm">
              <div className="bg-amber-100 p-3 rounded-xl text-xl">⏳</div>
              <div>
                <div className="text-2xl font-black text-slate-900 leading-none">{stats.tersedia}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Kamar Kosong</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex items-center gap-4 shadow-sm">
              <div className="bg-green-100 p-3 rounded-xl text-xl">🛡️</div>
              <div>
                <div className="text-2xl font-black text-slate-900 leading-none">{stats.terverifikasi}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Terverifikasi</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex items-center gap-4 shadow-sm">
              <div className="bg-purple-100 p-3 rounded-xl text-xl">📍</div>
              <div>
                <div className="text-2xl font-black text-slate-900 leading-none">{stats.daerah}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Zona Kampus</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}