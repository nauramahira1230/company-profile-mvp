// app/register/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 1. Definisi Schema Validasi Zod
const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama lengkap tidak boleh kosong!" })
    .min(3, { message: "Nama minimal harus 3 karakter!" }),
  email: z
    .string()
    .min(1, { message: "Email tidak boleh kosong!" })
    .email({ message: "Format email tidak valid! (Sertakan @ dan domain)" }),
  password: z
    .string()
    .min(1, { message: "Password tidak boleh kosong!" })
    .min(6, { message: "Password minimal harus 6 karakter!" }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();

  // 2. Integrasikan react-hook-form dengan Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 3. Fungsi Submit jika lolos Zod
  const onSubmit = (data: RegisterFormData) => {
    const inputEmail = data.email.toLowerCase();
    const isUserAdmin = inputEmail === "admin@gmail.com";

    // Simpan database pendaftaran lokal
    localStorage.setItem("registered_user_email", inputEmail);
    localStorage.setItem("registered_user_password", data.password); 

    localStorage.setItem("kostin_user_name", data.name);
    localStorage.setItem("kostin_user_email", inputEmail);

    if (typeof document !== "undefined") {
      const dummyToken = isUserAdmin ? "admin-token-123" : "user-token-456";
      document.cookie = `session=${dummyToken}; path=/; max-age=86400`;
      document.cookie = `role=${isUserAdmin ? "admin" : "user"}; path=/; max-age=86400`;
    }

    router.push("/kostin");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/60 shadow-xl p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <Link href="/" className="text-2xl font-black text-blue-950 tracking-tighter no-underline">
            🏠 KOST<span className="text-blue-600">IN</span>
          </Link>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight pt-2">Buat Akun Baru</h2>
          <p className="text-xs text-slate-400">Mulai langkahmu mencari hunian impian mahasiswa di Bali</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* INPUT NAMA */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Contoh: Naura Mahira"
              {...register("name")}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition ${
                errors.name ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-blue-500"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs font-bold mt-1.5 pl-1">
                ⚠️ {errors.name.message}
              </p>
            )}
          </div>

          {/* INPUT EMAIL */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5">
              Email Aktif
            </label>
            <input
              type="email"
              placeholder="nama@mahasiswa.ac.id"
              {...register("email")}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition ${
                errors.email ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs font-bold mt-1.5 pl-1">
                ⚠️ {errors.email.message}
              </p>
            )}
          </div>

          {/* INPUT PASSWORD */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="Minimal 6 karakter"
              {...register("password")}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition ${
                errors.password ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs font-bold mt-1.5 pl-1">
                ⚠️ {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition active:scale-[0.98] disabled:bg-slate-300"
          >
            {isSubmitting ? "Mendaftarkan..." : "Daftar Sekarang"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-blue-600 font-bold hover:underline">
            Masuk di sini
          </Link>
        </p>

      </div>
    </div>
  );
}