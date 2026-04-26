"use client";
import { useState } from "react";

export default function ContactPage() {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] py-24 flex items-center">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* INFORMASI KONTAK */}
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-blue-950 tracking-tight mb-6">
            Ada Kendala? <br /> Kabari Kami.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-10 font-medium">Tim KOSTIN siap bantu kalau kamu bingung cara pakai aplikasi atau mau tanya-tanya soal kost tertentu di Bali. Nggak perlu sungkan, langsung chat aja.</p>

          <div className="space-y-6">
            <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-blue-50 shadow-sm">
              <div className="text-3xl">📧</div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Resmi</p>
                <p className="text-blue-950 font-black">halo@kostin.id</p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-blue-50 shadow-sm">
              <div className="text-3xl">💬</div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">WhatsApp Admin</p>
                <p className="text-blue-950 font-black">+62 812-3456-7890</p>
              </div>
            </div>
          </div>
        </div>

        {/* FORMULIR KONTAK */}
        <div className="relative">
          {}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-950/5 rounded-full blur-3xl"></div>

          <div className="relative bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-950/10 border border-blue-50">
            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-black text-blue-950 uppercase tracking-widest mb-2 ml-1">Nama Lengkap</label>
                  <input required type="text" placeholder="Contoh: Senasa" className="w-full p-4 rounded-2xl bg-slate-50 border border-transparent focus:border-blue-950 focus:bg-white outline-none transition-all text-sm font-medium" />
                </div>

                <div>
                  <label className="block text-xs font-black text-blue-950 uppercase tracking-widest mb-2 ml-1">Pesan Kamu</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Mau tanya soal apa nih?"
                    className="w-full p-4 rounded-2xl bg-slate-50 border border-transparent focus:border-blue-950 focus:bg-white outline-none transition-all text-sm font-medium resize-none"
                  ></textarea>
                </div>

                <button type="submit" className="w-full bg-blue-950 text-white font-black py-4 rounded-2xl hover:bg-blue-900 transition-all active:scale-[0.98] shadow-xl shadow-blue-950/20 tracking-widest text-xs uppercase">
                  Kirim Pesan Sekarang
                </button>
              </form>
            ) : (
              <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✅</div>
                <h3 className="text-2xl font-black text-blue-950 mb-2">Pesan Terkirim!</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  Makasih ya! Admin KOSTIN bakal <br /> segera hubungi kamu lewat email atau WA.
                </p>
                <button onClick={() => setIsSent(false)} className="mt-8 text-xs font-black text-blue-950 underline tracking-widest uppercase">
                  Kirim Pesan Lagi
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
