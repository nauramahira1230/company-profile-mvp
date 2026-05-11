"use client";

import { useState } from "react";
import { loginSchema } from "../../lib/zod-schema";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    const role = email === "admin@gmail.com" ? "admin" : "user";

    document.cookie = `session=active; path=/; max-age=3600`;
    document.cookie = `role=${role}; path=/; max-age=3600`;

    window.location.href = "/kostin";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4">
      <form onSubmit={handleLogin} className="p-10 bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black italic mb-2 text-slate-900 tracking-tighter uppercase">KOSTIN PORTAL</h1>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">Security Fortified</p>
        </div>
        
        <div className="space-y-5">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Email Address</label>
            <input 
              type="text" 
              placeholder="admin@gmail.com" 
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

          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Password</label>
            <input 
              type="password" 
              placeholder="••••••" 
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
      </form>
    </div>
  );
}