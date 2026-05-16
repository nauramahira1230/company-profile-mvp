// app/login/page.tsx
"use client";

import { useState } from "react";
import { loginSchema } from "../../lib/zod-schema"; 
import Link from "next/link"; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setErrors({});

    // 1. Validasi struktur format input menggunakan Zod bawaan tim kamu
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    // 2. JALUR KHUSUS ADMIN KELOMPOK (Bisa langsung masuk kapan saja)
    if (email === "admin@gmail.com" && password === "123456") {
      document.cookie = `session=active; path=/; max-age=3600`;
      document.cookie = `role=admin; path=/; max-age=3600`;
      window.location.href = "/kostin"; 
      return;
    }

    // 3. JALUR USER BIASA (Mengecek hasil register di localStorage)
    const savedUserRaw = localStorage.getItem("kostin_user");
    
    // ✨ FIX BARU: Jika belum ada data register sama sekali, CUMA kasih peringatan teks tanpa melempar halaman
    if (!savedUserRaw) {
      setLoginError("Akun belum terdaftar! Silakan klik 'Daftar Disini' di bawah untuk membuat akun baru.");
      return;
    }

    const savedUser = JSON.parse(savedUserRaw);

    // ✨ FIX BARU 2: Jika email yang diketik beda dengan yang ada di memori (belum terdaftar)
    if (email !== savedUser.email) {
      setLoginError("Akun belum terdaftar! Silakan klik 'Daftar Disini' di bawah untuk membuat akun baru.");
      return;
    }

    // 4. Jika email-nya sudah benar terdaftar, baru cek apakah password-nya cocok
    if (password === savedUser.password) {
      document.cookie = `session=active; path=/; max-age=3600`;
      document.cookie = `role=user; path=/; max-age=3600`;
      window.location.href = "/kostin"; 
    } else {
      setLoginError("Email atau Password salah! Periksa kembali ketikan Anda.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4">
      <form onSubmit={handleLogin} className="p-10 bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black italic mb-2 text-slate-900 tracking-tighter uppercase">KOSTIN PORTAL</h1>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">Security Fortified</p>
        </div>

        {/* Kotak Notifikasi Error */}
        {loginError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold text-center">
            ⚠ {loginError}
          </div>
        )}
        
        <div className="space-y-5">
          {/* INPUT EMAIL */}
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Email Address</label>
            <input 
              type="text" 
              placeholder="contoh@gmail.com" 
              autoComplete="off"
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

          {/* INPUT PASSWORD */}
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Password</label>
            <input 
              type="password" 
              placeholder="••••••" 
              autoComplete="new-password"
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
          Masuk Sekarang →
        </button>

        <div className="text-center mt-6">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Belum punya akun?{" "}
            <Link href="/register" className="text-blue-600 hover:underline font-black">
              Daftar Disini
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}