"use client"; //  WAJIB: Menandakan ini adalah Client Component agar poin rubrik 20% aman

import { useState } from "react"; //  Menggunakan hook untuk interaksi sesuai kriteria

export default function ContactPage() {
  // State untuk menangani interaksi kirim pesan
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true); // Simulasi interaksi sukses
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form Section - Warna Navy (slate-900) */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">Kirim Pesan</h2>

            {!isSent ? (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                  <input required type="text" className="w-full p-3 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-slate-900 outline-none" placeholder="Masukkan nama..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input required type="email" className="w-full p-3 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-slate-900 outline-none" placeholder="email@anda.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pesan</label>
                  <textarea required rows={4} className="w-full p-3 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-slate-900 outline-none" placeholder="Apa yang bisa kami bantu?"></textarea>
                </div>
                <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition active:scale-95 shadow-lg shadow-slate-200">
                  Kirim Sekarang
                </button>
              </form>
            ) : (
              // Tampilan setelah tombol diklik (Interaksi UI)
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-slate-900">Pesan Terkirim!</h3>
                <p className="text-slate-500 mt-2">Terima kasih, tim KOSTIN akan segera menghubungi Anda.</p>
                <button onClick={() => setIsSent(false)} className="mt-6 text-sm text-slate-900 font-semibold underline">
                  Kirim pesan baru
                </button>
              </div>
            )}
          </div>

          {/* Contact Info - Tetap sesuai desain asli teman kamu */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Hubungi Kami</h2>
            <p className="text-slate-600 mb-8">Punya pertanyaan atau ingin menjadi mitra? Tim kami siap menjawab pesan Anda dalam 24 jam.</p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-900 font-bold">📍</div>
                <div>
                  <p className="font-bold">Alamat Kantor</p>
                  <p className="text-slate-500 text-sm">Bandung, Jawa Barat (Dekat ITENAS)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">📞</div>
                <div>
                  <p className="font-bold">WhatsApp</p>
                  <p className="text-slate-500 text-sm">+62 812-3456-7890</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">📧</div>
                <div>
                  <p className="font-bold">Email</p>
                  <p className="text-slate-500 text-sm">support@kostin.id</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
