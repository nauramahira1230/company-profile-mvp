export default function ServicesPage() {
  const services = [
    { title: "Pencarian Kost", desc: "Database kost terlengkap dengan filter harga dan fasilitas." },
    { title: "Verifikasi Data", desc: "Kami memastikan semua data kost valid dan sesuai dengan kenyataan." },
    { title: "Booking Online", desc: "Sistem booking yang aman dan transparan langsung dari aplikasi." },
  ];

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Layanan KOSTIN</h1>
        <p className="text-slate-500 mb-16">Solusi cerdas untuk kebutuhan hunian modern Anda.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition">
              <div className="text-3xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
