// app/page.tsx

// 1. Tambahkan async di depan fungsi
export default async function PortalPage() {
  // 2. Pasang delay 2 detik (2000ms)
  // Ini yang bakal bikin file loading.tsx kamu muncul lebih lama
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 text-center max-w-lg">
        <h1 className="text-2xl font-bold italic mb-4 text-slate-900">Akses Portal Kostin</h1>
        <p className="text-slate-500 mb-8 leading-relaxed">Selamat datang. Silakan masuk ke halaman login untuk melanjutkan akses ke platform KOSTIN.</p>

        {/* Saran: Gunakan Link dari next/link agar transisi antar halaman lebih smooth */}
        <a href="/login" className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-slate-800 transition-all active:scale-95 no-underline">
          Buka Login Page
        </a>
      </div>
    </div>
  );
}
