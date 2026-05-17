"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 1. Definisikan Schema Validasi menggunakan Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email tidak boleh kosong!" })
    .email({ message: "Format email tidak valid! Gunakan @gmail.com dsb." }),
  password: z
    .string()
    .min(6, { message: "Password minimal harus 6 karakter!" }),
});

// Infer tipe data dari schema Zod
type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  // 2. Integrasikan react-hook-form dengan Zod Resolver
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. Fungsi eksekusi setelah lolos validasi Zod
  const onSubmit = (data: LoginFormData) => {
    const inputEmail = data.email.toLowerCase();
    const isUserAdmin = inputEmail === "admin@gmail.com";

    let finalName = "Naura Mahira"; // Nama default jika tidak terdeteksi

    // === VALIDASI PENDAFTARAN KE LOCALSTORAGE ===
    if (!isUserAdmin) {
      const registeredEmail = localStorage.getItem("registered_user_email");
      const registeredName = localStorage.getItem("kostin_user_name");

      if (!registeredEmail || inputEmail !== registeredEmail.toLowerCase()) {
        // Set eror spesifik ke kolom email menggunakan custom validation
        setError("email", {
          type: "manual",
          message: "Email belum terdaftar! Silakan daftar akun terlebih dahulu.",
        });
        return;
      }

      if (registeredName) {
        finalName = registeredName;
      }
    }

    // === SET COOKIES UNTUK MIDDLEWARE ===
    if (typeof document !== "undefined") {
      const dummyToken = isUserAdmin ? "admin-token-123" : "user-token-456";
      document.cookie = `session=${dummyToken}; path=/; max-age=86400`; 
      document.cookie = `role=${isUserAdmin ? "admin" : "user"}; path=/; max-age=86400`;
    }

    // === SIMPAN DATA AKTIF KE LOCALSTORAGE UNTUK NAVBAR ===
    localStorage.setItem("kostin_user_email", inputEmail);
    localStorage.setItem("kostin_user_name", isUserAdmin ? "Admin Kostin" : finalName);

    // Lempar ke halaman utama aplikasi KOSTIN
    router.push("/kostin");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/60 shadow-xl p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <Link href="/" className="text-2xl font-black text-blue-950 tracking-tighter no-underline">
            🏠 KOST<span className="text-blue-600">IN</span>
          </Link>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight pt-2">Selamat Datang</h2>
          <p className="text-xs text-slate-400">Silakan masuk menggunakan email akun kamu</p>
        </div>

        {/* Form menggunakan handleSubmit dari react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* KOLOM EMAIL */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5">
              Email Aktif
            </label>
            <input
              type="email"
              placeholder="Contoh: admin@gmail.com atau email-mu"
              {...register("email")}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition ${
                errors.email ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-blue-500"
              }`}
            />
            {/* Teks Peringatan Eror Zod untuk Email */}
            {errors.email && (
              <p className="text-red-500 text-xs font-bold mt-1.5 pl-1">
                ⚠️ {errors.email.message}
              </p>
            )}
          </div>

          {/* KOLOM PASSWORD */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition ${
                errors.password ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-blue-500"
              }`}
            />
            {/* Teks Peringatan Eror Zod untuk Password */}
            {errors.password && (
              <p className="text-red-500 text-xs font-bold mt-1.5 pl-1">
                ⚠️ {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition active:scale-[0.98] disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Memproses..." : "Masuk Sekarang"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400">
          Belum punya akun?{" "}
          <Link href="/register" className="text-blue-600 font-bold hover:underline">
            Daftar di sini
          </Link>
        </p>

      </div>
    </div>
  );
}