// app/register/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
// ✨ Mengambil skema register resmi dari lib bawaan tim kalian
import { registerSchema } from "../../lib/zod-schema"; 

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Tampungan untuk error Zod per kolom inputan
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Bersihkan error lama tiap kali tombol diklik

    // 1. Validasi inputan form menggunakan Zod registerSchema
    const result = registerSchema.safeParse({ name, email, password });
    
    // Jika inputan salah / tidak lolos kriteria Zod
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }
    
    // 2. Jika lolos Zod, simpan data pendaftaran ke localStorage browser
    const userData = { name, email, password };
    localStorage.setItem("kostin_user", JSON.stringify(userData));

    setSuccess(true);
    
    // 3. Setelah sukses, tunggu 1,5 detik lalu lempar balik ke halaman login secara otomatis
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4">
      <form onSubmit={handleRegister} className="p-10 bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black italic mb-2 text-slate-900 tracking-tighter uppercase">REGISTRASI KOSTIN</h1>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">Create Your Account</p>
        </div>

        {/* Kotak Notifikasi Berhasil */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-xl text-xs font-bold text-center">
            🎉 Pendaftaran Berhasil! Mengalihkan ke Login...
          </div>
        )}
        
        <div className="space-y-5">
          {/* KOLOM NAMA LENGKAP */}
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Full Name</label>
            <input 
              type="text" 
              placeholder="Nama Lengkap Kamu" 
              autoComplete="off" // ✨ Biar tidak auto-fill memori browser
              className="w-full p-4 mt-1 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-[10px] font-bold mt-2 ml-2 flex items-center gap-1">
                <span className="bg-red-100 p-1 rounded-full text-[8px]">⚠</span> {errors.name[0]}
              </p>
            )}
          </div>

          {/* KOLOM EMAIL */}
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Email Address</label>
            <input 
              type="text" 
              placeholder="contoh@gmail.com" 
              autoComplete="off" // ✨ Biar tidak auto-fill memori browser
              className="w-full p-4 mt-1 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-[10px] font-bold mt-2 ml-2 flex items-center gap-1">
                <span className="bg-red-100 p-1 rounded-full text-[8px]">⚠</span> {errors.email[0]}
              </p>
            )}
          </div>

          {/* KOLOM PASSWORD */}
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Password</label>
            <input 
              type="password" 
              placeholder="••••••" 
              autoComplete="new-password" // ✨ Memaksa browser mengosongkan kolom password
              className="w-full p-4 mt-1 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-[10px] font-bold mt-2 ml-2 flex items-center gap-1">
                <span className="bg-red-100 p-1 rounded-full text-[8px]">⚠</span> {errors.password[0]}
              </p>
            )}
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest mt-10 hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-100">
          Daftar Akun Baru →
        </button>

        <div className="text-center mt-6">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-blue-600 hover:underline font-black">
              Masuk Disini
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}