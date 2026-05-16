"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HalamanFavorit() {
  const [favItems, setFavItems] = useState<any[]>([]);

  // Data master ditaruh di sini lagi atau lebih bagus ditaruh di file terpisah (utils/data.ts)
  const masterDataKost = [
    { id: 1, name: "Kost Putra Bali Mandiri", location: "Jimbaran", price: 1500000, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400" },
    // ... tambahkan data yang sama
  ];

  useEffect(() => {
    const savedIds = JSON.parse(localStorage.getItem("kostin_favs") || "[]");
    const filtered = masterDataKost.filter(item => savedIds.includes(item.id));
    setFavItems(filtered);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/kostin/cari" className="text-xs font-black uppercase text-blue-600 mb-4 block">← Kembali Cari Kost</Link>
        <h1 className="text-4xl font-black text-blue-950 uppercase italic tracking-tighter mb-10">Kost <span className="text-red-500">Favorit</span> Saya</h1>

        <div className="grid gap-6">
          {favItems.length > 0 ? favItems.map(kost => (
            <Link href={`/kostin/cari/${kost.id}`} key={kost.id} className="bg-white p-4 rounded-3xl flex gap-6 border border-blue-50 shadow-sm">
                <img src={kost.image} className="w-24 h-24 rounded-2xl object-cover" />
                <div className="flex flex-col justify-center">
                    <h3 className="font-black text-blue-950 uppercase italic text-lg">{kost.name}</h3>
                    <p className="text-blue-600 font-black">Rp{kost.price.toLocaleString()}</p>
                </div>
            </Link>
          )) : (
            <p className="text-slate-400 font-bold italic">Belum ada kost favorit...</p>
          )}
        </div>
      </div>
    </div>
  );
}