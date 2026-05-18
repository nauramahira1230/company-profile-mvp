"use client";

import { useParams } from "next/navigation";
import { masterDataKost } from "../../../utils/kostData";
import Link from "next/link";

export default function DetailKost() {
  const params = useParams();
  const kost = masterDataKost.find((item) => item.id === Number(params.id));

  if (!kost) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center p-20">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-black text-blue-950 uppercase tracking-tight mb-2">Kost Tidak Ditemukan</h3>
        <p className="text-slate-400 text-sm mb-6 font-medium">ID properti yang kamu cari tidak terdaftar dalam database.</p>
        <Link href="/kostin/cari" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider no-underline transition-all shadow-md">
          Kembali Cari Kost
        </Link>
      </div>
    );
  }

  // LOGIKA PENGELOMPOKAN FASILITAS SECARA OTOMATIS
  const fasilitasKamar = ["Kasur", "Lemari", "AC", "TV", "WiFi", "Kamar mandi dalam", "Water heater", "Balkon"];
  const fasilitasUmum = ["Dapur", "Laundry", "Ruang santai", "Rooftop", "Mushola", "Mesin cuci"];
  const fasilitasKeamanan = ["CCTV", "Security", "Smart lock", "Akses 24 jam"];
  const fasilitasParkir = ["Parkir motor", "Parkir mobil", "Area sepeda"];

  const kamarKost = kost.facilities.filter((f) => fasilitasKamar.map((item) => item.toLowerCase()).includes(f.toLowerCase()));
  const umumKost = kost.facilities.filter((f) => fasilitasUmum.map((item) => item.toLowerCase()).includes(f.toLowerCase()));
  const keamananKost = kost.facilities.filter((f) => fasilitasKeamanan.map((item) => item.toLowerCase()).includes(f.toLowerCase()));
  const parkirKost = kost.facilities.filter((f) => fasilitasParkir.map((item) => item.toLowerCase()).includes(f.toLowerCase()));

  // Encode nama kosan agar link WhatsApp aman dari crash 404
  const waMessage = encodeURIComponent(`Halo, saya tertarik dengan "${kost.name}" yang ada di KOSTIN Explore.`);

  return (
    <div className="min-h-screen bg-slate-50/40 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Tombol Kembali */}
        <Link href="/kostin/cari" className="inline-flex items-center gap-1 text-xs font-black uppercase text-blue-600 hover:text-blue-700 tracking-wider no-underline mb-8 transition-colors">
          ← Kembali Cari Kost
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* SISI KIRI: GALLERY FOTO */}
          <div className="space-y-4 sticky top-6">
            <div className="relative h-[450px] w-full overflow-hidden bg-slate-100 rounded-[2.5rem] shadow-lg">
              <img src={kost.image} alt={kost.name} className="w-full h-full object-cover" />
              <span
                className={`absolute top-6 left-6 text-[10px] font-extrabold rounded-md uppercase tracking-widest px-3 py-1.5 shadow-md ${kost.tipe === "Putra" ? "bg-blue-100 text-blue-700" : kost.tipe === "Putri" ? "bg-pink-100 text-pink-700" : "bg-purple-100 text-purple-700"}`}
              >
                {kost.tipe}
              </span>
            </div>

            {/* Grid Foto Tambahan */}
            {kost.gallery && kost.gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {kost.gallery.map((img, i) => (
                  <div key={i} className="h-32 w-full overflow-hidden rounded-[1.5rem] bg-slate-100 shadow-sm border border-white">
                    <img src={img} alt={`Galeri ${kost.name}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SISI KANAN: SPESIFIKASI & PRICING */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-blue-950 uppercase italic tracking-tighter leading-tight m-0">{kost.name}</h1>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-wide mt-2">📍 {kost.location}</p>
              <p className="text-3xl font-black text-blue-600 m-0 mt-4 bg-white border border-blue-50 px-6 py-4 rounded-2xl inline-block shadow-sm">
                Rp {kost.price.toLocaleString("id-ID")} <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">/ Bulan</span>
              </p>
            </div>

            {/* SEKSI DESKRIPSI KAMAR */}
            <div className="bg-white p-6 rounded-3xl border border-blue-50 shadow-sm">
              <h4 className="font-black text-blue-950 uppercase text-xs tracking-widest mb-3">Deskripsi Hunian</h4>
              <p className="text-slate-600 text-sm leading-relaxed m-0 font-medium">{kost.description || "Tidak ada deskripsi tambahan untuk properti ini."}</p>
            </div>

            {/* SEKSI FASILITAS TERKATEGORI */}
            <div className="bg-white p-6 rounded-3xl border border-blue-50 shadow-sm space-y-5">
              <h4 className="font-black text-blue-950 uppercase text-xs tracking-widest border-b border-slate-100 pb-3 m-0">Fasilitas Tersedia</h4>

              {/* Kategori 1: Kamar */}
              {kamarKost.length > 0 && (
                <div>
                  <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">🛏️ Fasilitas Kamar</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {kamarKost.map((f) => (
                      <span key={f} className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-[11px] font-bold text-slate-600">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Kategori 2: Umum */}
              {umumKost.length > 0 && (
                <div>
                  <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">🍳 Fasilitas Umum</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {umumKost.map((f) => (
                      <span key={f} className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-[11px] font-bold text-slate-600">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Kategori 3: Keamanan */}
              {keamananKost.length > 0 && (
                <div>
                  <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">🛡️ Keamanan & Akses</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {keamananKost.map((f) => (
                      <span key={f} className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-[11px] font-bold text-slate-600">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Kategori 4: Parkir */}
              {parkirKost.length > 0 && (
                <div>
                  <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">🚗 Area Parkir</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {parkirKost.map((f) => (
                      <span key={f} className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-[11px] font-bold text-slate-600">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SEKSI TESTIMONI / REVIEWS */}
            <div className="bg-white p-6 rounded-3xl border border-blue-50 shadow-sm">
              <h4 className="font-black text-blue-950 uppercase text-xs tracking-widest mb-4 m-0">Ulasan Penyewa</h4>
              {kost.testimonials && kost.testimonials.length > 0 ? (
                <div className="space-y-4">
                  {kost.testimonials.map((t, idx) => (
                    <div key={idx} className="bg-slate-50/60 p-4 rounded-2xl border border-slate-100/50">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-black text-blue-950 text-sm italic">{t.name}</span>
                        <span className="text-yellow-500 text-xs">{"⭐".repeat(t.rating)}</span>
                      </div>
                      <p className="text-slate-500 text-xs m-0 font-semibold italic">"{t.comment}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-xs italic font-medium m-0">Belum ada ulasan untuk kosan ini.</p>
              )}
            </div>

            {/* BOX ACTION HUBUNGI PEMILIK */}
            <div className="p-8 bg-blue-950 rounded-[2.5rem] text-white shadow-lg shadow-blue-950/20">
              <p className="font-black uppercase text-[10px] text-blue-400 mb-1 tracking-widest">Tertarik dengan kost ini?</p>
              <h3 className="text-xl font-bold mb-6 m-0">Hubungi pemilik langsung sekarang</h3>
              <a
                href={`https://wa.me/${kost.phone}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all no-underline shadow-xl shadow-green-500/10 active:scale-95"
              >
                WhatsApp Pemilik ✆
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
