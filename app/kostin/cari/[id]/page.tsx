"use client";

import { useParams } from "next/navigation";
import { masterDataKost } from "../../../utils/kostData";
import Link from "next/link";

export default function DetailKost() {
  const params = useParams();
  const kost = masterDataKost.find((item) => item.id === Number(params.id));

  if (!kost) return <div className="p-20 text-center font-black">Kost Tidak Ditemukan</div>;

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/kostin/cari" className="text-[10px] font-black uppercase text-blue-600 mb-8 block">← Back to Search</Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <img src={kost.image} className="w-full h-[500px] object-cover rounded-[3rem] shadow-2xl" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              {kost.gallery.map((img, i) => (
                <img key={i} src={img} className="h-32 w-full object-cover rounded-[1.5rem]" />
              ))}
            </div>
          </div>

          <div className="py-4">
            <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase italic">{kost.tipe}</span>
            <h1 className="text-5xl font-black text-blue-950 uppercase italic italic tracking-tighter mt-4 leading-tight">{kost.name}</h1>
            <p className="text-3xl font-black text-blue-600 mt-4">Rp{kost.price.toLocaleString()} <span className="text-sm text-slate-300">/ Bulan</span></p>
            
            <div className="mt-10 space-y-8">
              <div>
                <h4 className="font-black text-blue-950 uppercase text-xs mb-4 tracking-widest">Fasilitas Utama</h4>
                <div className="flex flex-wrap gap-3">
                  {kost.facilities.map(f => (
                    <span key={f} className="bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 border border-slate-100">✓ {f}</span>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-blue-950 rounded-[2.5rem] text-white">
                <p className="font-black uppercase text-[10px] text-blue-300 mb-2">Tertarik dengan kost ini?</p>
                <h3 className="text-xl font-bold mb-6">Hubungi pemilik langsung sekarang</h3>
                <a 
                  href={`https://wa.me/${kost.phone}?text=Halo, saya tertarik dengan ${kost.name}`}
                  target="_blank"
                  className="block w-full bg-green-500 text-center py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl shadow-green-900/20"
                >
                  WhatsApp Pemilik ✆
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}