// app/portal/page.tsx
import Link from "next/link";

export default async function PortalPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 text-center max-w-lg">
        <h1 className="text-2xl font-bold italic mb-4 text-slate-900">Akses Portal Kostin</h1>
        <p className="text-slate-500 mb-8 leading-relaxed">Selamat datang. Silakan masuk ke halaman login untuk melanjutkan akses ke platform KOSTIN.</p>

        {/* FIX: Menggunakan Link dari Next.js menuju /login */}
        <Link href="/login" className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-slate-800 transition-all active:scale-95 no-underline">
          Buka Login Page
        </Link>
      </div>
    </div>
  );
}