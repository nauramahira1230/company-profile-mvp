export default function ServicesPage() {
  const services = [
    { title: "Pencarian Kost", desc: "Filter kost berdasarkan lokasi, harga, dan fasilitas secara real-time.", icon: "🔍" },
    { title: "Booking Online", desc: "Pesan kamar langsung dari aplikasi tanpa perlu survei lokasi berkali-kali.", icon: "📅" },
    { title: "Manajemen Properti", desc: "Layanan khusus pemilik kost untuk memantau pembayaran dan laporan keuangan.", icon: "📊" },
    { title: "Legalitas & Kontrak", desc: "Bantuan pembuatan draf kontrak sewa menyewa yang sah secara hukum.", icon: "⚖️" },
  ];

  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Layanan Unggulan Kami</h1>
          <p className="text-slate-500">Solusi menyeluruh untuk ekosistem hunian modern.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-blue-300 transition">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}