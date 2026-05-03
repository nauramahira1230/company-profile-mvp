"use client";

import { useActionState } from "react";
import { submitContact } from "./actions";

export default function ContactPage() {
  const [state, formAction, pending] = useActionState(submitContact, null);

  return (
    <main className="min-h-screen bg-slate-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE */}
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-blue-950 tracking-tight mb-6 leading-tight">
            Ada Kendala? <br /> Kabari Kami.
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed font-medium max-w-xl mb-10">
            Kalau kamu lagi bingung pakai aplikasi, ada masalah saat cari kost,
            atau mau tanya seputar hunian di Bali, tim KOSTIN siap bantu dengan
            cepat dan ramah.
          </p>

          <div className="space-y-5">
            <div className="group bg-white p-6 rounded-[2rem] shadow-xl shadow-blue-950/5 border border-blue-100 hover:border-blue-300 transition-all duration-300 flex gap-5 items-center">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center text-3xl group-hover:bg-blue-950 group-hover:text-white transition-all duration-500">
                📧
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-slate-400 tracking-widest">
                  Email
                </p>
                <p className="text-blue-950 font-black text-sm">
                  halo@kostin.id
                </p>
              </div>
            </div>

            <div className="group bg-white p-6 rounded-[2rem] shadow-xl shadow-blue-950/5 border border-blue-100 hover:border-blue-300 transition-all duration-300 flex gap-5 items-center">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center text-3xl group-hover:bg-blue-950 group-hover:text-white transition-all duration-500">
                💬
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-slate-400 tracking-widest">
                  WhatsApp
                </p>
                <p className="text-blue-950 font-black text-sm">
                  +62 877-5194-7869
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-blue-950/5 border border-blue-100">
          {state?.success ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-5">✅</div>

              <h2 className="text-3xl font-black text-blue-950 tracking-tight">
                Pesan Terkirim!
              </h2>

              <p className="text-slate-600 font-medium mt-3 text-sm">
                {state.message}
              </p>

              <button
                onClick={() => window.location.reload()}
                className="mt-6 text-blue-950 font-black text-xs uppercase tracking-widest underline"
              >
                Kirim Lagi
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-black text-blue-950 tracking-tight mb-2">
                Hubungi Kami
              </h2>

              <p className="text-slate-500 text-sm font-medium mb-8">
                Isi form berikut, nanti tim kami akan bantu jawab pertanyaanmu.
              </p>

              <form action={formAction} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-blue-950 ml-1">
                    Nama Lengkap
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="Siapa namamu?"
                    className="w-full p-4 rounded-2xl bg-slate-50 border border-transparent outline-none focus:ring-2 ring-blue-950/10 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-blue-950 ml-1">
                    Email Aktif
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="email@kamu.com"
                    className="w-full p-4 rounded-2xl bg-slate-50 border border-transparent outline-none focus:ring-2 ring-blue-950/10 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-blue-950 ml-1">
                    Pesan
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Tulis pertanyaanmu di sini..."
                    className="w-full p-4 rounded-2xl bg-slate-50 border border-transparent outline-none resize-none focus:ring-2 ring-blue-950/10 transition-all"
                  />
                </div>

                <button
                  disabled={pending}
                  className="w-full bg-blue-950 text-white p-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all disabled:bg-slate-300"
                >
                  {pending ? "Lagi Ngirim..." : "Kirim Pesan"}
                </button>

                {state?.success === false && (
                  <p className="text-red-500 text-center text-xs font-bold">
                    {state.message}
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}